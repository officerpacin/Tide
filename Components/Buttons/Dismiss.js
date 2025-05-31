module.exports = {
    customId: 'Dismiss',
    execute: async (client, interaction) => {
        await interaction.message.delete();
    },
};