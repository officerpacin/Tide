const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const ManagementSupportSchema = require('../../Schemas/ManagementSupport');
const TicketTool = require('../../Functions/Ticket Transcript');

module.exports = {
    customId: 'Management-Close',
    execute: async (client, interaction) => {
        const TicketSchema = await ManagementSupportSchema.findOne({ channelId: interaction.channel.id });
        //if (!TicketSchema) return await interaction.reply({ content: `Error! Your ticket information could not be found.`, flags: ['Ephemeral'] });

        if (interaction.user.id !== TicketSchema.creatorId) {
            const CloseRequest = new EmbedBuilder()
                .setTitle('Close Request')
                .setDescription(`<@${interaction.user.id}> has requested to close this ticket. If the ticket has been dealt with, please click the close button below.`)
                .setColor(0xEE3448)

            const ConfirmClose = new ButtonBuilder()
                .setLabel('Close')
                .setCustomId('M-Confirm-Close')
                .setStyle(ButtonStyle.Danger)

            const Dismiss = new ButtonBuilder()
                .setLabel('Dismiss')
                .setCustomId('Dismiss')
                .setStyle(ButtonStyle.Secondary)

            const CloseRequestActionRow = new ActionRowBuilder().addComponents(ConfirmClose, Dismiss);
            return await interaction.reply({ content: `<@${TicketSchema.creatorId}>`, embeds: [CloseRequest], components: [CloseRequestActionRow] });
        };

        await TicketTool.closeTicket(interaction, TicketSchema, 'Management Support Ticket', 'Closed by ticket owner');
    },
};