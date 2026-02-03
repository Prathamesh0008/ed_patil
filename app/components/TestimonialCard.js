import { FiStar } from 'react-icons/fi';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-100">
      <div className="flex items-center mb-6">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-blue-600">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <FiStar
            key={i}
            className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
          />
        ))}
      </div>
      
      <p className="text-gray-600 italic">"{testimonial.content}"</p>
    </div>
  );
}