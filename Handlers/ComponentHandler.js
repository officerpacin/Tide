const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    const SelectMenusFolder = fs.readdirSync('./Components/Menus').filter(command => command.endsWith(".js"));
    const ButtonsFolder = fs.readdirSync('./Components/Buttons').filter(command => command.endsWith(".js"));
    const ModalsFolder = fs.readdirSync('./Components/Modals').filter(command => command.endsWith(".js"));
    
    client.buttons = new Map();
    client.selectMenus = new Map();
    client.modals = new Map();
    try {
        for (const File of SelectMenusFolder) {
            const SelectMenuFilePath = path.join(__dirname, '../Components/Menus', File);
            const SelectMenuFile = require(SelectMenuFilePath);
            
            client.selectMenus.set(SelectMenuFile.customId, SelectMenuFile);
        };
    
        for (const File of ButtonsFolder) {
            const ButtonsFilePath = path.join(__dirname, '../Components/Buttons', File);
            const ButtonsFile = require(ButtonsFilePath);
    
            if (Array.isArray(ButtonsFile.customId)) {
                ButtonsFile.customId.forEach(CustomID => client.buttons.set(CustomID, ButtonsFile));
            } else {
                client.buttons.set(ButtonsFile.customId, ButtonsFile);
            };
        };
            
        for (const File of ModalsFolder) {
            const ModalsFilePath = path.join(__dirname, '../Components/Modals', File);
            const ModalsFile = require(ModalsFilePath);
    
            client.modals.set(ModalsFile.customId, ModalsFile);
        };
    } catch (error) {
        console.log(`There was an error while running the Component Handler. Error: ${error}`);
    };
};