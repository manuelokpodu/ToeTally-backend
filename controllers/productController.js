const Product = require("../models/product");
const mongoose = require("mongoose");

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      productTag,
      price,
      color,
      size,
      image,
      thumbnail,
      description,
      productDetails,
    } = req.body;

    if (
      !title ||
      !productTag ||
      !price ||
      !color ||
      !size ||
      !price ||
      !description
    ) {
      return res.status(400).json({
        message:
          "Name, price, productTag, color, size and description are required!",
      });
    }

    const newProduct = new Product({
      title,
      productTag,
      price,
      color,
      size,
      image,
      thumbnail,
      description,
      productDetails,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get a single product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Update a product by ID
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    productTag,
    price,
    color,
    size,
    image,
    thumbnail,
    description,
    productDetails,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        title,
        productTag,
        price,
        color,
        size,
        image,
        thumbnail,
        description,
        productDetails,
      },
      { new: true },
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product by ID
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

// search for a product
exports.searchProducts = async (req, res) => {
  try {
    // Get the search term from the query parameters
    const searchTerm = req.query.q || ""; // default to empty string if no query provided

    // Perform a case-insensitive search on multiple fields
    const products = await Product.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Search by name (case-insensitive)
        { description: { $regex: searchTerm, $options: "i" } }, // Search by description (case-insensitive)
        { category: { $regex: searchTerm, $options: "i" } }, // Optional: search by category (case-insensitive)
      ],
    });

    // Return the search results
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while searching for products." });
  }
};
