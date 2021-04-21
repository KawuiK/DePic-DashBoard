const mongoose = require("mongoose")
const Schema = mongoose.Schema

const prefix = new Schema({
    Guild: String,
    Prefix: String,
})
module.exports = mongoose.model(`prefix`, prefix)