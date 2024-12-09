const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// Path to products.json file
const productsFilePath = path.join(__dirname, "../data/products.json");

// Read all products
router.get("/", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error reading product data." });
  }
});

// Get product by ID
router.get("/:id", (req, res) => {
  try {
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));
    const product = products.find((p) => p.id === parseInt(req.params.id));
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product data." });
  }
});

// Update product quantity
router.post("/update-quantity", (req, res) => {
  const { productId, size, quantity } = req.body;

  try {
    // Read the products file
    const products = JSON.parse(fs.readFileSync(productsFilePath, "utf8"));

    // Find the product
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    // Find the size option and update its quantity
    const sizeOption = product.sizes.find((s) => s.size === size);
    if (!sizeOption) {
      return res.status(400).json({ message: "Size not found." });
    }

    if (sizeOption.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient stock." });
    }

    sizeOption.quantity -= quantity;

    // Write the updated products back to the JSON file
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    res.status(200).json({ message: "Product quantity updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product quantity." });
  }
});

module.exports = router;
