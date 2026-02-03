import { FiShoppingCart, FiStar } from 'react-icons/fi';

export default function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden card-hover border border-gray-100">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        
        {product.discount && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-blue text-white text-xs font-bold px-2 py-1 rounded">
              -{product.discount}%
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <span className="bg-white text-blue-600 text-xs font-semibold px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FiStar
                key={i}
                className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-600">${product.price}</span>
              {product.discount && (
                <span className="text-sm text-gray-400 line-through">
                  ${(product.price * 100 / (100 - product.discount)).toFixed(2)}
                </span>
              )}
            </div>
          </div>
          
          <button className="p-3 bg-blue-50 hover:bg-gradient-blue hover:text-white rounded-xl transition-all duration-300">
            <FiShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}