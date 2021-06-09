module.exports = (client) => {
    client.on('message', (message) => {
        const { content, author, channel, createdAt } = message;

        if (author.bot !== true) {
            console.log(`[${createdAt.getHours()}:${createdAt.getMinutes()}] in #${channel.name}: ${author.username}: ${content}`)
        }
    })
}