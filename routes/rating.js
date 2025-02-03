const express = require("express");

const {
  createRating,
  getRatingsForProduct,
  updateRating,
  deleteRating,
} = require("../controllers/rating");

const router = express.Router();

router.post("/", createRating);
router.get("/:productId", getRatingsForProduct);
router.put("/:ratingId", updateRating);
router.delete("/:ratingId", deleteRating);

module.exports = router;
