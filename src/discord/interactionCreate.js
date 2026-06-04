const client = require("./bot");

const createUser = require("./commands/ppcreateuser");
const createService = require("./commands/ppcreateservice");
const getUser = require("./commands/ppgetuser");
const changePassword = require("./commands/ppchangepassword");

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  try {
    switch (interaction.commandName) {
      case "ppcreateuser":
        await createUser.execute(interaction);
        break;

      case "ppcreateservice":
        await createService.execute(interaction);
        break;

      case "ppgetuser":
        await getUser.execute(interaction);
        break;

      case "ppchangepassword":
        await changePassword.execute(interaction);
        break;

      default:
        await interaction.reply({
          content: "Unknown command.",
          ephemeral: true,
        });
    }
  } catch (error) {
    console.error(
      `[Discord Command Error] ${interaction.commandName}`,
      error
    );

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "❌ Something went wrong.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "❌ Something went wrong.",
        ephemeral: true,
      });
    }
  }
});