const GeneralSupportSchema = require('../../Schemas/GeneralSupport');
const TicketTool = require('../../Functions/Ticket Transcript');
const { PermissionFlagsBits } = require('discord.js');

module.exports = {
    customId: 'O-Confirm-Close',
    execute: async (client, interaction) => {
        const TicketSchema = await GeneralSupportSchema.findOne({ channelId: interaction.channel.id });
        if (!TicketSchema) return await interaction.reply({ content: `Error! Your ticket information could not be found.`, flags: ['Ephemeral'] });

        if (interaction.user.id === TicketSchema.creatorId) {
            await TicketTool.closeTicket(interaction, TicketSchema, `${TicketSchema.type} Order Ticket`, 'Closed By Owner');
        } else {
            await TicketTool.closeTicket(interaction, TicketSchema, `${TicketSchema.type} Order Ticket`, 'Closed By Staff');
        };
    },
};