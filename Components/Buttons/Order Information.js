const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const OrderSchema = require('../../Schemas/Order');

module.exports = {
    customId: 'OrderInformation',
    execute: async (client, interaction) => {
        const FoundSchema = await OrderSchema.findOne({ channelId: interaction.channel.id });
        if (!FoundSchema) return await interaction.reply({ content: `There was an error while retrieving your order data. Please try again later.`, flags: ['Ephemeral'] });

        if (interaction.user.id !== FoundSchema.creatorId) return await interaction.reply({ content: `Only the ticket creator can use this menu!`, flags: ['Ephemeral'] });

        const Modal = new ModalBuilder()
            .setCustomId('Order-Info')
            .setTitle('Order Information')

        if (FoundSchema.type === 'Graphic') {
            const GraphicType = new TextInputBuilder()
                .setCustomId('First')
                .setLabel('Graphic Type')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('What type of graphic design do you want?')
                .setRequired(true)

            const GraphicQuantity = new TextInputBuilder()
                .setCustomId('Second')
                .setLabel('Quantity')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('How many products do you want?')
                .setRequired(true)

            const GraphicDescription = new TextInputBuilder()
                .setCustomId('Third')
                .setLabel('Graphic Description')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Please provide a detailed description of desired product.')
                .setRequired(true)
                .setMinLength(30)

            const GraphicActionRow1 = new ActionRowBuilder().addComponents(GraphicType);
            const GraphicActionRow2 = new ActionRowBuilder().addComponents(GraphicQuantity);
            const GraphicActionRow3 = new ActionRowBuilder().addComponents(GraphicDescription);
            Modal.addComponents(GraphicActionRow1, GraphicActionRow2, GraphicActionRow3);
        } else if (FoundSchema.type === 'Livery') {
            const LiveryType = new TextInputBuilder()
                .setCustomId('First')
                .setLabel('Livery Type')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('What type of livery do you want?')
                .setRequired(true)

            const LiveryQuantity = new TextInputBuilder()
                .setCustomId('Second')
                .setLabel('Quantity')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('How many liveries do you want to purchase?')
                .setRequired(true)
                
            const LiveryDescription = new TextInputBuilder()
                .setCustomId('Third')
                .setLabel('Livery Description')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Please provide a detailed description of desired product.')
                .setRequired(true)
                .setMinLength(30)

            const LiveryActionRow1 = new ActionRowBuilder().addComponents(LiveryType);
            const LiveryActionRow2 = new ActionRowBuilder().addComponents(LiveryQuantity);
            const LiveryActionRow3 = new ActionRowBuilder().addComponents(LiveryDescription);
            Modal.addComponents(LiveryActionRow1, LiveryActionRow2, LiveryActionRow3);
        } else if (FoundSchema.type === 'Clothing') {
            const ClothingType = new TextInputBuilder()
                .setCustomId('First')
                .setLabel('Clothing Type')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('What type of clothing design would you like to purchase?')
                .setRequired(true)

            const ClothingQuantity = new TextInputBuilder()
                .setCustomId('Second')
                .setLabel('Quantity')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('How many pieces of clothing do you want to purchase?')
                .setRequired(true)

            const ClothingDescription = new TextInputBuilder()
                .setCustomId('Third')
                .setLabel('Clothing Description')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Please provide a detailed description of desired product.')
                .setRequired(true)
                .setMinLength(30)

            const ClothingActionRow1 = new ActionRowBuilder().addComponents(ClothingType);
            const ClothingActionRow2 = new ActionRowBuilder().addComponents(ClothingQuantity);
            const ClothingActionRow3 = new ActionRowBuilder().addComponents(ClothingDescription);
            Modal.addComponents(ClothingActionRow1, ClothingActionRow2, ClothingActionRow3);
        } else if (FoundSchema.type === 'Discord') {
            const DiscordType = new TextInputBuilder()
                .setCustomId('First')
                .setLabel('Discord Design Type')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('What type of Discord service are you looking for?')
                .setRequired(true)

            const DiscordQuantity = new TextInputBuilder()
                .setCustomId('Second')
                .setLabel('Quantity')
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('How many of this item do you want?')
                .setRequired(true)

            const DiscordDescription = new TextInputBuilder()
                .setCustomId('Third')
                .setLabel('Product Description')
                .setStyle(TextInputStyle.Paragraph)
                .setPlaceholder('Please provide a detailed description of desired product.')
                .setRequired(true)
                .setMinLength(30)

            const DiscordActionRow1 = new ActionRowBuilder().addComponents(DiscordType);
            const DiscordActionRow2 = new ActionRowBuilder().addComponents(DiscordQuantity);
            const DiscordActionRow3 = new ActionRowBuilder().addComponents(DiscordDescription);
            Modal.addComponents(DiscordActionRow1, DiscordActionRow2, DiscordActionRow3);
        };

        await interaction.showModal(Modal);
    },
};