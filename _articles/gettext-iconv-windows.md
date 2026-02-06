---
title:  "gettext 1.0 and iconv 1.18 for Windows"
description: Download gettext & iconv Windows - 32 and 64 bits - shared and static - executable tools, gcc and Microsoft Visual C development files (.h, .a, .lib, .dll, .dll.lib).
redirect_from:
    - /gettext-iconv-windows
    - /gettext-iconv-windows/
    - /gettext-iconv-windows/index.html
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
    <i v-else-if="releases === null" class="fa-solid fa-sync fa-spin"></i>
    <div v-else>
        <table class="table table-striped">
            <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col />
                <col width="0*" />
            </colgroup>
            <thead>
                <tr>
                    <th class="text-center">Release</th>
                    <th class="text-center">Date</th>
                    <th class="text-center">gettext version</th>
                    <th class="text-center">iconv version</th>
                    <th class="text-center">Total downloads</th>
                    <th class="text-center">Downloads/day</th>
                    <th>Stats</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="release in releases">
                    <td>
                        <a v-bind:href="release.url" v-bind:title="release.name === release.tagName ? '' : release.name">{{ release.tagName }}</a><span v-if="release.isPrerelease" title="Pre-release">&nbsp;&beta;</span>
                    </td>
                    <td>
                        {{ formatDate(release.createdAt) }}
                    </td>
                    <td class="text-center">
                        {{ release.gettextVersion }}
                    </td>
                    <td class="text-center">
                        {{ release.iconvVersion }}
                    </td>
                    <td class="text-right">
                        {{ formatInt(release.totalDownloads) }}
                    </td>
                    <td class="text-right">
                        {{ formatFloat(release.downloadsPerDay) }}
                    </td>
                    <td class="text-center">
                        <button class="btn btn-xs btn-default" v-on:click.prevent="showReleaseStats(release)">&#x1F4CA;<!-- BAR CHART --></button>
                    </td>
                </tr>
            </tbody>
        </table>
        <dialog ref="releaseStats" class="ml-flex-dialog" style="padding: 0; border: none; border-radius: 6px; flex-direction: column; max-height: 80vh; min-width: 200px;">
            <div v-if="releaseStats" style="padding: 16px; overflow-y: auto; flex: 1 1 auto;">
                <h3>Statistics for {{ releaseStats.name }}</h3>
                <table class="table table-condensed table-striped">
                    <colgropup>
                        <col width="50%" />
                    </colgropup>
                    <thead>
                        <tr>
                            <th class="text-right">By Type</th>
                            <th>Downloads</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="assetType in releaseStats.assetTypes">
                            <td class="text-right">{{ assetType }}</td>
                            <td>{{ formatInt(releaseStats.getDownloadsByType(assetType)) }}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-condensed table-striped">
                    <colgropup>
                        <col width="50%" />
                    </colgropup>
                    <thead>
                        <tr>
                            <th class="text-right">By Bits</th>
                            <th>Downloads</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="bits in releaseStats.assetBits">
                            <td class="text-right">{{ bits }}</td>
                            <td>{{ formatInt(releaseStats.getDownloadsByBits(bits)) }}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table table-condensed table-striped">
                    <colgropup>
                        <col width="50%" />
                    </colgropup>
                    <thead>
                        <tr>
                            <th class="text-right">By Build</th>
                            <th>Downloads</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="build in releaseStats.assetBuilds">
                            <td class="text-right">{{ build }}</td>
                            <td>{{ formatInt(releaseStats.getDownloadsByBuild(build)) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div style="padding: 12px 16px; border-top: 1px solid #ddd; display: flex; justify-content: flex-end; flex-shrink: 0;">
                <button class="btn btn-default" v-on:click.prevent="$refs.releaseStats.close()">Close</button>
            </div>
        </dialog>
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
<script src="{{ "/js/gettext-iconv-windows.js?11" | prepend: site.baseurl }}"></script>
