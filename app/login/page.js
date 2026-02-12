'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Shield,
  Smartphone,
  Building
} from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!email || !password) {
        throw new Error('Please enter email and password');
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        throw new Error('Please enter a valid email address');
      }

      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Enhanced mock user data
      const mockUser = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        firstName: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
        lastName: 'User',
        email: email.toLowerCase(),
        phone: '+1 (555) 123-4567',
        address: {
          street: '123 Health Street',
          city: 'Medical City',
          state: 'MC',
          zipCode: '12345',
          country: 'USA'
        },
        dateOfBirth: '1990-01-01',
        avatar: null,
        membershipLevel: 'Premium',
        memberSince: '2023-06-15',
        lastLogin: new Date().toISOString(),
        healthData: {
          bloodType: 'O+',
          allergies: ['Penicillin', 'Peanuts'],
          conditions: ['Hypertension'],
          primaryDoctor: 'Dr. Sarah Chen',
          insuranceProvider: 'HealthCare Plus',
          insuranceId: 'HC-789456123'
        },
        stats: {
          totalOrders: 12,
          activePrescriptions: 3,
          totalSpent: 2456.78,
          consultations: 7,
          loyaltyPoints: 1250,
          rewardsAvailable: 4
        },
        subscription: {
          plan: 'Annual Premium',
          status: 'active',
          renewalDate: '2024-12-31',
          autoRenew: true,
          price: 299.99,
          features: ['Free Delivery', '24/7 Doctor Access', 'Discounts']
        },
        notifications: {
          email: true,
          sms: true,
          promotional: false,
          orderUpdates: true
        },
        security: {
          twoFactorEnabled: false,
          lastPasswordChange: '2024-01-15',
          devices: [
            { name: 'iPhone 14', lastActive: '2024-03-15' },
            { name: 'MacBook Pro', lastActive: '2024-03-14' }
          ]
        }
      };

      login(mockUser);
      router.push('/account');

    } catch (err) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (role) => {
    const demoCredentials = {
      patient: { email: 'patient@edpharma.com', password: 'demo123' },
      doctor: { email: 'doctor@edpharma.com', password: 'demo123' },
      admin: { email: 'admin@edpharma.com', password: 'demo123' }
    };
    
    setEmail(demoCredentials[role].email);
    setPassword(demoCredentials[role].password);
    setTimeout(() => handleSubmit({ preventDefault: () => {} }), 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f7ff]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Column - Branding & Features */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="max-w-lg mx-auto lg:mx-0">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-3 mb-8 group">
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#122E34] to-[#2596be] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white font-bold text-2xl">EP</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#0E1D21] to-[#2596be] bg-clip-text text-transparent">
                    EdPharma
                  </span>
                  <p className="text-sm text-[#677E8A] mt-1">Healthcare Excellence</p>
                </div>
              </Link>

              {/* Hero Section */}
              <div className="mb-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-[#0E1D21] leading-tight">
                  Welcome to Your{' '}
                  <span className="bg-gradient-to-r from-[#2596be] to-[#122E34] bg-clip-text text-transparent">
                    Healthcare Hub
                  </span>
                </h1>
                <p className="text-lg text-[#677E8A] mt-4 leading-relaxed">
                  Access your prescriptions, health records, and medical services all in one secure platform.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2596be]/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-[#2596be]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E1D21]">Secure & HIPAA Compliant</h3>
                    <p className="text-sm text-[#677E8A]">Your data is protected</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2596be]/10 flex items-center justify-center">
                    <Smartphone className="h-5 w-5 text-[#2596be]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E1D21]">24/7 Access</h3>
                    <p className="text-sm text-[#677E8A]">Anywhere, anytime</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#2596be]/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-[#2596be]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E1D21]">Integrated Network</h3>
                    <p className="text-sm text-[#677E8A]">500+ healthcare providers</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 text-sm text-[#677E8A]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>98% Patient Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-2xl border border-[#E5E7EB] overflow-hidden">
              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-[#0E1D21]">Sign In to Your Account</h2>
                  <p className="text-[#677E8A] mt-2">Welcome back! Please enter your details</p>
                </div>

                {/* Demo Login Buttons */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['patient', 'doctor', 'admin'].map((role) => (
                    <button
                      key={role}
                      onClick={() => handleDemoLogin(role)}
                      className="py-2.5 px-3 rounded-lg border border-[#E5E7EB] hover:border-[#2596be]/30 hover:bg-[#2596be]/5 transition-all duration-200 group"
                    >
                      <span className="text-xs font-medium text-[#677E8A] group-hover:text-[#2596be] capitalize">
                        {role}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-red-600 font-medium">{error}</p>
                      <p className="text-xs text-red-500 mt-1">Need help? Contact support@edpharma.com</p>
                    </div>
                  </div>
                )}

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0E1D21] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                        <Mail className="h-5 w-5" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 pl-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200 focus:border-[#2596be] focus:ring-3 focus:ring-[#2596be]/20"
                        placeholder="name@company.com"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-semibold text-[#0E1D21]">
                        Password
                      </label>
                      <Link 
                        href="/forgot-password" 
                        className="text-sm text-[#2596be] hover:text-[#122E34] font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#677E8A]">
                        <Lock className="h-5 w-5" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3.5 pl-11 pr-11 text-[#0E1D21] placeholder:text-[#9CA3AF] shadow-sm outline-none transition-all duration-200 focus:border-[#2596be] focus:ring-3 focus:ring-[#2596be]/20"
                        placeholder="••••••••"
                        required
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#677E8A] hover:text-[#2596be] transition-colors"
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Submit */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#D1D5DB] text-[#2596be] focus:ring-[#2596be]/20"
                        disabled={isLoading}
                      />
                      <span className="text-sm text-[#677E8A]">Remember me</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="relative w-full rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] px-5 py-4 text-white font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden"
                  >
                    {/* Shimmer Effect */}
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    
                    <span className="relative flex items-center justify-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Signing In...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E5E7EB]"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-[#677E8A]">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => console.log('Google login')}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#0E1D21] hover:border-[#2596be]/30 hover:bg-[#2596be]/5 transition-all duration-200"
                    disabled={isLoading}
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
                    onClick={() => console.log('Microsoft login')}
                    className="flex items-center justify-center gap-2 px-4 py-3 border border-[#E5E7EB] rounded-xl text-sm font-medium text-[#0E1D21] hover:border-[#2596be]/30 hover:bg-[#2596be]/5 transition-all duration-200"
                    disabled={isLoading}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#f25022" d="M0 0h11.5v11.5H0zM12.5 0H24v11.5H12.5zM0 12.5h11.5V24H0zM12.5 12.5H24V24H12.5z"/>
                    </svg>
                    Microsoft
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-[#677E8A]">
                    Don't have an account?{' '}
                    <Link 
                      href="/register" 
                      className="font-semibold text-[#2596be] hover:text-[#122E34] transition-colors"
                    >
                      Create account
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
            </div>

            {/* Security Badge */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#677E8A]">
              <Shield className="h-4 w-4" />
              <span>256-bit SSL encryption • HIPAA Compliant • ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}