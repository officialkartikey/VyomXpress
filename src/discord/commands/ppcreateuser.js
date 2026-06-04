const bcrypt = require("bcrypt");
const db = require("../../models");

module.exports = {
  async execute(interaction) {
    const username =
      interaction.options.getString("username");

    const email =
      interaction.options.getString("email");
       
      const password=
      interaction.options.getString("password");

    const existingUser =
      await db.User.findOne({
        where: { username },
      });

    if (existingUser) {
      return interaction.reply({
        content: "User already exists.",
        ephemeral: true,
      });
    }

    // const password = "Password@123";

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await db.User.create({
      username,
      email,
      password
    });

    await interaction.reply({
      content: ` User created: ${user.username}`,
    });
  },
};