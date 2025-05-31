const { Schema, model } = require('mongoose');

const ManagementSupport = new Schema({
    creatorId: String,
    creatorTag: String,
    channelId: String,
    createdAt: String,
    creationReason: String,
    claimed: Boolean,
    claimedId: String
});

module.exports = model('ManagementSupport', ManagementSupport);