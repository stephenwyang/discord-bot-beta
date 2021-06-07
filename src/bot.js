require('dotenv').config();

//This will print the bot_token
//console.log(process.env.DISCORDJS_BOT_TOKEN);

//We are importing client (its a class), from the discord.js
//Also importing path/fs, based off of Worn-Off-Keys tutorial for a command_base
const { Client } = require('discord.js');
const path = require('path')
const fs = require('fs')

//Creating the class
//Partials allow for previously stored objects in cache to be referenced
const bot_client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = process.env.PREFIX;

//Logs that the bot has logged on
bot_client.on('ready', async () => {
    console.log(`${bot_client.user.tag} has logged in`);

    const baseFile = 'base_cmd.js';
    const templateFile = 'command_template.js';
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = (dir) => {
        const files = fs.readdirSync(path.join(__dirname, dir));
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file));
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            }
            else if (file !== baseFile && file !== templateFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(bot_client, option)
            }
        }
    }

    readCommands('commands');
})

/*
//Code for reading prefixes
bot_client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(PREFIX)) {
        //Since we are trimming/splitting, we are putting the CMD_NAME at the front, and the rest is in args array
        //Unpacking elements in an array, '...' is the spreader operator (stores all args, instead of just the first)
        //We use REGEX to take all whitespaces
        const [CMD_NAME, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);
        if (CMD_NAME === 'kick') {
            //message.channel.send(`${args} has been kicked`);
            kickUser(message, args)
        } else if (CMD_NAME === 'poke') {
            pokeUser(message, args)
        } else if (CMD_NAME === 'wikic') {
            gbf_w.gbfCharWiki(message, args)
        } else if (CMD_NAME === 'wikiw') {
            gbf_w.gbfWeapWiki(message, args)
        }
        
        else {
            message.channel.send("Command not found. Use %help to get a list of commands that can be used with this bot!")
        }
    }
})

function kickUser(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) 
            return message.reply('You do not have permissions to use that command');
    if (args.length === 0) return message.channel.send('Please provide an ID');
    const member = message.guild.members.cache.get(args[0])
    if (member) {
        member
            .kick()
            .then((member) => message.channel.send(`${member} was kicked.`))
            .catch((err) => message.channel.send('I cannot kick that user'));
    } else {
        message.channel.send('That member was not found')
    }
}

function pokeUser(message, args) {
    //message.channel.send("Who do you want to poke?")
    if (args.length === 0) return message.channel.send('Please provide an ID');
    const member = message.guild.members.cache.get(args[0])
    if (member) {
        message.channel.send(`You have poked <@${args[0]}>`)
    } else {
        message.channel.send('That member was not found')
    }
}

*/

//Logging into the client
bot_client.login(process.env.DISCORDJS_BOT_TOKEN);

//JSON Package notes: By implementing the "start" script, we can just type npm run start, and it runs the start etc.
// the dev command lets us quickly restart the process if we save the bot.js file (any changes)
