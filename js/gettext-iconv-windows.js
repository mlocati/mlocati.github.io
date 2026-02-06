(function () {
'use strict';

function to2(n) {
	return (n >= 10) ? n.toString() : ('0' + n.toString());
}
const INTEGER_NUMBER_FORMAT = new Intl.NumberFormat('en-US', {
	maximumFractionDigits: 0,
});

const FLOAT_NUMBER_FORMAT = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 1,
	maximumFractionDigits: 1,
});

function ReleaseAsset(data) {
	this.url = data.browser_download_url;
	this.downloadCount = data.download_count;
	this.name = data.name;
	const typeMap = {
		'-dev-gcc.zip': ReleaseAsset.TYPE.DEV_GCC,
		'-dev-msvc.zip': ReleaseAsset.TYPE.DEV_MSVC,
		'.exe': ReleaseAsset.TYPE.INSTALLER,
		'.zip': ReleaseAsset.TYPE.FILES,
	}
	const rx = new RegExp(`.-(shared|static)-(32|64)(${Object.keys(typeMap).map(s => s.replace(/\./g, '\\.')).join('|')})$`);
	const match = this.name.match(rx);
	if (!match) {
		console.warn(`Asset name "${this.name}" does not match expected pattern`);
	}
	this.build = match ? match[1] : null;
	this.bits = match ? Number(match[2]) : null;
	this.type = match ? typeMap[match[3]] : ReleaseAsset.TYPE.OTHER;
}
ReleaseAsset.TYPE = {
	INSTALLER: 'Installer',
	FILES: 'Zip archive',
	DEV_GCC: 'Development files for GCC',
	DEV_MSVC: 'Development files for MSVC',
	OTHER: 'Other',
};
ReleaseAsset.TYPE_ORDER = {
	[ReleaseAsset.TYPE.INSTALLER]: 0,
	[ReleaseAsset.TYPE.FILES]: 1,
	[ReleaseAsset.TYPE.DEV_GCC]: 2,
	[ReleaseAsset.TYPE.DEV_MSVC]: 3,
	[ReleaseAsset.TYPE.OTHER]: 4,
};

function Release(data, versions) {
	this.gettextVersion = versions.gettext;
	this.iconvVersion = versions.iconv;
	this.tagName = data.tag_name;
	this.name = data.name || this.tagName;
	this.createdAt = new Date(data.created_at);
	this.isPrerelease = data.prerelease;
	this.url = data.html_url;
	this.assets = data.assets.map(assetData => new ReleaseAsset(assetData));
	this.assetTypes = Array.from(this.assets.reduce((types, asset) => types.add(asset.type), new Set()))
		.sort((a,b) => ReleaseAsset.TYPE_ORDER[a] - ReleaseAsset.TYPE_ORDER[b])
	;
	this.assetBits = Array.from(this.assets.reduce((bits, asset) => bits.add(asset.bits), new Set()))
		.sort((a,b) => (a ?? 999) - (b ?? 999))
		.map(bits => bits ? bits : 'Unknown')
	;
	this.assetBuilds = Array.from(this.assets.reduce((builds, asset) => builds.add(asset.build), new Set()))
		.sort((a,b) => a === 'shared' ? -1 : (b === 'shared' ? 1 : 0))
	;
	this.totalDownloads = this.assets.reduce((sum, asset) => sum + asset.downloadCount, 0);
	this.setDownloadsPerDayUntilRelease(null);
}
Release.extractVersionsFromTagName = (tagName) => {
	const match = tagName.match(/^v(\d.*?)-v(\d.*)/);
	if (!match) {
		return null;
	}
	return {
		gettext: match[1],
		iconv: match[2].replace(/(-shared-32|-shared-64|-static-32|-static-64|-r\d+)$/, ''),
	}
}
Release.prototype = {
	setDownloadsPerDayUntilRelease(nextRelease) {
		if (this.totalDownloads === 0) {
			this.downloadsPerDay = 0;
			return;
		}
		const untilDate = nextRelease ? nextRelease.createdAt : new Date();
		const deltaDays = (untilDate.getTime() - this.createdAt.getTime()) / (1000 * 3600 * 24);
		this.downloadsPerDay = this.totalDownloads / deltaDays;
	},
	getDownloadsByType(type) {
		return this.assets.filter(asset => asset.type === type).reduce((sum, asset) => sum + asset.downloadCount, 0);
	},
	getDownloadsByBits(bits) {
		return this.assets.filter(asset => asset.bits === bits).reduce((sum, asset) => sum + asset.downloadCount, 0);
	},
	getDownloadsByBuild(build) {
		return this.assets.filter(asset => asset.build === build).reduce((sum, asset) => sum + asset.downloadCount, 0);
	},
};

async function ready() {

	Vue.createApp({
		data() {
			return {
				BUILD: {
					SHARED: 'shared',
					STATIC: 'static',
				},
				TYPE: {
					EXE: '.exe',
					ZIP: '.zip',
					DEV_GCC: '-dev-gcc.zip',
					DEV_MSVC: '-dev-msvc.zip',
				},
				bits: null,
				build: null,
				type: null,
				gettextVersion: '',
				iconvVersion: '',
				releasePrefix: '',
			};
		},
		mounted() {
			const el = this.$el.parentElement;
			this.releasePrefix = el.dataset.releasePrefix || '';
			this.gettextVersion = el.dataset.gettextVersion || '';
			this.iconvVersion = el.dataset.iconvVersion || '';
		},
		computed: {
			showBitness() {
				return true;
			},
			showBuild() {
				return this.bits !== null;
			},
			showType() {
				return this.build !== null;
			},
			gccFileNotes() {
				switch (this.build) {
					case this.BUILD.SHARED:
						return 'shared: .h, .dll, and .dll.a files';
					case this.BUILD.STATIC:
						return 'static: .h, and .a files';
					default:
						return '';
				}
			},
			msvcFileNotes() {
				switch (this.build) {
					case this.BUILD.SHARED:
						return 'shared: .h, .dll, and .dll.lib files';
					case this.BUILD.STATIC:
						return 'static: .h, and .lib files';
					default:
						return '';
				}
			},
			downloadFilename() {
				if (this.bits === null || this.build === null || this.type === null) {
					return '';
				}
				if (this.gettextVersion === '' || this.iconvVersion === '') {
					return '';
				}
				return `gettext${this.gettextVersion}-iconv${this.iconvVersion}-${this.build}-${this.bits}${this.type}`;
			},
			downloadUrl() {
				if (this.releasePrefix === '' || this.downloadFilename === '') {
					return '';
				}
				return `${this.releasePrefix}/${this.downloadFilename}`;
			},
		}
	}).mount('#giw-download-wizard');

	Vue.createApp({
		data() {
			return {
				error: null,
				releases: null,
				releaseStats: null,
			};
		},
		async mounted() {
			try {
				this.releases = await this.fetchReleases();
			} catch (e) {
				this.error = e?.message || e?.toString() || '?';
			}
		},
		methods: {
			formatDate(date) {
				return [date.getFullYear(), to2(1 + date.getMonth()), to2(date.getDate())].join('-');
			},
			formatInt(n) {
				return INTEGER_NUMBER_FORMAT.format(n);
			},
			formatFloat(n) {
				return FLOAT_NUMBER_FORMAT.format(n);
			},
			getGroupdDownloadsPerDay(group) {
				const groupIndex = this.stats.groups.indexOf(group);
				let untilDate;
				if (groupIndex > 0) {
					untilDate = this.stats.groups[groupIndex - 1].createdOn;
				} else {
					untilDate = new Date();
				}
				const deltaDays = (untilDate.getTime() - group.createdOn.getTime()) / (1000 * 3600 * 24);
				return group.total / deltaDays;
			},
			async fetchReleases() {
				const response = await window.fetch(
					'https://api.github.com/repos/mlocati/gettext-iconv-windows/releases',
					{
						headers: {
							Accept: 'application/vnd.github.v3+json',
						}
					}
				);
				if (!response.ok) {
					throw new Error(await response.text);
				}
				const releasesData = await response.json();
				const releases = [];
				releasesData.forEach((releaseData) => {
					if (releaseData.draft || !releaseData.assets.length || /.(-shared-32|-shared-64|-static-32|-static-64)$/.test(releaseData.tag_name)) {
						return;
					}
					const versions = Release.extractVersionsFromTagName(releaseData.tag_name);
					if (versions === null) {
						console.warn(`Unrecognized tag name: ${releaseData.tag_name}`);
						return;
					}
					releases.push(new Release(releaseData, versions));
				});
				releases.sort((a, b) => b.createdOn - a.createdOn);
				releases.forEach((release, index) => release.setDownloadsPerDayUntilRelease(releases[index - 1] || null));
				return releases;
			},
			async showReleaseStats(release) {
				this.releaseStats = release;
				await this.$nextTick();
				const dlg = this.$refs.releaseStats.showModal();
			},
		},
	}).mount('#giw-download-stats');

}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

})();
