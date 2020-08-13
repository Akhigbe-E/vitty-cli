const inquirer = require('inquirer');
const files = require('./files');

const filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore');
module.exports = {
    askForGithubLoginCredentials: () => {
        const questions = [
            {
                name: 'username',
                message: 'What is your github username or password:',
                type: 'text',
                validate: (value) => {
                    return !!value ? true : 'Kindly enter a valid username'
                }
            },
            {
                name: 'password',
                type: 'password',
                message: 'What is your password:',
                validate: (value) => {
                    return !!value ? true : 'Kindly enter a valid password'
                }
            }
        ]
        return inquirer.prompt(questions)
    },
    getTwoFactorAuthenticationCode: () => {
        return inquirer.prompt({
            name: 'twoFactorAuthenticationCode',
            type: 'input',
            message: 'Enter your two-factor authentication code:',
            validate: function (value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter your two-factor authentication code.';
                }
            }
        });
    },
    askRepoDetails: () => {
        const terminalValues = require('minimist')(process.argv.slice(2));
        return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Enter a name for the repository:',
                default: terminalValues._[0] || files.getCurrentDirectoryBase(),
                validate: (value) => {
                    return !!value ? true : 'Please enter a name for the repository.'
                }
            },
            {
                type: 'input',
                name: 'description',
                default: terminalValues._[1] || null,
                message: 'Optionally enter a description of the repository:'
            },
            {
                type: 'list',
                name: 'visibility',
                message: 'Public or private:',
                choices: ['public', 'private'],
                default: 'public'
            }
        ])
    },
    askIgnoreFiles: (filelist) => {
        const questions = [
            {
                type: 'checkbox',
                name: 'ignore',
                message: 'Select the files and/or folders you wish to ignore:',
                choices: filelist,
                default: ['node_modules', 'bower_components']
            }
        ];
        return inquirer.prompt(questions);
    },
}