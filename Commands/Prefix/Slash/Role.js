const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('role')
        .setDescription('Role Commands...')
        .addSubcommand(command =>
            command.setName('add')
                .setDescription('Add a role to the selected user!')
                .addUserOption(option => option.setName('user').setDescription('The user you want to give the role to!').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('The role you want to give to this user.').setRequired(true))
        )
        .addSubcommand(command =>
            command.setName('remove')
                .setDescription('Remove a role from the selected user!')
                .addUserOption(option => option.setName('user').setDescription('The user you want to remove a role from!').setRequired(true))
                .addRoleOption(option => option.setName('role').setDescription('The role you want to remove from this user.').setRequired(true))
        ),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) return await interaction.reply({ content: `Error! You don't have permission to manage members!` });

            const Role = interaction.options.getRole('role');
            const User = interaction.options.getUser('user');
            const GuildUser = await interaction.guild.members.fetch(User.id);
            const SenderHighestRole = interaction.member.roles.highest;
            const UserHighestRole = GuildUser.roles.highest;

            if (interaction.user.id === User.id) return await interaction.reply({ content: `Error! You cannot give/take roles from yourself!` });
            if (UserHighestRole.rawPosition >= SenderHighestRole.rawPosition && interaction.user.id !== interaction.guild.ownerId) return await interaction.reply({ content: `Error! You cannot give/take roles from someone with equal or higher roles than you!` });
            if (Role.rawPosition >= SenderHighestRole.rawPosition) return await interaction.reply({ content: `Error! You cannot give/take roles equal or higher than your own! ` });

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const SubCommand = interaction.options.getSubcommand();
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /role ${SubCommand}`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Target:** <@${User.id}> (@${User.tag})\n**Role:** <@&${Role.id}> (@${Role.name})`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            if (SubCommand === 'add') {
                if (GuildUser.roles.cache.has(Role.id)) return await interaction.reply({ content: `Error! This user already has the **${Role.name}** role!` });

                try {
                    await GuildUser.roles.add(Role);
                    await interaction.reply({ content: `Successfully gave **${User.tag}** the **${Role.name}** role!` });
                    await LogChannel.send({ embeds: [LogEmbed] });
                } catch (error) {
                    await interaction.reply({ content: `There was an error while adding their role!`, flags: MessageFlags.Ephemeral });
                    console.error(`There was an error while running the role add slash command! ${error}`);
                };
            } else {
                if (!GuildUser.roles.cache.has(Role.id)) return await interaction.reply({ content: `Error! This user does not have the **${Role.name}** role!` });

                try {
                    await GuildUser.roles.remove(Role);
                    await interaction.reply({ content: `Successfully removed the **${Role.name}** role from **${User.tag}**!` });
                    await LogChannel.send({ embeds: [LogEmbed] });
                } catch (error) {
                    await interaction.reply({ content: `There was an error while removing their role!`, flags: MessageFlags.Ephemeral });
                    console.error(`There was an error while running the role remove slash command! ${error}`);
                };
            };
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