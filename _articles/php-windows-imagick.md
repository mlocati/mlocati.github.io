---
title:  "Install the ImageMagick PHP extension in Windows"
description: How to install the ImageMagick PHP extension () in Windows.
date: 2017-09-13T16.54.00+02:00
---

In order to install the imagick PHP extension on Windows, you need to know the exact version of your PHP.
To do this: open a command prompt and enter these commands:

- Determine the PHP version:  
  `php -i|find "PHP Version"`  
  
- Determine the thread safety  
  `php -i|find "Thread Safety"`  
  You'll have `enabled` for thread safe or `enabled` for not thread safe  
  
- Determine the architecture  
  `php -i|find "Architecture"`  
  You'll have `x86` for 32 bits and `x64` for 64 bits  
  
Once you determined the above parameters, you have to download the dll of the PHP extension and the ImageMagick archive using the following table:

{: .table .table-condensed .table-hover }
| Version | Thread Safe | # of bits | Estension | ImageMagick |
|---------|-------------|-----------|-----------|-------------|
| 5.5 | Yes | 32 | [php_imagick-3.4.3-5.5-ts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-ts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.5 | Yes | 64 | [php_imagick-3.4.3-5.5-ts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-ts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.5 | No | 32 | [php_imagick-3.4.3-5.5-nts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-nts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.5 | No | 64 | [php_imagick-3.4.3-5.5-nts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-nts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.6 | Yes | 32 | [php_imagick-3.4.3-5.6-ts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-ts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.6 | Yes | 64 | [php_imagick-3.4.3-5.6-ts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-ts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.6 | No | 32 | [php_imagick-3.4.3-5.6-nts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-nts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.6 | No | 64 | [php_imagick-3.4.3-5.6-nts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-nts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 7.0 | Yes | 32 | [php_imagick-3.4.3-7.0-ts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-ts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.0 | Yes | 64 | [php_imagick-3.4.3-7.0-ts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-ts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.0 | No | 32 | [php_imagick-3.4.3-7.0-nts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-nts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.0 | No | 64 | [php_imagick-3.4.3-7.0-nts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-nts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.1 | Yes | 32 | [php_imagick-3.4.3-7.1-ts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-ts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.1 | Yes | 64 | [php_imagick-3.4.3-7.1-ts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-ts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.1 | No | 32 | [php_imagick-3.4.3-7.1-nts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-nts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.1 | No | 64 | [php_imagick-3.4.3-7.1-nts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-nts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |

Once you downloaded the correct files:

1. Extract from `php_imagick-….zip` to the `ext` directory the `php_imagick.dll` file of your PHP installation
2. Extract from `ImageMagick-….zip` to the root PHP directory (where `php.exe` resides) the DLL files that start with:
  - `CORE_RL_`
  - `IM_MOD_RL_`
3. Add this line to your `php.ini` file: `extension=php_imagick.dll`

To test if the extension works, you can run this PHP code:

```php
<?php
$image = new Imagick();
$image->newImage(1, 1, new ImagickPixel('#ffffff'));
$image->setImageFormat('png');
$pngData = $image->getImagesBlob();
echo strpos($pngData, "\x89PNG\r\n\x1a\n") === 0 ? 'Ok' : 'Failed'; 
```
