require("dotenv").config();
const { Thought, User } = require("../models");
const { randomName, randomThoughts, randomEmail } = require("./data");

const mongoose = require("mongoose");

mongoose.connect(process.env.db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", (err) => err);

db.once("open", async () => {
  console.log("connected");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = [];

  for (let i = 0; i < 20; i++) {
    const username = randomName();

    const email = randomEmail(username);

    users.push({
      username,
      email,
    });
  }

  // Add users to collection

  await User.collection.insertMany(users);

  // Log the seed data in copnsole
  console.table(users);

  console.info("Seed completed!");
  process.exit(0);
});
