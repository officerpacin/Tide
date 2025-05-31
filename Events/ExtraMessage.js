const { PermissionFlagsBits } = require('discord.js');
const DataSchema = require('../Schemas/Data');
const config = require('../config.json');

module.exports = {
    event: 'messageCreate',
    once: false,
    execute: async (client, message) => {
        if (message.author.bot) return;

        const Data = await DataSchema.findOne({ key: 'bot' });

        const messageContent = message.content.trim().toLowerCase();
        const messageArgs = messageContent.split(/ +/);

        if (messageContent === `<@${config.client}> prefix`) {
            await message.reply({ content: `My current prefix is: \`${Data.prefix}\``, allowedMentions: { repliedUser: false } });
        } else if (messageContent.startsWith(`<@${config.client}> prefix set`)) {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== '681302226400313377') return await message.reply({ content: `You don't have permission to change the prefix!`, allowedMentions: { repliedUser: false }});

            const newPrefix = messageArgs[3];
            
            if (newPrefix === Data.prefix) return await message.reply({ content: `Error! This prefix is already in use. Please select a new prefix and try again.`, allowedMentions: { repliedUser: false }});

            Data.prefix = newPrefix;
            await Data.save();

            await message.reply({ content: `Successfully set the bot's prefix to \`${newPrefix}\``, allowedMentions: { repliedUser: false }});
        };
    },
};