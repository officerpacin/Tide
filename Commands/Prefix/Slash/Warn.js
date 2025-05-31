const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Warn a selected user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to warn.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you are warning this user.').setRequired(true)),
    execute: async (client, interaction) => {
        try {
            if (!PermissionFlagsBits.ModerateMembers) return await interaction.reply({ content: `Error! You do not have permission to run this command.` });

            const User = interaction.options.getUser('user');
            const Reason = interaction.options.getString('reason');
            const GuildUser = await interaction.guild.members.fetch(User.id) || 1;
            const SenderHighestRole = interaction.member.roles.highest.rawPosition;
            const UserHighestRole = GuildUser.roles.highest.rawPosition;

            if (interaction.user.id === User.id) return await interaction.reply({ content: `Error! You cannot warn yourself!` });
            if (User.id === interaction.guild.ownerId) return await interaction.reply({ content: `Error! You cannot warn the owner of this server.` });
            if (UserHighestRole >= SenderHighestRole) return await interaction.reply({ content: `Error! You cannot warn someone with equal or higher roles!` });

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /warn`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Target:** <@${User.id}> (@${User.tag})\n**Reason:** ${Reason}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await LogChannel.send({ embeds: [LogEmbed] });
            await interaction.reply({ content: `Successfully warned **${User.tag}** for **${Reason}**.` });
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