function gbfCharWiki(message, args) {
    
    //Link below has a total list of all the characters
    // https://gbf.wiki/All_Characters
    // Don't know how often it is updated
    if (args.length === 0) return message.channel.send('Please enter the character\'s name');
    console.log(`User wanted to search for: ${args[0]}`);
    message.channel.send("wikic is still in development. Check back later to see its functionalities!")
}

function gbfWeapWiki(message, args) {
    if (args.length === 0) return message.channel.send('Please enter the weapon\'s name');
    console.log(`User wanted to search for: ${args[0]}`);
    message.channel.send("wikiw is still in development. Check back later to see its functionalities!")
}

module.exports = { gbfCharWiki, gbfWeapWiki };