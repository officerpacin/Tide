module.exports = {
    customId: 'Order-Decline',
    execute: async (client, interaction) => {
        await interaction.update({ content: `<:Closed:1356484141931167757> The order system has been canceled!`, embeds: [], components: [] });
    },
};