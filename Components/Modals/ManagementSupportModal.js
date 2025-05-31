const { PermissionsBitField, EmbedBuilder, ChannelType, AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const config = require('../../../config.json');
const ManagementSupportSchema = require('../../../Schemas/ManagementSupport');

module.exports = {
    customId: 'ManagementSupport',
    execute: async (client, interaction) => {
        await interaction.reply({ content: `Creating ticket...`, flags: ['Ephemeral' ]});
        
        const Guild = await client.guilds.fetch(config.guild);
        
        const creationTime = Math.round(Date.now() / 1000);
        const creatorId = interaction.user.id;
        const creatorTag = interaction.user.username;
        const creationReason = interaction.fields.getTextInputValue('Inquiry');

        const newTicket = await Guild.channels.create({
            name: `mgmt-${creatorTag}`,
            topic: `Created By: <@${creatorId}> | Claimed By: Nobody`,
            type: ChannelType.GuildText,
            parent: '1319053008063172628',
            permissionOverwrites: [
                {
                    id: config.guild,
                    deny: [PermissionsBitField.Flags.ViewChannel]
                },
                {
                    id: creatorId,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.SendVoiceMessages],
                    deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageMessages,  PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.CreateInstantInvite, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.UseEmbeddedActivities],
                },
                {
                    id: '1317604584805634078', // Management
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.SendVoiceMessages],
                    deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.ManageMessages,  PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.CreateInstantInvite, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.UseEmbeddedActivities],
                },
            ],
        });

        const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
        const TicketEmbed = new EmbedBuilder()
            .setColor(0xEE3448).setImage('attachment://Footer_Banner.png')
            .setTitle('Management Support')
            .setDescription(`Thank you for contacting support! Please be patiently as you wait for a support member to assist you.\nPlease do not ping support until it has been **12 hours** since the last response.`)
            .addFields({ name: `Inquiry`, value: `\`\`\`${creationReason}\`\`\`` });

        const ClaimButton = new ButtonBuilder()
            .setLabel('Claim')
            .setCustomId('Management-Claim')
            .setStyle(ButtonStyle.Success);
        
        const CloseButton = new ButtonBuilder()
            .setLabel('Close')
            .setCustomId('Management-Close')
            .setStyle(ButtonStyle.Danger);
        
        const TicketActionRow = new ActionRowBuilder().addComponents(ClaimButton, CloseButton);

        await newTicket.send({ content: `<@${creatorId}> <@&1317604584805634078>`, embeds: [TicketEmbed], files: [FooterBanner], components: [TicketActionRow] }).then(message => message.pin());;
        await interaction.editReply({ content: `Successfully created your ticket! You can find it here: <#${newTicket.id}>`, flags: ['Ephemeral'] });

        ManagementSupportSchema.create({
            creatorId: creatorId,
            creatorTag: creatorTag,
            channelId: newTicket.id,
            createdAt: creationTime,
            creationReason: creationReason,
            claimed: false
        });
    },
};