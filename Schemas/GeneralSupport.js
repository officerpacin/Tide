const { Schema, model } = require('mongoose');

const GeneralSupport = new Schema({
    creatorId: String,
    creatorTag: String,
    channelId: String,
    createdAt: String,
    creationReason: String,
    claimed: Boolean,
    claimedId: String
});

module.exports = model('GeneralSupport', GeneralSupport);