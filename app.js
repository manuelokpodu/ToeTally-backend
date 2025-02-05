const express = require("express");
const connectDB = require("./config/connectDb");
const dotenv = require("dotenv");
const colors = require("colors");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

const app = express();

dotenv.config({ path: ".env" });

app.use("/api/products", productRoutes);

connectDB();

app.use(express.json());


const allowedOrigins = [
  "https://toe-tally-frontend-dm3v.vercel.app/", // Replace with your actual deployed frontend URL
  "http://localhost:5173", // Keep this for local development
];


app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access backend
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

const auth = require("./routes/auth");
const rating = require("./routes/rating");

app.use("/api/v1/auth", auth);
app.use("/api/v1/rating", rating);

const port = 5000;

const server = app.listen(
  port,
  console.log(`Server is running on ${port}`.red.bold),
);

// iyiolaabby
// BO05TdtvaXhNviDV

// dsxrpyyid
// 766563822884671
