const inquirer = require('inquirer');

module.exports = {
    askForGithubLoginCredentials: () => {
        const questions = [
            {
                name: 'username',
                message: 'What is your username:',
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
    }
}