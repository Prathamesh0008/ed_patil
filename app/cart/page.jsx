// File: app/cart/page.jsx
'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';
import { getPriceByQty } from '../utils/getPriceByQty'; // ✅ relative import
import products from '../data/en';

export default function CartPage() {
  const { cart, itemCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-[#ABAFB5]" />
            <h2 className="mt-6 text-2xl font-bold text-[#0E1D21]">Your cart is empty</h2>
            <p className="mt-2 text-[#677E8A]">Add some products to your cart!</p>
            <Link
              href="/products"
              className="mt-6 inline-block px-6 py-3 bg-gradient-to-r from-[#122E34] to-[#2596be] text-white rounded-xl font-semibold hover:shadow-md transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#0E1D21] mb-8">Shopping Cart ({itemCount} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 bg-gradient-to-br from-[#2596be]/5 to-[#122E34]/5 rounded-xl flex items-center justify-center">
                        {item.image && item.image !== '/products/default.png' ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="text-4xl text-[#2596be]">💊</div>
                        )}
                      </div>
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0E1D21]">{item.name}</h3>
                          <p className="text-sm text-[#677E8A] mt-1">{item.brand}</p>
                          <p className="text-sm text-[#677E8A]">{item.dosage} • {item.packSize}</p>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#677E8A] hover:text-red-500 h-fit transition-colors duration-200"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center rounded-xl overflow-hidden shadow-sm">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity <= 1}
                            className={`w-10 h-10 flex items-center justify-center transition-all duration-300 ${
                              item.quantity <= 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-[#677E8A] to-[#122E34] text-white hover:from-[#5a6f7a] hover:to-[#0e1d21] active:scale-95'
                            }`}
                          >
                            <span className="font-bold text-lg">-</span>
                          </button>

                          <div className="w-12 h-10 bg-white border-y border-[#ABAFB5]/30 flex items-center justify-center">
                            <span className="font-semibold text-[#0E1D21]">{item.quantity}</span>
                          </div>

                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-[#677E8A] to-[#122E34] text-white hover:from-[#5a6f7a] hover:to-[#0e1d21] active:scale-95 transition-all duration-300"
                          >
                            <span className="font-bold text-lg">+</span>
                          </button>
                        </div>
                        <div className="text-xl font-bold text-[#2596be]">
  {(() => {
    const productData = products[item.slug]; // get full product from en.js
    const unitPrice = getPriceByQty(productData, item.quantity);
    const totalPrice = unitPrice * item.quantity;

    return `₹${totalPrice.toFixed(2)}`;
  })()}
</div>

                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={clearCart}
                  className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-6 sticky top-8">
              <h2 className="text-xl font-bold text-[#0E1D21] mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[#677E8A]">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#677E8A]">
                  <span>Shipping</span>
                  <span className="text-green-600">{cartTotal >= 100 ? 'FREE' : '$9.99'}</span>
                </div>
                <div className="flex justify-between text-[#677E8A]">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-[#ABAFB5]/20 pt-4">
                  <div className="flex justify-between text-lg font-bold text-[#0E1D21]">
                    <span>Total</span>
                    <span>${(cartTotal + (cartTotal >= 100 ? 0 : 9.99) + (cartTotal * 0.08)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full px-6 py-4 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white rounded-xl font-semibold text-center shadow-sm hover:shadow-md transition-all duration-300"
              >
                Proceed to Checkout
              </Link>

              <div className="mt-6 space-y-3 text-sm text-[#677E8A]">
                <div className="flex items-center">
                  <span className="mr-2">🔒</span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">🚚</span>
                  <span>Discreet packaging</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">↩️</span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>

            <Link
              href="/products"
              className="mt-4 block w-full px-6 py-3 border-2 border-[#2596be] text-[#2596be] rounded-xl font-semibold text-center hover:bg-[#2596be]/5 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}