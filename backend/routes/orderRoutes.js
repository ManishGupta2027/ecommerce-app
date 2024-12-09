const express = require('express');
const router = express.Router();
const fs = require('fs');
const orders = require('../data/orders.json'); // Or your database

// Route to fetch orders by user ID
router.get('/:userId', (req, res) => {
  const userOrders = orders.filter(order => order.userId === parseInt(req.params.userId));
  if (userOrders.length) {
    res.json(userOrders);
  } else {
    res.status(404).json({ message: 'No orders found for this user' });
  }
});
// POST route to save an order
router.post('/place-order', (req, res) => {
    const { userId, cartItems, total } = req.body;
  
    // Create a new order object
    const newOrder = {
      orderId: new Date().getTime(), // Use timestamp as order ID
      userId,
      items: cartItems,
      status: 'completed',
      total,
      date: new Date().toISOString(),
    };
  
    // Add the new order to the orders array
    orders.push(newOrder);
  
    // Save the updated orders array to the file
    fs.writeFileSync('data/orders.json', JSON.stringify(orders));
  
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  });

module.exports = router;
