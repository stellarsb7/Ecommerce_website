import { useEffect } from "react";
import CategoryItem from "../components/CategoryItem";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";
import { motion } from "framer-motion";

const categories = [
	{ href: "/bags", name: "Bags", imageUrl: "/bags3.png" },
	{ href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
	{ href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
	{ href: "/sports", name: "Sports", imageUrl: "/sports.png"},
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes2.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
	{ href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
	{ href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
	{ href: "/electronics", name:"Electronics", imageUrl: "/electronics.png"}
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	useEffect(() => {
		fetchFeaturedProducts();
	}, [fetchFeaturedProducts]);

	return (
		<div className='relative min-h-screen bg-white overflow-hidden'>
			<div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
				<motion.h1
					className='text-center text-5xl sm:text-6xl font-bold text-blue-600 mb-4'
					// initial={{ opacity: 0, y: -20 }}
					// animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					Explore Products
				</motion.h1>
				<motion.p
					className='text-center text-xl text-gray-500 mb-12'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.2 }}
				>
					Explore the hottest innovations in sustainable fashion!
				</motion.p>

				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4}}
				>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</motion.div>

				{!isLoading && products.length > 0 && (
					<FeaturedProducts featuredProducts={products} />
				)}
			</div>
		</div>
	);
};

export default HomePage;
