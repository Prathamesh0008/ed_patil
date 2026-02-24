//ed_patil\app\SignUp\page.js

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, Eye, EyeOff, User, Phone, AlertCircle, ArrowRight, Check } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return 'Name is required';
    if (!/^[a-zA-Z\s]+$/.test(name)) return 'Name can only contain letters and spaces';
    if (name.length < 2) return 'Name must be at least 2 characters';
    return '';
  };

  const validateEmail = (email) => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePhone = (phone) => {
    if (!phone) return ''; // Optional field
    const digitsOnly = phone.replace(/\D/g, '');
    if (!/^\d+$/.test(digitsOnly)) return 'Phone number can only contain digits';
    if (digitsOnly.length < 7) return 'Phone number must be at least 7 digits';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (!confirmPassword) return 'Please confirm your password';
    if (confirmPassword !== formData.password) return 'Passwords do not match';
    return '';
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    switch (name) {
      case 'firstName':
      case 'lastName':
        setErrors(prev => ({ ...prev, [name]: validateName(value) }));
        break;
      case 'email':
        setErrors(prev => ({ ...prev, email: validateEmail(value) }));
        break;
      case 'phone':
        setErrors(prev => ({ ...prev, phone: validatePhone(value) }));
        break;
      case 'password':
        setErrors(prev => ({ ...prev, password: validatePassword(value) }));
        break;
      case 'confirmPassword':
        setErrors(prev => ({ ...prev, confirmPassword: validateConfirmPassword(value) }));
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    let processedValue = value;
    
    // Apply specific validation/formatting
    switch (name) {
      case 'firstName':
      case 'lastName':
        processedValue = value.replace(/[^a-zA-Z\s]/g, '');
        break;
      case 'phone':
        processedValue = value.replace(/\D/g, '');
        if (value.startsWith('+')) {
          processedValue = '+' + value.slice(1).replace(/\D/g, '');
        }
        break;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));
    
    // Clear error when user starts typing
    if (errors[name] && touched[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Revalidate confirm password when password changes
    if (name === 'password' && formData.confirmPassword) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: validateConfirmPassword(formData.confirmPassword)
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: validateName(formData.firstName),
      lastName: validateName(formData.lastName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword),
    };
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
      acceptTerms: true,
    });
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful registration
      console.log('Registration successful:', formData);
      
      // Show success message
      setRegistrationSuccess(true);
      
      // Redirect to account page after 2 seconds
      setTimeout(() => {
        router.push('/account');
      }, 2000);
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    
    return {
      score,
      label: labels[score - 1] || '',
      color: colors[score - 1] || '',
    };
  };

  const strength = passwordStrength(formData.password);

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
          <p className="mt-2 text-[#677E8A]">Create your healthcare account</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#ABAFB5]/20 overflow-hidden">
          
          {/* Card Header */}
          <div className="p-6 sm:p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-[#2596be]" />
              </div>
              <h1 className="text-2xl font-bold text-[#0E1D21]">Create Account</h1>
              <p className="mt-1 text-[#677E8A]">Join our healthcare community</p>
            </div>

            {/* Success Message */}
            {registrationSuccess ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-6 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-3">
                  <Check className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-green-800 mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-green-700">
                  Welcome to EdPharma. Redirecting to your account...
                </p>
              </div>
            ) : (
              <>
                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Fields */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="block text-sm font-medium text-[#0E1D21]">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                          <User className="h-4 w-4" />
                        </div>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl border ${
                            touched.firstName && errors.firstName ? 'border-red-400' : 'border-[#ABAFB5]'
                          } bg-white px-4 py-3 pl-9 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                          placeholder="John"
                        />
                      </div>
                      {touched.firstName && errors.firstName && (
                        <div className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {errors.firstName}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="block text-sm font-medium text-[#0E1D21]">
                        Last Name
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.lastName && errors.lastName ? 'border-red-400' : 'border-[#ABAFB5]'
                        } bg-white px-4 py-3 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="Doe"
                      />
                      {touched.lastName && errors.lastName && (
                        <div className="flex items-center gap-1 text-red-500 text-xs">
                          <AlertCircle className="h-3 w-3" />
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>

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
                        placeholder="you@example.com"
                      />
                    </div>
                    {touched.email && errors.email && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                      </div>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm font-medium text-[#0E1D21]">
                      Phone Number <span className="text-[#677E8A] font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                        <Phone className="h-5 w-5" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.phone && errors.phone ? 'border-red-400' : 'border-[#ABAFB5]'
                        } bg-white px-4 py-3 pl-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="1234567890"
                      />
                    </div>
                    {touched.phone && errors.phone && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.phone}
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
                    
                    {/* Password Strength Meter */}
                    {formData.password && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#677E8A]">Password strength</span>
                          <span className={`text-xs font-medium ${
                            strength.score <= 2 ? 'text-red-500' :
                            strength.score === 3 ? 'text-yellow-500' : 'text-green-500'
                          }`}>
                            {strength.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${strength.color} transition-all duration-300`}
                            style={{ width: `${(strength.score / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {touched.password && errors.password && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.password}
                      </div>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#0E1D21]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full rounded-xl border ${
                          touched.confirmPassword && errors.confirmPassword ? 'border-red-400' : 'border-[#ABAFB5]'
                        } bg-white px-4 py-3 pl-10 pr-10 text-[#0E1D21] placeholder:text-[#677E8A] shadow-sm outline-none transition focus:border-[#2596be] focus:ring-4 focus:ring-[#2596be]/20`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#677E8A] hover:text-[#2596be] transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.confirmPassword}
                      </div>
                    )}
                  </div>

                  {/* Terms and Newsletter */}
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <input
                        id="acceptTerms"
                        name="acceptTerms"
                        type="checkbox"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="h-4 w-4 mt-0.5 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                      />
                      <label htmlFor="acceptTerms" className="ml-2 text-sm text-[#677E8A]">
                        I agree to the{' '}
                        <Link href="/terms" className="text-[#2596be] hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-[#2596be] hover:underline">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>
                    {touched.acceptTerms && errors.acceptTerms && (
                      <div className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertCircle className="h-3 w-3" />
                        {errors.acceptTerms}
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="h-4 w-4 mt-0.5 rounded border-[#ABAFB5] text-[#2596be] focus:ring-[#2596be]/20"
                      />
                      <label htmlFor="newsletter" className="ml-2 text-sm text-[#677E8A]">
                        Subscribe to our newsletter for health tips and updates
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#2596be] via-[#2596be]/90 to-[#2596be] px-5 py-3.5 text-white font-semibold shadow-lg hover:from-[#2596be]/90 hover:via-[#2596be]/80 hover:to-[#2596be]/90 hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                  >
                    {/* Shine effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    
                    {isLoading ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
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
                    <span className="px-3 bg-white text-[#677E8A]">Or sign up with</span>
                  </div>
                </div>

                {/* Social Sign Up Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => console.log('Sign up with Google')}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-[#ABAFB5] rounded-xl text-sm font-medium text-[#0E1D21] hover:bg-[#2596be]/5 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </button>
                  <button
                    onClick={() => console.log('Sign up with Facebook')}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-[#ABAFB5] rounded-xl text-sm font-medium text-[#0E1D21] hover:bg-[#2596be]/5 transition-colors"
                  >
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 border-t border-[#ABAFB5]/20 p-6 text-center">
            <p className="text-[#677E8A]">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="font-semibold bg-gradient-to-r from-[#2596be] via-[#2596be]/80 to-[#2596be] bg-clip-text text-transparent hover:from-[#2596be]/90 hover:via-[#2596be]/70 hover:to-[#2596be]/90 transition-all"
              >
                Sign in here
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