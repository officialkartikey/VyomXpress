const db = require("../../models");

module.exports = {
  async execute(interaction) {
    const name =
      interaction.options.getString("name");

    const description =
      interaction.options.getString(
        "description"
      );

    const price =
      interaction.options.getNumber("price");

    const service =
      await db.Service.create({
        name,
        description,
        price,
      });

    await interaction.reply({
      content: `✅ Service created: ${service.name}`,
    });
  },
};