import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCartStore } from "../stores/useCartStore";
import { motion } from "framer-motion";

const ProductPage = () => {
	const { id } = useParams();
	const { addToCart } = useCartStore();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		console.log("Fetching product with ID:", id);
		const fetchProduct = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach token
                    },
                });
				console.log("Got the data");
				setProduct(data);
			} catch (err) {
				setError("Failed to load product.");
			} finally {
				setLoading(false);
			}
		};

		fetchProduct();
	}, [id]);

	if (loading) return <div className="text-center py-10 text-black">Loading...</div>;
	if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
	if (!product) return <div className="text-center text-black py-10">Product not found.</div>;

	return (
		<div className="relative min-h-screen bg-white overflow-hidden">
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<motion.div 
					className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{/* Product Image */}
					<div className="flex justify-center">
						<img src={product.image} alt={product.name} className="w-full max-w-lg rounded-2xl shadow-xl" />
					</div>

					{/* Product Details */}
					<div className="space-y-6">
						{/* Force Product Name to Golden */}
						<motion.h1
							className="text-4xl font-bold text-yellow-500 !important"
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
							style={{ color: "#FFD700" }} // Hex Code for Gold
						>
							{product.name}
						</motion.h1>

						{/* Force Other Text to Black */}
						<p className="text-xl font-semibold text-black !important" style={{ color: "#000000" }}>
							${product.price}
						</p>
						<p className="text-lg text-black !important" style={{ color: "#000000" }}>
							{product.description}
						</p>

						{/* Add to Cart Button */}
						<motion.button
							className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-md"
							onClick={() => addToCart(product)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Add to Cart
						</motion.button>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default ProductPage;
