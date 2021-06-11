require('dotenv').config();

const mongoose = require('mongoose');
const mongoPath = process.env.MONGO_PATH;

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((m) => {
        console.log("Connected to DB")
    }).catch((err) => console.log(err));
    
    return mongoose
}
