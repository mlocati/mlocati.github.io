---
title:  "gettext 1.0 and iconv 1.18 for Windows"
description: Download gettext & iconv Windows - 32 and 64 bits - shared and static - executable tools, gcc and Microsoft Visual C development files (.h, .a, .lib, .dll, .dll.lib).
redirect_from: "/gettext-iconv-windows"
redirect_from: "/gettext-iconv-windows/"
redirect_from: "/gettext-iconv-windows/index.html"
date: 2026-02-05T23:02:00+01:00
---

### Download

{% raw %}
<div id="giw-download-wizard" class="jumbotron" style="padding: 20px" v-cloak  data-gettext-version="1.0" data-iconv-version="1.18" data-release-prefix="https://github.com/mlocati/gettext-iconv-windows/releases/download/v1.0-v1.18-r1">
    <div class="alert alert-warning">
        Select the options to pick the right package.
    </div>
    <table class="table" style="margin-bottom: 0">
        <colgroup>
            <col width="130" />
        </colgroup>
        <tbody>
            <tr v-if="showBitness" class="success">
                <th colspan="2">Bitness</th>
            </tr>
            <tr v-if="showBitness">
                <td>
                    <input type="button" id="giw-wiz-32" class="btn" v-bind:class="bits === 32 ? 'btn-success' : 'btn-default'" v-on:click.prevent="bits = 32" value="32 bits" />
                </td>
                <td>
                    <label for="giw-wiz-32">For 32-bit and 64-bit Windows versions</label>
                </td>
            </tr>
            <tr v-if="showBitness">
                <td>
                    <input type="button" id="giw-wiz-64" class="btn" v-bind:class="bits === 64 ? 'btn-success' : 'btn-default'" v-on:click.prevent="bits = 64" value="64 bits" />
                </td>
                <td>
                    <label for="giw-wiz-64">For 64-bit Windows versions only</label>
                </td>
            </tr>
            <tr v-if="showBuild" class="success">
                <th colspan="2">Build</th>
            </tr>
            <tr v-if="showBuild">
                <td>
                    <input type="button" id="giw-wiz-shared" class="btn" v-bind:class="build === BUILD.SHARED ? 'btn-success' : 'btn-default'" v-on:click.prevent="build = BUILD.SHARED" value="Shared" />
                </td>
                <td>
                    <label for="giw-wiz-shared">Programs make use of DLL: the setup size is smaller, but all the executables needs to stay together with the shipped DLLs</label>
                </td>
            </tr>
            <tr v-if="showBuild">
                <td>
                    <input type="button" id="giw-wiz-static" class="btn" v-bind:class="build === BUILD.STATIC ? 'btn-success' : 'btn-default'" v-on:click.prevent="build = BUILD.STATIC" value="Static" />
                </td>
                <td>
                    <label for="giw-wiz-static">Programs do not use DLL: the setup size is bigger, but all the executables may be moved around as you like, no DLL-dependencies</label>
                </td>
            </tr>
            <tr v-if="showType" class="success">
                <th colspan="2">Type</th>
            </tr>
            <tr v-if="showType">
                <td>
                    <input type="button" id="giw-wiz-installer" class="btn" v-bind:class="type === TYPE.EXE ? 'btn-success' : 'btn-default'" v-on:click.prevent="type = TYPE.EXE" value="Installer" />
                </td>
                <td>
                    <label for="giw-wiz-installer">Download an executable that installs the programs</label>
                </td>
            </tr>
            <tr v-if="showType">
                <td>
                    <input type="button" id="giw-wiz-zip" class="btn" v-bind:class="type === TYPE.ZIP ? 'btn-success' : 'btn-default'" v-on:click.prevent="type = TYPE.ZIP" value="Files" />
                </td>
                <td>
                    <label for="giw-wiz-zip">Download a .zip archive containing the programs</label>
                </td>
            </tr>
            <tr v-if="showType">
                <td>
                    <input type="button" id="giw-wiz-dev-gcc" class="btn" v-bind:class="type === TYPE.DEV_GCC ? 'btn-success' : 'btn-default'" v-on:click.prevent="type = TYPE.DEV_GCC" value="MinGW / gcc" />
                </td>
                <td>
                    <label for="giw-wiz-dev-gcc">Download developer files for MinGW / gcc ({{ gccFileNotes }})</label>
                </td>
            </tr>
            <tr v-if="showType">
                <td>
                    <input type="button" id="giw-wiz-dev-msvc" class="btn" v-bind:class="type === TYPE.DEV_MSVC ? 'btn-success' : 'btn-default'" v-on:click.prevent="type = TYPE.DEV_MSVC" value="MS Visual C" />
                </td>
                <td>
                    <label for="giw-wiz-dev-msvc">Download developer files for Microsoft Visual C ({{ msvcFileNotes }})</label>
                </td>
            </tr>
            <tr v-if="downloadUrl" class="success">
                <th colspan="2">Download Link</th>
            </tr>
            <tr v-if="downloadUrl">
                <td>
                    <a class="btn btn-primary" v-bind:href="downloadUrl">
                        Download
                    </a>
                </td>
                <td>
                    <code>{{ downloadFilename }}</code>
                </td>
            </tr>
        </tbody>
    </table>
</div>
{% endraw %}


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
                        <span v-if="group.prerelease">&beta;</span>
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
<script src="{{ "/js/gettext-iconv-windows.js?10" | prepend: site.baseurl }}"></script>
