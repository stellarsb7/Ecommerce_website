import Order from "../models/order.model.js";

export const getOrders = async (req, res) => {
    try {
        console.log("Fetching orders...");
        
        const orders = await Order.find({ user: req.user.id })
            .populate("products.product") // Populate product details
            .sort({ createdAt: -1 });

        console.log("Orders fetched:", orders);
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Server error" });
    }
};
