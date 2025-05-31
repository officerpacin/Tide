const { EmbedBuilder, AttachmentBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    command: 'dashboard',
    execute: async (client, message, arguements) => {
        if (arguements[1] === 'embed') {
        if (!message.member.permissions.has(PermissionFlagsBits.Administrator) && message.author.id !== '681302226400313377') return await message.reply({ content: `You do not have permission to run this command!`, allowedMentions: { repliedUser: false } });
        
    
        const DashboardBanner = new AttachmentBuilder('Images/Dashboard_Banner.png');
        const BannerEmbed = new EmbedBuilder()
            .setImage('attachment://Dashboard_Banner.png').setColor(0xEE3448);

        const FooterBanner2 = new AttachmentBuilder('Images/Footer_Banner.png');
        const MainEmbed = new EmbedBuilder()
            .setColor(0xEE3448).setImage('attachment://Footer_Banner.png')
            .setDescription('**WTX Studios** - where your brand is our vision, we have satisfied over **80+** customers, we do everything to give our customers a satisfying experience here.')
            .addFields(
                { name: `<:OrderHere1:1355595555463631081><:OrderHere2:1355595748053352526><:OrderHere3:1355595775396286536><:OrderHere4:1355595809776865453>`, value: `> [Click me!](https://discord.com/channels/1309597899021222000/1315309045564833863)`, inline: true },
                { name: `<:RobloxGroup1:1355596380176912427><:RobloxGroup2:1355596417330315345><:RobloxGroup3:1355596448334348539><:RobloxGroup4:1355596533776781465><:RobloxGroup5:1355596562478399498>`, value: `> [Click me!](https://www.roblox.com/communities/9446441/Official-Payment-Group#!/about)`, inline: true },
                { name: `<:Portfolios1:1355597319344754718><:Portfolios2:1355597352982810734><:Portfolios3:1355597383605682437><:Portfolios4:1355597420871942315>`, value: `> [Click me!](https://discord.com/channels/1309597899021222000/1315309574462373998)`, inline: true }
            );

        const BulletinNavigationMenu = new StringSelectMenuBuilder()
            .setCustomId('Bulletin')
            .setPlaceholder('Navigate')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('Regulations')
                    .setValue('Regulations')
                    .setEmoji('<:Regulations:1355600031624728757>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('About Us')
                    .setValue('About')
                    .setEmoji('<:WTX_Logo_White:1355600446592385124>')
            );

        const BulletinSupportMenu = new StringSelectMenuBuilder()
            .setCustomId('Support')
            .setPlaceholder('Contact Support')
            .addOptions(
                new StringSelectMenuOptionBuilder()
                    .setLabel('General Support')
                    .setValue('General')
                    .setEmoji('<:Support:1355607241436434542>'),
                new StringSelectMenuOptionBuilder()
                    .setLabel('Management Support')
                    .setValue('Management')
                    .setEmoji('<:Settings:1355639993279840539>')
            );
        
        const BulletinNavigationRow = new ActionRowBuilder().addComponents(BulletinNavigationMenu);
        const BulletinSupportRow = new ActionRowBuilder().addComponents(BulletinSupportMenu);

        await message.delete();
        await message.channel.send({ embeds: [BannerEmbed, MainEmbed], components: [BulletinNavigationRow, BulletinSupportRow], files: [DashboardBanner, FooterBanner2] });
        } else {
            await message.reply({ content: 'This command could not be found!', allowedMentions: { repliedUser: false } });
        };
    },
};