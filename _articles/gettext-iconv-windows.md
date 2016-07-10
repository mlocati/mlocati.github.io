---
title:  "gettext 0.19.8.1 and iconv 1.14 - Binaries for Windows"
description: Download gettext & iconv binaries for Windows - 32 and 64 bits - shared and static.
redirect_from: "/gettext-iconv-windows"
redirect_from: "/gettext-iconv-windows/"
redirect_from: "/gettext-iconv-windows/index.html"
---


{: .table .table-condensed }
| gettext version | libiconv version | Operating system | Flavor | Download |
|-----------------|------------------|------------------|--------|----------|
| 0.19.6 | 1.14 | 32 bit | shared<sup>1</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.6-v1.14/gettext0.19.6-iconv1.14-shared-32.exe) |
| 0.19.8.1 | 1.14 | 32 bit | static<sup>2</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-static-32.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-static-32.zip) |
| 0.19.8.1 | 1.14 | 64 bit | shared<sup>1</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-shared-64.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-shared-64.zip) |
| 0.19.8.1 | 1.14 | 64 bit | static<sup>2</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-static-64.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)](https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.19.8.1-v1.14/gettext0.19.8.1-iconv1.14-static-64.zip) |

Please remark that I couldn't compile the 32-bit shared version for gettext 0.19.8.1: ([here's the bug report](https://savannah.gnu.org/bugs/?48405)).

1: `shared` means that the programs make use of DLL. The setup size is small, but all the executables needs to stay together with the shipped DLL libraries.  
2: `static` means that the programs do not use DLL. The setup size is much bigger, but all the executables may be moved around as you like, no DLL-dependencies.


----

Do you want to see what's behind the scenes? See the [source code](https://github.com/mlocati/gettext-iconv-windows)!

