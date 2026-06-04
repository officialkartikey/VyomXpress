const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
  async execute(interaction) {

    await interaction.deferReply({
      ephemeral: true,
    });

    try {

      const ADMIN_IDS = [
        process.env.ADMIN_DISCORD_ID
      ];

      if (
        !ADMIN_IDS.includes(
          interaction.user.id
        )
      ) {
        return interaction.editReply(
          "❌ Only admins can use this command."
        );
      }

      const username =
        interaction.options.getString(
          "username"
        );

      const email =
        interaction.options.getString(
          "email"
        );

      const password =
        interaction.options.getString(
          "password"
        );

      const existingUser =
        await db.User.findOne({
          where: { username },
        });

      if (existingUser) {
        return interaction.editReply(
          "❌ User already exists."
        );
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const user =
        await db.User.create({
          username,
          email,
          password:
            hashedPassword,
          role: "user",
        });

      return interaction.editReply(
        `✅ User created: ${user.username}`
      );

    } catch (error) {

      console.error(error);

      return interaction.editReply(
        "❌ Something went wrong."
      );
    }
  },
};