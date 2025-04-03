import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { motion } from "framer-motion";
import { Package } from "lucide-react";
import axios from "../lib/axios";
import OrderItem from "../components/OrderItem"; // Component for individual orders

const OrdersPage = () => {
	const { user, loading: userLoading } = useUserStore();
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user) {
			console.warn("⚠️ User not found, skipping fetchOrders");
			setLoading(false);
			return;
		}

		const fetchOrders = async () => {
			try {
				const token = useUserStore.getState().token; // Retrieve token from storage
	
				if (!token) {
					console.error("❌ No token found");
					return;
				}
	
				const response = await axios.get("/orders", {
					headers: {
						Authorization: `Bearer ${token}`, // Attach token to request
					},
				});
	
				console.log("✅ Orders fetched:", response.data);
				setOrders(response.data); // <-- ✅ Update state with fetched orders
				setLoading(false); // <-- ✅ Stop loading after fetching
			} catch (error) {
				console.error("❌ Failed to fetch orders:", error);
				setError("Failed to load orders. Please try again.");
				setLoading(false);
			}
		};
	

		fetchOrders();
	}, [user]);

	if (userLoading || loading)
		return <div className="flex justify-center items-center h-screen bg-white text-gray-600">Loading...</div>;

	if (!user)
		return (
			<div className="flex flex-col items-center justify-center h-screen text-gray-700">
				<p className="text-lg font-semibold mb-4">You need to log in to view your orders.</p>
				<Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-md">
					Login
				</Link>
			</div>
		);

	if (error)
		return <div className="text-center text-red-500 mt-10">{error}</div>;

	return (
		<div className="py-8 md:py-16 bg-white">
			<div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h1>

				{orders.length === 0 ? <EmptyOrdersUI /> : <OrdersList orders={orders} />}
			</div>
		</div>
	);
};

export default OrdersPage;

const OrdersList = ({ orders }) => (
	<motion.div
		className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		{orders?.length > 0 ? (
			orders.map((order) => (
				<OrderItem key={order._id || order.id} order={order} />
			))
		) : (
			<p className="text-gray-500 col-span-full text-center">No orders found.</p>
		)}
	</motion.div>
);

const EmptyOrdersUI = () => (
	<motion.div
		className="flex flex-col items-center justify-center space-y-4 py-16 bg-white"
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5 }}
	>
		<Package className="h-24 w-24 text-blue-400" />
		<h3 className="text-2xl font-semibold text-blue-600">No orders found</h3>
		<p className="text-gray-500">Looks like you haven't placed any orders yet.</p>
		<Link
			className="mt-4 rounded-md bg-emerald-500 px-6 py-2 text-white transition-colors hover:bg-emerald-600"
			to="/"
		>
			Start Shopping
		</Link>
	</motion.div>
);
