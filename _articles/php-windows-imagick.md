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
  You'll have `enabled` for thread safe or `disabled` for not thread safe  
  
- Determine the architecture  
  `php -i|find "Architecture"`  
  You'll have `x86` for 32 bits and `x64` for 64 bits  
  
Once you determined the above parameters, you have to download the dll of the PHP extension and the ImageMagick archive using the following table:

<div class="text-center">
	<span class="badge">Filter</span>
	<div class="btn-group btn-group-xs versions-filter" data-field="version"></div>
	<div class="btn-group btn-group-xs versions-filter" data-field="threadsafe"></div>
	<div class="btn-group btn-group-xs versions-filter" data-field="architecture"></div>
</div>

{: .table .table-condensed .table-hover #versions-table }
| Version | Thread Safe | Architecture | Estension | ImageMagick |
|---------|-------------|-----------|-----------|-------------|
| 5.5 | Yes | x86 | [php_imagick-3.4.3-5.5-ts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-ts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.5 | Yes | x64 | [php_imagick-3.4.3-5.5-ts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-ts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.5 | No | x86 | [php_imagick-3.4.3-5.5-nts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-nts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.5 | No | x64 | [php_imagick-3.4.3-5.5-nts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.5-nts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.6 | Yes | x86 | [php_imagick-3.4.3-5.6-ts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-ts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.6 | Yes | x64 | [php_imagick-3.4.3-5.6-ts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-ts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 5.6 | No | x86 | [php_imagick-3.4.3-5.6-nts-vc11-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-nts-vc11-x86.zip) | [ImageMagick-6.9.3-7-vc11-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x86.zip) |
| 5.6 | No | x64 | [php_imagick-3.4.3-5.6-nts-vc11-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-5.6-nts-vc11-x64.zip) | [ImageMagick-6.9.3-7-vc11-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc11-x64.zip) |
| 7.0 | Yes | x86 | [php_imagick-3.4.3-7.0-ts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-ts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.0 | Yes | x64 | [php_imagick-3.4.3-7.0-ts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-ts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.0 | No | x86 | [php_imagick-3.4.3-7.0-nts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-nts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.0 | No | x64 | [php_imagick-3.4.3-7.0-nts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.0-nts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.1 | Yes | x86 | [php_imagick-3.4.3-7.1-ts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-ts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.1 | Yes | x64 | [php_imagick-3.4.3-7.1-ts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-ts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |
| 7.1 | No | x86 | [php_imagick-3.4.3-7.1-nts-vc14-x86.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-nts-vc14-x86.zip) | [ImageMagick-6.9.3-7-vc14-x86.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x86.zip) |
| 7.1 | No | x64 | [php_imagick-3.4.3-7.1-nts-vc14-x64.zip](http://windows.php.net/downloads/pecl/releases/imagick/3.4.3/php_imagick-3.4.3-7.1-nts-vc14-x64.zip) | [ImageMagick-6.9.3-7-vc14-x64.zip](http://windows.php.net/downloads/pecl/deps/ImageMagick-6.9.3-7-vc14-x64.zip) |

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

<script>$(document).ready(function() {
'use strict';

var $rows = $('#versions-table>tbody>tr');

function textToID(text) {
	return text.replace(/[^\w\-]+/g, '_');
}
var Filter = (function() {
	var current = {};
	function filterRows() {
		$rows.each(function (rowIndex, row) {
			var $row = $(row),
				fieldValues = $row.data('fieldValues');
			$row.show();
			for (var field in current) {
				if (field in fieldValues && fieldValues[field] !== current[field]) {
					$row.hide();
					break;
				}
			}
		});
	}
	function toggle(field, value) {
		$('button.versions-filter-' + field)
			.removeClass('btn-success')
			.addClass('btn-default')
		if (field in current && current[field] === value) {
			delete current[field];
		} else {
			current[field] = value;
			$('button#' + textToID('versions-filter-' + field + '-' + value))
				.removeClass('btn-default')
				.addClass('btn-success')
			;
		}
		filterRows();
	}
	return {
		toggle: toggle
	};
})();
function getAvailableFields() {
	var COLINDEX = {
		VERSION: 0,
		THREADSAFE: 1,
		ARCHITECTURE: 2
	};
	var result = {
		version: [],
		threadsafe: [],
		architecture: []
	};
	$rows.each(function (rowIndex, row) {
		var $row = $(row),
		   $cells = $row.find('>td'),
		   version = $.trim($cells.eq(COLINDEX.VERSION).text()),
		   threadsafe = $.trim($cells.eq(COLINDEX.THREADSAFE).text()),
		   architecture = $.trim($cells.eq(COLINDEX.ARCHITECTURE).text());
		if (result.version.indexOf(version) < 0) {
			result.version.push(version);
		}
		if (result.threadsafe.indexOf(threadsafe) < 0) {
			result.threadsafe.push(threadsafe);
		}
		if (result.architecture.indexOf(architecture) < 0) {
			result.architecture.push(architecture);
		}
		$row.data('fieldValues', {
			version: version,
			threadsafe: threadsafe,
			architecture: architecture
		});
	});
	return result;
}

function showAvailableFields(available) {
	var TEXTMAP = {
		threadsafe: {
			Yes: 'thread-safe',
			No: 'not thread safe'
		}
	};
	$('.versions-filter').each(function (index, ul) {
		var $ul = $(this),
			field = $ul.data('field');
		$.each(available[field], function (index, value) {
			var shownValue = field in TEXTMAP && value in TEXTMAP[field] ? TEXTMAP[field][value] : value;
			$ul.append($('<button class="btn btn-default versions-filter-' + field + '" id="' + textToID('versions-filter-' + field + '-' + value) + '" />')
				.text(shownValue)
				.on('click', function (e) {
					e.preventDefault();
					Filter.toggle(field, value);
				})
			);
		});
	});
}

showAvailableFields(getAvailableFields());
	
});</script>