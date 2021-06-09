module.exports = {
    commands: ['wikiw', 'wikiweap'],
    expectedArgs: '<weap_name>', 
    permissionError: 'You don\'t have permission to run this command!',
    badArgsError: 'Please enter a weapon name to search!',
    minArgs: 1,
    // maxArgs: 
    callback: (message, arguments, text) => {
        //TODO: Implement the weapon_search
        console.log(`User wanted to search for: ${text}`);
        message.channel.send("Weapon search is still in development. Check back later to see its functionalities!");
    },
    permissions: [],
    requiredRoles: [],
}