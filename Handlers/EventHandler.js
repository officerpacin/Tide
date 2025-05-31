const fs = require('fs');
const path = require('path');

module.exports = async (client) => {
    const EventsFolder = path.join(__dirname, '../Events');
    const EventFiles = fs.readdirSync(EventsFolder).filter(file => file.endsWith('.js'));
    
    for (const File of EventFiles) {
        const FilePath = path.join(EventsFolder, File);
        const EventModule = require(FilePath);

        if (!EventModule.event || !EventModule.execute) {
            console.warn(`An event file was skipped! Event: ${File}`);
            continue;
        };

        try { 
            if (EventModule.once) {
                client.once(EventModule.event, async (...args) => {
                    try {
                        await EventModule.execute(client, ...args);
                    } catch (error) {
                        console.error(`There was an error while executing a client event! Error: ${error}`);
                    }
                });
            } else {
                client.on(EventModule.event, async (...args) => {
                    try {
                        await EventModule.execute(client, ...args);
                    } catch (error) {
                        console.error(`There was an error while executing a client event! Error: ${error}`);
                    };
                });
            };
        } catch (error) {
            console.error(`There was an error while registering client events. Error: ${error}`);
        };
    };
};