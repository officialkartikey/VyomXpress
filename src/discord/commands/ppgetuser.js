const db = require("../../models");

module.exports = {
  async execute(interaction) {
    const username =
      interaction.options.getString(
        "username"
      );

    const user =
      await db.User.findOne({
        where: { username },
      });

    if (!user) {
      return interaction.reply({
        content: "User not found.",
        ephemeral: true,
      });
    }

    await interaction.reply({
      content:
        `👤 User Details\n\n` +
        `ID: ${user.id}\n` +
        `Username: ${user.username}\n` +
        `Email: ${user.email}`,
    });
  },
};