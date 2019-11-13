---
title:  "Deploy to GitHub repositories in TravisCI Jobs"
description: How to push to GitHub repositories (or access private repositories) from TravisCI Jobs
date: 2019-11-13T13:07:27+01:00
---

* TOC
{:toc}

## Introduction

By using GitHub deploy keys you can safely push to GitHub repositories, or read private GitHub repositories.


## Configuration

Let's assume that:

- your GitHub user name / organization name is <input type="text" id="dgtj-repo-owner" value="username" />
- your GitHub repository name is <input type="text" id="dgtj-repo-name" value="reponame" />
- your are going to encrypt the private key with <input type="text" id="dgtj-key-password" value="your encryption password" size="40" />


## Generate a private key

- Install OpenSSH on your system (or in a Virtual Machine, Docker container, WSL, ...)
- Generate an RSA private key without a passphrase:
  <div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code>ssh-keygen <span class="nt">-b</span> 4096 <span class="nt">-t</span> rsa <span class="nt">-N</span> <span class="s2">""</span> <span class="nt">-C</span> <span class="s2">"Deploy key for <span class="dgtj-repo-owner"></span>/<span class="dgtj-repo-name"></span>"</span> <span class="nt">-f</span> github_deploy_key
</code></pre></div></div>
- Encrypt the private key
  <div class="language-sh highlighter-rouge"><div class="highlight"><pre class="highlight"><code>openssl aes-256-cbc <span class="nt">-e</span> <span class="nt">-in</span> github_deploy_key <span class="nt">-pass</span> <span class="s2">'pass:<span class="dgtj-key-password"></span>'</span> <span class="nt">-md</span> sha256 <span class="nt">-out</span> github_deploy_key.enc</code></pre></div></div>


## Add the key to the GitHub deploy keys

Go to <a target="_blank" href="#" id="dgtj-deploykey-link">https://github.com/<span class="dgtj-repo-owner"></span>/<span class="dgtj-repo-name"></span>/settings/keys/new</a> and enter this data:
  - *Title*  
    a name of your choice
  - *Key*  
    paste the contents of the `github_deploy_key.pub` file
  - *Allow write access*  
    check this if you will need to push to the repository


## Add the decryption password to TravisCI

- Go to <a target="_blank" href="#" id="dgtj-travis-var">https://travis-ci.org/<span class="dgtj-repo-owner"></span>/<span class="dgtj-repo-name"></span>/settings</a>
- In the `Environment Variables` section, add a new variable with:
  - *Name*  
    `DEPLOYKEY_PASSWORD`
  - *Value*  
    <code class="highlighter-rouge"><span class="dgtj-key-password"></code>


## Add the encrypted key to your repository

Add the `github_deploy_key.enc file` file to your repository.  
By default, you can save it as `.travis/github_deploy_key.enc`



## Configure the TravisCI job

- If you didn't save the encrypted key as `.travis/github_deploy_key.enc`, define an environment variable named `DEPLOYKEY_FILE` whose value is the relative path to the encrypted key
- Invoke the following code to load the key so that GIT has (write) access to the repository:
    ```sh
wget -q -O - https://raw.githubusercontent.com/mlocati/travisci-github-deploy-key/master/load-deploy-key.sh | sh
    ```

## Credits

From a great idea by [@B3rn475](https://github.com/B3rn475).


<script>
$(document).ready(function() {
    var storage = (function() {
        var PREFIX = 'ml-dgtj-';
        var ok = window.localStorage && window.localStorage.setItem && window.localStorage.getItem;
        return {
            save: function (key, value) {
                if (ok) {
                    try {
                        window.localStorage.setItem(PREFIX + key, value);
                        return true;
                    } catch (e) {
                    }
                }
                return false;
            },
            load: function (key, defaultValue) {
                var result = defaultValue;
                if (ok) {
                    try {
                        var v = window.localStorage.getItem(PREFIX + key);
                        if (v !== null) {
                            return v;
                        }
                    } catch (e) {
                    }
                }
                return defaultValue;
            }
        };
    })();

    function repoUpdated() {
        var userrepo = $('#dgtj-repo-owner').val() + '/' + $('#dgtj-repo-name').val();
        $('#dgtj-deploykey-link').attr('href', 'https://github.com/' + userrepo + '/settings/keys/new');
        $('#dgtj-travis-var').attr('href', 'https://travis-ci.org/' + userrepo + '/settings');
    }

    function Valorizer(key, volatile) {
        var my = this;
        my.currentValue = null;
        my.volatile = volatile;
        my.$input = $('#dgtj-' + key);
        my.type = 'text';
        my.saveEvent = 'blur';
        switch (key) {
            case 'repo-owner':
            case 'repo-name':
                my.normalize = function (v) { return v.replace(/[\\\/]+/g, '/').replace(/^\/|\/$/, '').replace(/[^\w\.\/]+/g, '-').replace(/^-+|-+$/g, ''); };
                break;
            default:
                my.normalize = function (v) { return v; };
                break;
        }
        switch (my.type) {
            case 'checkbox':
                my.$spans = {
                    on: $('.dgtj-' + key + '-on'),
                    off: $('.dgtj-' + key + '-off')
                };
                break;
            default:
                my.$spans = $('.dgtj-' + key);
                break;
           }
        my.$input
            .on('change keydown keypress keyup mousedown mouseup blur input', function() {
                var newValue;
                switch (my.type) {
                    case 'checkbox':
                        newValue = my.$input.is(':checked') ? 'on' : 'off';
                        break;
                    default:
                        newValue = my.normalize(my.$input.val());
                        break;
                }
                if (key === 'repo-owner' || key === 'repo-name') {
                    repoUpdated();
                }
                if (newValue === my.currentValue) {
                    return;
                }
                my.currentValue = newValue;
                switch (my.type) {
                    case 'checkbox':
                        my.$spans.off[newValue === 'off' ? 'show' : 'hide']();
                        my.$spans.on[newValue === 'on' ? 'show' : 'hide']();
                        break;
                    default:
                        my.$spans.text(newValue);
                        break;
                }
            })
            .on(my.saveEvent, function() {
                if (my.volatile) {
                    return;
                }
                setTimeout(function() {
                    if (my.currentValue !== null) {
                        storage.save(key, my.currentValue);
                    }
                }, 0);
            })
        ;
        if (!my.volatile) {
            switch (my.type) {
                case 'checkbox':
                    my.$input.prop('checked', storage.load(key, my.$input.is(':checked') ? 'on' :'off') === 'on');
                    break;
                default:
                    my.$input.val(storage.load(key, my.$input.val()))
                    break;
            }
        }
        my.$input.trigger('change');
    }
    for (var i = 0, L = ['repo-owner', 'repo-name']; i < L.length; i++) {
        new Valorizer(L[i], false);
    }
    for (var i = 0, L = ['key-password']; i < L.length; i++) {
        new Valorizer(L[i], true);
    }
});
</script>
