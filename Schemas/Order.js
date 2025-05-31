const { Schema, model } = require('mongoose');

const OrderSchema = new Schema({
    creatorId: String,
    creatorTag: String,
    channelId: String,
    createdAt: Number,
    claimed: Boolean,
    claimedId: String,
    type: String,
    priority: Boolean
});

module.exports = model('orderTicket', OrderSchema);