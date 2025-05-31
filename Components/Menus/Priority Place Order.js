const { ChannelType, PermissionsBitField, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const OrderSchema = require('../../../Schemas/Order');

module.exports = {
    customId: 'Priority-Order-Place',
    execute: async (client, interaction) => {
        await interaction.update({ content: `<a:Loading:1360096899696296027> Placing Order...`, embeds: [], components: [] });

        let Panel;
        if (interaction.values.includes('Graphic')) {
            Panel = 'Graphic';
        } else if (interaction.values.includes('Livery')) {
            Panel = 'Livery';
        } else if (interaction.values.includes('Clothing')) {
            Panel = 'Clothing';
        } else if (interaction.values.includes('Discord')) {
            Panel = 'Discord';
        };

        const OrderPlaced = Math.round(Date.now() / 1000);
        const Customer = interaction.user;
        const OrderTicket = await interaction.guild.channels.create({
            name: `priority-${Customer.username}`,
            topic: `<:Priority:1356437477300375723> Priority | Created By: <@${Customer.id}> | Claimed By: Nobody`,
            type: ChannelType.GuildText,
            parent: '1343320814082330704',
            permissionOverwrites: [
                {
                    id: interaction.guild.id, //@everyone
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: Customer.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.SendVoiceMessages],
                    deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.UseEmbeddedActivities, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.CreateInstantInvite],
                },
                {
                    id: '1377480976338522232', // Designers
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.SendVoiceMessages],
                    deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.UseEmbeddedActivities, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.CreateInstantInvite],
                }
            ],
            reason: `${Customer.username} opened a Priority ${Panel} order.`,
        });

        await interaction.editReply({ content: `Your order has been successfully opened! You can find it here: <#${OrderTicket.id}>` });

        const PriorityBanner = new AttachmentBuilder('Images/Priority_Banner.png');
        const BannerEmbed = new EmbedBuilder()
            .setImage('attachment://Priority_Banner.png')
            .setColor(0xEE3448)
        const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
        const OrderEmbed = new EmbedBuilder()
            .setImage('attachment://Footer_Banner.png')
            .setColor(0xEE3448)
            .setTitle('Tide Order System')
            .setDescription('Welcome to the WTX Order System! Please fill in the information below and then wait for a designer to help you.')
            .addFields(
                { name: '<:User:1356475011808100509> Customer', value: `<@${Customer.id}>`, inline: true },
                { name: `<:Calendar:1356475030019510357> Order Placed`, value: `<t:${OrderPlaced}:R>`, inline: true },
                { name: '<:Shop:1356436030881923254> Order Type', value: `Priority - ${Panel} Order`, inline: true },
            )

        const ClaimButton = new ButtonBuilder()
            .setLabel('Claim')
            .setCustomId('Order-Claim')
            .setStyle(ButtonStyle.Success)

        const CloseButton = new ButtonBuilder()
            .setLabel('Close')
            .setCustomId('Order-Close')
            .setStyle(ButtonStyle.Danger)

        const ActionRow = new ActionRowBuilder().addComponents(ClaimButton, CloseButton);

        await OrderTicket.send({ content: `<@${Customer.id}> | <@&1317603145979002880>`, embeds: [BannerEmbed, OrderEmbed], components: [ActionRow], files: [PriorityBanner, FooterBanner] }).then(message => message.pin());

        const InformationButton = new ButtonBuilder()
            .setLabel('Fill in information')
            .setEmoji('<:Description:1361177029055348737>')
            .setStyle(ButtonStyle.Secondary)
            .setCustomId('OrderInformation')

        const InformationActionRow = new ActionRowBuilder().addComponents(InformationButton)

        const guildIconURL = interaction.guild.iconURL({ dynamic: true, size: 1024 });

        let InformationMessage;
        if (Panel === 'Graphic') {
            const InformationEmbed = new EmbedBuilder()
                .setTitle('Graphic Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Graphics:1360089905228681340> Graphic Type', value: `-# What type of graphic design do you want? Branding, Logo, GFX, Etc.`, inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: `-# How many products do you want?`, inline: true },
                    { name: '<:Description:1361177029055348737> Graphic Description', value: `-# Please provide a detailed description of how you would like your product to look aswell as any/all information you may see important.`, inline: false }
                )
                .setFooter({ text: `WTX Studios`, iconURL: guildIconURL }).setTimestamp();

            InformationMessage = await OrderTicket.send({ embeds: [InformationEmbed], components: [InformationActionRow] });
        } else if (Panel === 'Livery') {
            const InformationEmbed = new EmbedBuilder()
                .setTitle('Livery Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Livery:1360092073478455466> Livery Type', value: `-# What type of livery do you want? Staff, Law Enforcement, Fire Department, Civilian, Etc.`, inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: `-# How many liveries do you want to purchase?`, inline: true },
                    { name: '<:Description:1361177029055348737> Livery Description', value: `-# Please provide a detailed description of how you want your liveries to look aswell as any/all information you may see important.`, inline: false },
                )
                .setFooter({ text: `WTX Studios`, iconURL: guildIconURL }).setTimestamp();

            InformationMessage = await OrderTicket.send({ embeds: [InformationEmbed], components: [InformationActionRow] });
        } else if (Panel === 'Clothing') {
            const InformationEmbed = new EmbedBuilder()
                .setTitle('Clothing Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Clothing:1360090681485295616> Clothing Type', value: `-# What type of clothing design would you like to purchase? Staff Uniform, First Responder Uniform, Merch, Etc.`, inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: `-# How many pieces of clothing do you want to purchase?`, inline: true },
                    { name: '<:Description:1361177029055348737> Clothing Description', value: `-# Please provide a detailed description of how you want your clothing items to look aswell as any/all information you may see important.`, inline: false }
                )
                .setFooter({ text: `WTX Studios`, iconURL: guildIconURL }).setTimestamp();

            InformationMessage = await OrderTicket.send({ embeds: [InformationEmbed], components: [InformationActionRow] });
        } else if (Panel === 'Discord') {
            const InformationEmbed = new EmbedBuilder()
                .setTitle('Discord Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Discord:1360089038551253192> Discord Design Type', value: `-# What type of Discord service are you looking for? Embeds, Server, Bot, Emojis, Etc.`, inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: `-# How many of this item do you want?`, inline: true },
                    { name: '<:Description:1361177029055348737> Product Description', value: `-# Please provide a detailed description of your product aswell as any/all information you may see important.`, inline: false }
                )
                .setFooter({ text: `WTX Studios`, iconURL: guildIconURL }).setTimestamp();

            InformationMessage = await OrderTicket.send({ embeds: [InformationEmbed], components: [InformationActionRow] });
        };

        await OrderSchema.create({
            creatorId: Customer.id,
            creatorTag: Customer.username,
            channelId: OrderTicket.id,
            createdAt: OrderPlaced,
            claimed: false,
            claimedId: 'N/A',
            type: Panel,
            priority: true
        });
    },
};