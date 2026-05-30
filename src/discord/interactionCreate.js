const client = require("./bot");

const createUser = require("./commands/ppcreateuser");
const createService = require("./commands/ppcreateservice");
const getUser = require("./commands/ppgetuser");

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
    }
  } catch (error) {
    console.error(error);

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "Something went wrong.",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "Something went wrong.",
        ephemeral: true,
      });
    }
  }
});