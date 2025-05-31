const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Ban a selected user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to ban.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to ban this user.').setRequired(true).setMinLength(1))
        .addNumberOption(option => option.setName('purge-hours').setDescription(`Select how many hours of messages you want to delete from this user. (Default: 1 hour)`).setMaxValue(168)),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) return await interaction.reply({ content: `Error! You don't have permission to ban members!` });

            const Reason = interaction.options.getString('reason');
            const User = interaction.options.getUser('user');
            const PurgeTime = interaction.options.getNumber('purge-hours');
            const GuildUser = await interaction.guild.members.fetch(User.id) || 1;
            const SenderHighestRole = interaction.member.roles.highest.rawPosition;
            const UserHighestRole = GuildUser.roles.highest.rawPosition;

            if (interaction.user.id === User.id) return await interaction.reply({ content: `Error! You cannot ban yourself!` });
            if (User.id === interaction.guild.ownerId) return await interaction.reply({ content: `Error! You cannot ban the owner of the server.` });
            if (UserHighestRole >= SenderHighestRole && interaction.user.id !== interaction.guild.ownerId) return await interaction.reply({ content: 'Error! You cannot ban someone with equal or higher roles!' });

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /ban`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Target:** <@${User.id}> (@${User.tag})\n**Reason:** ${Reason}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await GuildUser.ban({ deleteMessageSeconds: PurgeTime * 3600, reason: `Executed by: @${interaction.user.username}. Reason: ${Reason}` });
            await interaction.reply(`Successfully banned **${User.tag}** for **${Reason}**.`);
            await LogChannel.send({ embeds: [LogEmbed] });
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