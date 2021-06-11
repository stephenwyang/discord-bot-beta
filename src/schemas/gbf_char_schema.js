const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
}

const gbfCharSchema = mongoose.Schema({
    _id: reqString,
    name: reqString,
    rarity: String,
    element: String,
    ougi: [String],
    sklSet1: [],
    sklSet2: {
        type: [],
        default: undefined
    },
    passives: {
        type: [],
        default: undefined
    }
})

module.exports = mongoose.model('Granblue-Characters', gbfCharSchema)