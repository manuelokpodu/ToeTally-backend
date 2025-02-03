const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema(
  {
    minRating: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 5;
        },
        message: "minRating must be between 1 and 5.",
      },
    },
    maxRating: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 5;
        },
        message: "maxRating must be between 1 and 5.",
      },
    },
    averageRating: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v <= this.maxRating;
        },
        message: "averageRating cannot exceed maxRating.",
      },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Rating", RatingSchema);
