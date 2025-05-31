const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    customId: 'Bulletin',
    execute: async (client, interaction) => {
        if (interaction.values.includes('Regulations')) {
            const RulesBanner = new AttachmentBuilder('Images/Regulations_Banner.png');
            const BannerEmbed = new EmbedBuilder()
                .setImage('attachment://Regulations_Banner.png').setColor(0xEE3448);

            const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
            const MainEmbed = new EmbedBuilder()
                .setImage('attachment://Footer_Banner.png').setColor(0xEE3448)
                .setTitle('<:Regulations:1355600031624728757> Regulations')
                .setDescription(`**Behaviour**\n- Treat everyone with kindness and respect. Disrespectful, offensive, or harmful behaviour will not be tolerated. Let's keep the environment friendly and welcoming for all members.\n**Adult Content**\n- Any form of adult content, explicit material, or inappropriate discussions is strictly prohibited. Please keep the community safe and respect all members.\n**Privacy**\n- Do not share personal information, whether yours or others', without permission. Respect everyone's privacy and keep the community safe.\n**Discord & Roblox TOS**\n- You are required to follow [Discord Terms](https://discord.com/terms/) and [Roblox Terms](https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use), failure to follow them will result in a permanent ban.`);
            
            await interaction.reply({ embeds: [BannerEmbed, MainEmbed], files: [RulesBanner, FooterBanner], flags: ['Ephemeral'] });
        };
        if (interaction.values.includes('About')) {
            const AboutUsBanner = new AttachmentBuilder('Images/AboutUs_Banner.png');
            const BannerEmbed = new EmbedBuilder()
                .setImage('attachment://AboutUs_Banner.png').setColor(0xEE3448)

            const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
            const MainEmbed = new EmbedBuilder()
                .setImage('attachment://Footer_Banner.png').setColor(0xEE3448)
                .setTitle('<:WTX_Logo_White:1355600446592385124> About Us')
                .setDescription(`> Welcome to WTX, where creativity meets limitless possibilities. Our design community is built for whoever believes in pushing the boundaries of what's possible. WTX offers a lot of tools, support, and collaboration if you need to bring your ideas to life.\n  - If you have any problems please contact us via our support system. Please refrain from direct messaging any of the high ranks. Refrain from pinging anyone within tickets.\n\n### What does WTX Offer?\nWe offer a range of products including custom graphics, unique liveries, and stylish clothing. Whether you need products for yourself brand or something else, we've got you covered with high-quality work that brings your ideas to life. You can view more in <#1315309045564833863>.`);

            await interaction.reply({ embeds: [BannerEmbed, MainEmbed], files: [AboutUsBanner, FooterBanner], flags: ['Ephemeral'] });
        };
    },
};