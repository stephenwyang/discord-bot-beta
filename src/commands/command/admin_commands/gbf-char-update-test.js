const axios = require('axios');
const cheerio = require('cheerio')
const extractInfo = require('@util/extract-info.js')

module.exports = {
    commands: ['updatetest'],
    expectedArgs: '', 
    permissionError: 'You don\'t have permission to run this command!',
    badArgsError: 'Incorrect number of arguments',
    minArgs: 0,
    // maxArgs:,
    callback: (message, arguments, text, client) => {
        //TODO: Implement functionality
        console.log("Testing web-scraping")
        if (arguments.length === 1) {
            extractInfo(`${arguments[0]}`)
            return
        }
        extractInfo("https://gbf.wiki/Narmaya_(Holiday)")
    },
    permissions: [],
    requiredRoles: [],
}