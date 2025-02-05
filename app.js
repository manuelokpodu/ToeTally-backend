const express = require("express");
const connectDB = require("./config/connectDb");
const dotenv = require("dotenv");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();

dotenv.config({ path: ".env" });

const allowedOrigins = [
  "https://toe-tally-frontend-dm3v.vercel.app", // Replace with your actual deployed frontend URL
  "http://localhost:5173", // Keep this for local development
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

app.use(express.json());

app.use("/api/products", productRoutes);

const auth = require("./routes/auth");
const rating = require("./routes/rating");

app.use("/api/v1/auth", auth);
app.use("/api/v1/rating", rating);

connectDB();

const port = 5000;

const server = app.listen(
  port,
  console.log(`Server is running on ${port}`.red.bold),
);

// iyiolaabby
// BO05TdtvaXhNviDV

// dsxrpyyid
// 766563822884671
