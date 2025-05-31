const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('review')
        .setDescription('Leave a review on one of our designers!')
        .addUserOption(option => option.setName('designer').setDescription('Who designed your product?').setRequired(true))
        .addStringOption(option => option.setName('product').setDescription('What product did your designer create?').setRequired(true))
        .addNumberOption(option => option.setName('rating').setDescription('What rating (out of 5) would you give your designer?').setRequired(true).setMinValue(1).setMaxValue(5))
        .addStringOption(option => option.setName('feedback').setDescription('What is your feedback on the order?').setRequired(true)),
    execute: async (client, interaction) => {
        await interaction.deferReply({ flags: ['Ephemeral'] });
        if (!interaction.member.roles.cache.has('1317967330155692143') && interaction.user.id !== '681302226400313377') return await interaction.editReply({ content: `Only people with the client role can run this command!` });

        const Designer = interaction.options.getUser('designer');
        const Product = interaction.options.getString('product');
        const Feedback = interaction.options.getString('feedback');
        const Rating = interaction.options.getNumber('rating');

        let Stars;
        if (Rating === 5) {
            Stars = '<:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501> (5/5)';
        } else if (Rating === 4) {
            Stars = '<:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501> (4/5)';
        } else if (Rating === 3) {
            Stars = '<:Star_Red:1364085408383631501><:Star_Red:1364085408383631501><:Star_Red:1364085408383631501> (3/5)';
        } else if (Rating === 2) {
            Stars = '<:Star_Red:1364085408383631501><:Star_Red:1364085408383631501> (2/5)';
        } else {
            Stars = '<:Star_Red:1364085408383631501> (1/5)';
        };

        const ReviewBanner = new AttachmentBuilder('Images/Review_Banner.png');
        const FooterBanner = new AttachmentBuilder('Images/Footer_Banner.png');
        const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 1024 });
        const ReviewerIcon = interaction.user.displayAvatarURL({ dynamic: true, size: 256 });

        const BannerEmbed = new EmbedBuilder()
            .setImage('attachment://Review_Banner.png').setColor(0xEE3448);

        const MainEmbed = new EmbedBuilder()
            .setImage('attachment://Footer_Banner.png').setColor(0xEE3448)
            .setAuthor({ name: `Reviewed by: @${interaction.user.username}`, iconURL: ReviewerIcon })
            .setTitle('New WTX Review')
            .addFields(
                { name: `<:Palette:1364086382657667092> Designer`, value: `<@${Designer.id}>`, inline: true },
                { name: `<:Product:1364086606566395944> Product`, value: Product, inline: true },
                { name: `<:Star_Red:1364085408383631501> Rating`, value: Stars, inline: true },
                { name: `<:Feedback:1364086816810074122> Feedback`, value: `>>> ${Feedback}` }
            )
            .setFooter({ text: `WTX Studios`, iconURL: guildIcon }).setTimestamp();

        const ReviewChannel = await client.channels.fetch('1309606096691920989');
        if (!ReviewChannel) return await interaction.editReply({ content: `There was an error while finding the review channel.`, flags: ['Ephemeral'] });

        await ReviewChannel.send({ content: `<@${Designer.id}>`, embeds: [BannerEmbed, MainEmbed], files: [ReviewBanner, FooterBanner] });
        await interaction.editReply({ content: `Successfully sent your review to <#1309606096691920989>.` });
    },
};