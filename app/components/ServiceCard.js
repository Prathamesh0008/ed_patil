import { FiArrowRight } from 'react-icons/fi';

export default function ServiceCard({ service }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 card-hover border border-blue-100">
      <div className="w-14 h-14 bg-gradient-blue rounded-xl flex items-center justify-center text-2xl mb-6">
        {service.icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      
      <ul className="space-y-2 mb-6">
  {(service.features || []).map((feature, index) => (
    <li key={index} className="flex items-center text-sm text-gray-600">
      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
      {feature}
    </li>
  ))}
</ul>

      <button className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition duration-300">
        Learn More
        <FiArrowRight className="ml-2" />
      </button>
    </div>
  );
}