---
title:  "Junk"
---

### NodeJS

To have a working copy of concrete5, you'll need NodeJS, a great engine that allow running JavaScript files and do a lot of wonderful stuff.
[Download](https://nodejs.org/download/) and install it with the default options.
You'll then have mainly two new commands available: `node` (the core program that executes JavaScript scripts) and `npm` (a great tool to manage extra functions of node).

### Grunt
Once you installed NodeJS, you'll need `grunt`: it's great node utility that allows building stuff.
To install it simply open a command prompt and type:  
```
npm install -g grunt-cli
```


## Setting up concrete5

### Building the concrete5 JS and CSS assets

The concrete5 repository does not contain a working set of JavaScript and CSS files: you have to build them.
This is quite simple: open a command prompt and type the following commands
```
cd /D C:\Dev\Web\concrete5\5.7.git\build
npm install
grunt release
```
The `npm install` command downloads in a local folder the NodeJS libraries required to build the assets, and it must be run just once (or if the `build/package.json` file changes).
`grunt release` is the command that effectively builds the JavaScripts and the CSSs needed by concrete5.

### Installing the PHP libraries for concrete5

concrete5 needs some third party PHP libraries.
Before being able to install concrete5 locally, you have to install them: open a command prompt and type these commands:
```
cd /D C:\Dev\Web\concrete5\5.7.git\web\concrete
composer install
```
Composer will start downloading all the required libraries (it may take a while and it may require some user intervention - read what gets printed).
You'll have to call `composer install` every time that the file `web/concrete/composer.lock` changes.

At this point you have a fully working copy of concrete5: compliments!


## concrete5 via command line
Starting from version 5.7.5, concrete5 comes with a command line interface (_CLI_ for short).

It's entry point (ie the script to be called) is located in the `web\concrete\bin` directory, and in in our case is `C:\Dev\Web\concrete5\5.7.git\web\concrete\bin\concrete5.bat`.
Since I use it a lot, I don't want to specify its full path every time, so I added [this wrapper](https://github.com/mlocati/mlocati.github.io/blob/master/files/c5.cmd) to `C:\Dev\Util\bin`.

NOTE: This wrapper (`c5.cmd`) allows using [Inkscape](https://inkscape.org/) from within the concrete5 CLI by adding its installation directory to the `PATH` variable, so you may need to change it to specify if and where you installed Inkscape.

NOTE: Inkscape may be used by CLI commands to automatically generate package and block icons starting from svg files.

To see a list of all commands, you can type this in a command prompt:
```
c5 list
```

To list only the concret5 core commands:
```
c5 list c5
```

To get some help on a specific command (clear-cache for instance):
```
c5 c5:clear-cache --help
```

Some useful commands I use a lot:

- `c5 c5:clear-cache`  
  reset the concrete5 cache
- `c5 c5:package-translate`  
  to automatically build/update the translation files of my packages (it works even with 5.6.x packages!)
- `c5 c5:package-pack`  
  to perform many nice operations on my packages (it works even with 5.6.x packages!)

### Fresh install
I have a Windows batch file that performs the following operations to have a fresh new concrete5 installation with just one click:

- `c5 c5:reset --force`  
  to completely reset the concrete5 installation and re-start from scratch (use with care!)
- `c5 c5:install --db-server=localhost --db-username=root --db-password=<MySqlPassword> --db-database=<MySqlDatabaseName> --site=<NameOfConcrete5Site> --starting-point=elemental_full --admin-email=<YourEmailAddress> --admin-password=<AdminPassword>`  
  to install concrete5.  
  You can also use `elemental_blank` instead of `elemental_full` to not install the sample contents  
- `c5 c5:config -g set concrete.external.news_overlay false`  
  to disable the (quite annoying IMHO) news shown at first login
- `c5 c5:config -g set concrete.misc.help_overlay false`  
  to disable the introductive guide (I don't think I personally need to read it ;) )
- `c5 c5:config -g set concrete.debug.display_errors true`  
  to show PHP errors on web pages
- `c5 c5:config -g set concrete.debug.detail debug`  
  to show detailed PHP errors (it's a development environment after all)
- `c5 c5:config -g set concrete.i18n.choose_language_login true`  
  to allow choosing the user's preferred language at login (I'm Italian after all ;) )

