const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute a selected user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to mute.').setRequired(true))
        .addStringOption(option => option.setName('duration').setDescription('The amount of time you want to mute this user for.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason you want to mute this user.').setRequired(true)),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.permissions.has(PermissionFlagsBits.MuteMembers)) return await interaction.reply({ content: `Error! You don't have permission to mute members!` });

            const User = interaction.options.getUser('user');
            const InputDuration = interaction.options.getString('duration');
            const Reason = interaction.options.getString('reason');
            const GuildUser = await interaction.guild.members.fetch(User.id);
            const SenderHighestRole = interaction.member.roles.highest.rawPosition;
            const UserHighestRole = GuildUser.roles.highest.rawPosition;

            const RegexInput = InputDuration.match(/^(\d+)([mhd])$/i);

            if (!RegexInput) return await interaction.reply({ content: `Error! Please specify the time duration using one of the prefixes: "m" for mintues, "h" for hours, or "d" for days.` });
            if (interaction.user.id === User.id) return await interaction.reply({ content: `Error! You cannot mute yourself!` });
            if (User.id === interaction.guild.ownerId) return await interaction.reply({ content: `Error! You cannot mute the owner of the server.` });
            if (UserHighestRole >= SenderHighestRole && interaction.user.id !== interaction.guild.ownerId) return await interaction.reply({ content: 'Error! You cannot mute someone with equal or higher roles!' });

            const DurationLength = parseInt(RegexInput[1]);
            const Unit = RegexInput[2].toLowerCase();

            let Milliseconds;
            switch (Unit) {
                case 'm', 'minutes', 'minute', 'mins', 'min':
                    Milliseconds = DurationLength * 60 * 1000;
                    break;
                case 'h', 'hr', 'hrs', 'hours', 'hour':
                    Milliseconds = DurationLength * 60 * 60 * 1000;
                    break;
                case 'd', 'days', 'day':
                    Milliseconds = DurationLength * 24 * 60 * 60 * 1000;
                    break;
                default:
                    Milliseconds = 5 * 60 * 1000;
                    break;
            };

            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogChannel = await client.channels.fetch('1320086300522582046');
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /mute`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**Target:** <@${User.id}> (@${User.tag})\n**Duration:** ${InputDuration}\n**Reason:** ${Reason}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await GuildUser.timeout(Milliseconds, Reason);
            await interaction.reply(`Successfully muted **${User.tag}** for **${InputDuration}** for the reason of: **${Reason}**.`);
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