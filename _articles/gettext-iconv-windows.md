---
title:  "gettext 0.24.1 and iconv 1.17 - Binaries for Windows"
description: Download gettext & iconv binaries for Windows - 32 and 64 bits - shared and static.
redirect_from: "/gettext-iconv-windows"
redirect_from: "/gettext-iconv-windows/"
redirect_from: "/gettext-iconv-windows/index.html"
date: 2024-10-02T13:12:00+02:00
---

{% assign gettext_version = "0.24.1" %}
{% assign iconv_version = "1.17" %}
{% assign release_prefix = "https://github.com/mlocati/gettext-iconv-windows/releases/download/v0.24.1-v1.17" %}

{: .table .table-condensed }
| gettext version | libiconv version | Operating system | Flavor | Download |
|-----------------|------------------|------------------|--------|----------|
| {{ gettext_version }} | {{ iconv_version }} | 32 bit | shared<sup>1</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-shared-32.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-shared-32.zip) |
| {{ gettext_version }} | {{ iconv_version }} | 32 bit | static<sup>2</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-static-32.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-static-32.zip) |
| {{ gettext_version }} | {{ iconv_version }} | 64 bit | shared<sup>1</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-shared-64.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-shared-64.zip) |
| {{ gettext_version }} | {{ iconv_version }} | 64 bit | static<sup>2</sup> | [![Setup]({{ site.baseurl }}/images/icon-setup.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-static-64.exe) [![ZIP]({{ site.baseurl }}/images/icon-zip.png)]({{ release_prefix }}/gettext{{ gettext_version }}-iconv{{ iconv_version }}-static-64.zip) |

1: `shared` means that the programs make use of DLL. The setup size is small, but all the executables needs to stay together with the shipped DLL libraries.  
2: `static` means that the programs do not use DLL. The setup size is much bigger, but all the executables may be moved around as you like, no DLL-dependencies.


### Download statistics

{% raw %}
<div id="giw-download-stats" v-cloak>
    <div v-if="error !== null" class="alert alert-danger" style="white-space: pre-wrap">{{ error }}</div>
    <i v-else-if="stats === null" class="fa-solid fa-sync fa-spin"></i>
    <div v-else>
        <table class="table table-striped" style="width: auto">
            <thead>
                <tr>
                    <th rowspan="3" style="text-align: center">Date</th>
                    <th rowspan="2" colspan="2" style="text-align: center">Version</th>
                    <th colspan="4" style="text-align: center">Shared</th>
				    <th colspan="4" style="text-align: center">Static</th>
				    <th rowspan="3" style="text-align: center">Total</th>
				    <th rowspan="3" style="text-align: center">Downloads/day</th>
			    </tr>
			    <tr>
				    <th colspan="2" style="text-align: center">32 bits</th>
				    <th colspan="2" style="text-align: center">64 bits</th>
				    <th colspan="2" style="text-align: center">32 bits</th>
				    <th colspan="2" style="text-align: center">64 bits</th>
			    </tr>
			    <tr>
				    <th rowspan="2" style="text-align: center">gettext</th>
				    <th rowspan="2" style="text-align: center">iconv</th>
				    <th style="text-align: center">exe</th>
				    <th style="text-align: center">zip</th>
				    <th style="text-align: center">exe</th>
				    <th style="text-align: center">zip</th>
				    <th style="text-align: center">exe</th>
				    <th style="text-align: center">zip</th>
				    <th style="text-align: center">exe</th>
				    <th style="text-align: center">zip</th>
			    </tr>
            </thead>
            <tbody>
                <tr v-for="group in stats.groups">
                    <td style="text-align: center">
                        <a v-bind:href="group.link" style="white-space: nowrap">{{ formatDate(group.createdOn) }}</a>
                    </td>
                    <td style="text-align: center">
                        {{ group.vGettext }}
                    </td>
                    <td style="text-align: center">
                        {{ group.vIconv }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.shared32exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.shared32zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.shared64exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.shared64zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.static32exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.static32zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.static64exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.static64zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(group.total) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatFloat(getGroupdDownloadsPerDay(group)) }}
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th colspan="3" style="text-align: right">Total</th>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.shared32exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.shared32zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.shared64exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.shared64zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.static32exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.static32zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.static64exe) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.static64zip) }}
                    </td>
                    <td style="text-align: center">
                        {{ formatInt(stats.totals.total) }}
                    </td>
                    <td>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>
{% endraw %}


### Code Signing Policy

Since gettext v0.22.5 / iconv v1.17, the built DLLs and executables are signed.

Free code signing is provided by [SignPath.io](https://about.signpath.io/), certificate by [SignPath Foundation](https://signpath.org/).

The source code of gettext and iconv is created and maintained by the [Free Software Foundation](https://www.fsf.org/).

This gettext-iconv-windows project only compiles gettext and iconv for Windows, and is maintained by [Michele Locati](https://mlocati.github.io).

----

Do you want to see what's behind the scenes? See the [source code](https://github.com/mlocati/gettext-iconv-windows)!

Questions? [Start a discussion](https://github.com/mlocati/gettext-iconv-windows/discussions).

Problems? [File an issue](https://github.com/mlocati/gettext-iconv-windows/issues).

<script src="{{ "/js/vue.js?3.5.11" | prepend: site.baseurl }}"></script>
<script src="{{ "/js/gettext-iconv-windows.js?5" | prepend: site.baseurl }}"></script>