const discord = require('discord.js')
const { Client, Collection } = require("discord.js");
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs')
const ee = require("./settings/embed.json");
const dotenv = require('dotenv');
dotenv.config();

const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.categories = fs.readdirSync("./commands/");;

["command_handler", "event_handler", "slash_handler"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
});

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to DB!');
}).catch((err) => {
    console.log(err);
});

client.login(process.env.TOKEN)