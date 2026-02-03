import { FiArrowRight, FiShield, FiTruck, FiClock, FiChevronRight } from 'react-icons/fi';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-screen filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-screen filter blur-3xl opacity-30"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                           linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative section-container py-20 md:py-32 lg:py-40">
        <div className="max-w-6xl mx-auto">
          {/* Centered Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium tracking-wider">TRUSTED HEALTHCARE PARTNER</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="block">REVOLUTIONIZING</span>
              <span className="block text-blue-300">PHARMACY CARE</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience the future of healthcare with AI-powered medication management, 
              instant delivery, and 24/7 expert support.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link 
                href="/get-started" 
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl"
              >
                <span className="text-lg">Get Started Free</span>
                <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <Link 
                href="/demo" 
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 bg-transparent text-white font-bold rounded-xl border-2 border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                <span className="text-lg">View Demo</span>
                <FiChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-xl">
                <FiShield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Secure & Private</h3>
              <p className="text-blue-200 mb-6">
                HIPAA compliant data protection with end-to-end encryption
              </p>
              <Link href="/security" className="inline-flex items-center text-blue-300 hover:text-white group-hover:underline">
                Learn more
                <FiChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-400 rounded-xl flex items-center justify-center shadow-xl">
                <FiTruck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Instant Delivery</h3>
              <p className="text-blue-200 mb-6">
                Get medications delivered in under 2 hours, 24/7
              </p>
              <Link href="/delivery" className="inline-flex items-center text-blue-300 hover:text-white group-hover:underline">
                Track delivery
                <FiChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>

            {/* Feature 3 */}
            <div className="group relative bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-400 rounded-xl flex items-center justify-center shadow-xl">
                <FiClock className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 mt-4">Always Available</h3>
              <p className="text-blue-200 mb-6">
                Connect with licensed pharmacists anytime, anywhere
              </p>
              <Link href="/support" className="inline-flex items-center text-blue-300 hover:text-white group-hover:underline">
                Chat now
                <FiChevronRight className="ml-1 w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Bottom Stats */}
          <div className="mt-20 pt-10 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold mb-2">500K+</div>
                <p className="text-blue-200">Patients Served</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">99.9%</div>
                <p className="text-blue-200">Accuracy Rate</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <p className="text-blue-200">Service Hours</p>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">4.9★</div>
                <p className="text-blue-200">Customer Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}