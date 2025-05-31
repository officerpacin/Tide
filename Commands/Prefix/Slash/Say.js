const { SlashCommandBuilder, MessageFlags, EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('say')
        .setDescription('Say a message through the bot!')
        .addStringOption(option => option.setName('message').setDescription('The message you want the bot to say.').setRequired(true))
        .addUserOption(option => option.setName('user').setDescription('Select a user to directly message this to instead!'))
        .addChannelOption(option => option.setName('channel').setDescription('Select a channel to send this message to. (Defaults to the channel this was executed in.)').addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator) && interaction.user.id !== '681302226400313377') return await interaction.reply({ content: `Error! You don't have permission to run this command!` });

            const Message = interaction.options.getString('message');
            const Channel = interaction.options.getChannel('channel') || interaction.channel;
            const User = interaction.options.getUser('user') || '';

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /say`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            if (User) {
                if (User.id === interaction.user.id) return await interaction.reply({ content: 'You cannot message yourself!' });
                if (User.bot) return await interaction.reply({ content: `You cannot send messages to bots!` });
                try {
                    await User.send({ content: Message });
                } catch (error) {
                    return await interaction.reply({ content: `There was an error while messaging this user. This may be due to the fact they have their direct messages disabled.`, flags: MessageFlags.Ephemeral });
                };
                await interaction.reply({ content: `Successfully sent your message to **${User.tag}**.`, flags: MessageFlags.Ephemeral });
                LogEmbed.setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**User:** <@${User.id}> (@${User.tag})\n**Message:** ${Message}`);
                await LogChannel.send({ embeds: [LogEmbed] });
            } else {
                await Channel.send({ content: Message });
                await interaction.reply({ content: `Successfully sent your message to <#${Channel.id}>`, flags: MessageFlags.Ephemeral });
                LogEmbed.setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Channel:** ${Channel} \n**Message:** ${Message}`);
                await LogChannel.send({ embeds: [LogEmbed] });
            }
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