const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');
const DataSchema = require('../../Schemas/Data');

module.exports = {
    command: 'order',
    execute: async (client, message, arguements) => {
        if (arguements[1] === 'embed') {
            if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== '681302226400313377') return await message.reply({ content: `You do not have permission to run this command!`, allowedMentions: { repliedUser: false } });

            const ServicesBanner = new AttachmentBuilder('Images/Services_Banner.png');
            const BannerEmbed = new EmbedBuilder()
                .setImage('attachment://Services_Banner.png').setColor(0xEE3448);

            const FooterBanner2 = new AttachmentBuilder('Images/Footer_Banner.png');
            const MainEmbed = new EmbedBuilder()
                .setImage('attachment://Footer_Banner.png').setColor(0xEE3448)
                .setTitle('WTX Order System')
                .setDescription(`**Welcome to Tide Studios** - If you are looking for high quality products, spectacular service and wonderful prices. You have found the right place.\n\n**<:Priority:1356437477300375723> Please note, priority users can open orders even when they are closed.**`)

            const OrderMenu = new StringSelectMenuBuilder()
                .setCustomId('Order')
                .setPlaceholder('Place an order')
                .setOptions(
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Regular')
                        .setValue('Regular')
                        .setEmoji('<:Shop:1356436030881923254>'),
                    new StringSelectMenuOptionBuilder()
                        .setLabel('Priority')
                        .setValue('Priority')
                        .setEmoji('<:Priority:1356437477300375723>')
                )

            const OrderRow = new ActionRowBuilder().addComponents(OrderMenu);

            await message.channel.send({ embeds: [BannerEmbed, MainEmbed], files: [ServicesBanner, FooterBanner2], components: [OrderRow] });
            await message.delete();
        } else if (arguements[1] === 'status') {
            const CurrentData = await DataSchema.findOne({ key: 'bot' });

            let GraphicStatus;
            let LiveryStatus;
            let ClothingStatus;
            let DiscordStatus;

            if (CurrentData.orderStatus.graphics === 'Open') {
                GraphicStatus = '<:Open:1356484162386657484> Open';
            } else {
                GraphicStatus = '<:Closed:1356484141931167757> Closed';
            };

            if (CurrentData.orderStatus.liveries === 'Open') {
                LiveryStatus = '<:Open:1356484162386657484> Open';
            } else {
                LiveryStatus = '<:Closed:1356484141931167757> Closed';
            };

            if (CurrentData.orderStatus.clothing === 'Open') {
                ClothingStatus = '<:Open:1356484162386657484> Open';
            } else {
                ClothingStatus = '<:Closed:1356484141931167757> Closed';
            };

            if (CurrentData.orderStatus.discord === 'Open') {
                DiscordStatus = '<:Open:1356484162386657484> Open';
            } else {
                DiscordStatus = '<:Closed:1356484141931167757> Closed';
            };

            await message.delete();
            await message.channel.send(`## <:WTX_Logo_White:1355600446592385124> WTX Order Status\n**Graphic Orders:** ${GraphicStatus}\n**Livery Orders:** ${LiveryStatus}\n**Clothing Orders:** ${ClothingStatus}\n**Discord Orders:** ${DiscordStatus}\n-# <:Priority:1356437477300375723> Please note that priority members will be able to create a ticket regardless of the order status.`);
        } else {
            await message.reply({ content: 'This command could not be found!', allowedMentions: { repliedUser: false } });
        };
    },
};