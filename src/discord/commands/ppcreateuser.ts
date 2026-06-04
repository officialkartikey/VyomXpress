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

    if (
      !adminSessions.has(
        interaction.user.id
      )
    ) {
      await interaction.editReply(
        "❌ Please login first using /pplogin"
      );
      return;
    }

    const username =
      interaction.options.getString(
        "username",
        true
      );

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

    const existingUser =
      await db.User.findOne({
        where: { username },
      });

    if (existingUser) {

      await interaction.editReply(
        "❌ User already exists."
      );

      return;
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
      }) as any;

    await interaction.editReply(
      `✅ User created: ${user.username}`
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