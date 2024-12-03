'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api'; // Import the custom API utility
import toast from 'react-hot-toast';

export default function MyCart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();


  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    setError(null);

    const orderData = {
      totalPrice,
      estimatedDeliveryDate: new Date(new Date().setDate(new Date().getDate() + 5)), // Example: 5 days from now
      paymentMethod: 'cashondelivery', // Replace with actual customer ID from context/auth
      products: cart.map(({ product, quantity }) => ({
        product: product._id,
        quantity,
      })),
      status: 'pending',
      paymentStatus: 'pending',
    };

    try {
      // Use the custom API utility
      const createdOrder = await api('/order', {
        method: 'POST',
        body: orderData,
    
      });

      toast.success(`Your Order has been placed!`, {
        style: {
          borderRadius: "8px",
          background: "#16a34a",
          color: "#fff",
        }
      });
      clearCart(); // Clear the cart after successful order placement
      router.push('/myorder'); // Navigate to My Orders page
    } catch (err: any) {
      console.error('Error placing order:', err);
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-lg max-w-3xl mx-auto mt-12">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex justify-center">
        Your <span className="text-green-600 ml-2">Cart</span>
      </h2>

      {/* Display error if any */}
      {error && <p className="text-red-500 bg-red-100 p-4 rounded mb-4">{error}</p>}

      {cart.length === 0 ? (
        <p className="text-gray-600 text-lg text-center">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {cart.map(({ product, quantity }) => (
              <div key={product._id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <img
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(product._id, Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium text-gray-800">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(product._id, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-full"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="text-red-500 hover:text-red-700 hover:underline text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="text-right mt-6 border-t border-gray-200 pt-4">
            <p className="text-xl font-bold text-gray-800">Total: ${totalPrice.toFixed(2)}</p>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={isLoading}
            className={`mt-6 w-full text-lg font-medium px-6 py-3 rounded-lg shadow-md transition ${
              isLoading
                ? 'bg-green-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {isLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </>
      )}
    </div>
  );
}
