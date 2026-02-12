export function getPriceByQty(product, quantity) {

  // SAFETY CHECK
  if (!product) {
    return 0;
  }

  // No tier pricing → base price
  if (!product.pricing || product.pricing.length === 0) {
    return Number(product.price) || 0;
  }

  // Find matching tier
  const tier = product.pricing.find(
    (p) => quantity >= p.min && quantity <= p.max
  );

  return tier ? tier.price : Number(product.price) || 0;
}
