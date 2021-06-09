require('dotenv').config();
require('module-alias/register');

//This will print the bot_token
//console.log(process.env.DISCORDJS_BOT_TOKEN);

//We are importing client (its a class), from the discord.js
const { Client } = require('discord.js');
const loadCommands = require('@root/commands/load_cmd')
const loadFeatures = require('@root/features/load_feat')


//Creating the class
//Partials allow for previously stored objects in cache to be referenced
const bot_client = new Client({
    partials: ['MESSAGE', 'REACTION']
});
const PREFIX = process.env.PREFIX;

//Logs that the bot has logged on
bot_client.on('ready', async () => {
    console.log(`${bot_client.user.tag} has logged in`);

    loadCommands(bot_client)
    loadFeatures(bot_client)
})

//Logging into the client
bot_client.login(process.env.DISCORDJS_BOT_TOKEN);

//JSON Package notes: By implementing the "start" script, we can just type npm run start, and it runs the start etc.
// the dev command lets us quickly restart the process if we save the bot.js file (any changes)
