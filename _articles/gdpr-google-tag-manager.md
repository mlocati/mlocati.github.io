---
title:  "GDPR and Google Tag Manager"
description: How to add cookies in a GDPR-compliant way using Google Tag Manager
date: 2019-10-08T13:45:00+02:00
---

* TOC
{:toc}


## Introduction

Before setting non technical cookies, the GDPR requires that your website visitors authorize you to do so.

So, before setting them, you should show a highly visible banner/popup where you write something like this:

    We and our partners use cookies to collect user data from your device.
    Please read our _privacy policy_.

    [Ok, I accept]

Only when users hit the "Accept" buttom you can set non technical cookies.

But how can we easily implement that?

Google Tag Manager (GTM for short) is one of the choices.


## Initial setup of Google Tag Manager

In [Google Tag Manage](https://tagmanager.google.com) you need to:

1. create an account
2. create a container - one for evey website, so it's a good idea to name the container with the URL of the website

When creating a container, GTM will show a popup with two codes to be added to your website (you can also view them by going to `Admin` &rarr; `Account Settings` &rarr; `Install Google Tag Manager`).

The first code, to be added in the `<head>` HTML tag, looks like this:

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
<!-- End Google Tag Manager -->
```

The above code is for site visitors with Javascript enabled.

The second code, to be added right after the start of the `<body>` HTML tag, looks like this:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

The above code is for site visitors with Javascript disabled.



## Implementing the "Allow Cookies" popup


The pseudo-code of algorithm that handles the banner is something like this:

1. if the user has a cookie named `gdpr-allow-cookies` with a value of `yes`, jump to point 4.
2. display the banner to the user
3. when the user hit the [Allow Cookies] button:
    - send to the user a new cookie named `gdpr-allow-cookies`, with a value of `yes`
    - hide the banner
4. raise the `cookieAllowed` event of Google Tag Manager, with some code like this:
    ```html
    <script>
    (window.dataLayer = window.dataLayer || []).push({"event": "cookieAllowed"});
    </script>
    ```

PS: for [concrete5](https://www.concrete5.org/) users: I [wrote a package](https://www.concrete5.org/marketplace/addons/gdpr-cookie-notice/) that implements the above code.


## Configuring Google Tag Manager

So far, we added the Google Tag Manager to our website, and the website triggers a `cookieAllowed` GTM event when users accepts (or already accepted) our privacy policy.

In GTM we then configure a new tag, that's activated only when GTM receives the `cookieAllowed` event.

In order to do that, go to *Triggers* and hit the *New* button.
In the trigger configuration box, choose *Custom Event*, and enter `cookieAllowed` in the *Event name* field.

When adding tags, simply choose this trigger in the *Triggering* box.

That's it.


### Google Analytics

A final note about adding a Google (Universal) Analitics tag. You have 2 options:

1. enable the tag when GTM receives the `cookieAllowed` event
2. always enable the tag, by setting the `anonymizeIp` value to `true` (since analytics will collect anonymized data, it doesn't require that the user accepts it). 