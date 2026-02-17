'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import products from '../../data/en';
import { getPriceByQty } from '../../utils/getPriceByQty';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { slug } = params;
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // ------------------------------------------------------------
  // 1. Load product data when slug is available
  // ------------------------------------------------------------
  useEffect(() => {
    if (slug) {
      const foundProduct = products[slug];

      if (foundProduct) {
        setProduct({
          ...foundProduct,
          slug,                                   // ensure slug is set
          price: parseFloat(foundProduct.price) || 0,
          rating: foundProduct.rating || 4.5,
          stock: foundProduct.stock || 50,
          image: foundProduct.image || '/products/default.png',
          // Provide default empty arrays/values for all template fields
          overview: foundProduct.overview || [],
          how_it_works: foundProduct.how_it_works || [],
          sideEffects: foundProduct.sideEffects || [],
          administration: foundProduct.administration || [],
          warnings: foundProduct.warnings || [],
          tips: foundProduct.tips || [],
          additionalImages: foundProduct.additionalImages || [],
          form: foundProduct.form || 'Tablet',
        });
      }
      setLoading(false);
    }
  }, [slug]);

  // ------------------------------------------------------------
  // 2. Cart actions
  // ------------------------------------------------------------
  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      id: product.slug,
      slug: product.slug,
      name: product.name,
       price: unitPrice,
      quantity,
      image: product.image,
      brand: product.brand,
      dosage: product.dosage,
      packSize: product.packSize,
    });
  };
const unitPrice = getPriceByQty(product, quantity);
const totalPrice = unitPrice * quantity;
  const handleBuyNow = () => {
    handleAddToCart();
    router.push('/checkout');
  };

  // ------------------------------------------------------------
  // 3. Loading state
  // ------------------------------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2596be] mx-auto"></div>
          <p className="mt-4 text-[#677E8A]">Loading product...</p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // 4. Product not found
  // ------------------------------------------------------------
  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-[#0E1D21] mb-4">Product not found</h1>
            <p className="text-[#677E8A] mb-6">The product you're looking for doesn't exist.</p>
            <Link
              href="/products"
              className="px-6 py-3 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------
  // 5. Render product detail page
  // ------------------------------------------------------------
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center text-sm text-[#677E8A]">
            <Link href="/" className="hover:text-[#2596be]">Home</Link>
            <span className="mx-2">›</span>
            <Link href="/products" className="hover:text-[#2596be]">Products</Link>
            <span className="mx-2">›</span>
            <span className="text-[#0E1D21] font-medium">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-6 mb-6">
              {/* Main Image */}
              <div className="mb-4">
                <div className="w-full h-96 bg-gradient-to-br from-[#2596be]/5 to-[#122E34]/5 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={product.additionalImages?.[selectedImage] || product.image || '/products/default.png'}
                    alt={product.name}
                    className="w-full h-full object-contain p-4"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/products/default.png';
                    }}
                  />
                </div>
              </div>

              {/* Thumbnail Images */}
              {product.additionalImages && product.additionalImages.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {product.additionalImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 ${
                        selectedImage === index ? 'border-[#2596be]' : 'border-[#ABAFB5]/30'
                      } overflow-hidden`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/products/default.png';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Product Info Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="px-3 py-1 bg-[#2596be]/10 text-[#2596be] text-xs font-semibold rounded-full border border-[#2596be]/20">
                  {product.composition || 'Generic Compound'}
                </span>
                <span className="px-3 py-1 bg-[#122E34]/10 text-[#122E34] text-xs font-semibold rounded-full border border-[#122E34]/20">
                  {product.brand || 'Manufacturer'}
                </span>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded-full border border-green-200">
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
                <span className="px-3 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-200">
                  {product.dosage || 'Standard Dosage'}
                </span>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-6">
              <h3 className="text-lg font-bold text-[#0E1D21] mb-4">Product Details</h3>

              <div className="space-y-6">
                {/* Overview */}
                {product.overview && product.overview.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">Overview</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.overview.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* How It Works */}
                {product.how_it_works && product.how_it_works.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">How It Works</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.how_it_works.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Side Effects */}
                {product.sideEffects && product.sideEffects.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">Possible Side Effects</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.sideEffects.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Administration */}
                {product.administration && product.administration.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">Administration</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.administration.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Warnings */}
                {product.warnings && product.warnings.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">Warnings</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.warnings.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tips */}
                {product.tips && product.tips.length > 0 && (
                  <div>
                    <h4 className="font-medium text-[#0E1D21] mb-2">Usage Tips</h4>
                    <ul className="list-disc pl-5 space-y-1 text-[#677E8A]">
                      {product.tips.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Purchase Info */}
          <div>
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-8 mb-6">
                <h1 className="text-2xl font-bold text-[#0E1D21] mb-2">{product.name}</h1>
                <p className="text-[#677E8A] mb-6">Product ID: {product.slug}</p>

                {/* Product Specifications */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between py-2 border-b border-[#ABAFB5]/10">
                    <span className="text-[#677E8A]">Brand:</span>
                    <span className="text-[#0E1D21] font-medium">{product.brand}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ABAFB5]/10">
                    <span className="text-[#677E8A]">Dosage:</span>
                    <span className="text-[#0E1D21] font-medium">{product.dosage}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ABAFB5]/10">
                    <span className="text-[#677E8A]">Pack Size:</span>
                    <span className="text-[#0E1D21] font-medium">{product.packSize}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#ABAFB5]/10">
                    <span className="text-[#677E8A]">Form:</span>
                    <span className="text-[#0E1D21] font-medium">{product.form}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-[#2596be] mb-1">
  ${unitPrice.toFixed(2)}
</div>

<div className="text-sm text-[#677E8A]">
  Total: ${totalPrice.toFixed(2)}
</div>


                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-[#0E1D21] font-medium mb-2">Quantity</label>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1}
                      className="w-12 h-12 rounded-l-xl border border-[#ABAFB5] flex items-center justify-center hover:bg-[#ABAFB5]/10 disabled:opacity-50"
                    >
                      -
                    </button>
                    <div className="w-16 h-12 border-y border-[#ABAFB5] flex items-center justify-center text-[#0E1D21] font-medium text-lg">
                      {quantity}
                    </div>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="w-12 h-12 rounded-r-xl border border-[#ABAFB5] flex items-center justify-center hover:bg-[#ABAFB5]/10"
                    >
                      +
                    </button>
                    <div className="ml-4">
                      <span className="text-sm text-[#677E8A]">Available: {product.stock} units</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock <= 0}
                    className="w-full px-6 py-4 bg-gradient-to-r from-[#122E34] to-[#2596be] hover:from-[#0E1D21] hover:to-[#1a7a9a] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    🛒 Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock <= 0}
                    className="w-full px-6 py-4 bg-[#0E1D21] hover:bg-[#122E34] text-white rounded-xl font-semibold shadow-sm hover:shadow-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    ⚡ Buy Now
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="mt-6 pt-6 border-t border-[#ABAFB5]/20">
                  <div className="flex items-center text-sm text-[#677E8A]">
                    <span className="mr-2">🚚</span>
                    <span>Free shipping on orders over $100</span>
                  </div>
                  <div className="flex items-center text-sm text-[#677E8A] mt-2">
                    <span className="mr-2">🛡️</span>
                    <span>Secure payment & discreet packaging</span>
                  </div>
                </div>
              </div>

              {/* Benefits Section */}
              <div className="bg-white rounded-2xl border border-[#ABAFB5]/30 p-8">
                <h3 className="text-lg font-bold text-[#0E1D21] mb-6">Why Buy From Us?</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2596be]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2596be]">🔒</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0E1D21] mb-1">Authentic Products</h4>
                      <p className="text-[#677E8A] text-sm">
                        100% genuine medications from licensed manufacturers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2596be]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2596be]">🚚</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0E1D21] mb-1">Fast & Discreet Shipping</h4>
                      <p className="text-[#677E8A] text-sm">
                        Free shipping over $100. Plain packaging for privacy
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#2596be]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-[#2596be]">📞</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-[#0E1D21] mb-1">24/7 Support</h4>
                      <p className="text-[#677E8A] text-sm">Medical consultation available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}