const { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require("discord.js");

module.exports = {
    customId: 'Support',
    execute: async (client, interaction) => {
        if (interaction.values.includes('Management')) {
            const ManagementModal = new ModalBuilder()
                .setCustomId('ManagementSupport')
                .setTitle('Management Inquiry');

            const InquiryInput = new TextInputBuilder()
                .setCustomId('Inquiry')
                .setLabel('Why are you opening this ticket?')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(1000);

            const ManagementActionRow = new ActionRowBuilder().addComponents(InquiryInput);
            ManagementModal.addComponents(ManagementActionRow);

            await interaction.showModal(ManagementModal);
        } else if (interaction.values.includes('General')) {
            const GeneralModal = new ModalBuilder()
                .setCustomId('GeneralSupport')
                .setTitle('General Inquiry');

            const InquiryInput = new TextInputBuilder()
                .setCustomId('Inquiry')
                .setLabel('Why are you opening this ticket?')
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
                .setMaxLength(1000);

            const GeneralActionRow = new ActionRowBuilder().addComponents(InquiryInput);
            GeneralModal.addComponents(GeneralActionRow);

            await interaction.showModal(GeneralModal);
        };
    },
};