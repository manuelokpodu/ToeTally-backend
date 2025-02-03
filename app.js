const express = require("express");
const connectDB = require("./config/connectDb");
const dotenv = require("dotenv");
const colors = require("colors");

const app = express();

dotenv.config({ path: ".env" });

connectDB();

app.use(express.json());

const auth = require("./routes/auth");
const rating = require("./routes/rating");

app.use("/api/v1/auth", auth);
app.use("/api/v1/rating", rating);

const port = 5000;

const server = app.listen(
  port,
  console.log(`Server is running on ${port}`.red.bold)
);

// iyiolaabby
// BO05TdtvaXhNviDV
