const { ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const ManagementSupportSchema = require('../../Schemas/ManagementSupport');

module.exports = {
    customId: 'Management-Claim',
    execute: async (client, interaction) => {
        const TicketSchema = await ManagementSupportSchema.findOne({ channelId: interaction.channel.id });
        if (!TicketSchema) return await interaction.reply({ content: `Error! Your ticket information could not be found.`, flags: ['Ephemeral'] });

        if (TicketSchema.claimed) {
            const UnclaimButton = new ButtonBuilder().setLabel('Unclaim').setCustomId('Management-Unclaim').setStyle(ButtonStyle.Danger);
            const UnclaimButtonRow = new ActionRowBuilder().addComponents(UnclaimButton);

            if (interaction.user.id === TicketSchema.claimedId || interaction.permissions.has(PermissionFlagsBits.Administrator)) {
                await interaction.reply({ content: `This ticket has already been claimed. Do you want to unclaim it?`, components: [UnclaimButtonRow], flags: ['Ephemeral'] });
                return;
            } else {
                await interaction.reply({ content: `This ticket has already been claimed!`, flags: ['Ephemeral'] });
            };
        } else {
            if (interaction.member.roles.cache.has('1317604584805634078') || interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
                TicketSchema.claimed = true;
                TicketSchema.claimedId = interaction.user.id;
                await TicketSchema.save();

                const MainEmbed = new EmbedBuilder()
                    .setColor(0xEE3448)
                    .setDescription(`This ticket has been claimed by <@${interaction.user.id}>! Feel free to ask any questions you may have.`)

                await interaction.reply({ content: `<@${TicketSchema.claimedId}>`, embeds: [MainEmbed] });
            } else {
                await interaction.reply({ content: `You do not have permission to claim this ticket!`, flags: ['Ephemeral'] });
            };
        };
    },
};