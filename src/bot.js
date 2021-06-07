require('dotenv').config();

//This will print the bot_token
//console.log(process.env.DISCORDJS_BOT_TOKEN);

//We are importing client (its a class), from the discord.js
const { Client } = require('discord.js');

//Importing individual classes for code readibility
const gbf_w = require('./gbf_wiki.js');

//Creating the class
//Partials allow for previously stored objects in cache to be referenced
const bot_client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = "%"

//Logs that the bot has logged on
bot_client.on('ready', () => {
    console.log(`${bot_client.user.tag} has logged in`)
})

/*

Example code for the message, reference if need to know how it worked

bot_client.on('message', (message) => {
    if (message.author.bot) return;
    console.log(`[${message.author.tag}]: ${message.content}`)
    //message.content has the actual string
    if (message.content === 'hello') {
        //message.reply will tag the user
        //code
        //message.reply(`Hello!`)

        //If we want to send the message to the channel without pinging (specific), we need to use the code below
        message.channel.send('hello')
        //Send will default not ignore bot messages, we need to watch out for it
        //If statement in the top will ignore bot messages
    }
})
*/

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


//Logging into the client
bot_client.login(process.env.DISCORDJS_BOT_TOKEN);

//JSON Package notes: By implementing the "start" script, we can just type npm run start, and it runs the start etc.
// the dev command lets us quickly restart the process if we save the bot.js file (any changes)
