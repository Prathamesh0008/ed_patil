//app\register\page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone, 
  AlertCircle, 
  ArrowRight, 
  Check, 
  Shield,
  FileText,
  Building
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    newsletter: true,
    healthInfo: false,
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
    if (!/^[a-zA-Z\s'-]+$/.test(name)) return 'Name contains invalid characters';
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
    if (!phone) return '';
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) return 'Phone number must be at least 10 digits';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return 'Password must contain uppercase, lowercase, and number';
    }
    return '';
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        newErrors.firstName = validateName(formData.firstName);
        newErrors.lastName = validateName(formData.lastName);
        newErrors.email = validateEmail(formData.email);
        break;
      case 2:
        newErrors.phone = validatePhone(formData.phone);
        newErrors.password = validatePassword(formData.password);
        newErrors.confirmPassword = formData.confirmPassword !== formData.password ? 'Passwords do not match' : '';
        break;
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name] && touched[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep(step)) return;
    
    setIsLoading(true);
    
    try {
      const res = await fetch("/api/auth/signup", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    phone: formData.phone,
    password: formData.password,
  }),
});

const data = await res.json();

if (!data.success) {
  alert(data.error);
  return;
}

localStorage.setItem("edpharma_token", data.token);

      // Create user object
      const user = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        },
        dateOfBirth: '',
        avatar: null,
        membershipLevel: 'Basic',
        memberSince: new Date().toISOString().split('T')[0],
        healthData: {
          bloodType: '',
          allergies: [],
          conditions: [],
          primaryDoctor: '',
          insuranceProvider: '',
          insuranceId: ''
        },
        stats: {
          totalOrders: 0,
          activePrescriptions: 0,
          totalSpent: 0,
          consultations: 0,
          loyaltyPoints: 100, // Welcome bonus
          rewardsAvailable: 0
        },
        subscription: {
          plan: 'Free',
          status: 'active',
          renewalDate: '',
          autoRenew: false,
          price: 0,
          features: ['Basic Access']
        }
      };
      
      // Login user
      login(user);
      setRegistrationSuccess(true);
      
      setTimeout(() => {
        router.push('/account');
      }, 1500);
      
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
    
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 
      'bg-blue-500', 'bg-green-500', 'bg-emerald-600'
    ];
    
    return {
      score: Math.min(score, 6),
      label: labels[score - 1] || '',
      color: colors[score - 1] || '',
    };
  };

  const strength = passwordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f7ff] py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#122E34] to-[#2596be] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <span className="text-white font-bold text-2xl">EP</span>
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-[#0E1D21] to-[#2596be] bg-clip-text text-transparent">
                EdPharma
              </span>
              <p className="text-sm text-[#677E8A] mt-1">Join our healthcare community</p>
            </div>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                  stepNum <= step 
                    ? 'bg-gradient-to-r from-[#2596be] to-[#122E34] text-white' 
                    : 'bg-gray-200 text-gray-400'
                } font-semibold`}>
                  {stepNum < step ? <Check className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    stepNum < step ? 'bg-gradient-to-r from-[#2596be] to-[#122E34]' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-[#677E8A]">
            <span className={step >= 1 ? 'text-[#2596be] font-medium' : ''}>Personal Info</span>
            <span className={step >= 2 ? 'text-[#2596be] font-medium' : ''}>Security</span>
            <span>Complete</span>
          </div>
        </div>

        {/* Registration Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center mb-4">
                <User className="h-8 w-8 text-[#2596be]" />
              </div>
              <h1 className="text-2xl font-bold text-[#0E1D21]">
                {step === 1 && 'Personal Information'}
                {step === 2 && 'Account Security'}
                {step === 3 && 'Complete Registration'}
              </h1>
              <p className="mt-1 text-[#677E8A]">
                {step === 1 && 'Tell us about yourself'}
                {step === 2 && 'Secure your account'}
                {step === 3 && 'Welcome to EdPharma!'}
              </p>
            </div>

            {/* Success Message */}
            {registrationSuccess ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                  Account Created Successfully!
                </h3>
                <p className="text-emerald-700 mb-4">
                  Welcome to EdPharma. Your account is being prepared...
                </p>
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Personal Information */}
                {step === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0E1D21]">
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                            <User className="h-5 w-5" />
                          </div>
                          <input
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full rounded-xl border ${
                              touched.firstName && errors.firstName 
                                ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                                : 'border-[#E5E7EB] focus:border-[#2596be] focus:ring-[#2596be]/20'
                            } bg-white px-4 py-3.5 pl-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200`}
                            placeholder="John"
                          />
                        </div>
                        {touched.firstName && errors.firstName && (
                          <div className="flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.firstName}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-semibold text-[#0E1D21]">
                          Last Name *
                        </label>
                        <input
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl border ${
                            touched.lastName && errors.lastName 
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                              : 'border-[#E5E7EB] focus:border-[#2596be] focus:ring-[#2596be]/20'
                          } bg-white px-4 py-3.5 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200`}
                          placeholder="Doe"
                        />
                        {touched.lastName && errors.lastName && (
                          <div className="flex items-center gap-2 text-red-500 text-sm">
                            <AlertCircle className="h-4 w-4" />
                            {errors.lastName}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0E1D21]">
                        Email Address *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                          <Mail className="h-5 w-5" />
                        </div>
                        <input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl border ${
                            touched.email && errors.email 
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                              : 'border-[#E5E7EB] focus:border-[#2596be] focus:ring-[#2596be]/20'
                          } bg-white px-4 py-3.5 pl-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200`}
                          placeholder="you@example.com"
                        />
                      </div>
                      {touched.email && errors.email && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.email}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0E1D21]">
                        Phone Number <span className="text-[#677E8A] font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                          <Phone className="h-5 w-5" />
                        </div>
                        <input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 pl-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200 focus:border-[#2596be] focus:ring-[#2596be]/20"
                          placeholder="(123) 456-7890"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Account Security */}
                {step === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0E1D21]">
                        Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                          <Lock className="h-5 w-5" />
                        </div>
                        <input
                          name="password"
                          type={showPassword ? 'text' : 'password'}
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl border ${
                            touched.password && errors.password 
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                              : 'border-[#E5E7EB] focus:border-[#2596be] focus:ring-[#2596be]/20'
                          } bg-white px-4 py-3.5 pl-11 pr-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200`}
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
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#677E8A]">Password strength</span>
                            <span className={`text-xs font-semibold ${
                              strength.score <= 2 ? 'text-red-500' :
                              strength.score === 3 ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              {strength.label}
                            </span>
                          </div>
                          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${strength.color} transition-all duration-300`}
                              style={{ width: `${(strength.score / 5) * 100}%` }}
                            />
                          </div>
                          <ul className="grid grid-cols-2 gap-1 text-xs text-[#677E8A] mt-2">
                            <li className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${formData.password.length >= 8 ? 'bg-green-500' : 'bg-gray-300'}`} />
                              Min. 8 characters
                            </li>
                            <li className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${/[a-z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                              Lowercase letter
                            </li>
                            <li className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                              Uppercase letter
                            </li>
                            <li className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${/\d/.test(formData.password) ? 'bg-green-500' : 'bg-gray-300'}`} />
                              Number
                            </li>
                          </ul>
                        </div>
                      )}
                      
                      {touched.password && errors.password && (
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.password}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-semibold text-[#0E1D21]">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                          <Lock className="h-5 w-5" />
                        </div>
                        <input
                          name="confirmPassword"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full rounded-xl border ${
                            touched.confirmPassword && errors.confirmPassword 
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20' 
                              : 'border-[#E5E7EB] focus:border-[#2596be] focus:ring-[#2596be]/20'
                          } bg-white px-4 py-3.5 pl-11 pr-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200`}
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
                        <div className="flex items-center gap-2 text-red-500 text-sm">
                          <AlertCircle className="h-4 w-4" />
                          {errors.confirmPassword}
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#2596be]/30 transition-all duration-200 cursor-pointer">
                        <input
                          name="acceptTerms"
                          type="checkbox"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2596be] focus:ring-[#2596be]/20"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-[#0E1D21]">
                            I agree to the Terms of Service and Privacy Policy *
                          </span>
                          <p className="text-xs text-[#677E8A] mt-1">
                            By creating an account, you agree to our terms and privacy policy, including cookie use.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#2596be]/30 transition-all duration-200 cursor-pointer">
                        <input
                          name="newsletter"
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2596be] focus:ring-[#2596be]/20"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-[#0E1D21]">
                            Subscribe to newsletter & health tips
                          </span>
                          <p className="text-xs text-[#677E8A] mt-1">
                            Get updates on new services, health articles, and exclusive offers.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-[#2596be]/30 transition-all duration-200 cursor-pointer">
                        <input
                          name="healthInfo"
                          type="checkbox"
                          checked={formData.healthInfo}
                          onChange={handleChange}
                          className="mt-1 h-4 w-4 rounded border-[#E5E7EB] text-[#2596be] focus:ring-[#2596be]/20"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-[#0E1D21]">
                            Share basic health information (Optional)
                          </span>
                          <p className="text-xs text-[#677E8A] mt-1">
                            Help us provide better care by sharing basic health information.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-[#E5E7EB]">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-6 py-3 rounded-xl border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be]/30 hover:text-[#2596be] transition-all duration-200 font-medium"
                      disabled={isLoading}
                    >
                      ← Back
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      disabled={isLoading}
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
                    >
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      <span className="relative flex items-center gap-2">
                        {isLoading ? (
                          <>
                            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Complete Registration
                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>

          {/* Card Footer */}
          <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 border-t border-[#E5E7EB] p-6 text-center">
            <div className="flex items-center justify-center gap-4 text-sm text-[#677E8A]">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="w-px h-4 bg-[#E5E7EB]"></div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Secure Data</span>
              </div>
              <div className="w-px h-4 bg-[#E5E7EB]"></div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span>Trusted Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-8">
          <p className="text-[#677E8A]">
            Already have an account?{' '}
            <Link 
              href="/login" 
              className="font-semibold text-[#2596be] hover:text-[#122E34] transition-colors"
            >
              Sign in here
            </Link>
          </p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center gap-2 mt-4 text-sm text-[#677E8A] hover:text-[#0E1D21] transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}