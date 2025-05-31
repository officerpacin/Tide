const {} = require('discord.js');
const OrderSchema = require('../../Schemas/Order');

module.exports = {
    customId: 'Order-Claim',
    execute: async (client, interaction) => {
        const FoundSchema = await OrderSchema.findOne({ channelId: interaction.channel.id });
        if (!FoundSchema) return await interaction.reply({ content: `There was an error while finding your ticket data!`, flags: ['Ephemeral'] });

        if (!interaction.member.roles.cache.has('1317603145979002880')) return await interaction.reply({ content: `Only designers can claim orders!`, flags: ['Ephemeral'] });
        if (interaction.member.roles.cache.has('1339695179405463644')) return await interaction.reply({ content: `You cannot claim new orders while on LOA!`, flags: ['Ephemeral'] });

        if (FoundSchema.claimed) return await interaction.reply({ content: `This ticket has already been claimed by <@${FoundSchema.claimedId}>!`, flags: ['Ephemeral'] });

        try {
            FoundSchema.claimed = true;
            FoundSchema.claimedId = interaction.user.id;

            await FoundSchema.save();
            await interaction.reply(`<@${interaction.user.id}> has claimed this ticket!`);
        } catch (error) {
            await interaction.reply({ content: `There was an error while saving your data!`, flags: ['Ephemeral'] });
            console.log(error);
        };
        
        if (FoundSchema.priority === true) {
            await interaction.channel.setTopic(`<:Priority:1356437477300375723> Priority | Created By: <@${FoundSchema.creatorId}> | Claimed By: <@${interaction.user.id}>`)
        } else {
            await interaction.channel.setTopic(`Created By: <@${FoundSchema.creatorId}> | Claimed By: <@${interaction.user.id}>`)
        };
    },
};