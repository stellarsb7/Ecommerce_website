import { useState } from "react";
import { Link } from "react-router-dom";
import { UserPlus, Mail, Lock, User, ArrowRight, Loader } from "lucide-react";
import { motion } from "framer-motion";
import { useUserStore } from "../stores/useUserStore";

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const { signup, loading } = useUserStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		signup(formData);
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-white min-h-screen'>
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-green-500'>Create your account</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
				<div className='bg-white border border-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						{["name", "email", "password", "confirmPassword"].map((field) => (
							<div key={field}>
								<label
									htmlFor={field}
									className='block text-sm font-medium text-gray-700 capitalize'
								>
									{field === "confirmPassword" ? "Confirm Password" : field}
								</label>
								<div className='mt-1 relative rounded-md shadow-sm'>
									<div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
										{field === "name" && <User className='h-5 w-5 text-gray-400' />}
										{field === "email" && <Mail className='h-5 w-5 text-gray-400' />}
										{(field === "password" || field === "confirmPassword") && (
											<Lock className='h-5 w-5 text-gray-400' />
										)}
									</div>
									<input
										id={field}
										type={field.includes("password") ? "password" : "text"}
										required
										value={formData[field]}
										onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
										className='block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md
										 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500
										 focus:border-green-500 sm:text-sm'
										placeholder={
											field === "name"
												? "John Doe"
												: field === "email"
												? "you@example.com"
												: "••••••••"
										}
									/>
								</div>
							</div>
						))}

						<button
							type='submit'
							className='w-full flex justify-center py-2 px-4 border border-transparent 
							rounded-md shadow-sm text-sm font-medium text-white bg-green-500
							hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2
							focus:ring-green-500 transition duration-150 ease-in-out disabled:opacity-50'
							disabled={loading}
						>
							{loading ? (
								<>
									<Loader className='mr-2 h-5 w-5 animate-spin' />
									Loading...
								</>
							) : (
								<>
									<UserPlus className='mr-2 h-5 w-5' />
									Sign up
								</>
							)}
						</button>
					</form>

					<p className='mt-6 text-center text-sm text-gray-500'>
						Already have an account?{" "}
						<Link to='/login' className='font-medium text-blue-500 hover:text-blue-600'>
							Login here <ArrowRight className='inline h-4 w-4' />
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default SignUpPage;
