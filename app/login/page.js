'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

import { Mail, Lock, Eye, EyeOff, AlertCircle, ArrowRight, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Validation functions
  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));

    switch (name) {
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'password':
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field error when typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Clear global login error on any change
    if (loginError) setLoginError('');
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };
const { login } = useAuth();  // add this at top inside component

const handleSubmit = async (e) => {
  e.preventDefault();

  setTouched({ email: true, password: true });
  if (!validateForm()) return;

  setIsLoading(true);
  setLoginError('');

  const result = await login(formData.email, formData.password);

  if (!result.success) {
    setLoginError(result.error || 'Invalid credentials');
  }

  setIsLoading(false);
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-md mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center gap-2 group">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#122E34] to-[#2596be] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <span className="text-white font-bold text-xl">EP</span>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#0E1D21]">Ed</span>
              <span className="text-2xl font-bold text-[#2596be]">Pharma</span>
            </div>
          </Link>
          <p className="mt-2 text-[#677E8A]">Admin access only</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#ABAFB5]/20 overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-[#2596be]" />
              </div>
              <h1 className="text-2xl font-bold text-[#0E1D21]">Admin Sign In</h1>
              <p className="mt-1 text-[#677E8A]">Secure access for pharmacy administrators</p>
            </div>

            {/* Global Error Message */}
            {loginError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-[#0E1D21]">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-xl border ${
                      touched.email && errors.email ? 'border-red-400' : 'border-[#ABAFB5]'
                    } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                    placeholder="admin@edpharma.com"
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-[#0E1D21]">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full rounded-xl border ${
                      touched.password && errors.password ? 'border-red-400' : 'border-[#ABAFB5]'
                    } bg-white px-4 py-3 pl-10 pr-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#677E8A] hover:text-[#2596be] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <div className="flex items-center gap-1 text-red-500 text-xs">
                    <AlertCircle className="h-3 w-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                  />
                  <label htmlFor="rememberMe" className="ml-2 text-sm text-[#677E8A]">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-[#2596be] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2596be] via-[#2596be]/90 to-[#2596be] px-5 py-3.5 text-white font-semibold shadow-lg hover:from-[#2596be]/90 hover:via-[#2596be]/80 hover:to-[#2596be]/90 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#ABAFB5]/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-[#677E8A]">Admin access only</span>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 border-t border-[#ABAFB5]/20 p-6 text-center">
            <p className="text-[#677E8A]">
              Don't have an admin account?{' '}
              <Link
                href="/register"
                className="font-semibold bg-gradient-to-r from-[#2596be] via-[#2596be]/80 to-[#2596be] bg-clip-text text-transparent hover:from-[#2596be]/90 hover:via-[#2596be]/70 hover:to-[#2596be]/90 transition-all"
              >
                Request access
              </Link>
            </p>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 px-5 py-2.5 text-sm font-medium text-[#0E1D21] hover:bg-gradient-to-r hover:from-[#2596be]/10 hover:to-[#122E34]/10 transition-all"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}