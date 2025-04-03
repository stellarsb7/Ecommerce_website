import { format } from "date-fns";

const OrderItem = ({ order }) => {
  return (
    <div className="rounded-lg border p-4 shadow-sm border-blue-300 bg-white md:p-6">
      {/* Order Date */}
      <p className="text-sm text-gray-500">
        Ordered on: {format(new Date(order.createdAt), "dd MMM yyyy, HH:mm")}
      </p>

      {/* Ensure order.products is an array */}
      {order.products?.map(({ product, quantity, price }) => (
        product ? ( // Check if product exists before rendering
          <div key={product._id} className="flex items-center gap-4 mt-4">
            {/* Product Image */}
            <img className="h-16 w-16 rounded object-cover" src={product.image} alt={product.name} />

            {/* Product Details */}
            <div className="flex-1">
              <p className="text-base font-medium text-gray-800">{product.name}</p>
              <p className="text-sm text-gray-500">Quantity: {quantity}</p>
              <p className="text-sm font-bold text-green-600">${price.toFixed(2)}</p>
            </div>
          </div>
        ) : (
          <p key={Math.random()} className="text-sm text-red-500">Product details not available</p>
        )
      ))}

      {/* Total Amount */}
      <p className="mt-4 font-semibold text-blue-700">Total: ${order.totalAmount.toFixed(2)}</p>
    </div>
  );
};

export default OrderItem;
