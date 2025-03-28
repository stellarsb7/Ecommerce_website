import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
	const [searchParams] = useSearchParams();
	const query = searchParams.get("query");
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				setLoading(true);
				const { data } = await axios.get(`/api/products/search?query=${query}`);
				setProducts(data);
			} catch (err) {
				setError("Failed to load search results.");
			} finally {
				setLoading(false);
			}
		};

		if (query) {
			fetchSearchResults();
		}
	}, [query]);

	return (
		<div className="relative min-h-screen bg-white overflow-hidden">
			{/* ✅ Matches HomePage background settings */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
				<h1 className="text-center text-2xl sm:text-3xl font-bold text-blue-600 mb-4">
					Search Results for "{query}"
				</h1>

				{loading && <p className="text-center">Loading...</p>}
				{error && <p className="text-red-500 text-center">{error}</p>}

				{products.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{products.map((product) => (
							<Link
								to={`/product/${product._id}`}
								key={product._id}
								className="border p-4 rounded-md shadow-md hover:shadow-lg transition bg-white"
							>
								<img
									src={product.image}
									alt={product.name}
									className="w-full h-40 object-cover mb-2 rounded-md"
								/>
								<h2 className="text-lg font-semibold">{product.name}</h2>
								<p className="text-gray-600">${product.price}</p>
							</Link>
						))}
					</div>
				) : (
					<p className="text-center text-gray-600">No products found.</p>
				)}
			</div>
		</div>
	);
};

export default SearchPage;
