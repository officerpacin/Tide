const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('promote')
        .setDescription('Promote a specified user.')
        .addUserOption(option => option.setName('user').setDescription('The user you want to promote.').setRequired(true))
        .addRoleOption(option => option.setName('role').setDescription(`The user's new role.`).setRequired(true))
        .addStringOption(option => option.setName('note').setDescription('Add a note to the promotion message.')),
    execute: async (client, interaction) => {
        try {
            if (!interaction.member.roles.cache.has('1317604584805634078')) return await interaction.reply({ content: `You do not have permission to promote users!`, flags: ['Ephemeral'] });

            const User = interaction.options.getUser('user');
            const Role = interaction.options.getRole('role');
            const Note = interaction.options.getString('note') || '';
            const StaffAvatar = interaction.user.displayAvatarURL({ dynamic: true, size: 256 });

            const PromotionBanner = new AttachmentBuilder('Images/Promotion_Banner.png');
            const BannerEmbed = new EmbedBuilder()
                .setImage('attachment://Promotion_Banner.png')
                .setColor(0xEE3448)
            const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
            const MainEmbed = new EmbedBuilder()
                .setTitle('Staff Promotion')
                .setColor(0xEE3448)
                .setImage('attachment://Footer_Banner.png')
                .setDescription(`Congrats! The Management Team has decided to grant you a promotion!`)
                .addFields(
                    { name: `User:`, value: `<@${User.id}>`, inline: true },
                    { name: `New Role:`, value: `<@&${Role.id}>`, inline: true }
                )
                .setFooter({ text: `Issued By: @${interaction.user.username}`, iconURL: StaffAvatar })
                .setTimestamp(Date.now());

            if (Note) {
                MainEmbed.addFields({ name: `Note:`, value: `${Note}`, inline: false });
            };

            const PromotionChannel = await client.channels.fetch('1318823947222908948');
            const LoggingChannel = await client.channels.fetch('1320086300522582046');
            const GuildURL = interaction.guild.iconURL({ dynamic: true, size: 256 });
            const LogEmbed = new EmbedBuilder()
                .setTitle(`Command Executed: /promote`)
                .setDescription(`**Executor:** <@${interaction.user.id}> (@${interaction.user.username})\n**User:** <@${User.id}> (@${User.tag})\n**New Role:** <@&${Role.id}> (@${Role.name})\n**Note:** ${Note}`)
                .setColor(0xEE3448)
                .setFooter({ text: 'WTX Studios', iconURL: GuildURL })
                .setTimestamp(Date.now());

            await interaction.reply({ content: `Successfully sent the promotion message to <#1318823947222908948>.`, flags: ['Ephemeral'] });
            await PromotionChannel.send({ content: `<@${User.id}>`, embeds: [BannerEmbed, MainEmbed], files: [PromotionBanner, FooterBanner] });
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