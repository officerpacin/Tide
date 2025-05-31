const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'Order-Info',
    execute: async (client, interaction) => {
        const FirstInput = interaction.fields.getTextInputValue('First');
        const SecondInput = interaction.fields.getTextInputValue('Second');
        const ThirdInput = interaction.fields.getTextInputValue('Third');

        const Message = await interaction.channel.messages.fetch(interaction.message.id);
        const Embed = EmbedBuilder.from(Message.embeds[0]);
        Embed.data.fields[0].value = FirstInput;
        Embed.data.fields[1].value = SecondInput;
        Embed.data.fields[2].value = ThirdInput;

        const NoticeButton = new ButtonBuilder()
            .setLabel('Send References Below ▼')
            .setCustomId('N/A')
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true)

        const ActionRow = new ActionRowBuilder().addComponents(NoticeButton);

        await interaction.update({ embeds: [Embed], components: [ActionRow] });
        await interaction.followUp({ content: `Your information has been successfully saved! Please wait for a designer to assist you from here. If you have any refrences, please send them below.`, flags: ['Ephemeral'] });
    },
};