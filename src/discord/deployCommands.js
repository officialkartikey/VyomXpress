const { REST, Routes, SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const commands = [
  new SlashCommandBuilder()
    .setName("ppcreateuser")
    .setDescription("Create a new user")
    .addStringOption(option =>
      option
        .setName("username")
        .setDescription("Username")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("email")
        .setDescription("Email")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("password")
        .setDescription("Password")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("ppcreateservice")
    .setDescription("Create a service")
    .addStringOption(option =>
      option
        .setName("name")
        .setDescription("Service Name")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("description")
        .setDescription("Description")
        .setRequired(true)
    )
    .addNumberOption(option =>
      option
        .setName("price")
        .setDescription("Price")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("ppgetuser")
    .setDescription("Get user by username")
    .addStringOption(option =>
      option
        .setName("username")
        .setDescription("Username")
        .setRequired(true)
    ),

  new SlashCommandBuilder()
    .setName("ppchangepassword")
    .setDescription("Change user password")
    .addStringOption(option =>
      option
        .setName("email")
        .setDescription("User Email")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("oldpassword")
        .setDescription("Old Password")
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName("newpassword")
        .setDescription("New Password")
        .setRequired(true)
    ),
].map(command => command.toJSON());

const rest = new REST({
  version: "10",
}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Registering commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("✅ Commands Registered");
  } catch (error) {
    console.error(error);
  }
})();