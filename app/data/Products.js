
export const COMPOUNDS = {
  'Pfizer': {
    'Enfortumab Vedotin-ejfv': {
      price: 4250.00,
      description: 'ADC targeting Nectin-4 for metastatic urothelial cancer'
    },
    'Mirvetuximab Soravtansine-gynx': {
      price: 8750.00,
      description: 'First FDA-approved ADC for platinum-resistant ovarian cancer'
    }
  },
  'Roche': {
    'Trastuzumab Deruxtecan': {
      price: 3500.00,
      description: 'ADC for HER2-positive breast cancer'
    }
  }
};

// Product details configuration
export const PRODUCT_DETAILS = {
  'enfortumab-vedotin-ejfv': {
    name: 'Enfortumab Vedotin-ejfv',
    price: 4250.00,
    originalPrice: 5000.00,
    rating: 4.8,
    stock: 150,
    description: 'ADC targeting Nectin-4 for metastatic urothelial cancer',
    dosage: '1.25 mg/kg IV',
    requiresPrescription: true,
    deliveryTime: '3-5 business days',
    imageType: 'capsule',
    benefits: [
      'Improved progression-free survival',
      'Targeted cancer therapy',
      'Well-tolerated compared to chemotherapy'
    ],
    sideEffects: [
      'Peripheral neuropathy',
      'Rash',
      'Fatigue',
      'Decreased appetite'
    ]
  },
  
  'mirvetuximab-soravtansine-gynx': {
    name: 'Mirvetuximab Soravtansine-gynx',
    price: 8750.00,
    originalPrice: null,
    rating: 4.9,
    stock: 85,
    description: 'First FDA-approved ADC for platinum-resistant ovarian cancer',
    dosage: '6 mg/kg adjusted IBW IV',
    requiresPrescription: true,
    deliveryTime: '2-4 business days',
    imageType: 'tablet',
    benefits: [
      'Specifically targets folate receptor alpha',
      'Reduces tumor size significantly',
      'Improved quality of life metrics'
    ],
    sideEffects: [
      'Vision problems',
      'Nausea',
      'Fatigue',
      'Increased liver enzymes'
    ]
  },
  
  'default': {
    name: 'Generic Product',
    price: 100.00,
    originalPrice: null,
    rating: 4.0,
    stock: 1000,
    description: 'Standard medication',
    requiresPrescription: false,
    deliveryTime: '1-2 business days',
    imageType: 'tablet'
  }
};

// Helper functions
export const getProductDetails = (slug) => {
  return PRODUCT_DETAILS[slug] || PRODUCT_DETAILS.default;
};

export const getManufacturers = () => {
  return Object.keys(COMPOUNDS);
};

export const getCompoundsByManufacturer = (manufacturer) => {
  return COMPOUNDS[manufacturer] || {};
};

export const getAllProducts = () => {
  const allProducts = [];
  
  // Flatten manufacturers and compounds into product list
  Object.entries(COMPOUNDS).forEach(([manufacturer, compounds]) => {
    Object.entries(compounds).forEach(([compound, details]) => {
      const slug = `${compound.toLowerCase().replace(/\s+/g, '-')}`;
      const productDetails = getProductDetails(slug);
      
      allProducts.push({
        slug,
        name: productDetails.name || compound,
        manufacturer,
        compound,
        price: productDetails.price || details.price || 0,
        rating: productDetails.rating || 0,
        stock: productDetails.stock || 0,
        description: productDetails.description || details.description || '',
        requiresPrescription: productDetails.requiresPrescription || false
      });
    });
  });
  
  return allProducts;
};