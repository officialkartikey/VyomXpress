const bcrypt = require("bcrypt");
const db = require("../../models");

const {
  adminSessions,
} = require("../sessions");

module.exports = {
  async execute(interaction) {

    await interaction.deferReply({
      ephemeral: true,
    });

    try {

      const email =
        interaction.options.getString(
          "email"
        );

      const password =
        interaction.options.getString(
          "password"
        );

      const user =
        await db.User.findOne({
          where: { email },
        });

      if (!user) {
        return interaction.editReply(
          "❌ Invalid credentials."
        );
      }

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return interaction.editReply(
          "❌ Invalid credentials."
        );
      }

      if (user.role !== "admin") {
        return interaction.editReply(
          "❌ Admin access required."
        );
      }

      adminSessions.set(
        interaction.user.id,
        user.id
      );

      return interaction.editReply(
        "✅ Admin logged in successfully."
      );

    } catch (error) {

      console.error(error);

      return interaction.editReply(
        "❌ Something went wrong."
      );
    }
  },
};