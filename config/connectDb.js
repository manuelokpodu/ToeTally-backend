const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(
    `Mongodb connected successfully ${conn.connection.host}`.rainbow.underline
      .bold
  );
};

module.exports = connectDB;
