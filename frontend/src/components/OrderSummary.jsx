import { motion } from "framer-motion";
import { useCartStore } from "../stores/useCartStore";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "../lib/axios";

const stripePromise = loadStripe(
	"pk_test_51R2neeHgKMYAAwTiBqvXM5LNqeW9HWGd4BxcTJVJt7qLxD1G60Acu7nfhIJJHSnKJNSVeXuMoxwZTJit1yVMrY4z00A3HNfhjP"
);

const OrderSummary = () => {
	const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

	const savings = subtotal - total;
	const formattedSubtotal = subtotal.toFixed(2);
	const formattedTotal = total.toFixed(2);
	const formattedSavings = savings.toFixed(2);

	const handlePayment = async () => {
		const stripe = await stripePromise;
		const res = await axios.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
		const result = await stripe.redirectToCheckout({
			sessionId: session.id,
		});

		if (result.error) {
			console.error("Error:", result.error);
		}
	};

	return (
		<motion.div
			className='space-y-4 rounded-lg border border-blue-500 bg-white p-4 shadow-sm sm:p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
		>
			<p className='text-xl font-semibold text-blue-600'>Order Summary</p>

			<div className='space-y-4'>  
				<div className='space-y-2'>
					<dl className='flex items-center justify-between gap-4'>
						<dt className='text-base font-normal text-gray-700'>Original price</dt>
						<dd className='text-base font-medium text-black'>${formattedSubtotal}</dd>
					</dl>

					{savings > 0 && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-700'>Savings</dt>
							<dd className='text-base font-medium text-green-600'>-${formattedSavings}</dd>
						</dl>
					)}

					{coupon && isCouponApplied && (
						<dl className='flex items-center justify-between gap-4'>
							<dt className='text-base font-normal text-gray-700'>Coupon ({coupon.code})</dt>
							<dd className='text-base font-medium text-green-600'>-{coupon.discountPercentage}%</dd>
						</dl>
					)}
					<dl className='flex items-center justify-between gap-4 border-t border-gray-300 pt-2'>
						<dt className='text-base font-bold text-black'>Total</dt>
						<dd className='text-base font-bold text-green-600'>${formattedTotal}</dd>
					</dl>
				</div>

				<motion.button
					className='flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handlePayment}
				>
					Proceed to Checkout
				</motion.button>

				<div className='flex items-center justify-center gap-2'>
					<span className='text-sm font-normal text-gray-500'>or</span>
					<Link
						to='/'
						className='inline-flex items-center gap-2 text-sm font-medium text-blue-600 underline hover:text-blue-500 hover:no-underline'
					>
						Continue Shopping
						<MoveRight size={16} />
					</Link>
				</div>
			</div>
		</motion.div>
	);
};

export default OrderSummary;
