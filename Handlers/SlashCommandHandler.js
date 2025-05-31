require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

module.exports = async function (client) {
    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    client.slashCommands = new Map();
    const Commands = [];
    const CommandsFolder = fs.readdirSync('./Commands/Slash').filter(command => command.endsWith(".js"));
    const SlashCommandPath = path.join(__dirname, '../Commands/Slash');

    try {
        for (const File of CommandsFolder) {
            const FilePath = path.join(SlashCommandPath, File);
            const Command = require(FilePath);

            const CommandData = Command.data.toJSON();
            client.slashCommands.set(CommandData.name, Command);
            Commands.push(CommandData); 
        };
        
        await rest.put(
            Routes.applicationGuildCommands(config.client, config.guild),
            { body: Commands }
        );
        
        console.log('Successfully registered all slash commands!');
    } catch (error) {
        console.error(`There was an error while registering slash commands. Error: ${error}`);
    };
};