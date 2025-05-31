const { SlashCommandBuilder } = require('discord.js');
const Data = require('../../Schemas/Data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`See the current ping of the bot!`),
    execute: async (client, interaction) => {
        await interaction.reply({ content: `Pinging...`});
        try {
            const CurrentData = await Data.findOne({ key: 'bot' });
            const startTime = Math.round(CurrentData.startTime / 1000);

            const initialMessage = await interaction.fetchReply();
            const roundTripLatency = initialMessage.createdTimestamp - interaction.createdTimestamp;
            await initialMessage.edit(`<:PingPong:1353571627258089513> Pong!\n\n**Websocket Ping:** ${client.ws.ping}ms\n**Roundtrip Latency:** ${roundTripLatency}ms\n**Uptime:** <t:${startTime}:R>`);
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