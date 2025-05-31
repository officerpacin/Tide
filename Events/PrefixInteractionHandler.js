const DataSchema = require('../Schemas/Data');

module.exports = {
    event: 'messageCreate',
    once: false,
    execute: async (client, message) => {
        const Data = await DataSchema.findOne({ key: 'bot' });
        if (!message.content.startsWith(Data.prefix) || message.author.bot) return;

        const MessageContent = message.content.slice(Data.prefix.length).trim().toLowerCase();
        const Arguements = MessageContent.split(/ +/); 
        const Command = client.prefixCommands.get(Arguements[0]);
        
        if (MessageContent.startsWith('#')) return;
        if (!Command) return await message.reply({ content: 'This command could not be found!', allowedMentions: { repliedUser: false } });

        Command.execute(client, message, Arguements);
    },
};