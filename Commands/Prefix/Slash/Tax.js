const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tax')
        .setDescription('Calculate the Roblox tax on the inputted number.')
        .addNumberOption(option => option.setName('amount').setDescription('The amount of robux you want to calculate tax on!').setRequired(true)),
    execute: async (client, interaction) => {
        try {
            const Amount = interaction.options.getNumber('amount');

            const TaxEmbed = new EmbedBuilder()
                .setTitle('Roblox Tax Calculator')
                .setColor(0xEE3448)
                .addFields(
                    { name: 'Subtracting Tax', value: `${Math.floor(Amount * 0.7)}`, inline: true },
                    { name: 'Starting Amount', value: `${Amount}`, inline: true },
                    { name: 'Accounting For Tax', value: `${Math.floor(Amount / 0.7)}`, inline: true }
                );

            await interaction.reply({ embeds: [TaxEmbed] });
        } catch (error) {
            try {
                interaction.reply({ content: `There was an error while running this command!`, flags: ['Ephemeral'] });
            } catch {
                interaction.followUp({ content: `There was an error while running this command!`, flags: ['Ephemeral'] });
            }
            console.log(`There was an error while running the ${interaction.commandName} slash command. ${error}`);
        };
    },
};