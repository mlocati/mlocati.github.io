(function() {
'use strict';

const LS_PREFIX = 'deployWithGitPush.';

const DEFAULT_SERVER_ADDRESS = 'www.example.com';
const DEFAULT_REPOSITORY_NAME = 'MYSITE';
const DEFAULT_REPOSITORY_BRANCH = 'main';
const DEFAULT_WEB_USER = 'www-data';
const DEFAULT_WEB_USER_GROUP = 'www-data';
const DEFAULT_CONCRETE_CMS_LOCALES = [];
const DEFAULT_GITHUB_PAT = 'YOUR_TOKEN';

function ready() {
    Vue.createApp({
	    data() {
		    return {
                inputServerAddress: '',
                inputRepositoryName: '',
                inputRepositoryBranch: '',
                inputWebUser: '',
                inputWebUserGroup: '',
                inputConcreteCMSLocales: '',
                runComposerInstall: false,
                updateConcreteCMS: false,
                inputGitHubPAT: '',
    		};
        },
        computed: {
            serverAddress() {
                return this.inputServerAddress.replace(/\s+/g, '') || DEFAULT_SERVER_ADDRESS;
            },
            repositoryName() {
                return this.inputRepositoryName.replace(/^[\s.]+|[\s.]+$/g, '').replace(/[\/\\]+/, '').replace(/\.git$/i, '') || DEFAULT_REPOSITORY_NAME;
            },
            repositoryBranch() {
                return this.inputRepositoryBranch.replace(/\s+/g, '') || DEFAULT_REPOSITORY_BRANCH;
            },
            webUser() {
                return this.inputWebUser.replace(/\s+/g, '') || DEFAULT_WEB_USER;
            },
            webUserGroup() {
                return this.inputWebUserGroup.replace(/\s+/g, '') || DEFAULT_WEB_USER_GROUP;
            },
            concreteCMSLocales() {
                return this.inputConcreteCMSLocales
                    .split(/[\s,;]+/)
                    .map(locale => {
                        const m = locale.match(/^([a-z]{2})([_\-][A-Z]{2})?$/i);
                        if (!m) {
                            return '';
                        }
                        return m[1].toLowerCase() + (m[2] ? ('_' + m[2].substring(1).toUpperCase()) : '');
                    })
                    .filter(locale => locale.length > 0)
                    .filter((locale, index, array) => array.indexOf(locale) === index)
                ;
            },
            gitHubPAT() {
                return this.inputGitHubPAT.replace(/\s+/g, '') || DEFAULT_GITHUB_PAT;
            },
            visudoCommands() {
                const cmds = ['/usr/bin/git'];
                if (this.runComposerInstall) {
                    cmds.push('/usr/bin/composer');
                }
                if (this.updateConcreteCMS) {
                    cmds.push('/usr/local/bin/update-concrete');
                }
                return cmds.join(', ');
            },
            hookOptions() {
                const options = [
                    '--branch', `'${this.repositoryBranch}'`,
                ];
                if (this.runComposerInstall) {
                    options.push('--composer');
                }
                if (this.updateConcreteCMS) {
                    options.push('--concrete');
                    if (this.concreteCMSLocales.length > 0) {
                        options.push('--concrete-locales');
                        options.push(`'${this.concreteCMSLocales.join(' ')}'`);
                    }
                }
                return options.join(' ') + ' ';
            },
        },
        watch: {
            serverAddress(newValue) {
                localStorage.setItem(LS_PREFIX + 'serverAddress', newValue);
            },
            repositoryName(newValue) {
                localStorage.setItem(LS_PREFIX + 'repositoryName', newValue);
            },
            repositoryBranch(newValue) {
                localStorage.setItem(LS_PREFIX + 'repositoryBranch', newValue);
            },
            webUser(newValue) {
                localStorage.setItem(LS_PREFIX + 'webUser', newValue);
            },
            webUserGroup(newValue) {
                localStorage.setItem(LS_PREFIX + 'webUserGroup', newValue);
            },
            concreteCMSLocales(newValue) {
                localStorage.setItem(LS_PREFIX + 'concreteCMSLocales', newValue.join(' '));
            },
            runComposerInstall(newValue) {
                localStorage.setItem(LS_PREFIX + 'runComposerInstall', newValue ? 'true' : 'false');
                this.updateTOC();
            },
            updateConcreteCMS(newValue) {
                localStorage.setItem(LS_PREFIX + 'updateConcreteCMS', newValue ? 'true' : 'false');
                this.updateTOC();
            },
            gitHubPAT(newValue) {
                localStorage.setItem(LS_PREFIX + 'gitHubPAT', newValue);
            },
        },
        mounted() {
            this.inputServerAddress = (localStorage.getItem(LS_PREFIX + 'serverAddress') || '').replace(/\s+/g, '') || DEFAULT_SERVER_ADDRESS;
            this.inputRepositoryName = (localStorage.getItem(LS_PREFIX + 'repositoryName') || '').replace(/\s+/g, '') || DEFAULT_REPOSITORY_NAME;
            this.inputRepositoryBranch = (localStorage.getItem(LS_PREFIX + 'repositoryBranch') || '').replace(/\s+/g, '') || DEFAULT_REPOSITORY_BRANCH;
            this.inputWebUser = (localStorage.getItem(LS_PREFIX + 'webUser') || '').replace(/\s+/g, '') || DEFAULT_WEB_USER;
            this.inputWebUserGroup = (localStorage.getItem(LS_PREFIX + 'webUserGroup') || '').replace(/\s+/g, '') || DEFAULT_WEB_USER_GROUP;
            const storedCMSLocales = localStorage.getItem(LS_PREFIX + 'concreteCMSLocales');
            this.inputConcreteCMSLocales = storedCMSLocales === null ? DEFAULT_CONCRETE_CMS_LOCALES.join(' ') : storedCMSLocales;
            this.runComposerInstall = (localStorage.getItem(LS_PREFIX + 'runComposerInstall') || 'true') === 'true';
            this.updateConcreteCMS = (localStorage.getItem(LS_PREFIX + 'updateConcreteCMS') || 'true') === 'true';
            this.inputGitHubPAT = (localStorage.getItem(LS_PREFIX + 'gitHubPAT') || '').replace(/\s+/g, '') || DEFAULT_GITHUB_PAT;
            this.updateTOC();
        },
        methods: {
            async updateTOC() {
                const show = (el, visible) => {
                    const subject = el.closest('li') || el;
                    subject.style.display = visible ? '' : 'none';
                };
                await this.$nextTick();
                document.querySelectorAll('#markdown-toc-install-and-configure-composer').forEach(el => show(el, this.runComposerInstall));
                document.querySelectorAll('#markdown-toc-script-to-update-concretecms').forEach(el => show(el, this.updateConcreteCMS));
             },
        },
    }).mount('#deploy-with-git-push-app');
	

}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ready());
} else {
    ready();
}

})();