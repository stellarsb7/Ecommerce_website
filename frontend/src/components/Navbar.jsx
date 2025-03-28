import { ShoppingCart, UserPlus, LogIn, LogOut, Lock, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();
	const navigate = useNavigate();
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchQuery.trim() !== "") {
			navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
			setSearchQuery("");
		}
	};

	return (
		<header className="fixed top-0 left-0 w-full bg-white shadow-md z-40 border-b border-gray-300">
			{/* ✅ Removed opacity & blue border to fix unwanted green tint */}
			<div className="container mx-auto px-4 py-3">
				<div className="flex flex-wrap justify-between items-center">
					{/* Logo */}
					<Link to="/" className="text-2xl font-bold text-blue-600 items-center space-x-2 flex">
						<img src="../../logo2.png" alt="ECommerce Logo" className="h-14 w-auto" />
					</Link>

					{/* Search Bar */}
					<form onSubmit={handleSearch} className="flex items-center border border-gray-300 rounded-md px-3 py-1 bg-white">
						<input
							type="text"
							placeholder="Search products..."
							className="px-3 py-2 outline-none text-gray-700 bg-white"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button type="submit" className="text-blue-600 hover:text-blue-700">
							<Search size={20} />
						</button>
					</form>

					{/* Navigation Links */}
					<nav className="flex flex-wrap items-center gap-4">
					<Link
						to={"/"}
						className="bg-slate-500 hover:bg-slate-700 text-white py-2 px-4 
						rounded-md flex items-center transition duration-300 ease-in-out"
					>
						Home
					</Link>
						{user && (
							<Link to={"/cart"} className="relative group text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out">
								<ShoppingCart className="inline-block mr-1 group-hover:text-blue-600" size={20} />
								<span className="hidden sm:inline">Cart</span>
								{cart.length > 0 && (
									<span
										className="absolute -top-2 -left-2 bg-green-600 text-white rounded-full px-2 py-0.5 
									text-xs group-hover:bg-green-500 transition duration-300 ease-in-out"
									>
										{cart.length}
									</span>
								)}
							</Link>
						)}

						{/* Admin Dashboard */}
						{isAdmin && (
							<Link
								className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md font-medium
								 transition duration-300 ease-in-out flex items-center"
								to={"/secret-dashboard"}
							>
								<Lock className="inline-block mr-1" size={18} />
								<span className="hidden sm:inline">Dashboard</span>
							</Link>
						)}

						{/* User Authentication */}
						{user ? (
							<button
								className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 
								rounded-md flex items-center transition duration-300 ease-in-out"
								onClick={logout}
							>
								<LogOut size={18} />
								<span className="hidden sm:inline ml-2">Log Out</span>
							</button>
						) : (
							<>
								<Link
									to={"/signup"}
									className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
								>
									<UserPlus className="mr-2" size={18} />
									Sign Up
								</Link>
								<Link
									to={"/login"}
									className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 
									rounded-md flex items-center transition duration-300 ease-in-out"
								>
									<LogIn className="mr-2" size={18} />
									Login
								</Link>
							</>
						)}
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
