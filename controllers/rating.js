const Rating = require("../models/rating");
const User = require("../models/user");

// Create a new rating for a product
const createRating = async (req, res) => {
  try {
    const { minRating, maxRating, averageRating, userId, productId } = req.body;

    // Validating the rating
    if (
      minRating < 1 ||
      minRating > 5 ||
      maxRating < 1 ||
      maxRating > 5 ||
      averageRating < 1 ||
      averageRating > 5
    ) {
      return res
        .status(400)
        .json({ message: "Ratings must be between 1 and 5." });
    }

    // Ensuring  the averageRating doesn't exceed maxRating
    if (averageRating > maxRating) {
      return res
        .status(400)
        .json({ message: "Average rating cannot exceed max rating." });
    }

    // Checking if the user and product exist
    const userExists = await User.findById(userId);
    const productExists = await Product.findById(productId);

    if (!userExists) {
      return res.status(404).json({ message: "User not found." });
    }

    if (!productExists) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Creating a new rating
    const newRating = new Rating({
      minRating,
      maxRating,
      averageRating,
      userId,
      productId,
    });

    // Savingthe rating to the database
    await newRating.save();

    // Respond with the new rating data
    return res.status(201).json(newRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Get all ratings for a product
const getRatingsForProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find ratings for the product
    const ratings = await Rating.find({ productId }).populate(
      "userId",
      "name email"
    );

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this product." });
    }

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Update an existing rating
const updateRating = async (req, res) => {
  try {
    const { ratingId } = req.params;
    const { minRating, maxRating, averageRating } = req.body;

    // Validate the updated rating
    if (
      minRating < 1 ||
      minRating > 5 ||
      maxRating < 1 ||
      maxRating > 5 ||
      averageRating < 1 ||
      averageRating > 5
    ) {
      return res
        .status(400)
        .json({ message: "Ratings must be between 1 and 5." });
    }

    // Ensure that the averageRating doesn't exceed maxRating
    if (averageRating > maxRating) {
      return res
        .status(400)
        .json({ message: "Average rating cannot exceed max rating." });
    }

    // Find and update the rating
    const updatedRating = await Rating.findByIdAndUpdate(
      ratingId,
      { minRating, maxRating, averageRating },
      { new: true }
    );

    if (!updatedRating) {
      return res.status(404).json({ message: "Rating not found." });
    }

    return res.status(200).json(updatedRating);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

// Delete a rating
const deleteRating = async (req, res) => {
  try {
    const { ratingId } = req.params;

    const deletedRating = await Rating.findByIdAndDelete(ratingId);

    if (!deletedRating) {
      return res.status(404).json({ message: "Rating not found." });
    }

    return res.status(200).json({ message: "Rating deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = {
  createRating,
  getRatingsForProduct,
  updateRating,
  deleteRating,
};
