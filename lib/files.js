// FOR BASIC FILE MANAGEMENT

const fs = require('fs')
const path = require('path')


module.exports = {
    getCurrentDirectoryBase: () => {
        return (path.basename(process.cwd()))
    },
    hasDirectory: (filePath) => {
        return fs.existsSync(filePath)
    },
    filelist = _.without(fs.readdirSync('.'), '.git', '.gitignore')
}
