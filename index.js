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
// if (files.hasDirectory('.git')) {
//     console.log(chalk.red('Already a Git repository!'));
//     process.exit();
// }

const run = async () => {
    let token = github.getStoredGithubToken();
    if (!token) {
        token = await github.getPersonalAccessToken();
    }
    console.log(token);
};

run()
