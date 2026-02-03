export default function ServicesPage() {
  const services = [
    {
      id: 1,
      title: 'Online Consultation',
      description: 'Consult with licensed pharmacists online 24/7 for medical advice',
      icon: '💊',
      features: ['Video Calls', 'E-Prescriptions', 'Follow-ups', 'Medical Records']
    },
    {
      id: 2,
      title: 'Medicine Delivery',
      description: 'Fast and reliable delivery of medicines to your doorstep',
      icon: '🚚',
      features: ['Same Day Delivery', 'Real-time Tracking', 'Contactless', 'Free Delivery']
    },
    {
      id: 3,
      title: 'Prescription Management',
      description: 'Digital prescription storage and automatic refill reminders',
      icon: '📋',
      features: ['Auto-refill', 'Medication History', 'Reminder Alerts', 'Family Accounts']
    },
    {
      id: 4,
      title: 'Health Tips & Articles',
      description: 'Daily health tips and expert-written wellness articles',
      icon: '💡',
      features: ['Health Blog', 'Video Guides', 'Webinars', 'Expert Advice']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare solutions designed to make your life easier and healthier
            </p>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className="w-full py-3 border-2 border-blue-500 text-blue-600 hover:bg-blue-50 font-semibold rounded-xl transition-all duration-300">
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Additional Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📹</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Video Consultation</h3>
                  <p className="text-blue-600 font-semibold">Available 24/7</p>
                </div>
              </div>
              <ul className="space-y-3">
                {['Instant connection with doctors', 'Prescription delivered digitally', 'Follow-up appointments'].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-5 h-5 text-green-500 mr-3">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white text-xl">📞</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Emergency Support</h3>
                  <p className="text-blue-600 font-semibold">Always available</p>
                </div>
              </div>
              <ul className="space-y-3">
                {['24/7 emergency helpline', 'Ambulance coordination', 'Hospital referrals'].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <span className="w-5 h-5 text-green-500 mr-3">✓</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Select Service",
                description: "Choose from our range of services"
              },
              {
                step: "02",
                title: "Book Appointment",
                description: "Schedule at your convenience"
              },
              {
                step: "03",
                title: "Get Service",
                description: "Receive professional care"
              },
              {
                step: "04",
                title: "Follow Up",
                description: "Continued support and care"
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <a href="/" className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}