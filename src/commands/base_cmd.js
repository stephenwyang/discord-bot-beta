require('dotenv').config();

const PREFIX = process.env.PREFIX;

const validatePermissions = (permissions) => {
    const validPermmissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermmissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        //These are gonna be default values
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command.',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        badArgsError = 'Incorrect number of args to run this command',
        callback,
    } = commandOptions

    if (!commands) {
        return
    }

    //Make sure that the command/command names are in an array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    //Console logging our commands to see what is registered
    //console.log(`"${commands[0]}" has been registered.`)
    console.log(`Registering command "${commands[0]}"`)

    //Make sure the permissions are in an array and are valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }

        validatePermissions(permissions)
    }

    //Similar to the old code from the bot.js file, we are going to 
    //listen for messages and respond accordingly
    client.on('message', async (message) => {
        const {member, content, guild } = message;

        for (const alias of commands) {
            const command = `${PREFIX}${alias.toLowerCase()}`
            const [CMD_NAME, ...args] = message.content
                .trim()
                .substring(PREFIX.length)
                .split(/\s+/);
            if (content.toLowerCase().startsWith(`${command}` ) || content.toLowerCase() === command) {
                // A command has been run
                
                // General Check: Make sure member has permissions and or roles to run this command
                for (const permission of permissions) {
                    if(!member.hasPermission(permission)) {
                        message.channel.send(permissionError)
                        return
                    }
                }
                for (const reqRole of requiredRoles) {
                    const role = guild.roles.cache.find(
                        (role) => role.name === requiredRole
                    )

                    if (!role || !member.roles.cache.has(role.id)) {
                        message.channel.send(
                            `You must have the ${reqRole} role to use this command.`
                        )
                    }
                }
                
                // Now we have our arguments as args, lets do a quick sanity check before using the callback function
                if (args.length < minArgs || (maxArgs !== null && args.length > maxArgs)) {
                    message.channel.send(badArgsError)
                    return
                }

                //Finally call the callback
                callback(message, args, args.join(' '), client)
                
                return
            }
        }
    })

}