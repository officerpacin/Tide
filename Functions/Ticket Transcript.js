const { EmbedBuilder } = require('discord.js');
const discordTranscripts = require('discord-html-transcripts');

async function closeTicket(interaction, schema, panel, closureMethod) {
    const LogsChannel = await interaction.client.channels.fetch('1345514635566256178');
    if (!LogsChannel) return console.warn(`Warning! The ticket logs channel could not be found!`);

    await interaction.reply({ content: `This ticket will be closed in 5 seconds...` });

    const TicketOwner = await interaction.client.users.fetch(schema.creatorId) || null;
    const OwnerAvatar = TicketOwner.displayAvatarURL({ dynamic: true, size: 1024 });
    const guildIcon = interaction.guild.iconURL({ dynamic: true, size: 1024 });

    const schemaCreatedAt = schema.createdAt || 'Database Error';
    const schemaCreatorTag = schema.creatorTag || 'Database Error';
    const schemaCreatorId = schema.creatorId || 'Database Error';

    const LogEmbed = new EmbedBuilder()
        .setTitle(`${panel} Closed`)
        .setColor(0xEE3448)
        .addFields(
            { name: `Closed By`, value: `<@${interaction.user.id}> (@${interaction.user.username})`, inline: true },
            { name: `Closure Method`, value: closureMethod, inline: true },
            { name: `Created`, value: `<t:${schemaCreatedAt}:f>`, inline: true },
        )
        .setAuthor({ name: `Ticket Owner: @${schemaCreatorTag} (${schemaCreatorId})`, iconURL: OwnerAvatar })

    try {
        const attachment = await discordTranscripts.createTranscript(interaction.channel);

        LogEmbed.setFooter({ text: `Tide Studios・Successfully Transcripted`, iconURL: guildIcon }).setTimestamp();

        await LogsChannel.send({ embeds: [LogEmbed], files: [attachment] });

        await new Promise(resolve => {
            setTimeout(() => {
                interaction.channel.delete();
                resolve();
            }, 4500);
        });
    } catch (error) {
        await interaction.editReply(`There was an error while transcripting the ticket!`);
        console.error(error);

        LogEmbed.setFooter({ text: `Tide Studios | Transcript Unsuccessful`, iconURL: guildIcon }).setTimestamp();

        await LogsChannel.send({ embeds: [LogEmbed] });

        await new Promise(resolve => {
            setTimeout(() => {
                interaction.channel.delete();
                resolve();
            }, 4500);
        });
    };
};

module.exports = {
    closeTicket
};