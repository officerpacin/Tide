const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('Kick a selected user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to kick.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to kick this user.').setRequired(true).setMinLength(1)),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) return await interaction.reply({ content: `Error! You don't have permission to kick members!` });

            const Reason = interaction.options.getString('reason');
            const User = interaction.options.getUser('user');
            const GuildUser = await interaction.guild.members.fetch(User.id);
            const SenderHighestRole = interaction.member.roles.highest.rawPosition;
            const UserHighestRole = GuildUser.roles.highest.rawPosition;

            if (interaction.user.id === User.id) return await interaction.reply({ content: `Error! You cannot kick yourself!` });
            if (User.id === interaction.guild.ownerId) return await interaction.reply({ content: `Error! You cannot kick the owner of the server.` });
            if (UserHighestRole >= SenderHighestRole && interaction.user.id !== interaction.guild.ownerId) return await interaction.reply({ content: 'Error! You cannot kick someone with equal or higher roles!' });

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /kick`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Target:** <@${User.id}> (@${User.tag})\n**Reason:** ${Reason}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await GuildUser.kick({ reason: Reason });
            await interaction.reply(`Successfully kicked **${User.tag}** for **${Reason}**.`);
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