import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams,Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
	const { fetchProductsByCategory, products } = useProductStore();
	const { category } = useParams();

	useEffect(() => {
		fetchProductsByCategory(category);
	}, [fetchProductsByCategory, category]);

	return (
		<div className='min-h-screen bg-white'>
			<div className='relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-4xl sm:text-5xl font-bold text-blue-600 mb-8'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					{category.charAt(0).toUpperCase() + category.slice(1)}
				</motion.h1>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					{products?.length === 0 ? (
						<h2 className='text-3xl font-semibold text-gray-500 text-center col-span-full'>
							No products found
						</h2>
					) : (
						products.map((product) => <Link key={product._id} to={`/product/${product._id}`}>
			<ProductCard product={product} />
		</Link>)
					)}
				</motion.div>
			</div>
		</div>
	);
};

export default CategoryPage;

