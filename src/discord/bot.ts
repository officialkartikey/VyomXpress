import {
  Client,
  GatewayIntentBits,
} from "discord.js";

import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
  ],
});

client.once(
  "ready",
  () => {

    console.log(
      `🤖 ${client.user?.tag} is online`
    );

  }
);

export default client;