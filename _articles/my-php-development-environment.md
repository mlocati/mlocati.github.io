---
title:  "My PHP Development Environment"
description: PHP development environment with multiple PHP versions and step-by-step debugging.
date: 2016-06-22T17.51.46+02:00
---

* TOC
{:toc}

## Introduction

When I develop PHP projects, I need the following features:

- **code completion**  
  I don't want to remember the exact spelling of all those PHP functions,
  I don't want to remember all the methods of a class,
  I don't want to manually type every function name (it takes time and leads to typos),
  so I do really need a way to simply start typing something and having a list of functions and methods.
- **integrated documentation**  
  I don't want to remember the meaning and the order of every function parameters (was it `strpos($haystack, $needle)` or `strpos($needle, $haystack)`?),
  so I need an immediate way to see a short description of every function and its parameters.
- **step-by-step debug**  
  I don't want to place `var_dumps` to see the value of a variable at a certain point,
  I don't want to place hundreds of `echo` to see what's happening and what functions get executes:
  I just want to say:
  during the execution of PHP, I want to see at a certain point what's the value of the defined variables and follow the execution flow step-by-step
  (see [sample video](https://youtu.be/iyki8lzzwms)).
- **check my code with different versions of PHP**  
  This is a must if you write code for a wide range of different systems.

I know, someone will stick up their nose reading this, but yes, I develop my PHP projects under Windows.
By the way, since I have all the above wonderful stuff without any issue, well... who cares.

Windows 10 has just been released and I took the opportunity to buy a new SSD to replace my old magnetic HD and to perform a fresh install of everything,
including my development environment.

I'm keeping a log in this document to keep trace about what I do: maybe it could help someone else.

About setting up Apache, PHP and MySQL: I know, there are many good and ready-to-use WAMP systems out there,
but I prefer a manual setup of my PC from A to Z, in order to keep my finger on the pulse and to fine-tune everything.

It's not that hard, if you know what you are doing (of if someone explains you what you need ;) ).

So... let's go!



## Installation directory

In this document I assume that all the development described here stuff will be placed in the `C:\Dev` directory:
if you prefer use another path please replace it in every occurrence of this document and in the configuration files linked to this document.



## Some common-use utilities

### Generic utilities

I often use some command line utilities.
I place them in the `C:\Dev\Util\bin` directory and I [add that folder to the PATH variable](https://www.google.com/search?q=add+directory+to+path+environment+variable+in+windows) to be able to use them more easily.

Here's a list of some of the utilities that I place there:

- [junction](https://technet.microsoft.com/en-us/sysinternals/bb896768.aspx)  
  To create Unix-line symbolic links in Windows
- [gettext and iconv](http://mlocati.github.io/gettext-iconv-windows/)  
  To handle localization stuff
- [whereis](https://github.com/mlocati/mlocati.github.io/blob/master/files/whereis.cmd)  
  A script that I wrote starting from [here](http://www.scriptscoop.com/t/2e90c20d2949/how-do-i-find-the-location-of-an-executable-in-windows.html) to find the location of a tool in the current PATH  
  Example: `whereis junction` outputs `C:\Dev\Util\bin\junction.exe`

### Notepad++

In order to edit files, I use the great [Notepad++](https://notepad-plus-plus.org/).
It's very powerful, it handles very well line endings and code pages, and it comes with a very powerful set of plugins.

### WinMerge

In order to compare files, I use the great [WinMerge](http://winmerge.org).
It's quite old, but I haven't still found a valid alternative and it does its job without issues.
You'll find it very handy when it's integrated with git (see below), so install it right now.


### NodeJS

NodeJS is a great engine that allows running JavaScript files and do a lot of wonderful stuff.
[Download](https://nodejs.org/download/) and install it with the default options.
You'll then have mainly two new commands available:

- `node`: the core program that executes JavaScript scripts
- `npm`: a great tool that greatly extends NodeJS functionalities by managing packages. 

#### NodeJS global packages

I often use the following utilities implemented as NodeJS packages. 

- `jshint`  
  Writing long JavaScript files can be error proning.  
  JSHint is a really nice tool that helps you spot the most common ones.  
  To install it simply open a command prompt and type:  
  `npm install -g jshint`  
  In order to simplify its output and to add some comments,
  I wrote a [wrapper script](https://github.com/mlocati/mlocati.github.io/blob/master/files/jshint.cmd): save it to `C:\Dev\Util\bin`.
- `grunt`  
  Grunt is really handy when you need to automatically build stuff (for instance to convert LESS files to CSS).  
  It's used by a wide range of projects, so I always install it:
  `npm install -g grunt-cli`



## Bits: 32 or 64?

From past experience of mine, it's really better to use the same technology for Apache, PHP, the debugger and the IDE.
In particular I was having problems with the interaction between the debugger and the IDE (but since then things may have changed - I don't know).

Therefore, since the 64 bits version of PHP is still experimental and usually the 64 bits version of Windows programs aren't really faster that their 32 bits counterparts,
I've chosen the 32 bits version.

For MySQL I have chosen the 64 bits version instead.




## Visual C++ Redistributable

In order to run Apache and PHP, you may need the Visual C++ Redistributable packages.

To determine which version(s) of those redistributable packages, here's a fast hint:

- if the file name contains `vc14` you'll need the [Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145)
- if the file name contains `vc11` you'll need the [Visual C++ Redistributable for Visual Studio 2012](https://www.microsoft.com/en-us/download/details.aspx?id=30679)
- if the file name contains `vc9` you'll need the [Visual C++ Redistributable for Visual Studio 2008](https://www.microsoft.com/en-US/download/details.aspx?id=5582)

You have to download and launch the 32 or 64 bits version accordingly to the specific versions of PHP that you plan to install (32 bits in my case).



## Installing PHP

### PHP Versions

I personally prefer to check all my code in multiple versions of PHP.

So, go to the [PHP download page for Windows](http://windows.php.net/download) and download the versions you want to use
(discontinued releases can be found [here](http://windows.php.net/downloads/releases/archives/),
release candidate versions are available [here](http://windows.php.net/qa/)).

There you'll find *non thread safe* and *thread safe* versions: from a research I did some time ago, it's preferable to download the *thread safe* versions since we'll use Apache.

So, download all the **x86 Thread Safe** *zip* versions you want and extract them in their own folders into `C:\Dev`.

At time of writing this, I ended up having these folders:

- `C:\Dev\php-7.0.7-Win32-VC14-x86` ⇒ rename to `C:\Dev\PHP7.0`
- `C:\Dev\php-5.6.22-Win32-VC11-x86` ⇒ rename to `C:\Dev\PHP5.6`
- `C:\Dev\php-5.5.36-Win32-VC11-x86` ⇒ rename to `C:\Dev\PHP5.5`
- `C:\Dev\php-5.4.44-Win32-VC9-x86` ⇒ rename to `C:\Dev\PHP5.4`
- `C:\Dev\php-5.3.29-Win32-VC9-x86` ⇒ rename to `C:\Dev\PHP5.3`

### xdebug

You'll then need to download the debugger: I've always used **xdebug** and it's really great.

[Download](http://xdebug.org/download.php) the *TS (32 bit)* DLLs (TS is for *thread safe*), choosing the VC version that correspond to the PHP versions you downloaded.

Place each `php_xdebug-....dll` file in the `etc` folder of the corresponding PHP version.

At time of writing this, I ended up having these files:

- `C:\Dev\PHP7.0\ext\php_xdebug-2.4.0-7.0-vc14.dll`
- `C:\Dev\PHP5.6\ext\php_xdebug-2.4.0-5.6-vc11.dll`
- `C:\Dev\PHP5.5\ext\php_xdebug-2.4.0-5.5-vc11.dll`
- `C:\Dev\PHP5.4\ext\php_xdebug-2.4.0-5.4-vc9.dll`
- `C:\Dev\PHP5.3\ext\php_xdebug-2.2.7-5.3-vc9.dll`

### SSL

One more thing you'll need before correctly running PHP websites and scripts that use cURL to fetch remote data from HTTPS websites.

The Windows versions of PHP don't contain the latest version of the SSL certificates,
so the remote calls to HTTPS-secured sites may fail with the error `SSL certificate problem: unable to get local issuer certificate`.  

In order to fix this, you have to download the `cacert.pem` file [from the cURL website](http://curl.haxx.se/docs/caextract.html) and save this file as `C:\Dev\Util\SSL\cacert.pem`

### Configuration

We then need to configure every PHP version.

Take [this php.ini file](https://github.com/mlocati/mlocati.github.io/blob/master/files/php.ini) and save a copy of it in every PHP folder
(**NOTE**: disable the mysql module for PHP 7.x).

You'll then need to configure these `php.ini` files manually: read the first lines of the `php.ini` file for more details.

### Switching PHP version

Now it's time to choose a PHP version you want to work with.

Let's assume you want PHP 5.5: simply open a command prompt and type:

```
junction C:\Dev\PHP C:\Dev\PHP5.5
```

The above command will create a *junction*: `C:\Dev\PHP` will be an *alias* of `C:\Dev\PHP5.5`.

In order to easily use PHP from other scripts and console windows, I add the `C:\Dev\PHP` directory [to the PATH variable](https://www.google.com/search?q=add+directory+to+path+environment+variable+in+windows).

So, if you now open a command prompt and type

```
php --version
```

You'll see something like:

```
PHP 5.5.36 (cli) (built: May 25 2016 13:48:54)
Copyright (c) 1997-2015 The PHP Group
Zend Engine v2.5.0, Copyright (c) 1998-2015 Zend Technologies
    with Xdebug v2.4.0, Copyright (c) 2002-2016, by Derick Rethans
```

In order to change the current PHP version, simply do the following:

```
junction -d C:\Dev\PHP
junction C:\Dev\PHP C:\Dev\PHP5.6
```

Doing that, `C:\Dev\PHP` will now be an alias of PHP 5.6...

Nice, isn't it?

In order to simplify switching the current PHP version (ie the folder that's aliased as `C:\Dev\PHP`),
I wrote a [batch file](https://github.com/mlocati/mlocati.github.io/blob/master/files/switchphp.cmd): download and save it to the `C:\Dev\Util\bin` folder.

Then, simply create a shortcut to it where you like, edit its properties and add the version as a parameter to that script:
example: `C:\Dev\Util\bin\switchphp.cmd 5.6`


## PHP utilities

Now that we have installed PHP, it's time to add some very useful PHP-based tools.

### Composer

[Composer](https://getcomposer.org/) is a fantastic and powerful tool to handle PHP packages.

You can download and install it in a folder in your path (`C:\Dev\Util\bin` in my case) with the following commands that you'll have to type in a command prompt:

```
cd /D C:\Dev\Util\bin
php -r "readfile('https://getcomposer.org/installer');" | php
echo @php ^"^%~dp0composer.phar^" %* >composer.cmd
```

From time to time, you may want to update it - simply type this line in a command prompt:

```
composer self-update
```

### php-cs-fixer

Adopting a common coding style is really important, and the great [php-cs-fixer](http://cs.sensiolabs.org) can give you a precious hand with that. 

You can download and install it in a folder in your path (`C:\Dev\Util\bin` in my case) with the following commands that you'll have to type in a command prompt:

```
cd /D C:\Dev\Util\bin
php -r "readfile('http://get.sensiolabs.org/php-cs-fixer.phar');" > php-cs-fixer.phar
echo @php ^"^%~dp0php-cs-fixer.phar^" %* >php-cs-fixer.cmd
```

From time to time, you may want to update it - simply type this line in a command prompt:

```
php-cs-fixer self-update
```

### PHPUnit

In order to run test suites you'll often need PHPUnit.  
At the time of writing this, there are two main versions of PHPUnit: version 5 and version 4. Because the first don't support PHP 5.5-, and I have some projects that run on old PHP versions,
I usually use version 4.

Here's how to download and install it:

```
cd /D C:\Dev\Util\bin
php -r "readfile('https://phar.phpunit.de/phpunit-old.phar');" > phpunit.phar
echo @php ^"^%~dp0phpunit.phar^" %* >phpunit.cmd
```


## Git

Coming from other systems, it took me a while to understand git. But now I couldn't live without it.

The first thing to do is installing git for Windows: you can find it [here](https://git-for-windows.github.io/) (NOTE: _git for Windows_ replaced the good old _MSys Git_).

When installing git, these are the options I use:

- in the `Select components` window I deselect any option except `Associate .sh files to be run with Bash`
- in the `PATH environment` window I choose to `Use Git from the Windows Command prompt`
- in the `SSH executable` window I choose to `Use OpenSSH`
- in the `line ending conversions` window I choose to `Checkout as is, commit as is` since I really hate such automatic conversions - but you'll have to take care of the line endings of the text files you'll work with (more on this below)
- in the `terminal emulator` window I choose to `Use Windows' default console window` since Windows 10 greatly improved it and I'm really fine with it.

### TortoiseGit

To fully understand git you may want to read the [git documentation](https://git-scm.com/book/en/v2).  
By the way, a good GUI tool may save you hours of study and make your work faster.  
I always use [TortoiseGit](https://tortoisegit.org/download/), installing it with the default options.

#### Configure TortoiseGit

Simply right click on any folder (the desktop will work too), and choose `TortoiseGit` ⇒ `Settings`.

For the kind of workflow I adopted, I use these settings:

- in the `General` ⇒ `Context Menu` tab I choose these items:
  - `Clone...`
  - `Fetch...`
  - `Push...`
  - `Commit...`
  - `Show log`
  - `Switch/Checkout...`
  - `Create repository here...`
- In the `General` ⇒ `Alternative editor` tab I specify the full path to the Notepad++ executable.
- In the `Git` tab I usually:
  - specify the default values in the `global` configuration for `Name` and `Email`
  - disable the `AutoCrLf` option
  - click the `Edit global .gitconfig` file and add these values to that file:

    ```
    [core]
        fileMode = false
    [core]
        autocrlf = input
        ignorecase = false
        excludesfile = C:\\Dev\\Util\\global-gitignore.txt
    ```

    The `global-gitignore` contains a list of files and directories that should be ignored in every project. [Here's](https://github.com/mlocati/mlocati.github.io/blob/master/files/global-gitignore.txt) the contents of this file.
- In the `Diff Viewer` tab, in the `Configure the program used for comparing different revisions of files` I specify that I'd like to use the previously installed WinMerge, so I choose `External` and write in the text field `"C:\Program Files (x86)\WinMerge\WinMergeU.exe" /e /x /u /wl /maximize /dl %bname /dr %yname %base %mine`.
- In the `Diff Viewer` ⇒ `Merge Tool` tab, I again choose `External` and write in the text field `"C:\Program Files (x86)\WinMerge\WinMergeU.exe" /e /u %merged`



## GitHub

I use a lot GitHub: it hosts some of my open source projects, and I often use it to contributo to other projects.

In order o work with it, you need an account: [go create it](https://github.com/join) if you didn't already do it.

Once you have a GitHub account, you need to create the so-called private/public key pair:

- open up `PuTTYgen` (it should have been installed with TortoiseGit)
- click on the `Generate` button and move randomly your mouse over the PuTTYGen window until the progress bar reaches the 100%
- change the `Key comment` field to something more descriptive, like `Key for GitHub`
- In the `Key passphrase` field (and the same for `Confirm passphrase`) you can specify a password to protect the files you're going to create. It does not have to be the same password that you use for GitHub
- click on `Save private key` and save a `.ppk` file in a secure position; you should never give to anybody this file
- copy the text in the `Public key for pasting into OpenSSH authorized_keys file` into the clipboard
- go to back to [GitHub](https://github.com/), be sure to be logged in, click on your account image on the top-right area of the browser and choose `Settings`.  
  Go to the `SSH keys` page and click on `Add SSH key`.  
  Give a title of your choice and paste into the `Key` field the text you copied above.

Please remark that you can re-create the public key from a private key you created before (the `.ppk` file): simply launch PuTTYgen and load that ppk file.



### Contributing to 3rd party projects

Ok, now your system is almost ready to work with git and GitHub.  
Let's assume you want to contribute to a project hosted there, for instance concrete5.

To work with the concrete5 repository you first have to fork it: go to the [concrete5 repository page](https://github.com/concrete5/concrete5) and hit on the `Fork` button on the top-right area of the window.

Doing so, you'll end with your own copy of concrete5 in GitHub (in my case it's located at [github.com/mlocati/concrete5](https://github.com/mlocati/concrete5)).

Remaining in _your_ copy of the repository, locate the green button labeled `Clone or download`.
If the URL shown in the textbox starts with `https://`, hit the link `Use SSH`.
Finally hit the the _Copy to clipboard_ button (or manually copy the text in the textbox).

Now you have to choose where you want to save your repository in your local PC.
I usually place all my websites under `C:\Dev\Web`: browse to that folder, right-click inside it and choose `Git Clone...`.

TortoiseGit should already suggest you to the `URL` you copied before (something like `git@github.com:.../concrete5.git`).

I customize the `Directory` field by specifying `C:\Dev\Web\concrete5\concrete5.git`
(the final `.git` is only to remember myself it's a directory containing the git version of concrete5, it's not mandatory).

In the `Load Putty Key` field you need to specify the full path of the `.ppk` file you created before with PuTTYgen.

Hit `Ok`: you'll be prompted for the password of your `.ppk` file.
This step have to be done every time you reboot your PC (or if you manually close `Pageant` - the utility that holds in memory your private keys - you'll find it in your tray bar).

The first time you connect to GitHub with git, you'll be asked if you trust GitHub: you have to hit `Yes`.

The cloning process will then start, and it may take a few minutes:
git is retrieving the whole concrete5 repository and all the changes made to the code since it was initially imported in git (it was August 2008).

You'll end up with a local clone of the remote clone of the repository (by default it's named `origin`).
In order to update your local clone, you may want to add another remote that points to the original repository.
In order to do so, right click on the folder containing the repository, choose `Git Fetch...` and click on the `Manage Remotes` link in the dialog that will open.
You can add a new remote with these parameters:

- Remote: `upstream`
- URL: `https://github.com/concrete5/concrete5.git`
- Tags: `All`
- [ ] Push default
- [x] Prune

You may want also to update the first `origin` remote: select it and :

- Tags: `None`
- [x] Push default
- [x] Prune

Every time you work on a new pull request, create a new branch, add commits to it and push it to your `origin` remote.  
When you need to update your clone with the new changes in the `upstream` remote, checkout the default remote branch (it's `develop` for concrete5, but usually it's `master`), fetch the `upstream` remote selecting the `Launch Rebase After Fetch`.  
Once you fast-forwarded your local branch, you can optionally push it to your `origin` remote, so that your remote clone is kept in sync with the `upstream` one.



## Installing Apache

In order to work with web sites (like the concrete5 project mentioned [above](#contributing-to-3rd-party-projects)), you'll need a web server.
Apache is the most adopted one, so I've chosen it (not a great criterion, but who cares).

On the [PHP for Windows download page](http://windows.php.net/download/), they suggest to use the binary distribution of Apache compiled by Apache Lounge.

So, download the 32 bit of Apache from [Apache Lounge](http://www.apachelounge.com/download/) (`httpd-2.4.20-win32-VC14.zip` at the time of writing this).

Extract the downloaded archive into `C:\Dev\Apache`.

You then have to configure Apache. [Here's](https://github.com/mlocati/mlocati.github.io/blob/master/files/Apache.conf) the configuration file I use
(if you use a different installation directory you'll have to update this file): save it as `C:\Dev\Apache\Apache.conf`.

Then save [this file](https://github.com/mlocati/mlocati.github.io/blob/master/files/ApachePHP5.x.conf) as `Apache.conf` to all the `C:\Dev\PHP5.*` directories
and [this file](https://github.com/mlocati/mlocati.github.io/blob/master/files/ApachePHP7.x.conf) as `Apache.conf` to all the `C:\Dev\PHP7.*` directories.

Finally, I use Apache as a Windows service.
In order to install the service, simply open a command prompt with administrative right (fast way: `WinKey`+`X` ⇒ `Command Prompt (Admin)`) and type:

```
C:\Dev\Apache\bin\httpd.exe -k install -n Apache -f C:\Dev\Apache\Apache.conf
```

By running that command line, you'll install Apache as a Windows service called `Apache`.

By the way, you'll see an error message: Apache is installed but can't be started.  
That's because we still haven't configured any web site.

Let's assume that you want a local [concrete5](https://www.concrete5.org/) web site.
To define a new local website you need to create a `.conf` file in the `C:\Dev\Apache\vhosts` directory.

For instance, here's the content of my `C:\Dev\Apache\vhosts\concrete5.git.conf` file that defines a new website available as http://localhost:10000 that publish the directory located at `C:\Dev\Web\concrete5\concrete5.git`:

```
Listen 10000

<VirtualHost *:10000>
    ServerAdmin mlocati@gmail.com
    DocumentRoot "C:\Dev\Web\concrete5\concrete5.git"
</VirtualHost>
<Directory "C:\Dev\Web\concrete5\concrete5.git">
    Options +FollowSymLinks -SymLinksIfOwnerMatch
    Allow from all
    Order allow,deny
    AllowOverride All
</Directory>
```


## Installing MySQL

I do really like the [MSI Installer of MySQL](http://dev.mysql.com/downloads/mysql/).

I usually do a custom installation, installing only the 64-bit version of MySQL Server, the client programs and the server data files.

For the install directory I usually use `C:\Dev\MySQL`, and for the data directory I use `C:\Dev\MySQL\data`.

For the configuration type I've chosen `Server Machine`, since it uses more memory and perform less disk operations (that could degrade my brand new SSD).

When I have to work directly with the database, I use the great [HeidiSQL](http://www.heidisql.com/).

Before working with MySQL, I always add this line under the `[mysqld]` section in the `C:\Dev\MySQL\data\my.ini` configuration file:

```
lower_case_table_names=2
```

The above option will allow preserving the case of the table names (otherwise they'll be always lower-case).

Another option I usually set to reduce disk usage (it's not safe, but that's fine for development machines):

```
innodb_flush_log_at_trx_commit=0
```

To speed-up accessing metadata a lot, you can add this option:

```
innodb_stats_on_metadata=OFF
```

One more option you may need from time to time is:

```
skip-grant-tables
```
This option will allow accessing the database with full rights with any username and password, so use it carefully.


## Controlling MySQL and Apache

Since I use my development machine for other purposes too, I don't need that Apache and MySQL always start when I boot up my PC.

So, I set those services to `Start manually` in the Windows Services control panel (hit `WinKey`+`R`, enter `services.msc` and hit `return` then change the properties in the two services, `Apache` and `MySQL`).

To start/stop/restart my services I wrote a little utility that you can find [here](https://github.com/mlocati/ServicesControl).


## Eclipse

Eclipse is a great (and free) multi-purpose IDE.

In the past it used to be really slow, but recently it's very stable and faster and it offers many handy functions, so if you already tried it in the past it's worth to give it a second chance.

In order to launch Eclipse you need Java installed in your PC (JRE version 7 or 8 at the time of writing this).

If you don't have it, go [download](https://www.java.com/download/) and install it.


### Installing Eclipse

As you may have realized, I do really prefer to start from scratch in my development environment.

The same applies to Eclipse: there's already an Eclipse distribution targeted to PHP developers, but it comes with many extra features I never used.

So, let's start downloading the _naked_ version of Eclipse, that is an Eclipse without any plugin.

It's called *Platform Runtime Binary* and to find it you have to go to the [Eclipse download page](http://www.eclipse.org/downloads/), click on [Other builds](http://download.eclipse.org/eclipse/) on the right side of that page, choose the first build under the *Latest Downloads* (at the moment it's [4.6 - Eclipse Neon](http://download.eclipse.org/eclipse/downloads/drops4/R-4.6-201606061100/)), look for *Platform Runtime Binary* and download the 32 bits build for Windows (remember: experience taught me that Apache, PHP, xdebug and Eclipse must all be the same version - 32 bits in my case).

Extract the downloaded archive into `C:\Dev\Eclipse`(you may want to add Eclipse to your Start Menu - simply add a shortcut to `eclipse.exe` in the Start Menu folder located at `%APPDATA%\Microsoft\Windows\Start Menu\Programs`).

The first time you launch Eclipse, you'll be asked the location of the so-called *Workspace*.

An Eclipse workspace is a sort of container for all the projects you'll be working on. I usually have only one workspace (located at `C:\Dev\Eclipse\workspace`), so I choose to `Use this as the default and do not ask again`.


### PHP Development Tools (PDT)

PDT is a great plugin for Eclipse. Many brave guys are making it better and better every day, so I always install the latest development version. From time to time it may have problems, but it's really offering more and more features. Obviously there's a bit of risk doing so (but I've never had any big problems for years): the choice is up to you.

So, here's how you can install either the development version or the official one.

- __Development version installation__  
  To install the development version of PDT you have to tell Eclipse where to find it.  
  Open Eclipse, in the `Window` menu choose `Preferences`.  
  In the left tab of the Preferences window, go to `Install/Update` ⇒ `Available Software Sites`.  
  Then add these two new sites:

  - Name: `PDT Nightly` (or whatever you want)  
    Location: `http://download.eclipse.org/tools/pdt/updates/latest-nightly/`
  - Name: `DLTK Nightly` (PDT Nightly requires this)  
    Location: `http://download.eclipse.org/technology/dltk/updates-dev/latest-nightly/`

  Once you set these two new sites, you can install PDT in the same way of the official installation (see below).

- __Official version installation__  
  Open Eclipse, in the `Help` menu choose `Install New Software...`.  
  In the window that will open, choose `--All Available Sites--` in the `Work with` field and enter `PDT` in the `type filter text` field.  
  Check the `PHP Development Tools (PDT)` package and proceed with the installation.

### Other Eclipse plugins

- `Ansi Console`  
  To add color support in the console integrated in Eclipse
  - Software site location: `http://www.mihai-nita.net/eclipse`
  - Disable `Group items by category` in the Install window to view this plugin
- `Markdown Editor`  
  To add support for editing markdown files
  - Software site location: `http://www.nodeclipse.org/updates/markdown/`

### Configuring Eclipse and PDT

Once you installed PDT, you can switch to the so-called PHP-perspective: under the `Window` menu choose `Perspective` ⇒ `Open Perspective` ⇒ `Other` and choose the `PHP` perspective.

Here's the few options I always apply to Eclipse.

You can find the Eclipse preferences under the `Window` menu ⇒ `Preferences`.

- under `General` ⇒ `Web Browser`
  - I choose to `use external web browser`
  - I add the browsers that I use by pressing the `New...` button (please remark that using `Default system web browser` is not working for me with Windows 10 build 1511)
- under `General` ⇒ `Workspace`
  - in the `Text file encoding` choose `Other` ⇒ `UTF-8`
  - in the `New text file line delimiter` choose `Other` ⇒ `Unix`
- under `JavaScript` ⇒ `Code Style` ⇒ `Formatter`  
  to use the Airbnb coding style (like concrete5 requires for instance), simply hit on `Import...` and load [this xml file](https://github.com/mlocati/mlocati.github.io/blob/master/files/Airbnb.xml)
- under `JSON` ⇒ `JSON Files`  
  - in the `Encoding` menu choose `ISO 10646/Unicode (UTF-8)` 
- under `PHP` ⇒ `Code Style` ⇒ `Formatter`  
  you usually want to use the `PSR-2 [builtin]` rules 
- under `PHP` ⇒ `PHP Executables`  
  add all the PHP versions you have setup (see the `Installing PHP` section [above](#installing-php));  
  I name the executables with the version name (for example: `PHP 5.5`)
- under `PHP` ⇒ `PHP Executables` ⇒ `Execution Environments`  
  you have to associate the executables to corresponding PHP versions
- under `PHP` ⇒ `Servers`  
  you have to define all the web sites you defined in Apache.  
  For instance, in the sample `concrete5.git.conf` I described [above](#installing-apache), you'll have to:
  - give a name to the server: I use the same name as the `.conf` file, so I have  
  `concrete5.git`
  - in the base URL you have to specify the port defined in the `.conf` file, so I have  
  `http://localhost:10000`
  - in the document root specify the full path of the web folder:  
  `C:\Dev\Web\concrete5\concrete5.git`
  - Hit `Next` and choose `XDebug` as the debugger
- under `Run/Debug` ⇒ `Launching`  
  to allow faster debug sessions:
  - `Wait for ongoing build to complete before launching` ⇒ Never
  - `General options`/`Build (if required) before launching` ⇒ unchecked


### Coding with Eclipse

Let's assume you want to work with a local concrete5 instance (but the same applies for any PHP project).  
You'll have to:


#### Create a new project

Select the `File` menu ⇒ `New` ⇒ `PHP Project`

- Give a name to your project (I use `concrete5.git` for concrete5)
- Select `Create project at existing location (from existing source)` and specify the root directory of our concrete5 copy (for instance `C:\Dev\Web\concrete5\concrete5.git`)

All the other options are, well, optional...


#### Configure the PHP project

In the `PHP Explorer` panel, right-click on the project name (`concrete5.git` in my case) and choose `Properties`.

- under `PHP` ⇒ `Debug`:
  - select to `Enable project specific settings`
  - select the `PHP Server` defined [above](#configuring-eclipse-and-pdt) (`concrete5.git` in my case)
  - in the `Base Path` field enter just a `/`

Now it's time to see the full power of your new development system!


#### Step-by-step debugging

Locate the ![Debug]({{ site.baseurl }}/images/icon-toolbar_debug.png) icon in the toolbar and click on the down arrow on the right of it, then choose `Debug Configurations...`.

We're going to debug a web site, so right-click on `PHP Web Application` and choose `New`:

- in the `Server` tab:
  - in the `Name` field enter: `concrete5.git - Home` (or anything you want)
  - in the `PHP Server` field select `concrete5.git`
  - in the `File` field: hit `Browse` and choose the `index.php` file
  - uncheck the `Auto Generate` checkbox and empty the suggested URL
- in the `Debugger` tab:
  - you may want to uncheck `Break at First Line` in future: take note it's there
- in the `Common` tab:
  - select to save as `Shared file` and browse to the `.settings` directory (this is not mandatory but is really handy when working with multiple projects)
  - check both the `Debug` and `Run` checkboxes in the `Display in favorites menu`
  - since we're debugging a website, I'd uncheck the `Allocate console (necessary for input)` (you may want to check it when you'll debug PHP scripts that are not part of a web site)

Hit the `Apply` then the `Close` buttons.

Now, if you want to simply start the website, click on the down arrow on the right of the ![Run]({{ site.baseurl }}/images/icon-toolbar_run.png) icon in the toolbar
and choose `1. concrete5.git - Home`.

If you want to start a debugging session, hit the down arrow on the right of the ![Debug]({{ site.baseurl }}/images/icon-toolbar_debug.png) icon in the toolbar
and click on `1. concrete5.git - Home`.

Eclipse will ask you if you want to switch to the so-called `Debug` perspective: check the `Remember my decision` checkbox and hit `Yes`.

In the debug perspective you are now able to view all the defined variables and to follow the execution flow by running the code line-by-line: great, isn't it?

You may want to take a look at the `Eclipse keyboard shortcuts` section below to see how to control the execution flow.


### Integrating PHP-CS-Fixer

It's handy to be able to reformat the PHP files accordingly to a prefixed set of coding style rules.
To integrate `PHP-CS-Fixer` in Eclipse simply:

- locate the ![External Tools]({{ site.baseurl }}/images/icon-toolbar_externaltools.png) icon in the toolbar and click on then down arrow on the right of it
- choose `External Tools Configurations...`
- right-click on `Program` in the left area and choose `New`
- in the right area:
  - `Name`: enter what you want (I use `php-cs-fixer`)
  - `Main` tab:
    - `Location`: `C:\Dev\Util\bin\php-cs-fixer.cmd`
    - `Arguments`: `--config-file="${project_loc}\.php_cs" fix ${selected_resource_loc}`
  - `Build` tab:
    - uncheck `Build before launch`
  - `Common` tab:
    - `Display in favorites menu`: check `External Tools`

Once you're done with the above steps, you can format a PHP file (or a whole directory), simply by opening the file in the editor (or selecting it in the `PHP Explorer` pane) and running this external tool
(by clicking the ![External Tools]({{ site.baseurl }}/images/icon-toolbar_externaltools.png) icon in the toolbar).

### Integrating JSHint

You can integrate JSHint in Eclipse in order to check the JavaScript files:

- locate the ![External Tools]({{ site.baseurl }}/images/icon-toolbar_externaltools.png) icon in the toolbar and click on then down arrow on the right of it
- choose `External Tools Configurations...`
- right-click on `Program` in the left area and choose `New`
- In the right area:
  - `Name`: enter what you want (I use `JSHint`)
  - `Main` tab:
    - `Location`: `C:\Dev\Util\bin\jshint.bat`
    - `Arguments`: `"${selected_resource_loc}"`
  - `Build` tab:
    - uncheck `Build before launch`
  - `Common` tab:
    - `Save as`: since I use JSHint in many projects, I leave checked the `Local file` option.
    - `Display in favorites menu`: check `External Tools`

Once you're done with the above steps, you can check a JavaScript file simply by opening the file in the editor and running this external tool (by clicking the ![External Tools]({{ site.baseurl }}/images/icon-toolbar_externaltools.png) icon in the toolbar).

In order to have a better analysis, your JavaScript should start with these comments:

```javascript
/* jshint unused:vars, undef:true */
```
If you use jQuery and/or browser-specific options, you can add `, jquery:true` and/or `, browser:true` to the above options ([see here](http://jshint.com/docs/options/#environments) for a more complete option list).

If you use some JavaScript objects that are defined in other JavaScripts, you can add also this comment:

```javascript
/* global Name1_of_an_object_defined_elsewhere, another_object, yet_another_one */
```

If you define a JavaScript object that is only used in other scripts, you can add this comment too:

```javascript
/* exported Object_defined_in_this_script_but_used_elsewhere */
```

Just a side note: using the [`strict mode`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode) may save your life in many situations.


### Eclipse keyboard shortcuts

All the Eclipse keyboard shortcuts can be found in the `Preferences` window under `General` ⇒ `Keys`.

By the way, here you can find the most useful ones (or at least those that I use most):


- **Help**
  - `Shift`+`F2` when the current cursor position is in the middle of a built-in PHP function or class method: open the PHP manual for that function
  - `Ctrl`+`Left Click` on a variable/function/method: jump to its definition
- **Search**
  - `Ctrl`+`F`: open the search-in-current-file dialog
  - `Ctrl`+`K` (after having defined a search with `Ctrl`+`F`): search next
  - `Ctrl`+`Shift`+`K` (after having defined a search with `Ctrl`+`F`): search previous
  - `Ctrl`+`H`: open the search-in-multiple-files dialog
- **Debug**
  - `Ctrl`+`Shift`+`B`: add or remove a breakpoint
  - `F6` (while debugging): run next line of code (_step over_)
  - `F5` (while debugging): run next line of code (entering user defined functions - ie _step into_)
  - `F7` (while debugging): run the current function until it ends
  - `F8` (while debugging): run until the end of the script (or until the next breakpoint)
  - `Ctrl`+`F2`: stop the debugging session
- **Miscellaneous**
  - `Ctrl`+`Space`: force the auto-completion context menu to appear
  - `Alt`+`Shift`+`W` then `X`: locate the currently selected file or directory in Windows Explorer
