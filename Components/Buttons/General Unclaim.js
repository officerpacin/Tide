const { EmbedBuilder } = require('discord.js');
const GeneralSupportSchema = require('../../Schemas/GeneralSupport');

module.exports = {
    customId: 'General-Unclaim',
    execute: async (client, interaction) => {
        const TicketSchema = await GeneralSupportSchema.findOne({ channelId: interaction.channel.id });
        if (!TicketSchema) return await interaction.reply({ content: `Error! Your ticket information could not be found.`, flags: ['Ephemeral'] });

        TicketSchema.claimed = false;
        TicketSchema.claimedId = '';
        await TicketSchema.save();

        const MainEmbed = new EmbedBuilder()
            .setColor(0xEE3448)
            .setTitle('Ticket Unclaimed')
            .setDescription(`Unfortunately this ticket has been unclaimed by <@${interaction.user.id}>. If you still have questions to be answered, please wait for a new support member to claim this ticket.`)

        await interaction.reply({ content: `<@${TicketSchema.creatorId}>`, embeds: [MainEmbed] });
    },
};