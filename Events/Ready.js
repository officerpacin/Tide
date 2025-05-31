require('dotenv').config();
const { ActivityType } = require('discord.js');
const DataSchema = require('../Schemas/Data');

module.exports = {
    event: 'ready',
    once: true,
    execute: async (client) => {
        console.log(`${client.user.tag} is now ready.`);

        async function timedCheck() {
            const Guild = await client.guilds.fetch('1309597899021222000');
            const MemberCountChannel = await client.channels.fetch('1327944012522323979');
            const BoostCountChannel = await client.channels.fetch('1327944013243748485');

            if (!MemberCountChannel) return console.warn(`Warning! The Member Counting Channel could not be found!`);
            if (MemberCountChannel.name !== `Members: ${Guild.memberCount}`) {
                await MemberCountChannel.edit({ name: `Members: ${Guild.memberCount}` });
            };

            if (!BoostCountChannel) return console.warn(`Warning! The Boost Counting Channel could not be found!`);
            if (BoostCountChannel.name !== `Boosts: ${Guild.premiumSubscriptionCount}`) {
                await BoostCountChannel.edit({ name: `Boosts: ${Guild.premiumSubscriptionCount}`});
            };

            await client.user.setActivity(`Watching over ${Guild.memberCount} members!`, { type: ActivityType.Custom });
        };

        timedCheck();
        setInterval(timedCheck, 1000 * 60 * 15);

        try {
            await mongoose.connect(process.env.MONGO_URL);

            let Data = await DataSchema.findOne({ key: 'bot' });
            if (!Data) {
                Data = await DataSchema.create({
                    key: 'bot',
                    prefix: '-',
                    startTime: Date.now(),
                    orderStatus: {
                        liveries: 'Open',
                        graphics: 'Open',
                        clothing: 'Open',
                        discord: 'Open'
                    }
                });
            };
            const startTime = Date.now();

            Data.startTime = startTime;
            await Data.save();
        } catch (error) {
            console.error(`There was an error while connecting to the Mongo Database... Error: ${error}`);
        };
    },
};