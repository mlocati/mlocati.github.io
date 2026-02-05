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
				stats: null,
			};
		},
		async mounted() {
			try {
				this.stats = await this.fetchStats();
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
			async fetchStats() {
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
				const data = await response.json();
				const groups = [];
				const rNames = [
					'shared32exe',
					'shared32zip',
					'shared64exe',
					'shared64zip',
					'static32exe',
					'static32zip',
					'static64exe',
					'static64zip',
				];
				const extractVersions = (tagName) => {
					const [, vGettext, vIconv, tooMany] = tagName.split(/(?<![A-Za-z0-9])v(?=\d)/);
					if (tooMany !== undefined || vIconv === undefined || vIconv.includes('shared') || vIconv.includes('static')) {
						return null;
					}
					return {
						gettext: vGettext.replace(/-+$/, ''),
						iconv: vIconv.replace(/-r\d+$/, ''),
					};
				};
				data.forEach((item) => {
					if (item.draft) {
						return;
					}
					const versions = extractVersions(item.tag_name);
					if (versions === null) {
						return;
					}
					const group = {
						link: item.html_url,
						createdOn: new Date(item.created_at),
						vGettext: versions.gettext,
						vIconv: versions.iconv,
						prerelease: item.prerelease,
						total: 0,
					};
					for (const rName of rNames) {
						group[rName] = 0;
					}
					item.assets.forEach((asset) => {
						if (/dev-(gcc|msvc)\.zip$/.test(asset.name)) {
							return;
						}
						var m = asset.name.match(/(shared|static).(32|64)\.(exe|zip)$/);
						if (m === null) {
							throw new Error(`Unrecognized asset name: ${asset.name}`);
						}
						m.shift();
						group[m.join('')] += asset.download_count;
					});
					for (const rName of rNames) {
						group.total += group[rName];
					}
					groups.push(group);
				});
				groups.sort((a, b) => a.createdOn < b.createdOn);
				const totals = {
					total: 0,
				};
				for (const rName of rNames) {
					totals[rName] = 0;
					groups.forEach((group) => {
						totals[rName] += group[rName];
						totals.total += group[rName];
					})
				}
				return {
					groups,
					totals,
				};
			}
		}
	}).mount('#giw-download-stats');

}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', ready);
} else {
	ready();
}

})();
