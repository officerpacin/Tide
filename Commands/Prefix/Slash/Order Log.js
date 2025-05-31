const { SlashCommandBuilder, AttachmentBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order-log')
        .setDescription('Hidden')
        .setDescription('Submit an order log on a recent order of yours.')
        .addStringOption(option => option.setName('roblox-username').setDescription('What is your roblox username?').setRequired(true))
        .addUserOption(option => option.setName('customer').setDescription('Who received/paid for the product?').setRequired(true))
        .addStringOption(option => option.setName('price').setDescription('How much did the customer pay for the product?').setRequired(true))
        .addAttachmentOption(option => option.setName('proof').setDescription('Please send a picture proving the customer\'s purchase.').setRequired(true)),
    execute: async (client, interaction) => {
        if (!interaction.member.roles.cache.has('1317603145979002880') && !interaction.member.roles.cache.has('1317602440555790366')) return await interaction.reply({ content: `Only designers are permitted to use this command!`, flags: ['Ephemeral'] });

        const RobloxUser = interaction.options.getString('roblox-username');
        const Customer = interaction.options.getUser('customer');
        const Price = interaction.options.getString('price');
        const Proof = interaction.options.getAttachment('proof');
        const LoggerIcon = interaction.user.displayAvatarURL({ dynamic: true, size: 256 });
        
        if (!Proof.contentType || !Proof.contentType.startsWith('image/') || !Proof.url) return await interaction.reply({ content: `The provided attachment is incorrect.`, flags: ['Ephemeral'] });

        const OrderLogEmbed = new EmbedBuilder()
            .setAuthor({ name: `Submitted by: @${interaction.user.username} (${interaction.user.id})`, iconURL: LoggerIcon })
            .setTitle('<:Product:1364086606566395944> WTX Order Log')
            .setColor(0xEE3448)
            .setImage(Proof.url)
            .addFields(
                { name: `<:Roblox:1374593091494744145> Roblox Username`, value: RobloxUser },
                { name: `<:Robux:1353896881230712843> Price`, value: Price },
                { name: `<:Shop:1356436030881923254> Customer`, value: `<@${Customer.id}>` },
                { name: `<:Graphics:1360089905228681340> Proof of Purchase`, value: `-# Found in attached image.` }
            )

        const OrderLogChannel = await client.channels.fetch('1318823343213772890');
        if (!OrderLogChannel) return await interaction.reply({ content: `There was an error while running this command.`, flags: ['Ephemeral'] });

        await interaction.reply({ content: `Successfully submitted your order log!`, flags: ['Ephemeral'] });
        await OrderLogChannel.send({ embeds: [OrderLogEmbed] });
    },
};