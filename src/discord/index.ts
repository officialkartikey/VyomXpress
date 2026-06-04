import client from "./bot";

import "./interactionCreate";

client.login(
  process.env.DISCORD_TOKEN
);