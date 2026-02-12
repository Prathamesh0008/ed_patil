'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FiCheck, 
  FiChevronRight, 
  FiX, 
  FiPackage, 
  FiActivity, 
  FiUsers, 
  FiShield, 
  FiClock, 
  FiGlobe, 
  FiBarChart, 
  FiSettings,
  FiArrowRight,
  FiStar,
  FiTruck,
  FiHeadphones,
  FiPhone,
  FiMail,
  FiMapPin,
  FiClipboard,
  FiAlertCircle,
  FiHome,
  FiUpload,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronDown,
  FiHeart,
  FiAward,
  FiCalendar,
  FiCreditCard,
  FiDroplet,
  FiFilePlus
} from 'react-icons/fi';

export default function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle modal open/close with body scroll lock
  const handleServiceClick = (service) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  // Professional Pharma Banner Data
  const bannerData = {
    title: "Your Trusted Partner in Pharmaceutical Care",
    subtitle: "24/7 Online Pharmacy Services",
    features: [
      "Same Day Delivery",
      "Licensed Pharmacists",
      "HIPAA Compliant",
      "Insurance Accepted"
    ]
  };

  // Updated services with full descriptions for modal
  const services = [
    {
      id: 1,
      title: 'Virtual Consultation',
      description: 'Connect with licensed pharmacists via secure video call for expert medical advice.',
      fullDescription: 'Our Virtual Consultation service provides secure, HIPAA-compliant video calls with licensed pharmacists. Get expert medical advice, prescription refills, and medication reviews from the comfort of your home. Our pharmacists are available 24/7 to address your health concerns and provide personalized recommendations.',
      icon: <FiHeadphones className="h-8 w-8" />,
      gradient: 'from-[#2596be] to-[#122E34]',
      link: '/services/consultation',
      features: ['24/7 Available', 'Prescription Refills', 'Medication Reviews'],
      benefits: [
        'Access to certified pharmacists anytime',
        'Secure and confidential consultations',
        'Personalized health advice',
        'Digital prescription management'
      ],
      processes: [
        'Schedule appointment online',
        'Secure video consultation',
        'Receive digital prescription',
        'Follow-up care planning'
      ],
      timeline: 'Consultations available within 15 minutes',
      coverage: 'Available nationwide'
    },
    {
      id: 2,
      title: 'Prescription Delivery',
      description: 'Fast, discreet delivery of medications directly to your doorstep.',
      fullDescription: 'Our Prescription Delivery service ensures your medications reach you safely and on time. With temperature-controlled packaging and real-time tracking, we guarantee the integrity of your medications. Same-day delivery available in major metropolitan areas with discreet packaging for your privacy.',
      icon: <FiTruck className="h-8 w-8" />,
      gradient: 'from-[#122E34] to-[#0E1D21]',
      link: '/services/delivery',
      features: ['Same-Day Service', 'Temperature Control', 'Secure Packaging'],
      benefits: [
        'Convenient home delivery',
        'Medication integrity maintained',
        'Real-time delivery tracking',
        'Discrete and confidential packaging'
      ],
      processes: [
        'Prescription verification',
        'Pharmacy dispensing',
        'Quality check & packaging',
        'Delivery with tracking'
      ],
      timeline: 'Same-day delivery available',
      coverage: 'Major metropolitan areas'
    },
    {
      id: 3,
      title: 'Medication Management',
      description: 'Comprehensive medication reviews and adherence support programs.',
      fullDescription: 'Our Medication Management service provides comprehensive support for medication adherence and safety. We conduct thorough medication reviews, check for potential interactions, and provide personalized adherence plans. Our system includes dose reminders and progress tracking to ensure optimal therapeutic outcomes.',
      icon: <FiDroplet className="h-8 w-8" />,
      gradient: 'from-[#2596be] to-[#0E1D21]',
      link: '/services/management',
      features: ['Dose Reminders', 'Interactions Check', 'Adherence Tracking'],
      benefits: [
        'Reduced medication errors',
        'Improved treatment adherence',
        'Personalized care plans',
        'Regular progress monitoring'
      ],
      processes: [
        'Medication review & reconciliation',
        'Interaction screening',
        'Personalized adherence plan',
        'Regular follow-up & adjustment'
      ],
      timeline: 'Ongoing management program',
      coverage: 'Personalized for each patient'
    },
    {
      id: 4,
      title: 'Chronic Care Support',
      description: 'Specialized programs for diabetes, hypertension, and other chronic conditions.',
      fullDescription: 'Our Chronic Care Support service provides specialized programs for managing chronic conditions like diabetes, hypertension, and cardiovascular diseases. We offer personalized treatment plans, regular monitoring, and expert guidance to help you manage your condition effectively and improve your quality of life.',
      icon: <FiActivity className="h-8 w-8" />,
      gradient: 'from-[#2596be] via-[#122E34] to-[#0E1D21]',
      link: '/services/chronic-care',
      features: ['Personalized Plans', 'Regular Monitoring', 'Expert Guidance'],
      benefits: [
        'Better chronic disease management',
        'Reduced hospital visits',
        'Improved quality of life',
        'Personalized treatment approach'
      ],
      processes: [
        'Condition assessment & planning',
        'Regular monitoring & check-ins',
        'Treatment adjustment as needed',
        'Long-term management strategy'
      ],
      timeline: 'Continuous support program',
      coverage: 'Comprehensive chronic care'
    }
  ];

  const features = [
    {
      title: 'Board-Certified Pharmacists',
      description: 'All our pharmacists are licensed and undergo continuous professional development.',
      icon: <FiAward className="h-6 w-6" />,
      color: 'text-[#2596be]',
      stat: '100+'
    },
    {
      title: 'Secure Platform',
      description: 'HIPAA compliant with military-grade encryption for all patient data.',
      icon: <FiShield className="h-6 w-6" />,
      color: 'text-[#122E34]',
      stat: '100%'
    },
    {
      title: 'Fast Delivery Network',
      description: 'Same-day delivery available in major metropolitan areas.',
      icon: <FiClock className="h-6 w-6" />,
      color: 'text-[#0E1D21]',
      stat: '30-min'
    },
    {
      title: 'Insurance Partners',
      description: 'We work with all major insurance providers for seamless coverage.',
      icon: <FiCreditCard className="h-6 w-6" />,
      color: 'text-[#2596be]',
      stat: '50+'
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Internal Medicine Specialist',
      content: 'As a physician, I trust PharmaCare for my patients. Their medication management system is exceptional.',
      rating: 5,
      date: 'Board Certified Physician',
      verified: true
    },
    {
      name: 'Michael Chen',
      role: 'Diabetes Patient',
      content: 'The chronic care program has helped me maintain optimal blood sugar levels for 6 months straight.',
      rating: 5,
      date: 'Patient since 2022',
      verified: true
    },
    {
      name: 'Robert Wilson',
      role: 'Senior Caregiver',
      content: 'Managing multiple medications for my father became effortless with their adherence tracking.',
      rating: 5,
      date: 'Family Caregiver',
      verified: true
    },
    {
      name: 'Emily Rodriguez',
      role: 'Busy Professional',
      content: '24/7 consultation and same-day delivery have been life-changing for my hectic schedule.',
      rating: 5,
      date: 'Executive, Tech Industry',
      verified: true
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Create Profile',
      description: 'Set up your secure medical profile in minutes',
      icon: <FiUpload className="h-8 w-8" />,
      details: 'Upload prescriptions, insurance info, and medical history securely'
    },
    {
      number: '02',
      title: 'Consult Virtually',
      description: 'Meet with our licensed pharmacists',
      icon: <FiHeadphones className="h-8 w-8" />,
      details: 'Secure video consultation available 24/7'
    },
    {
      number: '03',
      title: 'Receive Prescription',
      description: 'Get your digital prescription instantly',
      icon: <FiClipboard className="h-8 w-8" />,
      details: 'Electronic prescriptions sent directly to our pharmacy'
    },
    {
      number: '04',
      title: 'Fast Delivery',
      description: 'Medications delivered to your door',
      icon: <FiPackage className="h-8 w-8" />,
      details: 'Same-day delivery with temperature monitoring'
    }
  ];

  const certifications = [
    { name: 'HIPAA Compliant', icon: '🛡️' },
    { name: 'Board Certified', icon: '⭐' },
    { name: 'State Licensed', icon: '📋' },
    { name: '24/7 Service', icon: '⏰' },
    { name: 'Secure Delivery', icon: '📦' },
    { name: 'Insurance Covered', icon: '💳' }
  ];

  // Professional Pharma Banner Component
  const ProfessionalBanner = () => (
    <div className="relative bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be] py-4 overflow-hidden"> 
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="w-3 h-3 bg-gradient-to-r from-[#2596be] to-white rounded-full animate-pulse mr-3"></div>
            <span className="text-white font-semibold text-lg">{bannerData.title}</span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            {bannerData.features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <FiCheck className="h-4 w-4 text-white mr-2" />
                <span className="text-white/90 text-sm font-medium">{feature}</span>
                {index < bannerData.features.length - 1 && (
                  <div className="h-4 w-px bg-white/30 mx-3"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Responsive button classes
  const buttonClasses = {
    primary: 'inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-[#2596be] to-[#122E34] hover:from-[#122E34] hover:to-[#0E1D21] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm sm:text-base',
    secondary: 'inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white border-2 border-[#2596be] text-[#2596be] hover:bg-gradient-to-r hover:from-[#2596be] hover:to-[#122E34] hover:text-white hover:border-transparent font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm sm:text-base',
    outline: 'inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 text-sm sm:text-base'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white">
      {/* Professional Pharma Banner */}
      <ProfessionalBanner />

      {/* Hero Section - Professional Design */}
      <div className="relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#2596be]/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-[#122E34]/5 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="relative z-10">
              <div className="mb-6">
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20 mb-4">
                  <FiAward className="h-4 w-4 text-[#2596be] mr-2" />
                  <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                    Trusted Healthcare Provider Since 2015
                  </span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0E1D21] mb-6 leading-tight">
                  Premium
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                    Pharmaceutical Care
                  </span>
                  Delivered Safely
                </h1>

                <p className="text-lg text-[#677E8A] mb-8 leading-relaxed">
                  Experience healthcare excellence with our comprehensive online pharmacy services. 
                  Get expert consultation, medication management, and personalized care—all from certified pharmacists.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/consultation" className={buttonClasses.primary}>
                  <span className="flex items-center">
                    Start Free Consultation
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
                <Link href="/services" className={buttonClasses.secondary}>
                  <span className="flex items-center">
                    View Our Services
                    <FiArrowUpRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>

                  <Link href="/booking" className={buttonClasses.primary}>
                  <span className="flex items-center">
                    booking
                    <FiArrowRight className="ml-2 h-5 w-5" />
                  </span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0E1D21] mb-1">50,000+</div>
                  <div className="text-sm text-[#677E8A]">Patients Served</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0E1D21] mb-1">99.8%</div>
                  <div className="text-sm text-[#677E8A]">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0E1D21] mb-1">24/7</div>
                  <div className="text-sm text-[#677E8A]">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0E1D21] mb-1">4.9★</div>
                  <div className="text-sm text-[#677E8A]">Rating</div>
                </div>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative">
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Hero Image/Illustration */}
                <div className="aspect-[4/3] bg-gradient-to-br from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    {/* Main Illustration */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-48 h-48 bg-gradient-to-br from-[#2596be] to-[#122E34] rounded-full opacity-10 blur-xl"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#2596be] to-[#122E34] flex items-center justify-center shadow-lg">
                              <FiHeart className="h-12 w-12 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#0E1D21]">Healthcare Made Simple</h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating Cards */}
                    <div className="absolute top-4 left-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#2596be] to-[#122E34] flex items-center justify-center mr-3">
                          <FiCheck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#0E1D21]">Verified</div>
                          <div className="text-xs text-[#677E8A]">Pharmacist</div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-4 bg-white rounded-xl p-4 shadow-lg border border-gray-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#122E34] to-[#0E1D21] flex items-center justify-center mr-3">
                          <FiTruck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#0E1D21]">Delivery</div>
                          <div className="text-xs text-[#677E8A]">Tracking Active</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications Bar */}
                <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 p-4">
                  <div className="flex flex-wrap justify-center gap-4">
                    {certifications.slice(0, 4).map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-lg mr-2">{cert.icon}</span>
                        <span className="text-sm font-medium text-[#0E1D21]">{cert.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section - Professional Grid */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-white via-gray-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20 mb-6">
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Healthcare</span> Solutions
            </h2>
            <p className="text-lg text-[#677E8A] max-w-3xl mx-auto">
              Professional pharmaceutical services designed for modern healthcare needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="p-6">
                  <div className={`mb-6 p-4 rounded-xl bg-gradient-to-br ${service.gradient} w-fit`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#0E1D21] mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-[#677E8A] mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <FiCheck className="h-4 w-4 text-[#2596be] mr-3" />
                        <span className="text-sm text-[#0E1D21]">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => handleServiceClick(service)}
                    className="inline-flex items-center text-[#2596be] font-semibold hover:text-[#122E34] transition-colors group/button"
                  >
                    Learn More
                    <FiChevronRight className="ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={handleCloseModal}
          />
          
          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#2596be] to-[#122E34] px-6 py-4 sm:px-8 sm:py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <div className="text-white">
                        {selectedService.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                      {selectedService.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/10 rounded-full"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>
              </div>
              
              {/* Modal Content */}
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-[#0E1D21] mb-4">Service Overview</h4>
                  <p className="text-[#677E8A] leading-relaxed">
                    {selectedService.fullDescription}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Key Features */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#0E1D21] mb-4 flex items-center">
                      <FiCheck className="h-5 w-5 text-[#2596be] mr-2" />
                      Key Features
                    </h4>
                    <div className="space-y-3">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-[#2596be] rounded-full mr-3" />
                          <span className="text-[#0E1D21]">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold text-[#0E1D21] mb-4 flex items-center">
                      <FiBarChart className="h-5 w-5 text-[#2596be] mr-2" />
                      Key Benefits
                    </h4>
                    <div className="space-y-3">
                      {selectedService.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center">
                          <div className="h-2 w-2 bg-[#2596be] rounded-full mr-3" />
                          <span className="text-[#0E1D21]">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Processes */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-[#0E1D21] mb-4 flex items-center">
                    <FiSettings className="h-5 w-5 text-[#2596be] mr-2" />
                    Our Process
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {selectedService.processes.map((process, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-[#2596be] text-white text-sm font-semibold mr-3">
                            {index + 1}
                          </div>
                          <span className="text-[#0E1D21] font-medium">{process}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Additional Information */}
                <div className="grid sm:grid-cols-2 gap-6 mb-8">
                  <div className="bg-gradient-to-r from-[#2596be]/5 to-transparent rounded-xl p-5">
                    <div className="flex items-center mb-3">
                      <FiClock className="h-5 w-5 text-[#2596be] mr-3" />
                      <h5 className="font-semibold text-[#0E1D21]">Timeline</h5>
                    </div>
                    <p className="text-[#677E8A]">{selectedService.timeline}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-[#122E34]/5 to-transparent rounded-xl p-5">
                    <div className="flex items-center mb-3">
                      <FiGlobe className="h-5 w-5 text-[#122E34] mr-3" />
                      <h5 className="font-semibold text-[#0E1D21]">Coverage</h5>
                    </div>
                    <p className="text-[#677E8A]">{selectedService.coverage}</p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-3 text-[#677E8A] hover:text-[#0E1D21] font-medium transition-colors mb-4 sm:mb-0"
                  >
                    Back to Services
                  </button>
                  <div className="flex space-x-4">
                    <button className="px-6 py-3 border border-[#2596be] text-[#2596be] font-semibold rounded-lg hover:bg-[#2596be] hover:text-white transition-all">
                      Download Brochure
                    </button>
                    <Link href="/consultation" className={buttonClasses.primary}>
                      <span className="flex items-center">
                        Request Consultation
                        <FiArrowRight className="ml-2 h-5 w-5" />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Features Section - Professional Layout */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20 mb-6">
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                  Why Choose Us
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-8">
                Excellence in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                  Pharmaceutical Care
                </span>
              </h2>
              
              <p className="text-lg text-[#677E8A] mb-12 leading-relaxed">
                We combine pharmaceutical expertise with cutting-edge technology to deliver 
                healthcare that's accessible, reliable, and personalized to your needs.
              </p>
              
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className={`p-3 rounded-lg ${feature.color} bg-opacity-10 mr-4 flex-shrink-0`}>
                      {feature.icon}
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <h4 className="text-lg font-bold text-[#0E1D21] mr-3">{feature.title}</h4>
                        <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                          {feature.stat}
                        </span>
                      </div>
                      <p className="text-[#677E8A]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-[#2596be]/10 to-[#122E34]/10 rounded-2xl p-8">
                <div className="aspect-square relative">
                  {/* Feature Visualization */}
                  <div className="absolute top-0 left-1/4 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2596be] to-[#122E34] flex items-center justify-center mr-4">
                        <FiShield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1D21]">Secure</div>
                        <div className="text-sm text-[#677E8A]">HIPAA Compliant</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/4 right-0 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#122E34] to-[#0E1D21] flex items-center justify-center mr-4">
                        <FiClock className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1D21]">24/7</div>
                        <div className="text-sm text-[#677E8A]">Service</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-1/3 left-0 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2596be] to-[#0E1D21] flex items-center justify-center mr-4">
                        <FiUsers className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1D21]">Expert</div>
                        <div className="text-sm text-[#677E8A]">Pharmacists</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 right-1/4 bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21] flex items-center justify-center mr-4">
                        <FiTruck className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-[#0E1D21]">Fast</div>
                        <div className="text-sm text-[#677E8A]">Delivery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20 mb-6">
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                How It Works
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">4-Step</span> Process
            </h2>
            <p className="text-lg text-[#677E8A] max-w-3xl mx-auto">
              Getting the healthcare you need has never been easier
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline for Desktop */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2596be] via-[#122E34] to-[#0E1D21]"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`text-3xl font-bold ${
                        index === 0 ? 'text-[#2596be]' :
                        index === 1 ? 'text-[#122E34]' :
                        index === 2 ? 'text-[#0E1D21]' :
                        'text-[#677E8A]'
                      }`}>
                        {step.number}
                      </div>
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${
                        index === 0 ? 'from-[#2596be] to-[#122E34]' :
                        index === 1 ? 'from-[#122E34] to-[#0E1D21]' :
                        index === 2 ? 'from-[#2596be] to-[#0E1D21]' :
                        'from-[#2596be] via-[#122E34] to-[#0E1D21]'
                      }`}>
                        <div className="text-white">
                          {step.icon}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-[#0E1D21] mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-[#677E8A] mb-4">
                      {step.description}
                    </p>
                    
                    <p className="text-sm text-[#2596be] font-medium">
                      {step.details}
                    </p>
                  </div>
                  
                  {/* Step Indicator for Desktop */}
                  <div className={`hidden lg:block absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-gradient-to-br from-[#2596be] to-[#122E34]' :
                    index === 1 ? 'bg-gradient-to-br from-[#122E34] to-[#0E1D21]' :
                    index === 2 ? 'bg-gradient-to-br from-[#2596be] to-[#0E1D21]' :
                    'bg-gradient-to-br from-[#2596be] via-[#122E34] to-[#0E1D21]'
                  }`}>
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-16">
            <Link href="/consultation" className={buttonClasses.primary}>
              <span className="flex items-center">
                Get Started Today
                <FiArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full border border-[#2596be]/20 mb-6">
              <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">
                Patient Stories
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E1D21] mb-6">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34]">Thousands</span>
            </h2>
            <p className="text-lg text-[#677E8A] max-w-3xl mx-auto">
              Hear from patients and healthcare professionals who trust us with their care
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#2596be] to-[#122E34] rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mr-4">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                        <p className="text-white/80 text-sm">{testimonial.role}</p>
                      </div>
                      {testimonial.verified && (
                        <div className="flex items-center px-2 py-1 bg-white/20 rounded-full">
                          <FiCheck className="h-3 w-3 text-white mr-1" />
                          <span className="text-xs text-white">Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-white/60 text-sm mt-2">{testimonial.date}</p>
                  </div>
                </div>
                
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="h-5 w-5 text-yellow-300 mr-1" />
                  ))}
                </div>
                
                <p className="text-white/90 italic text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">4.9/5</div>
                <div className="text-sm text-[#677E8A]">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">50K+</div>
                <div className="text-sm text-[#677E8A]">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2596be] to-[#122E34] mb-2">99.8%</div>
                <div className="text-sm text-[#677E8A]">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-r from-[#122E34] via-[#0E1D21] to-[#2596be]">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full border border-white/20 mb-6">
            <span className="text-sm font-semibold text-white">
              Get Started Today
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready for Better
            <span className="block">Healthcare?</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of satisfied patients who trust us with their health. 
            Experience pharmaceutical care reimagined.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/consultation" className={buttonClasses.primary}>  
              <span className="flex items-center">
                Start Free Consultation
                <FiArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
            <Link href="/contact" className={buttonClasses.outline}>
              <span className="flex items-center">
                Contact Our Team 
                <FiArrowUpRight className="ml-2 h-5 w-5" />
              </span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
            <div className="text-center">
              <FiPhone className="h-8 w-8 text-white mx-auto mb-4" />
              <div className="text-white font-semibold mb-2">Call Us</div>
              <div className="text-white/80">(555) 123-4567</div>
            </div>
            <div className="text-center">
              <FiMail className="h-8 w-8 text-white mx-auto mb-4" />
              <div className="text-white font-semibold mb-2">Email Us</div>
              <div className="text-white/80">care@pharmacare.com</div>
            </div>
            <div className="text-center">
              <FiClock className="h-8 w-8 text-white mx-auto mb-4" />
              <div className="text-white font-semibold mb-2">24/7 Support</div>
              <div className="text-white/80">Always Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}