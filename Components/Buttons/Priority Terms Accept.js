const { EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    customId: 'Priority-Agree',
    execute: async (client, interaction) => {
        const PanelEmbed = new EmbedBuilder()
            .setTitle('WTX Order Type')
            .setColor(0xEE3448)
            .setDescription('You have successfully agreed to our terms of service! To continue with the ordering process, please select the type of order you would like to place. If you are unsure of which category best fits your needs, please select the option you believe best fits your needs.')

        const PanelSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('Priority-Order-Place')
            .setPlaceholder('Chose your order type')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Graphic')
                    .setValue('Graphic')
                    .setEmoji('<:Graphics:1360089905228681340>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Livery')
                    .setValue('Livery')
                    .setEmoji('<:Livery:1360092073478455466>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Clothing')
                    .setValue('Clothing')
                    .setEmoji('<:Clothing:1360090681485295616>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Discord')
                    .setValue('Discord')
                    .setEmoji('<:Discord:1360089038551253192>')
            );

        const PanelActionRow = new ActionRowBuilder().addComponents(PanelSelectMenu);

        await interaction.update({ embeds: [PanelEmbed], components: [PanelActionRow] });
    },
};