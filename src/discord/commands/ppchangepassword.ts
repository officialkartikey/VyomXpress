import bcrypt from "bcrypt";
import db from "../../models";

import {
  ChatInputCommandInteraction,
} from "discord.js";

const execute = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {

  await interaction.deferReply({
    ephemeral: true,
  });

  try {

    const email =
      interaction.options.getString(
        "email",
        true
      );

    const oldPassword =
      interaction.options.getString(
        "oldpassword",
        true
      );

    const newPassword =
      interaction.options.getString(
        "newpassword",
        true
      );

   const user =
  await db.User.findOne({
    where: { email },
  }) as any;

    if (!user) {

      await interaction.editReply(
        "❌ User not found."
      );

      return;
    }

    const isMatch =
      await bcrypt.compare(
        oldPassword,
        user.password
      );

    if (!isMatch) {

      await interaction.editReply(
        "❌ Old password is incorrect."
      );

      return;
    }

    const hashedPassword =
      await bcrypt.hash(
        newPassword,
        10
      );

    user.password =
      hashedPassword;

    await user.save();

    await interaction.editReply(
      "✅ Password changed successfully."
    );

  } catch (error) {

    console.error(error);

    await interaction.editReply(
      "❌ Something went wrong."
    );
  }
};

export default {
  execute,
};