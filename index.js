const clear = require('clear')
const chalk = require('chalk')
const figlet = require('figlet')


const files = require('./lib/files');
const github = require('./lib/github');

clear();

console.log(
    chalk.yellow(
        figlet.textSync('vittli', { horizontalLayout: 'full' })
    )
)
const getGithubToken = async () => {
    // Fetch token from config store
    let token = github.getStoredGithubToken();
    if (token) {
        return token;
    }

    // No token found, use credentials to access GitHub account
    token = await github.getPersonalAccesToken();

    return token;
};

const run = async () => {
    let token = github.getStoredGithubToken();
    if (!token) {
        token = await github.getPersonalAccessToken();
    }
    console.log(token);
};

run()
