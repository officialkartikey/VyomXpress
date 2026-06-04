const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
  async execute(interaction) {

    await interaction.deferReply({
      ephemeral: true,
    });

    try {
      const email =
        interaction.options.getString("email");

      const oldPassword =
        interaction.options.getString(
          "oldpassword"
        );

      const newPassword =
        interaction.options.getString(
          "newpassword"
        );

      const user =
        await db.User.findOne({
          where: { email },
        });

      if (!user) {
        return interaction.editReply(
          "❌ User not found."
        );
      }

      const isMatch =
        await bcrypt.compare(
          oldPassword,
          user.password
        );

      if (!isMatch) {
        return interaction.editReply(
          "❌ Old password is incorrect."
        );
      }

      const hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );

      user.password =
        hashedPassword;

      await user.save();

      return interaction.editReply(
        "✅ Password changed successfully."
      );

    } catch (error) {

      console.error(error);

      return interaction.editReply(
        "❌ Something went wrong."
      );
    }
  },
};