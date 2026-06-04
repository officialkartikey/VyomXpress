const {
  adminSessions,
} = require("../sessions");

module.exports = {
  async execute(interaction) {

    await interaction.deferReply({
      ephemeral: true,
    });

    adminSessions.delete(
      interaction.user.id
    );

    return interaction.editReply(
      "✅ Logged out successfully."
    );
  },
};