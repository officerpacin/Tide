const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
    event: 'guildMemberAdd',
    once: false,
    execute: async (client, member) => {
        if (member.guild.id !== '1309597899021222000') return;

        const welcomeChannel = await client.channels.fetch('1309601416951631993');
        if (!welcomeChannel) return console.log(`Warning! The welcome channel could not be found!`);

        const dashbordButton = new ButtonBuilder().setLabel('Dashboard').setStyle(ButtonStyle.Link).setURL('https://discord.com/channels/1309597899021222000/1309598728184926248');
        const memberButton = new ButtonBuilder().setLabel(`${member.guild.memberCount}`).setCustomId('null').setStyle(ButtonStyle.Secondary).setEmoji('<:Person:1353586581814120490>').setDisabled(true);
        const welcomeActionRow = new ActionRowBuilder().addComponents(dashbordButton, memberButton);

        await welcomeChannel.send({ content: `<:WTX_Logo_White:1355600446592385124> Welcome to WTX Studios, <@${member.id}>! Enjoy every moment of your stay, we're here to make it special!`, components: [welcomeActionRow] });
    },
};