const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const GeneralSchema = require('../../Schemas/GeneralSupport');
const ManagementSchema = require('../../Schemas/ManagementSupport');
const OrderSchema = require('../../Schemas/Order');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('.')
        .addSubcommand(command =>
            command.setName('add')
                .setDescription('Add a user to the ticket you are currently in.')
                .addUserOption(option => option.setName('user').setDescription('Who do you want to add to the ticket?').setRequired(true))
        )
        .addSubcommand(command =>
            command.setName('remove')
                .setDescription('Remove a user from the ticket you are currently in.')
                .addUserOption(option => option.setName('user').setDescription('Who do you want to remove from this ticket?').setRequired(true))
        ),
    execute: async (client, interaction) => {
        await interaction.deferReply();

        const TicketData = await OrderSchema.findOne({ channelId: interaction.channel.id}) || await ManagementSchema.findOne({ channelId: interaction.channel.id}) || await GeneralSchema.findOne({ channelId: interaction.channel.id})
        if (!TicketData) return await interaction.editReply(`This command can only be run in tickets!`)

       if (interaction.options.getSubcommand() === 'add') {
            const User = interaction.options.getUser('user');
            const Member = await interaction.guild.members.cache.get(User.id);

            if (!interaction.channel.permissionsFor(Member).has(PermissionsBitField.Flags.ViewChannel && PermissionsBitField.Flags.SendMessages)) return await interaction.editReply({ content: `This user already has access to the ticket!` });

            try {
                await interaction.channel.permissionOverwrites.create(User.id, {
                    ViewChannel: true, ReadMessageHistory: true, SendMessages: true, SendMessagesInThreads: true, UseApplicationCommands: true, AttachFiles: true, AddReactions: true, UseExternalEmojis: true, UseExternalStickers: true, UseExternalSounds: true, EmbedLinks: true, SendVoiceMessages: true,
                    Administrator: false, ManageChannels: false, ManageEvents: false, CreatePublicThreads: false, ManageThreads: false, ManageWebhooks: false, ManageMessages: false, UseExternalApps: false, CreatePrivateThreads: false, MentionEveryone: false, ManageGuild: false, ManageRoles: false, UseEmbeddedActivities: false, SendPolls: false, SendTTSMessages: false, CreateInstantInvite: false
                });
                
                await interaction.editReply(`<:ArrowR:1374149602214674482> Successfully added <@${User.id}> to the ticket.`);
            } catch (error) {
                console.error(error);
                await interaction.editReply({ content: `There was an error while adding this user.` });
            };
        } else if (interaction.options.getSubcommand() === 'remove') {
            const User = interaction.options.getUser('user');

            if (!interaction.channel.permissionsFor(User).has(PermissionsBitField.Flags.ViewChannel && PermissionsBitField.Flags.SendMessages)) return await interaction.reply({ content: `This user does not have access to the channel!`, flags: ['Ephemeral'] });
            if (User.id === TicketData.creatorId) return await interaction.reply({ content: `You cannot remove the owner of the ticket!` });

            try {
                await interaction.channel.permissionOverwrites.delete(User.id);
                await interaction.editReply(`<:ArrowR:1374149602214674482> Removed <@${User.id}> from the ticket.`);
            } catch (error) {
                console.error(error);
                await interaction.editReply({ content: `There was an error while removing this user.` });
            };
        };
    },
};