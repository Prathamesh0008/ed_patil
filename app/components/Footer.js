import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold">EP</span>
              </div>
              <span className="text-xl font-bold">EdPharma</span>
            </div>
            <p className="text-blue-200 mb-6">
              Your trusted partner in healthcare. Quality medicines with fast delivery.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" className="text-blue-200 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="text-blue-200 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/services" className="text-blue-200 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blue-200 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Prescription Medicines
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Medical Devices
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Personal Care
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-200 hover:text-white">
                  Health Supplements
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <FiPhone className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMail className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200">info@edpharma.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <FiMapPin className="w-5 h-5 text-blue-300" />
                <span className="text-blue-200">123 Health Street</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} EdPharma. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}