const mongo = require('@util/mongo')
const gbfCharSchema = require('@schemas/gbf_char_schema')
const name = "Beta"

module.exports = async (client) => {
    client.on('message', async (message) => {
        const { content } = message;

        if (content === "testactivate123") {
            return await mongo().then(async (mongoose) => {
                try {
                    console.log('Adding testChara');
                    const testChara = await gbfCharSchema.create({
                        _id: 1,
                        name: `${name}`,
                        rarity: "SSR",
                        element: "Fire",
                        ougi: ["Ougi 1", "Ougi 2"],
                        sklSet1: ["Skill1", "Skill2", "Skill3"],
                        passives: ["Passive1"]
                    })
                } finally {
                    mongoose.connection.close()
                    console.log('Connection to DB closed')
                }
            })
        } else if (content === "testactivate1234") {
            return await mongo().then(async (mongoose) => {
                try {
                    console.log('Adding testChara');
                    const testChara = await gbfCharSchema.create({
                        _id: 2,
                        name: `${name}2`,
                        rarity: "R",
                        element: "Fire",
                        ougi: "Ougi1",
                        sklSet1: ["Skill1", "Skill2", "Skill3"],
                        passives: ["Passive1"]
                    })
                } finally {
                    mongoose.connection.close()
                    console.log('Connection to DB closed')
                }
            })
        }
    })
}