const CLI = require('clui')
const ConfigStore = require('ConfigStore')
const Octokit = require('@octokit/rest');
const Spinner = CLI.Spinner;

const { createBasicAuth } = require("@octokit/auth-basic");

const inquirer = require('./inquirer')
const pkg = require('../package.json')

const conf = new ConfigStore(pkg.name);

let octokit;

module.exports = {
    getInstance: () => octokit,
    getStoredGithubToken: () => conf.get('github.token'),
    getPersonalAccessToken: async () => {
        const { username, password } = await inquirer.askForGithubLoginCredentials()
        const status = new Spinner('Authenticating...', ['Vi', 'Vi', 'Vi', 'Vita', 'Vita', 'Vita', 'Vitamin', 'Vitamin', 'Vitamin']);
        status.start()
        const auth = createBasicAuth({
            username,
            password,
            async on2Fa() {
                // prompt user for the one-time password retrieved via SMS or authenticator app
                const res = await inquirer.getTwoFactorAuthenticationCode();
                status.start();
                return res.twoFactorAuthenticationCode;
            },
            token: {
                scopes: ['user', 'public_repo', 'repo', 'repo:status'],
                note: 'vittli, the command-line tool for initalizing Git repos'
            }
        });
        try {
            const res = await auth({ type: 'token' });
            if (res.token) {
                conf.set('github.token', res.token);
                return res.token;
            } else {
                throw new Error("GitHub token was not found in the response");
            }
        } finally {
            status.stop();
        }

    },
    githubAuth: (token) => {
        octokit = new Octokit({
            auth: token
        });
    },
}