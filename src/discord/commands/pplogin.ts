import bcrypt from "bcrypt";
import {
  ChatInputCommandInteraction,
} from "discord.js";

import db from "../../models";

import {
  adminSessions,
} from "../sessions";

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

    const password =
      interaction.options.getString(
        "password",
        true
      );

    const user =
      await db.User.findOne({
        where: { email },
      });

    if (!user) {

      await interaction.editReply(
        "❌ Invalid credentials."
      );

      return;
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {

      await interaction.editReply(
        "❌ Invalid credentials."
      );

      return;
    }

    if (user.role !== "admin") {

      await interaction.editReply(
        "❌ Admin access required."
      );

      return;
    }

    adminSessions.set(
      interaction.user.id,
      user.id
    );

    await interaction.editReply(
      "✅ Admin logged in successfully."
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