---
title:  "Let's Encrypt test server (Boulder)"
description: How to set up a local server to test Let's Encrypt
date: 2016-06-28T18:05:44+02:00
---

* TOC
{:toc}

## Introduction

I developed a pretty nice [concrete5 plugin](https://www.concrete5.org/marketplace/addons/lets-encrypt) to integrate Let's Encrypt (free SSL/HTTPS certificates) in concrete5 5.7+.

When I developed that plugin, no other PHP library existed, so I had to do a lot of research and tests.  
That's why I needed a local server that could act exactly as the official Let's Encrypt server.

Luckily, the brave guys at Let's Encrypt are gifting the world **Boulder**, that is the engine that resides behind their services.

In this article I'll explain you how I set up a local Boulder server, allowing you to test Let's Encrypt clients.

For simplicity, in this document I assume that you will run the client and a test website on your physical computer.


## Configure the host names

Let's assume you want to test your Let's Encrypt client agains two domain called `www.example.com` and `www.test.com`.  
First of all, you need to tell your computer that those domains reside on your computer.

This can be done by modifying the `/etc/hosts` file (for Linux and Mac OS X) or the file `C:\Windows\System32\drivers\etc\hosts` (for Windows), by adding these two lines:
```
127.0.0.1 www.example.com
127.0.0.1 www.test.com
```

You need to tell your system that the `boulder` too resides in your computer:
```
127.0.0.1 boulder
```
 
## Setup Boulder

### Linux and Mac OS X

On Linux and Mac OS X you have to install [Docker](https://www.docker.com/).

Then you can [download the latest Boulder release](https://github.com/letsencrypt/boulder/archive/release.zip) from GitHub.

Unzip that archive and in a terminal window type in:

```sh
cd path/to/extracted/archive
./test/run-docker.sh
```

After a couple of minutes, you'll have a local Boulder instance up and running.

### Windows

On Windows you'll need a bit more work to start Boulder.

First of all, download and install [VirtualBox](https://www.virtualbox.org/).

Create a new virtual machine with [Ubuntu Server 16.04](http://www.ubuntu.com/download/server). When installing Ubuntu, you'll be asked which optional components you want to install:
choose `standard system utilities` and `OpenSSH server`.

Once Ubuntu is installed, you have to go to the virtual machine settings > `Network` > `Advanced` > `Port Forwarding` and add these new rules:

{: .table .table-condensed }
| Name      | Protocol | Host IP | Host Port | Guest IP | Guest Port |
|-----------|----------|---------|-----------|----------|------------|
| `Boulder` | `TCP`    |         | `4000`    |          | `4000`     |
| `DB`      | `TCP`    |         | `23306`   |          | `3306`     |
| `SSH`     | `TCP`    |         | `20022`   |          | `22`       |

The `Boulder` rule is required in order to be able to let your client communicate with Boulder.  
The `DB` rule is required if you want to access the Boulder database from outside the VirtualMachine.  
The `SSH` rule is really helpful since it allows you to connect to the virtual machine via SSH with [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
(connect to 127.0.0.1 via port 20022).  
I usually create a link to open a SSH shell with a single click (example: `putty.exe -ssh -pw UBUNTU_PASSWORD UBUNTU_USERNAME@127.0.0.1 -P 20022`).

Once Ubuntu is installed, you have to install the *VirtualBox Guest additions* and *Docker*:

- From the virtual machine `Devices` menu, choose `Insert Guest additions CD image...`
- open a new SSH session with PuTTY and type the following commands:

  ```bash
  # Update the system
  sudo apt-get update
  sudo apt-get upgrade -y
  # Install the packages required for the VirtualBox Guest additions and Docker
  sudo apt-get install -y build-essential module-assistant linux-headers-`uname -r` \
    apt-transport-https ca-certificates linux-image-extra-`uname -r` unzip \
    linux-image-extra-virtual 
  # Install the VirtualBox Guest additions
  sudo mount /dev/cdrom /media/cdrom
  sudo /media/cdrom/VBoxLinuxAdditions.run
  sudo umount /media/cdrom
  sudo adduser `whoami` vboxsf
  # Install Docker
  sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 \
      --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
  echo 'deb https://apt.dockerproject.org/repo ubuntu-xenial main' | sudo tee /etc/apt/sources.list.d/docker.list
  sudo apt-get update
  sudo apt-get install -y --allow-unauthenticated docker-engine docker-compose
  # Allow running Docker without sudo
  sudo groupadd docker
  sudo usermod -aG docker `whoami`
  # Start Docker on boot
  sudo systemctl enable docker
  # Download Builder
  mkdir -p ~/boulder/src/github.com/letsencrypt
  wget --show-progress -q -O ~/boulder-release.zip https://github.com/letsencrypt/boulder/archive/release.zip
  unzip -q -d ~ ~/boulder-release.zip
  mv ~/boulder-release ~/boulder/src/github.com/letsencrypt/boulder
  rm boulder-release.zip
  # Configure the FAKE_DNS
  cat ~/boulder/src/github.com/letsencrypt/boulder/docker-compose.yml | sed -e 's/FAKE_DNS: 127.0.0.1/FAKE_DNS: '`netstat -rn | grep UG | cut -f10 -d" "`'/' >~/boulder/src/github.com/letsencrypt/boulder/docker-compose.yml
  printf '#!/bin/bash\n\nexport GOPATH='$HOME'/boulder\ncd '$HOME'/boulder/src/github.com/letsencrypt/boulder\ndocker-compose up' >~/boulder.sh
  chmod a+x ~/boulder.sh
  # Shutdow the virtual machine
  sudo shutdown -P now
  ```

At the end, the virtual machine will be powered off.  
You can restart it in *headless* mode: you won't see any virtual machine window, but you'll be able to connect to it via the comfortable PuTTY/SSH interface.

To start boulder, you simply have to type this command via SSH:

```bash
~/boulder.sh
```

## Website port

By default, Boulder will try to reach your website via port `5002` (for http) and optionally via port `5001` (for https).  
If your local website is available at another port, you should change the file `test/config/va.json` under the main Boulder folder.

In particular, you may want to change the values of the `httpPort` and/or `httpsPort` options (under `portConfig`).  
So, if for instance your local website is available via HTTP at port `1000`, you should have

```
"httpPort": 1000,
```

If you change the boulder configuration, you should restart boulder.

First of all, stop all the containers listed by the command `docker ps` (for instance: `docker stop c0ea10c55ddd`), then restart boulder as described above.

Next, you may want to delete the created containers listed by the command `docker ps -a` (for instance: `docker rm c0ea10c55ddd`)


## Accessing the database

You can access the Docker MySQL/MariaDB database by connecting to the 3306 port of the IP address of the `boulder-mysql` container.

This can be done with a command like this:

```{% raw %}
mysql -u root --password= -h `docker inspect -f '{{.NetworkSettings.IPAddress }}' boulder-mysql`
{% endraw %}```

If you are running Boulder inside a virtual machine, you can expose it with iptables, by running this command:

```{% raw %}
sudo iptables -t nat -A DOCKER -p tcp --dport 3306 -j DNAT --to-destination `docker inspect -f '{{.NetworkSettings.IPAddress }}' boulder-mysql`:3306
{% endraw %}```
