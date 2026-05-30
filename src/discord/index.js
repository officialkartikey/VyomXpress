const client = require("./bot");

require("./interactionCreate");

client.login(process.env.DISCORD_TOKEN);