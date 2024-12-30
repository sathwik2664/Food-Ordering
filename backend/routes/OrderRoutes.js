const express = require('express');
const Order = require('../models/Order'); // Import the Order model
const router = express.Router();

// Route to create a new order
router.post('/create', async (req, res) => {
  try {
    const { userAddress, cartItems, total, canteenId } = req.body;

    // Log the request body for debugging
    console.log('Received request body:', req.body);

    if (!userAddress) {
      return res.status(400).json({ message: 'User address is missing' });
    }
    
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: 'Cart items are missing' });
    }
    
    if (!total) {
      return res.status(400).json({ message: 'Total amount is missing' });
    }
    
    if (!canteenId) {
      return res.status(400).json({ message: 'Canteen ID is missing' });
    }    

    if (!Array.isArray(cartItems) || cartItems.some(item => !item.name || !item.quantity || !item.price)) {
      return res.status(400).json({ message: 'Invalid cart item data' });
    }

    const newOrder = new Order({
      userAddress,
      cartItems,
      total,
      canteenId,
      status: 'Pending',
    });

    await newOrder.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order: newOrder,
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Failed to create order', error: error.message });
  }
});

// Route to get all orders with optional filters and pagination
router.get('/', async (req, res) => {
  try {
    const { canteenId, userAddress, page = 1, limit = 10 } = req.query;

    const filter = {};
    if (canteenId) filter.canteenId = canteenId;
    if (userAddress) filter['userAddress.address'] = userAddress; // Filter by user address

    const orders = await Order.find(filter)
      .populate('canteenId', 'name location') // Populate canteen details
      .skip((page - 1) * limit) // Pagination logic
      .limit(Number(limit));

    const totalOrders = await Order.countDocuments(filter);

    res.status(200).json({
      total: totalOrders,
      currentPage: page,
      totalPages: Math.ceil(totalOrders / limit),
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Failed to fetch orders' });
  }
});

// Route to get a specific order by ID
router.get('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('canteenId', 'name location');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Failed to fetch order' });
  }
});

// Route to update the status of an order
router.patch('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const validStatuses = ['Pending', 'Completed', 'Canceled']; // Define valid statuses
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true } // Return the updated document and validate
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order status updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Failed to update order status' });
  }
});

// Route to delete an order
router.delete('/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({
      message: 'Order deleted successfully',
      order: deletedOrder,
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Failed to delete order' });
  }
});

module.exports = router;
