---
title:  "concrete5 with Apache and NGINX on Ubuntu 18.04"
description: How to install and configure NGINX (as reverse proxy) and Apache to be used to run a concrete5 website.
date: 2018-07-04T17:12:00+02:00
---

* TOC
{:toc}

## Introduction

NGINX is great at serving static files, it uses less resources than Apache.  
On the other hand, Apache offers more features.

It is possible to have both running, so that NGINX serves static files (technically as a *reverse proxy*) and Apache execute PHP scripts.

NGINX will be the publicly visible webserver, whereas Apache will only be visible by NGINX at the port <input type="number" step="1" min="1" max="65535" id="canu-proxyport" value="8080" />.

In this document I describe how to setup such environment on Ubuntu 18.04, including all the required steps to have a running concrete5 8.3+ installation avalable at <code>/var/www/<input type="text" id="canu-sitename" value="example.com" />/<input type="text" id="canu-webfolder" value="public" /></code>.


## Preparation

First of all, let's update all the Ubuntu packages:

```bash
sudo apt update
sudo apt upgrade -y
```


## Installing NGINX

Installing NGINX is as easy as running

```bash
sudo apt install -y nginx
```

Next we remove the configuration of the default NGINX website:

```bash
sudo rm /etc/nginx/sites-enabled/default
```

### Adding the site to NGINX

Then we create the NGINX configuration for the <i class="canu-sitename"></i> website typing this command:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code>sudo nano /etc/nginx/sites-available/<span class="canu-sitename"></span></code></pre>
</div>

And here's the content of this new file:

<div class="language-nginx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="k">server</span> <span class="p">{</span>
    <span class="kn">listen</span> <span class="mi">80</span><span class="p">;</span>
    <span class="kn">root</span> <span class="n">/var/www/<span class="canu-sitename"></span>/<span class="canu-webfolder"></span>/</span><span class="p">;</span>
    <span class="kn">index</span> <span class="s">index.php</span> <span class="s">index.html</span> <span class="s">index.htm</span><span class="p">;</span>
    <span class="kn">server_name</span>
        <span class="s">www.<span class="canu-sitename"></span></span>
        <span class="s"><span class="canu-sitename"></span></span>
    <span class="p">;</span>
    <span class="kn">location</span> <span class="p">~</span> <span class="sr">/\.ht</span> <span class="p">{</span>
        <span class="kn">deny</span> <span class="s">all</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="kn">location</span> <span class="n">/</span> <span class="p">{</span>
        <span class="kn">try_files</span> <span class="nv">$uri</span> <span class="nv">$uri</span><span class="n">/</span> <span class="n">/index.php?</span><span class="nv">$query_string</span><span class="p">;</span>
    <span class="p">}</span>
    <span class="kn">location</span> <span class="p">~</span> <span class="sr">\.php$</span> <span class="p">{</span>
        <span class="kn">proxy_set_header</span> <span class="s">X-Real-IP</span> <span class="nv">$remote_addr</span><span class="p">;</span>
        <span class="kn">proxy_set_header</span> <span class="s">X-Forwarded-For</span> <span class="nv">$remote_addr</span><span class="p">;</span>
        <span class="kn">proxy_set_header</span> <span class="s">Host</span> <span class="nv">$host</span><span class="p">;</span>
        <span class="kn">proxy_pass</span> <span class="s">http://127.0.0.1:<span class="canu-proxyport"></span></span><span class="nv">$request_uri</span><span class="p">;</span>
        <span class="kn">proxy_read_timeout</span> <span class="mi">600</span><span class="p">;</span>
    <span class="p">}</span>
<span class="p">}</span>
</code></pre></div></div>

Next we enable this NGINX site:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code>sudo ln -s /etc/nginx/sites-available/<span class="canu-sitename"></span> /etc/nginx/sites-enabled/<span class="canu-sitename"></span></code></pre>
</div>


## Installing Apache

Installing Apache is as easy as running

```bash
sudo apt install -y apache2
```

During the installation you may see an error stating that apache can't be started: ignore it (it's because Apache tries to start using port 80, which is already taken by NGINX).

Let's disable the default Apache website:

```bash
sudo a2dissite 000-default
```

In order to have pretty URLs in concrete5, we need to enable the <code>rewrite</code> Apache module:

```bash
sudo a2enmod rewrite
```

Next we have to prevent Apache from listening on port 80:

```bash
sudo nano /etc/apache2/ports.conf
```

and __comment all the lines__.


### Adding the site to Apache

To create the Apache configuration for the <i class="canu-sitename"></i> website, type this command:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code>sudo nano /etc/apache2/sites-available/<span class="canu-sitename"></span>.conf</code></pre>
</div>

And use this content for this new file:

<div class="language-apache highlighter-rouge"><pre class="highlight"><code><span class="nc">Listen</span> 127.0.0.1:<span class="canu-proxyport"></span>
<span class="p">&lt;</span><span class="nl">VirtualHost</span><span class="sr"> 127.0.0.1:<span class="canu-proxyport"></span></span><span class="p">&gt;
</span>	<span class="nc">ServerAdmin</span> webmaster@localhost
	<span class="nc">DocumentRoot</span> /var/www/<span class="canu-sitename"></span>/<span class="canu-webfolder"></span>
	<span class="nc">ErrorLog</span> ${APACHE_LOG_DIR}/<span class="canu-sitename"></span>.error.log
	<span class="nc">CustomLog</span> ${APACHE_LOG_DIR}/<span class="canu-sitename"></span>.access.log combined
<span class="p">&lt;/</span><span class="nl">VirtualHost</span><span class="p">&gt;
&lt;</span><span class="nl">Directory</span><span class="sr"> "/var/www/<span class="canu-sitename"></span>/<span class="canu-webfolder"></span>"</span><span class="p">&gt;
</span>        <span class="nc">Options</span> +FollowSymLinks -SymLinksIfOwnerMatch
        <span class="nc">AllowOverride</span> <span class="ss">All</span>
<span class="p">&lt;/</span><span class="nl">Directory</span><span class="p">&gt;
</span></code></pre></div>

Finally we enable this new Apache site:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code><span class="nb">sudo </span>a2ensite <span class="canu-sitename"></span></code></pre>
</div>

## Installing PHP

concrete5 requires PHP and a few PHP extensions. To install them type this command:

```php
sudo apt install -y php libapache2-mod-php php-bz2 php-curl php-gd php-intl php-json php-mbstring php-mysql php-opcache php-xml php-zip
```

## Activating the configuration

To instruct NGINX and Apache to reload their configuration, simply type these two commands:

```bash
sudo service apache2 restart
sudo service nginx restart
```

## Configuring concrete5

You have to tell concrete5 that it's behind a proxy. This can be easily done by typing this command:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code><span class="nb">sudo </span>nano /var/www/<span class="canu-sitename"></span>/<span class="canu-webfolder"></span>/application/config/concrete.php</code></pre>
</div>

and setting the content if this new file to:

```php
<?php

return [
    'security' => [
        'trusted_proxies' => [
            'ips' => [
                '127.0.0.1',
                '::1',
            ],
            'headers' => -1,
        ],
    ],
];
```

and finally be sure that Apache can handle this new file:

<div class="language-bash highlighter-rouge">
	<pre class="highlight"><code><span class="nb">sudo </span>chown www-data:www-data /var/www/<span class="canu-sitename"></span>/<span class="canu-webfolder"></span>/application/config/concrete.php 
</code></pre></div>
 
<script>
$(document).ready(function() {
    var storage = (function() {
        var PREFIX = 'ml-canu-';
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
    function Valorizer(key) {
        var me = this;
        me.currentValue = null;
        me.$input = $('#canu-' + key);
        me.type = 'text';
        me.saveEvent = 'blur';
        switch (key) {
            case 'sitename':
            case 'webfolder':
                me.normalize = function (v) { return v.replace(/[^\w\-\.]+/g, ''); };
                break;
            case 'proxyport':
                me.normalize = function (v) { v = parseInt(v.replace(/\D+/g, ''), 10); return v ? v.toString() : '8080'; };
                break;
            default:
                me.normalize = function (v) { return v; };
                break;
        }
        switch (me.type) {
            case 'checkbox':
                me.$spans = {
                    on: $('.canu-' + key + '-on'),
                    off: $('.canu-' + key + '-off')
                };
                break;
            default:
                me.$spans = $('.canu-' + key);
                break;
           }
        me.$input
            .on('change keydown keypress keyup mousedown mouseup blur', function() {
                var newValue;
                switch (me.type) {
                    case 'checkbox':
                        newValue = me.$input.is(':checked') ? 'on' : 'off';
                        break;
                    default:
                        newValue = me.normalize(me.$input.val());
                        break;
                }
                if (newValue === '' || newValue === me.currentValue) {
                    return;
                }
                me.currentValue = newValue;
                switch (me.type) {
                    case 'checkbox':
                        me.$spans.off[newValue === 'off' ? 'show' : 'hide']();
                        me.$spans.on[newValue === 'on' ? 'show' : 'hide']();
                        break;
                    default:
                        me.$spans.text(newValue);
                        break;
                }
            })
            .on(me.saveEvent, function() {
                setTimeout(function() {
                    if (me.currentValue !== null) {
                        storage.save(key, me.currentValue);
                    }
                }, 0);
            })
        ;
        switch (me.type) {
            case 'checkbox':
                me.$input.prop('checked', storage.load(key, me.$input.is(':checked') ? 'on' :'off') === 'on');
                break;
            default:
                me.$input.val(storage.load(key, me.$input.val()))
                break;
        }
        me.$input.trigger('change');
    }
    for (var i = 0, L = ['sitename', 'webfolder', 'proxyport']; i < L.length; i++) {
        new Valorizer(L[i]);
    }
});
</script>
