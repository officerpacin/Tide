const { ChannelType, PermissionsBitField, EmbedBuilder, AttachmentBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const OrderSchema = require('../../../Schemas/Order');
const DataSchema = require('../../../Schemas/Data');

module.exports = {
    customId: 'Order-Place',
    execute: async (client, interaction) => {
        const Data = await DataSchema.findOne({ key: 'bot' });
        if (!Data) return await interaction.reply({ content: `There was an error while retrieving data from the database.`, flags: ['Ephemeral'] });

        let Panel;
        let Category;
        let Ping;
        if (interaction.values.includes('Graphic')) {
            if (Data.orderStatus.graphics === 'Closed') return await interaction.reply({ content: `Graphic orders are currently closed! Please wait for them to re-open before trying to order again.`, flags: ['Ephemeral'] });
            Panel = 'Graphic'; Category = '1378214268314452068'; Ping = '1378214756258807808';
        } else if (interaction.values.includes('Livery')) {
            if (Data.orderStatus.liveries === 'Closed') return await interaction.reply({ content: `Livery orders are currently closed! Please wait for them to re-open before trying to order again.`, flags: ['Ephemeral'] });
            Panel = 'Livery'; Category = '1378214312027488399'; Ping = '1378214737363599472';
        } else if (interaction.values.includes('Clothing')) {
            if (Data.orderStatus.clothing === 'Closed') return await interaction.reply({ content: `Clothing orders are currently closed! Please wait for them to re-open before trying to order again.`, flags: ['Ephemeral'] });
            Panel = 'Clothing'; Category = '1378214351575711855'; Ping = '1378214771341660401';
        } else if (interaction.values.includes('Discord')) {
            if (Data.orderStatus.discord === 'Closed') return await interaction.reply({ content: `Discord orders are currently closed! Please wait for them to re-open before trying to order again.`, flags: ['Ephemeral'] });
            Panel = 'Discord'; Category = '1378214376049348728'; Ping = '1378214786550202419';
        }

        await interaction.update({ content: `<a:Loading:1360096899696296027> Placing Order...`, embeds: [], components: [] });

        const OrderPlaced = Math.round(Date.now() / 1000);
        const Customer = interaction.user;
        const OrderTicket = await interaction.guild.channels.create({
            name: `order-${Customer.username}`,
            topic: `Created By: <@${Customer.id}> | Claimed By: Nobody`,
            type: ChannelType.GuildText,
            parent: Category,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: [PermissionsBitField.Flags.ViewChannel] },
                { id: Customer.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.SendVoiceMessages], deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.UseEmbeddedActivities, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.CreateInstantInvite] },
                { id: '1377480976338522232', allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.EmbedLinks, PermissionsBitField.Flags.SendVoiceMessages], deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.UseEmbeddedActivities, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.CreateInstantInvite] },
                { id: '1377483058269261909', allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory, PermissionsBitField.Flags.SendMessagesInThreads, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.EmbedLinks], deny: [PermissionsBitField.Flags.Administrator, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ManageEvents, PermissionsBitField.Flags.CreatePublicThreads, PermissionsBitField.Flags.ManageThreads, PermissionsBitField.Flags.ManageWebhooks, PermissionsBitField.Flags.UseExternalStickers, PermissionsBitField.Flags.SendVoiceMessages, PermissionsBitField.Flags.UseExternalSounds, PermissionsBitField.Flags.ManageMessages, PermissionsBitField.Flags.AddReactions, PermissionsBitField.Flags.UseExternalEmojis, PermissionsBitField.Flags.UseApplicationCommands, PermissionsBitField.Flags.UseExternalApps, PermissionsBitField.Flags.CreatePrivateThreads, PermissionsBitField.Flags.MentionEveryone, PermissionsBitField.Flags.ManageGuild, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.UseEmbeddedActivities, PermissionsBitField.Flags.SendPolls, PermissionsBitField.Flags.SendTTSMessages, PermissionsBitField.Flags.CreateInstantInvite] }
            ],
            reason: `${Customer.username} opened a ${Panel} order.`
        });

        await interaction.editReply({ content: `Your order has been successfully opened! You can find it here: <#${OrderTicket.id}>` });

        const OrderBanner = new AttachmentBuilder('Images/Services_Banner.png');
        const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');

        const BannerEmbed = new EmbedBuilder().setImage('attachment://Services_Banner.png').setColor(0xEE3448);
        const OrderEmbed = new EmbedBuilder()
            .setImage('attachment://Footer_Banner.png')
            .setColor(0xEE3448)
            .setTitle('WTX Order System')
            .setDescription('Welcome to the Tide Studios Order System! Please fill in the information below and then wait for a designer to help you.')
            .addFields(
                { name: '<:User:1356475011808100509> Customer', value: `<@${Customer.id}>`, inline: true },
                { name: `<:Calendar:1356475030019510357> Order Placed`, value: `<t:${OrderPlaced}:R>`, inline: true },
                { name: '<:Shop:1356436030881923254> Order Type', value: `Regular - ${Panel} Order`, inline: true }
            );

        const ClaimButton = new ButtonBuilder().setLabel('Claim').setCustomId('Order-Claim').setStyle(ButtonStyle.Success);
        const CloseButton = new ButtonBuilder().setLabel('Close').setCustomId('Order-Close').setStyle(ButtonStyle.Danger);
        const ActionRow = new ActionRowBuilder().addComponents(ClaimButton, CloseButton);

        await OrderTicket.send({ content: `<@${Customer.id}> | <@&${Ping}>`, embeds: [BannerEmbed, OrderEmbed], components: [ActionRow], files: [OrderBanner, FooterBanner] }).then(msg => msg.pin());

        const InformationButton = new ButtonBuilder().setLabel('Fill in information').setEmoji('<:Description:1361177029055348737>').setStyle(ButtonStyle.Secondary).setCustomId('OrderInformation');
        const InformationActionRow = new ActionRowBuilder().addComponents(InformationButton);

        const guildIconURL = interaction.guild.iconURL({ dynamic: true, size: 1024 });

        let infoEmbed;
        if (Panel === 'Graphic') {
            infoEmbed = new EmbedBuilder()
                .setTitle('Graphic Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Graphics:1360089905228681340> Graphic Type', value: '-# What type of graphic design do you want? Branding, Logo, GFX, Etc.', inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: '-# How many products do you want?', inline: true },
                    { name: '<:Description:1361177029055348737> Graphic Description', value: '-# Provide a detailed description of how you want your product to look.', inline: false }
                )
                .setFooter({ text: `Tide Studios`, iconURL: guildIconURL }).setTimestamp();
        } else if (Panel === 'Livery') {
            infoEmbed = new EmbedBuilder()
                .setTitle('Livery Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Livery:1360092073478455466> Livery Type', value: '-# What type of livery do you want? Staff, LEO, FD, Civilian, etc.', inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: '-# How many liveries do you want to purchase?', inline: true },
                    { name: '<:Description:1361177029055348737> Livery Description', value: '-# Provide a detailed description of how you want your liveries to look.', inline: false }
                )
                .setFooter({ text: `Tide Studios`, iconURL: guildIconURL }).setTimestamp();
        } else if (Panel === 'Clothing') {
            infoEmbed = new EmbedBuilder()
                .setTitle('Clothing Order Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Clothing:1360094890191954021> Clothing Type', value: '-# What kind of clothing do you want? Civilian, Uniform, Branded, etc.', inline: true },
                    { name: '<:Quantity:1361176883185582130> Quantity', value: '-# How many outfits do you want?', inline: true },
                    { name: '<:Description:1361177029055348737> Clothing Description', value: '-# Provide a detailed design idea, color scheme, inspiration or logos if needed.', inline: false }
                )
                .setFooter({ text: `Tide Studios`, iconURL: guildIconURL }).setTimestamp();
        } else if (Panel === 'Discord') {
            infoEmbed = new EmbedBuilder()
                .setTitle('Discord Services Information')
                .setColor(0xEE3448)
                .addFields(
                    { name: '<:Discord:1360094041973782590> Service Type', value: '-# What kind of service do you require? Full setup, moderation tools, bots, etc.', inline: true },
                    { name: '<:Quantity:1361176883185582130> Server Size', value: '-# Approximate member size or feature scale?', inline: true },
                    { name: '<:Description:1361177029055348737> Service Description', value: '-# Provide exact needs, expectations, examples or current server link.', inline: false }
                )
                .setFooter({ text: `Tide Studios`, iconURL: guildIconURL }).setTimestamp();
        }

        await OrderTicket.send({ embeds: [infoEmbed], components: [InformationActionRow] });
    }
};
