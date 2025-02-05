const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Load env variables
dotenv.config({ path: "./config/config.env" });

// Load models
const Product = require("./models/product");
const User = require("./models/user");
const Rating = require("./models/rating");

// Connect DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON file

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8"),
);
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/products.json`, "utf-8"),
);
const rating = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/rating.json`, "utf-8"),
);

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await Product.create(products);
    await Rating.create(ratings);

    console.log("Data Imported...".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Rating.deleteMany();
    console.log("Data Destroyed...".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
