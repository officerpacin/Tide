const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const OrderSchema = require('../../../Schemas/Order');

module.exports = {
    customId: 'Order',
    execute: async (client, interaction) => {
        if (interaction.values.includes('Regular')) {
            if (interaction.member.roles.cache.has('1345432007131529296')) return await interaction.reply({ content: `Order canceled! You cannot place an order as you have the order blacklist role.`, flags: ['Ephemeral'] });

            const ExistingData = await OrderSchema.findOne({ creatorId: interaction.user.id, priority: false });
            if (ExistingData) return await interaction.reply({ content: `You already have an order open! You can find your current order here: <#${ExistingData.channelId}>. If you believe this was an error, please contact support via <#1309598728184926248>,`, flags: ['Ephemeral'] });

            const TOSEmbed = new EmbedBuilder()
                .setTitle('Tide Studios Order Terms')
                .setColor(0xEE3448)
                .setDescription('In order to place an order, you will be required to agree to our Order Terms. Failure to agree to our Terms will cause an immediate dismissal of your order. You may find our Order Terms [here](https://docs.google.com/document/d/169fTAO5k-pWJFuCy1MT_Pa_RO6CabaPxvLlKlOwCuqo/edit?tab=t.0#heading=h.v0xalj9ip4ii) or by clicking the button below.\n\nTo continue with your order, please click the "I Agree" button below.')

            const AgreeButton = new ButtonBuilder()
                .setLabel('I Agree')
                .setCustomId('Order-Agree')
                .setStyle(ButtonStyle.Success)

            const ViewTermsButton = new ButtonBuilder()
                .setLabel('View Terms')
                .setStyle(ButtonStyle.Link)
                .setURL('TBD')

            const DeclineButton = new ButtonBuilder()
                .setLabel('Decline Terms')
                .setCustomId('Order-Decline')
                .setStyle(ButtonStyle.Danger)

            const TermsActionRow = new ActionRowBuilder().addComponents(AgreeButton, ViewTermsButton, DeclineButton);

            await interaction.reply({ embeds: [TOSEmbed], components: [TermsActionRow], flags: ['Ephemeral'] });
        };
        if (interaction.values.includes('Priority')) {
            if (!interaction.member.roles.cache.has('1378215440228155412')) return await interaction.reply({ content: `Only members with the priority role may open priority orders!`, flags: ['Ephemeral'] });

            const TOSEmbed = new EmbedBuilder()
                .setTitle('Tide Order Terms')
                .setColor(0xEE3448)
                .setDescription('In order to place an order, you will be required to agree to our Order Terms. Failure to agree to our Terms will cause an immediate dismissal of your order. You may find our Order Terms [here](https://docs.google.com/document/d/169fTAO5k-pWJFuCy1MT_Pa_RO6CabaPxvLlKlOwCuqo/edit?tab=t.0#heading=h.v0xalj9ip4ii) or by clicking the button below.\n\nTo continue with your order, please click the "I Agree" button below.')

            const AgreeButton = new ButtonBuilder()
                .setLabel('I Agree')
                .setCustomId('Priority-Agree')
                .setStyle(ButtonStyle.Success)

            const ViewTermsButton = new ButtonBuilder()
                .setLabel('View Terms')
                .setStyle(ButtonStyle.Link)
                .setURL('TBD')

            const DeclineButton = new ButtonBuilder()
                .setLabel('Decline Terms')
                .setCustomId('Order-Decline')
                .setStyle(ButtonStyle.Danger)

            const TermsActionRow = new ActionRowBuilder().addComponents(AgreeButton, ViewTermsButton, DeclineButton);

            await interaction.reply({ embeds: [TOSEmbed], components: [TermsActionRow], flags: ['Ephemeral'] });
        };
    },
};