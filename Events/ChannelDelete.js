const GeneralSupportSchema = require('../Schemas/GeneralSupport');
const ManagementSupportSchema = require('../Schemas/ManagementSupport');
const OrderSchema = require('../Schemas/Order');

module.exports = {
    event: 'channelDelete',
    once: false,
    execute: async (client, channel) => {
        try {
            await GeneralSupportSchema.findOneAndDelete({ channelId: channel.id });
            await ManagementSupportSchema.findOneAndDelete({ channelId: channel.id });
            await OrderSchema.findOneAndDelete({ channelId: channel.id });
        } catch (error) {
            console.error(`There was an error while deleting a ticket database. Error: ${error}`);
        };
    },
};