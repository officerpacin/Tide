const { SlashCommandBuilder } = require('discord.js');
const Data = require('../../Schemas/Data');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('order')
        .setDescription('.')
        .addSubcommandGroup(group =>
            group.setName('status')
                .setDescription('.')
                .addSubcommand(command =>
                    command.setName('set')
                        .setDescription('Customize the current order status.')
                        .addStringOption(option =>
                            option.setName('graphics')
                                .setDescription('Graphic Orders')
                                .setRequired(true)
                                .addChoices({ name: 'Open', value: 'Open' }, { name: 'Closed', value: 'Closed' })
                        )
                        .addStringOption(option =>
                            option.setName('liveries')
                                .setDescription('Livery Orders')
                                .setRequired(true)
                                .addChoices({ name: 'Open', value: 'Open' }, { name: 'Closed', value: 'Closed' })
                        )
                        .addStringOption(option =>
                            option.setName('clothing')
                                .setDescription('Clothing Orders')
                                .setRequired(true)
                                .addChoices({ name: 'Open', value: 'Open' }, { name: 'Closed', value: 'Closed' })
                        )
                        .addStringOption(option =>
                            option.setName('discord')
                                .setDescription('Discord Orders')
                                .setRequired(true)
                                .addChoices({ name: 'Open', value: 'Open' }, { name: 'Closed', value: 'Closed' })
                        )
                )
                .addSubcommand(command =>
                    command.setName('view')
                        .setDescription('View the current order status\'s!')
                )
        ),
    execute: async (client, interaction) => {
        const CurrentData = await Data.findOne({ key: 'bot' });
        if (!CurrentData) return await interaction.reply({ content: `There was an error while getting the current order status\'s!` });

        if (interaction.options.getSubcommand() === 'set') {
            if (!interaction.member.roles.cache.has('1309598597578493983') && !interaction.member.roles.cache.has('1335307690041409589') && interaction.user.id !== interaction.guild.ownerId) return await interaction.reply('Only Executives can change the order status!');

            const Graphic = interaction.options.getString('graphics');
            const Livery = interaction.options.getString('liveries');
            const Clothing = interaction.options.getString('clothing');
            const Discord = interaction.options.getString('discord');

            try {
                CurrentData.orderStatus.graphics = Graphic;
                CurrentData.orderStatus.liveries = Livery;
                CurrentData.orderStatus.clothing = Clothing;
                CurrentData.orderStatus.discord = Discord;

                await CurrentData.save();
                await interaction.reply('Your changes have been successfully saved!');
            } catch (error) {
                await interaction.reply('There was an error while saving your order status data. Please try again later.');
                console.warn(error);
            };
        } else if (interaction.options.getSubcommand() === 'view') {
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

            await interaction.reply(`## <:WTX_Logo_White:1355600446592385124> WTX Order Status\n**Graphic Orders:** ${GraphicStatus}\n**Livery Orders:** ${LiveryStatus}\n**Clothing Orders:** ${ClothingStatus}\n**Discord Orders:** ${DiscordStatus}`);
        };
    },
};