const express = require("express");
const connectDB = require("./config/connectDb");
const dotenv = require("dotenv");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");

const app = express();

dotenv.config({ path: ".env" });

app.use("/api/products", productRoutes);

connectDB();

app.use(express.json());

const auth = require("./routes/auth");

app.use("/api/v1/auth", auth);

const port = 5000;

const server = app.listen(
  port,
  console.log(`Server is running on ${port}`.red.bold),
);

// iyiolaabby
// BO05TdtvaXhNviDV

// dsxrpyyid
// 766563822884671
