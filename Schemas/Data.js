const { Schema, model } = require('mongoose');

const DataSchema = new Schema({
    key: String,
    prefix: String,
    startTime: Number,
    orderStatus: {
        liveries: String,
        graphics: String,
        clothing: String,
        discord: String
    }
});

module.exports = model('data', DataSchema);