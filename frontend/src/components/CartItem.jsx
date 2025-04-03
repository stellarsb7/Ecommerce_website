import { Minus, Plus, Trash } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
	const { removeFromCart, updateQuantity } = useCartStore();

	return (
		<div className='rounded-lg border p-4 shadow-sm border-blue-300 bg-white md:p-6'>
			<div className='space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0'>
				<div className='shrink-0 md:order-1'>
					<img className='h-20 md:h-32 rounded object-cover' src={item.image} />
				</div>
				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between md:order-3 md:justify-end'>
					<div className='flex items-center gap-2'>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-blue-300 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2
							  focus:ring-blue-500'
							onClick={() => updateQuantity(item._id, item.quantity - 1)}
						>
							<Minus className='text-blue-600' />
						</button>
						<p>{item.quantity}</p>
						<button
							className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
							 border-blue-300 bg-blue-100 hover:bg-blue-200 focus:outline-none 
						focus:ring-2 focus:ring-blue-500'
							onClick={() => updateQuantity(item._id, item.quantity + 1)}
						>
							<Plus className='text-blue-600' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold text-green-600'>${item.price}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium !text-blue-700 hover:!text-green-500 hover:underline'>
						{item.name}
					</p>
					{/* <p className='text-sm text-blue-500'>{item.description}</p> */}

					<div className='flex items-center gap-4'>
						<button
							className='inline-flex items-center text-sm font-medium text-red-500
							 hover:text-red-400 hover:underline'
							onClick={() => removeFromCart(item._id)}
						>
							<Trash />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
