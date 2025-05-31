require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');
const fs = require('fs');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.DirectMessages
    ],
});

const Handlers = fs.readdirSync('./Handlers').filter(file => file.endsWith(".js"));
for (const file of Handlers) {
    require(`./Handlers/${file}`)(client);
};

client.login(process.env.TOKEN);

process.on('unhandledRejection', (reason, promise) => {
    console.error('There was an unhandled error!\n Promise:', promise, '\nReason:', reason);
});