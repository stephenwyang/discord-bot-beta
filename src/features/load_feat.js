const path = require('path')
const fs = require('fs')

module.exports = (client) => {
    const loadFeat = 'load_feat.js'

    const readFeatures = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readFeatures(path.join(dir, file))
            }
            else if (file !== loadFeat) {
                const feature = require(path.join(__dirname, dir, file))
                console.log(`Enabling the ${file} feature`)
                if (client) {
                    feature(client)
                }
            }
        }
    }

    readFeatures('.')
}