---
title:  "Deploy with git push"
description: How to automatically deploy (ie publish) to a remote server with a simple git push.
date: 2016-06-15T14:36:55+02:00
---

* TOC
{:toc}

<div id="deploy-with-git-push-app" markdown="1" v-cloak>

## Introduction

Wouldn't it be nice to publish a website with a simple git push?  

Here I'll explain you how I usually do this.


## Configuration

<table class="table">
    <tbody>
        <tr>
            <th>Remote server available at the address</th>
            <td><input type="text" class="form-control" v-model.trim="inputServerAddress" v-on:blur="inputServerAddress = serverAddress" /></td>
        </tr>
        <tr>
            <th>Name of the repository</th>
            <td><input type="text" class="form-control" v-model.trim="inputRepositoryName" v-on:blur="inputRepositoryName = repositoryName" /></td>
        </tr>
        <tr>
            <th>Branch to be deployed</th>
            <td><input type="text" class="form-control" v-model.trim="inputRepositoryBranch" v-on:blur="inputRepositoryBranch = repositoryBranch" /></td>
        </tr>
        <tr>
            <th>User impersonated by webserver</th>
            <td><input type="text" class="form-control" v-model.trim="inputWebUser" v-on:blur="inputWebUser = webUser" /></td>
        </tr>
        <tr>
            <th>Group of the user impersonated by webserver</th>
            <td><input type="text" class="form-control" v-model.trim="inputWebUserGroup" v-on:blur="inputWebUserGroup = webUserGroup" /></td>
        </tr>
        <tr v-if="updateConcreteCMS">
            <th>ConcreteCMS languages to update/install</th>
            <td><input type="text" class="form-control" v-model="inputConcreteCMSLocales" v-on:blur="inputConcreteCMSLocales = concreteCMSLocales.join(' ')" placeholder="de_DE de_CH fr_FR it_IT" /></td>
        </tr>
        <tr>
            <th>Options</th>
            <td>
                 <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="runComposerInstall" />
                        <span markdown="1">Run `composer install`</span>
                    </label>
                </div>
                 <div class="checkbox">
                    <label>
                        <input type="checkbox" v-model="updateConcreteCMS" />
                        Update ConcreteCMS
                    </label>
                </div>
            </td>
        </tr>
    </tbody>
</table>


## One-time Server Setup


### Install Required Packages

First of all, you need to install git on the server.  
You can do this by running the following command (on Debian/Ubuntu & family):

```sh
sudo apt-get update -q
sudo apt-get install -qy git
```

If the above command fails with an error like `Unable to locate package git`, you can try this:

```sh
sudo apt-get install -qy git-core
```


<div v-if="runComposerInstall" markdown="1">

### Install and Configure Composer

```sh
# Go to your home directory
cd
# Download and install Composer
curl -sSLf https://getcomposer.org/installer | php
# Move Composer to the default binary folder
sudo mv composer.phar /usr/local/bin/composer
# Check that Composer works
composer --version
```

#### Private GitHub Repositories

If you need to access GitHub (private) repositories, you have to [create a new Personal access token](https://github.com/settings/tokens/new).

Assuming that the newly generated token is <span class="form-inline"><input type="text" class="form-control input-sm" v-model.trim="inputGitHubPAT" v-on:blur="inputGitHubPAT = gitHubPAT" /></span>, you then have to run these commands:

{% raw %}
```sh
mkdir -p /home/git/.composer/
cat <<'EOF' | sudo tee /home/git/.composer/auth.json >/dev/null
{
    "github-oauth": {
        "github.com": "{{ gitHubPAT }}"
    }
}
EOF
chown -R git:www-data /home/git/.composer
chmod -R ug+rw /home/git/.composer
```
{% endraw %}

</div>


<div v-if="updateConcreteCMS" markdown="1">

### Script to Update ConcreteCMS

Updating ConcreteCMS is as simple as running the `c5:update` CLI command.

By the way, it's better to:

1. turn on maintenance mode before doing it (and turning it back off when done)
1. run `c5:update` to update the ConcreteCMS core
1. run `c5:package:update --all` to update any ConcreteCMS package that may have been udated by composer
1. update the installed language files
1. refresh the Doctrine Entities
1. clear the ConcreteCMS cache

So, what about creating a script to make it easier to perform all those operations?

I did it for you ;)

Download [this gists](https://gist.github.com/mlocati/5db7bb36b4c3ac7676a4ace97b69ab46#file-update-concrete), save it as `/usr/local/bin/update-concrete`, and make it executable:

```sh
sudo curl -sSLf \
    -o/usr/local/bin/update-concrete \
    https://gist.githubusercontent.com/mlocati/5db7bb36b4c3ac7676a4ace97b69ab46/raw/update-concrete
sudo chmod 755 /usr/local/bin/update-concrete
```

</div>


### Create the `git` user

We need to create a user account on the server. This account will be the one used by the publish process.

With the following command we create that account:

{% raw %}
```sh
sudo adduser \
    --gecos Git \
    --disabled-login \
    --disabled-password \
    --shell /usr/bin/git-shell \
    --home /home/git \
    --ingroup "{{ webUserGroup }}" \
    git
```
{% endraw %}

Here's the explanation of the above options:

- `--gecos Git`: set the full name of the account to `Git` (this essentially in order to avoid asking useless data like the account room number and work/home phone)
- `--disabled-login`: the user won't be able to use the account until the password is set
- `--disabled-password`: disable the login using passwords (we'll access the system with SSH keys)
- `--shell /usr/bin/git-shell`: the git user is only allowed to run git commands
- `--home /home/git`: set the home directory for the user to `/home/git`
- `--ingroup {% raw %}{{ webUserGroup }}{% endraw %}`: add the new user to the user group used by the web server instead of the default one
- `git`: the username of the new account

We then need to configure the git shell.

In order to improve the security of unwanted logins and abort shell sessions, let's create a file that is executed when the `git` user logs in the shell and that will abort the session.  

```sh
sudo mkdir -p /home/git/git-shell-commands

cat <<'EOF' | sudo tee /home/git/git-shell-commands/no-interactive-login >/dev/null
#!/bin/sh

printf "Hi %s!\nYou've successfully authenticated, but I do not provide interactive shell access.\n" "$USER"

exit 128

EOF

sudo chmod +x /home/git/git-shell-commands/no-interactive-login
```

#### Allow `{% raw %}{{ webUser }}{% endraw %}` Impersonation

The `git` user needs to be able to publish files acting like `{% raw %}{{ webUser }}{% endraw %}`.

In order to allow this, run this command:

```sh
sudo visudo
```

Go to the end of the editor contents and add these lines:

```
# The user git, when accessing from any client (ALL), can run as {% raw %}{{ webUser }}{% endraw %} (without password)
# the specified commands
git ALL=({% raw %}{{ webUser }}{% endraw %}) NOPASSWD: {% raw %}{{ visudoCommands }}{% endraw %}
```


### Script launched by the hook

When you'll push to the git repository, you'll need to perform some operations.

In order to simplify these operations I've created [this gist](https://gist.github.com/mlocati/5db7bb36b4c3ac7676a4ace97b69ab46#file-git-post-receive-hook), save it as `/usr/local/bin/git-post-receive-hook`, and make it executable:

```sh
sudo curl -sSLf \
    -o/usr/local/bin/git-post-receive-hook \
    https://gist.githubusercontent.com/mlocati/5db7bb36b4c3ac7676a4ace97b69ab46/raw/git-post-receive-hook
sudo chmod 755 /usr/local/bin/git-post-receive-hook
```


## Authorized developers

Every developer that should be able to publish needs an Ed25519 (or RSA) key pair.  
It's possible (and recommended) to use a different key for every developer.

### Create the keys under Windows

I order to create the key pair, you can use `PuTTYgen`.  
If you already installed [TortoiseGit](https://tortoisegit.org/) you should already have this command, otherwise you can [download it](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html).

So, open PuTTYgen and:

- in the `Parameters` page be sure to select the type of key to generate
  - `EdDSA` (curve: `Ed25519`)
  - if your server is old: `RSA` with at least `4096` number of bits in a generated key
- Hit the `Generate` button and move randomly your mouse over the PuTTYgen window
- In the `Key comment` field enter the name of the developer (eg `John Doe`)
- In the `Key passphrase` and `Confirm passphrase` fields enter a password of your choice
- Hit the `Save private key` button to save the private key to file
- Copy the contents of the `Public key for pasting into OpenSSH authorized_keys file` and save it: this is the public key that we'll need.

### Create the keys under *nix

Simply run this command to create an Ed25519 key pair

```sh
ssh-keygen -f key-for-git -C 'Name of the developer' -t ed25519
```

If your server is old, you can generate an RSA keypair with at least 4096 bits:

```sh
ssh-keygen -f key-for-git -C 'Name of the developer' -t rsa -b 4096
```

Where:

- `-f key-for-git`: use `key-for-git` as the name of the files that will contain the keys
- `-C 'Name of the developer'`: this is the comment to associate to the key (use your developer name)
- `-t ed25519`: generate an Ed25519 key pair
- `-t rsa -b 4096`: generate an RSA key pair of 4096 bits

Once you run the `ssh-keygen` command and specified a password of your choice, you'll have these two files:

- `key-for-git`: contains the private key
- `key-for-git.pub`: contains the public key

### Allow the developer to publish to the server

Login to the server and run this command:

```sh
sudo mkdir -p /home/git/.ssh
sudo nano /home/git/.ssh/authorized_keys
```

Go to the end of the editor contents and add a new line containing the previously generated public key.  

The public key is a single line that starts with `ssh-ed25519 ` (for Ed25519 keys) or `ssh-rsa ` (for RSA keys), followed by a quite long list of characters and ending with the developer name you specified in the comments during the creation of the key.

For improved security, it's better to prepend the public key with `no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty `.

So, the full line to be added to the `authorized_keys` will be something like

```
no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty ssh-...
```


## Create a new repository on the server

We'll end up with:

- Directory to be published by the web server (apache, nginx, whatever): `/var/www/{% raw %}{{ repositoryName }}{% endraw %}`
- Repository with the repository: `/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git`

First of all, we create the directory that will contain web site (it will be owned by the `{% raw %}{{ webUser }}{% endraw %}` user):

```sh
sudo mkdir -p '/var/www/{% raw %}{{ repositoryName }}{% endraw %}'
sudo chown -R '{% raw %}{{ webUser }}:{{ webUserGroup }}{% endraw %}' '/var/www/{% raw %}{{ repositoryName }}{% endraw %}'
sudo chmod u+rw -R '/var/www/{% raw %}{{ repositoryName }}{% endraw %}'
```

Then we create the directory that will contain the bare repository data:

```sh
sudo mkdir -p '/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git'
cd '/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git'
sudo git init --bare
sudo git config core.sharedRepository group
```

The `core.sharedRepository group` option of the git repository is needed in order to grant write access to both the `git` and `{% raw %}{{ webUser }}{% endraw %}` users (they both belong to the same user group - `{% raw %}{{ webUserGroup }}{% endraw %}`).


And now the key concept of this whole approach: when someone pushes to this repository, we checkout the repository to the publish folder and run some fancy stuff with our `git-post-receive-hook`:

```sh
cat <<'EOF' | sudo tee /var/git/{% raw %}{{ repositoryName }}{% endraw %}.git/hooks/post-receive >/dev/null
#!/bin/sh

/usr/local/bin/git-post-receive-hook \
    {% raw %}{{ hookOptions }}{% endraw %} \
    '/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git' \
    '/var/www/{% raw %}{{ repositoryName }}{% endraw %}'

EOF

sudo chown -R '{% raw %}git:{{ webUserGroup }}{% endraw %}' '/var/git/{% raw %}{{ repositoryName }}.git{% endraw %}'
sudo chmod -R ug+rwX '/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git'
sudo chmod -R ug+x '/var/git/{% raw %}{{ repositoryName }}{% endraw %}.git/hooks/post-receive'
```


## Push-to-publish

Everything is almost ready!

The only step required to deploy with a simple `git push` is to add the remote to your repository.

For instance, here's how to add a remote named `deploy` to your local repository:

```sh
git remote add deploy '{% raw %}git@{{ serverAddress }}:/var/git/{{ repositoryName }}.git{% endraw %}'
```

When you push to the `deploy` remote, the published directory willbe updated automatically.

Nice, isn't it?

Questions or suggestions? [Let's discuss about it!](https://github.com/mlocati/mlocati.github.io/discussions)

</div>

<script src="{{ "/js/vue.js?3.5.11" | prepend: site.baseurl }}"></script>
<script src="{{ "/js/deploy-with-git-push.js?2" | prepend: site.baseurl }}"></script>
