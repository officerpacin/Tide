const { SlashCommandBuilder, EmbedBuilder, ThreadAutoArchiveDuration, ChannelType, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qc')
        .setDescription('.')
        .addSubcommand(command =>
            command.setName('submit')
            .setDescription('Submit your work to quality control to ensure it meets WTX Studio\'s standards.')
            .addChannelOption(option =>
                option.setName('ticket')
                    .setDescription('What ticket are you making this for?')
                    .setRequired(true)
            )
            .addStringOption(option =>
                option.setName('price')
                    .setDescription('What is the customer paying for the product?')
                    .setRequired(true)
            )
        ),
    execute: async (client, interaction) => {
        if (!interaction.member.roles.cache.has('1317603145979002880') && !interaction.member.roles.cache.has('1317604337345626243')) return await interaction.reply({ content: `Only designers can use this command!`, flags: ['Ephemeral'] });

        const QualityControlChannel = await client.channels.fetch('1318823649360351232');
        if (!QualityControlChannel) return await interaction.reply({ content: `There was an error while processing the command.`, flags: ['Ephemeral'] });

        const Ticket = interaction.options.getChannel('ticket');
        const Price = interaction.options.getString('price');

        const QualityControlEmbed = new EmbedBuilder()
            .setTitle('Quality Control Submission')
            .setDescription(`A designer has submitted their product for approval. Please assess their product(s) and ensure they meet your quality standards. If you have any questions, you can contact them via the thread below.`)
            .addFields(
                { name: `<:Designer:1363549449925820536> Designer`, value: `<@${interaction.user.id}>`, inline: true },
                { name: `<:Ticket:1353207000829267998> Order Ticket`, value: `<#${Ticket.id}>`, inline: true },
                { name: `<:PriceTag:1370827960050913330> Product Price`, value: Price, inline: true },
            )
            .setColor(0xffffff)
            .setFooter({ text: `Awaiting Review` }).setTimestamp();

        const ApproveButton = new ButtonBuilder()
            .setCustomId('qc-approve')
            .setLabel('Approve')
            .setStyle(ButtonStyle.Success)
            .setEmoji('<:Checkmark:1370830869807239198>');

        const DenyButton = new ButtonBuilder()
            .setCustomId('qc-deny')
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('<:Cancel:1370830882763444335>')

        const QCRow = new ActionRowBuilder().addComponents(ApproveButton, DenyButton);

        const QCMessage = await QualityControlChannel.send({ content: `<@&1317602915422310421>`, embeds: [QualityControlEmbed], components: [QCRow] });
        const QCThread = await QCMessage.startThread({
                name: `Quality Control | ${interaction.user.displayName}`,
                autoArchiveDuration: ThreadAutoArchiveDuration.OneDay,
                type: ChannelType.PublicThread
        });
        await QCThread.send(`Thank you for opening a Quality Control Thread, <@${interaction.user.id}>. Please send your product(s) below for Quality Control to inspect.`);
        await interaction.reply({ content: `Successfully submitted your creation to <#1318823649360351232>.`, flags: ['Ephemeral'] });
    },
};