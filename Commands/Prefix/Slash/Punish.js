const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('punish')
        .setDescription('Issue a punishment to the selected user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to punish.').setRequired(true))
        .addStringOption(option => option.setName('punishment').setDescription('The punishment you are issuing this staff member.').setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('The reason this user is being punish.').setRequired(true))
        .addStringOption(option => 
            option.setName('dm')
            .setDescription('Whether or not you would like the bot to dm the user.')
            .addChoices( 
                { name: 'True', value: 'true' },
                { name: 'False', value: 'false' } 
            ))
        .addRoleOption(option => option.setName('new-role').setDescription(`The user's new role.`)),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.roles.cache.has('1317604584805634078')) return await interaction.reply({ content: `You do not have permission to demote users!`, flags: ['Ephemeral'] });

            const User = interaction.options.getUser('user');
            const Punishment = interaction.options.getString('punishment');
            const Reason = interaction.options.getString('reason');
            const NewRole = interaction.options.getRole('new-role') || '';
            const DM = interaction.options.getString('dm') || false;
            const StaffAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 256 });

            const PunishmentBanner = new AttachmentBuilder('Images/Punishment_Banner.png');
            const BannerEmbed = new EmbedBuilder()
                .setImage('attachment://Punishment_Banner.png')
                .setColor(0xEE3448)
            const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png')
            const MainEmbed = new EmbedBuilder()
                .setTitle('Staff Punishment')
                .setColor(0xEE3448)
                .setImage('attachment://Footer_Banner.png')
                .setDescription(`Sorry! The Management Team has decided to issue you a punishment.`)
                .addFields(
                    { name: `User:`, value: `<@${User.id}>`, inline: true },
                    { name: `Punishment:`, value: Punishment, inline: true }
                )
                .setFooter({ text: `Issued By: @${interaction.user.username}`, iconURL: StaffAvatar })
                .setTimestamp(Date.now());

            let NewRoleMessage;
            if (NewRole) {
                MainEmbed.addFields({ name: 'New Role:', value: `<@&${NewRole.id}>`, inline: true });

                NewRoleMessage = `<@&${NewRole.id}> (@${NewRole.name})`;
            } else {
                NewRoleMessage = 'None';
            };

            MainEmbed.addFields({ name: `Reason:`, value: Reason, inline: false });

            const PunishmentChannel = await client.channels.fetch('1318824177192538132');
            const LoggingChannel = await client.channels.fetch('1320086300522582046');
            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /punish`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**User:** <@${User.id}> (@${User.tag})\n**Punishment:** ${Punishment}\n**Reason:** ${Reason}\n**New Role:** ${NewRoleMessage}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await interaction.reply({ content: `Successfully sent the punishment message to <#1318824177192538132>.`, flags: ['Ephemeral'] });
            await PunishmentChannel.send({ content: `<@${User.id}>`, embeds: [BannerEmbed, MainEmbed], files: [PunishmentBanner, FooterBanner] });
            await LoggingChannel.send({ embeds: [LogEmbed] });
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