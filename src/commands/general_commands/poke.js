module.exports = {
    commands: ['poke'],
    expectedArgs: '<discord_id>', 
    permissionError: 'You don\'t have permission to run this command!',
    badArgsError: 'Please specify user ID to poke',
    minArgs: 1,
    maxArgs: 1, 
    callback: (message, arguments, text, client) => {
        //TODO: Implement functionality
        const member = message.guild.members.cache.get(arguments[0]);
        const poker = message.author.username
        if (member) {
            message.channel.send(`${member} has been poked by ${poker}!`)
        } else {
            message.channel.send('That member was not found.')
        }
    },
    permissions: [],
    requiredRoles: [],
}