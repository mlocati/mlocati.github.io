---
title:  "Deploy with git push"
---

* TOC
{:toc}

## Introduction!

Wouldn't it be nice to publish a website with a simple git push?  
Here I'll explain you how I usually do this.

I assume that the environment of the staging/production servers are the following:

- Operating system: Ubuntu 14.04 or Ubuntu 16.04
- User used by the web server: `www-data` (it's the default for Ubuntu)
- User group used by the web server: `www-data` (it's the default for Ubuntu)

If your servers are not the above, the approach described in this document should work with minor changes given that they are *nix.


## One-time server setup

### Install required packages

First of all, you need to install git on the server.  
You can do this by running the following command:

```bash
sudo apt-get update
sudo apt-get install -y git
```

If the above command fails with an error like `Unable to locate package git`, you can try this:

```bash
sudo apt-get install -y git-core
```

### Create the `git` user

We need to create a user account on the server. This account will be the one used by the publish process.
  
With the following command we create that account:

```bash
sudo adduser --gecos Git --disabled-login --disabled-password --shell /usr/bin/git-shell --home /home/git --ingroup www-data git
```

Here's the explanation of the above options:

- `--gecos Git`: set the full name of the account to `Git` (this essentially in order to avoid asking useless data like the account room number and work/home phone) 
- `--disabled-login`: the user won't be able to use the account until the password is set.
- `--disabled-login`: the user won't be able to use the account until the password is set.
- `--disabled-password`: disable the login using passwords (we'll access the system with SSH RSA keys)
- `--shell /usr/bin/git-shell`: when the user access the system, he will use the fake shell provided by git
- `--home /home/git`: set the home directory for the user to `/home/git`
- `--ingroup www-data`:  add the new user to the `www-data` group instead of the default one
- `git`: the username of the new account

#### Strengthen login security

We then need to configure the git shell.  
In order to improve the security of unwanted logins and abort shell sessions, we create a file that is executed when the `git` user logs in the shell and that will abort the session.  

```bash
sudo mkdir /home/git/git-shell-commands
sudo nano /home/git/git-shell-commands/no-interactive-login
```

In the editor type in these commands:

```bash
#!/bin/sh
printf '%s\n' "Hi $USER! You've successfully authenticated, but I do not"
printf '%s\n' "provide interactive shell access."
exit 128
```

To save the new file hit `CTRL`+`o` then `ENTER`.  
To quit the editor, hit `CTRL`+`x`.

We finally have to make the file executable:

```bash
sudo chmod +x /home/git/git-shell-commands/no-interactive-login
```

#### Allow `www-data` impersonation

The `git` user needs to be able to publish files acting like `www-data`.  
In order to allow this, run this command:

```bash
sudo visudo
```

Go to the end of the editor contents and add these lines:

``` 
Defaults!/usr/bin/git env_keep="GIT_DIR GIT_WORK_TREE"
git ALL=(www-data) NOPASSWD: /usr/bin/git
```

The first line tells the system that when the `git` command is executed with a `sudo`, we need to keep the two environment variables `GIT_DIR` and `GIT_WORK_TREE`.  
The second line tells the system that the `git` user can execute the `git` command acting as `www-data` without any further authentication.


## Authorized developers

Every developer that should be able to publish needs an SSH-2 RSA key pair.  
It's possible (and recommended) to use a different key for every developer.

### Create the keys under Windows

I order to create the key pair, you can use PuTTYgen.  
If you already installed [TortoiseGit](https://tortoisegit.org/) you should already have this command, otherwise you can [download it](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

So, open PuTTYgen and:

- in the `Parameters` page be sure to check `SSH-2 RSA` and `2048` for the `Number of bits in a generated key`
- Hit the `Generate` button and move randomly your mouse over the PuTTYgen window
- In the `Key comment` field enter `ServerName - DeveloperName` (where `ServerName` is the name of the server where the key will be used, and `DeveloperName` is the name of the developers owning the key)
- In the `Key passphrase` and `Confirm passphrase` fields enter a password of your choice
- Hit the `Save private key` button to save the private key to file
- Copy the contents of the `Public key for pasting into OpenSSH authorized_keys file` and save it: this is the public key that we'll need.


### Create the keys under *nix

Simply run this command:

```bash
ssh-keygen -t rsa -b 2048 -f key-for-git -C 'ServerName - DeveloperName' 
```

Where:

- `-t rsa`: we want public/private key pair in the SSH-2 RSA format
- `-b 2048`: we want 2048 bits in the key
- `-f key-for-git`: this is the name of the file that will contain the private key
- `-C 'ServerName - DeveloperName'`: this is the comment to associate to the key
  (it's a good practice to specify the name of the server and the one the developer owning the key)

Once you run the `ssh-keygen` command and specified a password of your choice, you'll have these two files:

- `key-for-git`: contains the private key
- `key-for-git.pub`: contains the public key


### Allow the developer to publish to the server

Login to the server and run this command:

```bash
sudo mkdir /home/git/.ssh
sudo nano /home/git/.ssh/authorized_keys
```

Go to the end of the editor contents and add a new line containing the previusly generated public key.  

The public key is a single line that starts with `ssh-rsa `, followed by a quite long list of characters and ending with the `ServerName - DeveloperName` comments specified during the creation of the key.



## Create a new repository on the server

Let's assume that you want to create a new repository named <input type="text" id="dwgp-reponame" value="MYSITE" />.

We'll end up with:

- Directory to be published: <code class="highlighter-rouge">/var/www/<span class="dwgp-reponame"></span></code>
- Repository directory: <code class="highlighter-rouge">/var/git/<span class="dwgp-reponame"></span></code>

First of all, we create the directory that will contain web site (it will be owned by the `www-data` user):

<div class="highlighter-rouge">
    <pre class="highlight"><code>sudo mkdir -p /var/www/<span class="dwgp-reponame"></span>
sudo chown -R www-data:www-data /var/www/<span class="dwgp-reponame"></span>
sudo chmod u+rw -R /var/www/<span class="dwgp-reponame"></span></code></pre>
</div>

Then we create the directory that will contain the bare repository data:

<div class="highlighter-rouge">
    <pre class="highlight"><code>sudo mkdir -p /var/git/<span class="dwgp-reponame"></span>.git
cd /var/git/<span class="dwgp-reponame"></span>.git
sudo git init --bare
sudo git config core.sharedRepository group</code></pre>
</div>

The `core.sharedRepository group` option of the git repository is needed in order to grant write access to both the `git` and `www-data` users (they both belong to the same user group - `www-data`). 

And now the key concept of this whole approach: when someone pushes to this repository, we checkout the repository to the publish folder:

<div class="highlighter-rouge">
    <pre class="highlight"><code>sudo nano /var/git/<span class="dwgp-reponame"></span>.git/hooks/post-receive</code></pre>
</div>

In the editor type these lines:

<div class="highlighter-rouge">
    <pre class="highlight"><code>#!/bin/sh
currentUser=`whoami`
currentServer=`hostname`
repoDirectory=/var/git/<span class="dwgp-reponame"></span>.git
pubDirectory=/var/www/<span class="dwgp-reponame"></span>
echo "Hello! I'm $currentUser at $currentServer"
echo "I'm going to publish from"
echo "   $repoDirectory"
echo "to"
echo "   $pubDirectory"
sudo -u www-data git --git-dir=$repoDirectory --work-tree=$pubDirectory checkout master -f
rc=0
if [ "$?" -ne "0" ]; then
    echo "GOSH! AN ERROR OCCURRED!!!!"
    rc=1
else
    echo "Don't worry, be happy: everything worked out like a charm ;)"
fi
exit $rc
</code></pre>
</div>

We finally need to update the permissions of the newly created directory:

<div class="highlighter-rouge">
    <pre class="highlight"><code>sudo chown -R git:www-data /var/git/<span class="dwgp-reponame"></span>.git
sudo chmod -R ug+rwX /var/git/<span class="dwgp-reponame"></span>.git
sudo chmod -R ug+x /var/git/<span class="dwgp-reponame"></span>.git/hooks/post-receive
    </code></pre>
</div>


## Push-to-publish

Everything is almost ready!
The only step required to deploy with a simple `git push` is to add the remote to your repository.

For instance, if the server is available at the address <input type="text" id="dwgp-serveraddress" value="www.example.com" />,
here's how to add a remote named `deploy` to your local repository:

<div class="highlighter-rouge">
    <pre class="highlight"><code>git remote add deploy git@<span class="dwgp-serveraddress"></span>:/var/git/<span class="dwgp-reponame"></span>.git</code></pre>
</div>

When you push to the `deploy` remote, the published directory willbe updated automatically.

Nice, isn't it?

<script>
document.addEventListener('DOMContentLoaded', function() {
    var $repoName = $('#dwgp-reponame'), repoName = null;
    $repoName
        .on('change keydown keypress keyup mousedown mouseup blur', function() {
            var n = $repoName.val().replace(/[^\w\.]+/g, '-').replace(/^-+|-+$/g, '');
            if (n === '' || n === repoName) {
                return;
            }
            repoName = n;
            $('.dwgp-reponame').text(repoName);
        })
        .trigger('change')
    ;
    var $serverAddress = $('#dwgp-serveraddress'), serverAddress = null;
    $serverAddress
        .on('change keydown keypress keyup mousedown mouseup blur', function() {
            var n = $serverAddress.val().replace(/\s+$/g, '');
            if (n === '' || n === serverAddress) {
                return;
            }
            serverAddress = n;
            $('.dwgp-serveraddress').text(serverAddress);
        })
        .trigger('change')
    ;
});
</script>
