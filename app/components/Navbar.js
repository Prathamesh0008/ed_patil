'use client';

import { useState } from 'react';
import Link from 'next/link';  
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu, X, Search, ChevronDown, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Consultation', href: '/consultation' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-lg">EP</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#0E1D21]">Ed</span>
                <span className="text-xl font-bold text-[#2596be]">Pharma</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation with Dark Boxes */}
          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 group ${
                  pathname === link.href
                    ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-gray-200 shadow-sm'
                    : 'hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5'
                }`}
              >
                {/* Dark accent box on hover */}
                <div className={`absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  pathname === link.href 
                    ? 'bg-gradient-to-r from-[#2596be]/20 to-[#122E34]/20' 
                    : 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10'
                }`}></div>
                
                <span className={`relative z-10 font-medium transition-colors duration-300 ${
                  pathname === link.href
                    ? 'text-[#2596be] font-semibold'
                    : 'text-[#677E8A] group-hover:text-[#2596be]'
                }`}>
                  {link.name}
                </span>
                
                {/* Active indicator */}
                {pathname === link.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-[#2596be] to-[#122E34] rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Right side buttons with Dark Boxes */}
          <div className="flex items-center space-x-3">
            {/* Search Button with Dark Box */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300 group relative">
              <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
              <Search className="h-5 w-5 text-[#677E8A] relative z-10 group-hover:text-[#2596be]" />
            </button>

            {/* Cart Button with Dark Box */}
            <Link
              href="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300 group"
            >
              <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
              <ShoppingCart className="h-5 w-5 text-[#677E8A] relative z-10 group-hover:text-[#2596be]" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 z-20 w-5 h-5 bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* User Auth Section with Dark Box */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300 group relative"
                >
                  <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center shadow-sm relative z-10">
                    <span className="text-white text-sm font-bold">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </span>
                  </div>
                  <div className="hidden md:block text-left relative z-10">
                    <p className="text-sm font-medium text-[#0E1D21]">
                      Hi, {user?.firstName}
                    </p>
                    <p className="text-xs text-[#677E8A]">{user?.email?.split('@')[0]}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-[#677E8A] relative z-10" />
                </button>

                {/* User Dropdown with Dark Boxes */}
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-3 z-50 overflow-hidden">
                    {/* Dropdown header with gradient */}
                    <div className="px-4 py-2 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 border-b border-gray-100">
                      <p className="text-sm font-semibold text-[#0E1D21]">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-[#677E8A] truncate">{user?.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <Link
                        href="/account"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="flex items-center px-4 py-3 mx-2 my-1 text-sm text-[#677E8A] hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 hover:text-[#2596be] rounded-lg transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2596be]/50 to-[#122E34]/50 mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        <User className="h-4 w-4 mr-3" />
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 mx-2 my-1 text-sm text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 rounded-lg transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-400 mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Sign In Button with Dark Box */}
                <Link
                  href="/login"
                  className="hidden md:block px-5 py-2.5 text-sm font-medium text-[#2596be] hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 rounded-xl transition-all duration-300 group relative"
                >
                  <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
                  <span className="relative z-10">Sign In</span>
                </Link>
                
                {/* Sign Up Button with Enhanced Gradient */}
                <Link
                  href="/register"
                  className="px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-[#2596be] to-[#122E34] text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Shine effect */}
                  <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative z-10">Sign Up</span>
                </Link>
              </div>
            )}

            {/* Mobile menu button with Dark Box */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300 group relative"
            >
              <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-[#677E8A] relative z-10 group-hover:text-[#2596be]" />
              ) : (
                <Menu className="h-6 w-6 text-[#677E8A] relative z-10 group-hover:text-[#2596be]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu with Dark Boxes */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 bg-gradient-to-b from-white to-gray-50/50">
            <div className="space-y-2 px-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3.5 text-sm font-medium rounded-xl transition-all duration-300 group relative ${
                    pathname === link.href
                      ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 border border-gray-200'
                      : 'hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5'
                  }`}
                >
                  <div className={`absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    pathname === link.href 
                      ? 'bg-gradient-to-r from-[#2596be]/20 to-[#122E34]/20' 
                      : 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10'
                  }`}></div>
                  
                  <div className="flex items-center justify-between relative z-10">
                    <span className={pathname === link.href ? 'text-[#2596be] font-semibold' : 'text-[#677E8A]'}>
                      {link.name}
                    </span>
                    {pathname === link.href && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34]"></div>
                    )}
                  </div>
                </Link>
              ))}
              
              {/* Mobile Auth Links with Dark Boxes */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/account"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3.5 text-sm font-medium text-[#677E8A] rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 hover:text-[#2596be] transition-all duration-300 mb-2 group relative"
                    >
                      <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
                      <div className="flex items-center relative z-10">
                        <User className="h-4 w-4 mr-3" />
                        My Account
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-3.5 text-sm font-medium text-red-600 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-300 group relative"
                    >
                      <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-red-100 to-red-50"></div>
                      <div className="flex items-center relative z-10">
                        <LogOut className="h-4 w-4 mr-3" />
                        Sign Out
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3.5 text-sm font-medium text-[#2596be] rounded-xl hover:bg-gradient-to-r hover:from-[#2596be]/5 hover:to-[#122E34]/5 transition-all duration-300 mb-2 group relative"
                    >
                      <div className="absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10"></div>
                      <span className="relative z-10">Sign In</span>
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-3.5 text-sm font-medium bg-gradient-to-r from-[#2596be] to-[#122E34] text-white rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative z-10">Sign Up</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}