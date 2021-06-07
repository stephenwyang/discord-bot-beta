module.exports = {
    commands: ['wikic', 'wikichar'],
    expectedArgs: '<char_name>', 
    permissionError: 'You don\'t have permission to run this command!',
    badArgsError: 'Please enter a character name to search!',
    minArgs: 1,
    // maxArgs: 
    callback: (message, arguments, text) => {
        //TODO: Implement the character_search
        console.log(`User wanted to search for: ${text}`);
        message.channel.send("Character search is still in development. Check back later to see its functionalities!");
    },
    permissions: [],
    requiredRoles: [],
}