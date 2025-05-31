const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.prefixCommands = new Map();
    const PrefixFolder = path.join(__dirname, '../Commands/Prefix');
    const PrefixFiles = fs.readdirSync(PrefixFolder).filter(file => file.endsWith('.js'));

    try {
        for (const File of PrefixFiles) {
            const FilePath = path.join(__dirname, '../Commands/Prefix', File);
            const PrefixModule = require(FilePath);
            try {
                client.prefixCommands.set(PrefixModule.command, PrefixModule);
            } catch (error) {
                console.log(`There was an error while mapping one of the prefix commands. Error: ${error}`);
            };
        };
    } catch (error) {
        console.error(`There was an error while registering client prefix commands. Error: ${error}`);
    };
};