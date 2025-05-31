const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    customId: 'qc-deny',
    execute: async (client, interaction) => {
        if (!interaction.member.roles.cache.has('1317602915422310421') && !interaction.member.roles.cache.has('1317604584805634078')) return await interaction.reply({ content: `This button is restricted to Quality Control.`, flags: ['Ephemeral'] });

        const ReviewerIcon = interaction.user.displayAvatarURL({ dynamic: true, size: 256 });
        const QCMessage = interaction.message;
        const QCEmbed = EmbedBuilder.from(QCMessage.embeds[0]);

        QCEmbed.data.color = 0xc4433a;
        QCEmbed.data.footer = { text: `Denied by: @${interaction.user.username}`, icon_url: ReviewerIcon };

        const ApproveButton = new ButtonBuilder()
            .setCustomId('qc-approve')
            .setLabel('Approve')
            .setStyle(ButtonStyle.Success)
            .setEmoji('<:Checkmark:1370830869807239198>')
            .setDisabled(true);

        const DenyButton = new ButtonBuilder()
            .setCustomId('qc-deny')
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('<:Cancel:1370830882763444335>')
            .setDisabled(true);

        const QCRow = new ActionRowBuilder().addComponents(ApproveButton, DenyButton);

        await QCMessage.edit({ embeds: [QCEmbed], components: [QCRow] });
        await interaction.reply({ content: `Successfully marked as denied!`, flags: ['Ephemeral'] });
    },
};