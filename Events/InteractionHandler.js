module.exports = {
    event: 'interactionCreate',
    once: false,
    execute: async (client, interaction) => {

        if (interaction.isCommand()) {
            try {
                if (interaction.user.id === '792563812393943061') return await interaction.reply({ content: `Racists are restricted from using this command!`});
                const Command = client.slashCommands.get(interaction.commandName);
                if (!Command) {
                    interaction.reply({ content: 'This command could not be found!', flags: ['Ephemeral'] });
                    return;
                };
                Command.execute(client, interaction);
            } catch (error) {
                interaction.reply({ content: 'There was an error while trying to execute this interaction!', flags: ['Ephemeral'] });
                console.log(`There was an error while executing a slash command interaction!\ ${error}`);
            };
        } else if (interaction.isButton()) {
            try {
                const Button = client.buttons.get(interaction.customId);
                if (!Button) {
                    interaction.reply({ content: 'This button could not be found!', flags: ['Ephemeral'] });
                    return;
                };
                Button.execute(client, interaction);
            } catch (error) {
                interaction.reply({ content: 'There was an error while trying to execute this interaction!', flags: ['Ephemeral'] });
                console.log(`There was an error while executing a button interaction!\ ${error}`);
            };
        } else if (interaction.isAnySelectMenu()) {
            try {
                const SelectMenu = client.selectMenus.get(interaction.customId);
                if (!SelectMenu) {
                    interaction.reply({ content: 'This select menu could not be found!', flags: ['Ephemeral'] });
                    return;
                };
                SelectMenu.execute(client, interaction);
            } catch (error) {
                interaction.reply({ content: 'There was an error while trying to execute this interaction!', flags: ['Ephemeral'] });
                console.log(`There was an error while executing a select menu interaction!\ ${error}`);
            };
        } else if (interaction.isModalSubmit()) {
            try {
                const Modal = client.modals.get(interaction.customId);
                if (!Modal) {
                    interaction.reply({ content: 'This modal could not be found!', flags: ['Ephemeral'] });
                    return;
                };
                Modal.execute(client, interaction);
            } catch (error) {
                interaction.reply({ content: 'There was an error while trying to execute this interaction!', flags: ['Ephemeral'] });
                console.log(`There was an error while executing a modal interaction!\ ${error}`);
            };   
        } else return;
    },
};