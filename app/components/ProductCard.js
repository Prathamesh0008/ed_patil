//app\components\ProductCard.js
'use client';
import { getPriceByQty } from '@/app/utils/getPriceByQty';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
  const { addToCart } = useCart();   // ✅ THIS WAS MISSING
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const unitPrice = getPriceByQty(product, quantity);


const handleAddToCart = () => {
  setIsAdding(true);

  addToCart({
    id: product.slug,
    slug: product.slug,
    name: product.name,
    price: unitPrice, // ✅ CORRECT
    quantity,
    image: product.image,
    brand: product.brand,
    dosage: product.dosage,
    packSize: product.packSize,
  });

  setTimeout(() => setIsAdding(false), 300);
};

  return (
    <button onClick={handleAddToCart}>
      🛒 Add to Cart
    </button>
  );
}

