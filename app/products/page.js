'use client';

import { useState } from 'react';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'Vitamin C 1000mg',
    category: 'Vitamins',
    price: 24.99,
    description: 'High potency Vitamin C for immune support',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Pain Relief Tablets',
    category: 'Pain Relief',
    price: 12.99,
    description: 'Fast-acting pain relief medication',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=300&fit=crop',
    rating: 4.2,
  },
  {
    id: 3,
    name: 'Blood Pressure Monitor',
    category: 'Medical Devices',
    price: 89.99,
    description: 'Digital blood pressure monitor with memory',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Hand Sanitizer',
    category: 'Hygiene',
    price: 8.99,
    description: 'Alcohol-based hand sanitizer 500ml',
    image: 'https://images.unsplash.com/photo-1583947581924-860bda6a26df?w=400&h=300&fit=crop',
    rating: 4.3,
  },
  {
    id: 5,
    name: 'Diabetes Test Strips',
    category: 'Diabetes Care',
    price: 45.99,
    description: 'Accurate blood glucose test strips',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=300&fit=crop',
    rating: 4.6,
  },
  {
    id: 6,
    name: 'Premium First Aid Kit',
    category: 'First Aid',
    price: 34.99,
    description: 'Complete first aid kit for home and travel',
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
    rating: 4.7,
  },
];

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {'★★★★★'.split('').map((star, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
          </div>
          
          <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition duration-300 font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Vitamins', 'Pain Relief', 'Medical Devices', 'Hygiene', 'Diabetes Care', 'First Aid'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Browse our extensive collection of healthcare products and medicines
            </p>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
              <p className="text-gray-600">Showing {products.length} products</p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <span>🔍</span>
                <span>Filter</span>
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            <button className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold">
              1
            </button>
            <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              2
            </button>
            <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              3
            </button>
            <button className="w-10 h-10 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
              →
            </button>
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link href="/" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}