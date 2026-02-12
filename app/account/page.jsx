// File: app/account/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
  // Core icons
  User, Phone, MapPin, Calendar, Shield, Bell,
  Heart, Pill, Clock, Package, Settings, LogOut, Edit,
  CheckCircle, AlertCircle, ChevronRight, CreditCard,
  FileText, Star, Lock, Activity, Eye,
  Download, MessageSquare, Home,
  ShoppingCart, HeartPulse, Award, TrendingUp, ShieldCheck,
  Database, QrCode, Mail, Smartphone, Monitor, Trash2,
  Camera, Wallet, BarChart3, Zap, Stethoscope,
  FirstAidKit, Thermometer, Weight, Droplets, Brain,
  ChevronLeft, ChevronUp, ChevronDown, Search, Filter,
  MoreVertical, ExternalLink, Copy, Printer, Send,
  CalendarDays, Clock as ClockIcon, Users, Globe,
  CheckSquare, Square, BellOff, BellRing, EyeOff,
  Upload, RefreshCw, X, Plus, Minus, RotateCcw,
  // Additional icons for orders tab
  Truck, XCircle, AlertTriangle, ArrowUpDown, ShoppingBag, DollarSign
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e6f7ff]">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#2596be]/20 border-t-[#2596be] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#677E8A] font-medium">Loading your account...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Helper functions
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPhone = (phone) => {
    if (!phone || phone === '—') return 'Not provided';
    const cleaned = phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phone;
  };

  const calculateHealthScore = () => {
    let score = 75;
    if (user.healthData?.conditions?.length > 0) score -= 10;
    if (user.stats?.activePrescriptions > 0) score -= 5;
    if (user.healthData?.allergies?.length > 0) score -= 5;
    return Math.max(0, Math.min(100, score));
  };

  const healthScore = calculateHealthScore();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { id: 'profile', label: 'Profile', icon: User, color: 'from-emerald-500 to-teal-500' },
    { id: 'health', label: 'Health', icon: HeartPulse, color: 'from-rose-500 to-pink-500' },
    { id: 'orders', label: 'Orders', icon: Package, color: 'from-orange-500 to-amber-500' },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill, color: 'from-violet-500 to-purple-500' },
    { id: 'security', label: 'Security', icon: Shield, color: 'from-indigo-500 to-blue-500' },
    { id: 'subscription', label: 'Subscription', icon: CreditCard, color: 'from-[#2596be] to-[#122E34]' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'from-gray-500 to-gray-700' },
  ];

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f7ff]">
      {/* Simplified Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              {/* User Profile */}
              <div className="relative group">
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#E5E7EB] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-[#E5E7EB]">
                    <p className="text-sm font-medium text-[#0E1D21]">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-[#677E8A] truncate">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <button onClick={() => setActiveTab('profile')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <User className="h-4 w-4" />
                      My Profile
                    </button>
                    <button onClick={() => setActiveTab('settings')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <button onClick={() => router.push('/help')} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Help & Support
                    </button>
                  </div>
                  <div className="border-t border-[#E5E7EB] pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-[#2596be] to-[#122E34] rounded-2xl p-6 mb-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {user.firstName}! 👋</h1>
                  <p className="text-blue-100">Here's your health dashboard overview</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-300" />
                  <span>Member since {formatDate(user.memberSince)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-blue-300" />
                  <span>{user.membershipLevel} Plan</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-amber-300" />
                  <span>Last login: {formatDate(user.lastLogin)}</span>
                </div>
              </div>
            </div>
            {/* Health Score */}
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Health Score</span>
                <span className="text-lg font-bold">{healthScore}/100</span>
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    healthScore >= 70 ? 'bg-green-400' :
                    healthScore >= 40 ? 'bg-yellow-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${healthScore}%` }}
                />
              </div>
              <p className="text-xs text-blue-100 mt-2">
                {healthScore >= 70 ? 'Excellent health' : 
                 healthScore >= 40 ? 'Good health' : 'Needs attention'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] overflow-hidden sticky top-24">
              {/* User Profile Summary */}
              <div className="p-5 border-b border-[#E5E7EB]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center text-white font-bold text-lg">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <CheckCircle className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#0E1D21] text-sm">
                      {user.firstName} {user.lastName}
                    </h3>
                    <p className="text-xs text-[#677E8A] truncate">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl mb-1 transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 text-[#2596be]'
                          : 'text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be]'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tab.color} flex items-center justify-center`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-sm">{tab.label}</span>
                      {activeTab === tab.id && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-[#2596be]"></div>
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="p-4 border-t border-[#E5E7EB]">
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-[#677E8A]">Points</p>
                    <p className="text-lg font-bold text-[#0E1D21]">
                      {user.stats?.loyaltyPoints || 0}
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-[#677E8A]">Orders</p>
                    <p className="text-lg font-bold text-[#0E1D21]">
                      {user.stats?.totalOrders || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
{/* Quick Links */}
<div className="mt-6 bg-white rounded-2xl shadow-lg border border-[#E5E7EB] p-4">
  <h4 className="text-sm font-semibold text-[#0E1D21] mb-3">Quick Links</h4>
  <div className="space-y-2">
    <Link 
      href="/shop" 
      className="flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] p-2 rounded-lg hover:bg-gray-50"
    >
      <ShoppingCart className="h-4 w-4" />
      Shop Medicines
    </Link>
    <Link 
      href="/consult" 
      className="flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] p-2 rounded-lg hover:bg-gray-50"
    >
      <MessageSquare className="h-4 w-4" />
      Consult Doctor
    </Link>
    <Link 
      href="/appointments" 
      className="flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] p-2 rounded-lg hover:bg-gray-50"
    >
      <Calendar className="h-4 w-4" />
      Book Appointment
    </Link>
    <Link 
      href="/orders" 
      className="flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] p-2 rounded-lg hover:bg-gray-50"
    >
      <Package className="h-4 w-4" />
      Order Management
    </Link>
    <Link 
      href="/support" 
      className="flex items-center gap-2 text-sm text-[#677E8A] hover:text-[#2596be] p-2 rounded-lg hover:bg-gray-50"
    >
      <FileText className="h-4 w-4" />
      Get Support
    </Link>
  </div>
</div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Search Bar for Relevant Tabs */}
            {(activeTab === 'orders' || activeTab === 'prescriptions') && (
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#677E8A]" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#E5E7EB] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#677E8A] hover:text-[#2596be]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Tab Content */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#E5E7EB] overflow-hidden">
              {/* Tab Header */}
              <div className="border-b border-[#E5E7EB] p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${
                      tabs.find(t => t.id === activeTab)?.color
                    } flex items-center justify-center`}>
                      {(() => {
                        const Icon = tabs.find(t => t.id === activeTab)?.icon;
                        return Icon ? <Icon className="h-6 w-6 text-white" /> : null;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#0E1D21]">
                        {tabs.find(t => t.id === activeTab)?.label}
                      </h2>
                      <p className="text-sm text-[#677E8A]">
                        {activeTab === 'overview' && 'Your health dashboard overview'}
                        {activeTab === 'profile' && 'Manage your personal information and orders'}
                        {activeTab === 'health' && 'View and manage your health records'}
                        {activeTab === 'orders' && 'Track and manage your medication orders'}
                        {activeTab === 'prescriptions' && 'View and refill your prescriptions'}
                        {activeTab === 'security' && 'Manage account security settings'}
                        {activeTab === 'subscription' && 'View and manage your subscription'}
                        {activeTab === 'settings' && 'Configure your account settings'}
                      </p>
                    </div>
                  </div>
                  
                  {activeTab === 'profile' && (
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow">
                      <Edit className="h-4 w-4" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'overview' && <OverviewTab user={user} />}
                {activeTab === 'profile' && <ProfileTab user={user} formatDate={formatDate} formatPhone={formatPhone} />}
                {activeTab === 'health' && <HealthTab user={user} />}
                {activeTab === 'orders' && <OrdersTab user={user} />}
                {activeTab === 'prescriptions' && <PrescriptionsTab user={user} />}
                {activeTab === 'security' && <SecurityTab user={user} />}
                {activeTab === 'subscription' && <SubscriptionTab user={user} />}
                {activeTab === 'settings' && <SettingsTab user={user} />}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

// ---------- Overview Tab ----------
function OverviewTab({ user }) {
  const router = useRouter();
  
  const stats = [
    { label: 'Active Prescriptions', value: user.stats?.activePrescriptions || 0, icon: Pill, color: 'from-violet-500 to-purple-500', change: '+2 this month' },
    { label: 'Total Orders', value: user.stats?.totalOrders || 0, icon: Package, color: 'from-orange-500 to-amber-500', change: '+12% from last month' },
    { label: 'Loyalty Points', value: user.stats?.loyaltyPoints || 0, icon: Award, color: 'from-emerald-500 to-teal-500', change: 'Earn 500 more for gold' },
    { label: 'Consultations', value: user.stats?.consultations || 0, icon: MessageSquare, color: 'from-blue-500 to-cyan-500', change: 'Last: 2 days ago' },
  ];

  const quickActions = [
    { label: 'Order Medicine', icon: ShoppingCart, color: 'from-[#2596be] to-[#122E34]', action: () => router.push('/shop') },
    { label: 'Consult Doctor', icon: MessageSquare, color: 'from-emerald-500 to-teal-500', action: () => router.push('/consult') },
    { label: 'View Reports', icon: FileText, color: 'from-violet-500 to-purple-500', action: () => router.push('/reports') },
    { label: 'Book Appointment', icon: Calendar, color: 'from-rose-500 to-pink-500', action: () => router.push('/appointments') },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#677E8A]">{stat.label}</p>
                  <p className="text-2xl font-bold text-[#0E1D21] mt-1">{stat.value}</p>
                  <p className="text-xs text-[#677E8A] mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Health Summary & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[#0E1D21]">Health Summary</h3>
            <button className="text-sm text-[#2596be] font-medium">View Details →</button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-[#677E8A]">Blood Type</span>
              <span className="font-medium text-[#0E1D21]">{user.healthData?.bloodType || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Primary Doctor</span>
              <span className="font-medium text-[#0E1D21]">{user.healthData?.primaryDoctor || 'Not assigned'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Insurance</span>
              <span className="font-medium text-[#0E1D21]">{user.healthData?.insuranceProvider || 'Not set'}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-t border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Allergies</span>
              <span className="font-medium text-[#0E1D21]">
                {user.healthData?.allergies?.length > 0 ? `${user.healthData.allergies.length} recorded` : 'None'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
          <h3 className="font-semibold text-[#0E1D21] mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <ActivityItem
              icon={Package}
              title="Order Delivered"
              description="Prescription #ORD-789 delivered"
              time="2 hours ago"
              color="text-green-500"
            />
            <ActivityItem
              icon={MessageSquare}
              title="Doctor's Message"
              description="Dr. Chen sent follow-up message"
              time="1 day ago"
              color="text-blue-500"
            />
            <ActivityItem
              icon={CreditCard}
              title="Payment Processed"
              description="Monthly subscription payment"
              time="3 days ago"
              color="text-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Activity Item ----------
function ActivityItem({ icon: Icon, title, description, time, color }) {
  return (
    <div className="flex items-start gap-3">
      <div className={`w-10 h-10 rounded-lg ${color} bg-opacity-10 flex items-center justify-center flex-shrink-0`}>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <div className="flex-1">
        <p className="font-medium text-[#0E1D21]">{title}</p>
        <p className="text-sm text-[#677E8A]">{description}</p>
        <p className="text-xs text-[#9CA3AF] mt-1">{time}</p>
      </div>
    </div>
  );
}

// ---------- Profile Tab ----------
function ProfileTab({ user, formatDate, formatPhone }) {
  const recentOrders = [
    { id: 'ORD-789', date: 'Mar 15, 2024', items: 3, total: 145.99, status: 'Delivered' },
    { id: 'ORD-788', date: 'Mar 10, 2024', items: 2, total: 89.50, status: 'Shipped' },
    { id: 'ORD-787', date: 'Mar 5, 2024', items: 1, total: 45.99, status: 'Processing' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Details */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
              <User className="h-5 w-5 text-[#2596be]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#0E1D21]">Personal Details</h3>
              <p className="text-sm text-[#677E8A]">Your account information</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Full Name</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.firstName} {user.lastName}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Date of Birth</span>
              <span className="font-medium text-[#0E1D21] text-right">{formatDate(user.dateOfBirth)}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Email Address</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.email}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#677E8A]">Phone Number</span>
              <span className="font-medium text-[#0E1D21] text-right">{formatPhone(user.phone)}</span>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
              <MapPin className="h-5 w-5 text-[#2596be]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#0E1D21]">Address Information</h3>
              <p className="text-sm text-[#677E8A]">Your shipping and billing address</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">Street Address</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.address?.street || 'Not provided'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">City</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.address?.city || 'Not provided'}</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
              <span className="text-sm text-[#677E8A]">State/ZIP</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.address?.state || ''} {user.address?.zipCode || ''}</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-sm text-[#677E8A]">Country</span>
              <span className="font-medium text-[#0E1D21] text-right">{user.address?.country || 'Not provided'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
              <Package className="h-5 w-5 text-[#2596be]" />
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#0E1D21]">Recent Orders</h3>
              <p className="text-sm text-[#677E8A]">Your recent medication orders</p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow">
            <ShoppingCart className="h-4 w-4" />
            New Order
          </button>
        </div>

        <div className="overflow-hidden rounded-lg border border-[#E5E7EB]">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Items</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-[#677E8A] uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="font-medium text-[#0E1D21]">{order.id}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#677E8A]">{order.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#677E8A]">{order.items} items</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-[#0E1D21]">${order.total.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-[#2596be] hover:text-[#122E34] font-medium mr-3">View</button>
                    {order.status === 'Delivered' && (
                      <button className="text-[#2596be] hover:text-[#122E34] font-medium">Reorder</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-center">
          <button className="text-[#2596be] font-medium hover:text-[#122E34] transition-colors">
            View All Orders →
          </button>
        </div>
      </div>

      {/* Account Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-4 text-center">
          <Calendar className="h-6 w-6 text-[#2596be] mx-auto mb-2" />
          <p className="text-xs text-[#677E8A]">Member Since</p>
          <p className="font-semibold text-[#0E1D21]">{formatDate(user.memberSince)}</p>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-4 text-center">
          <Award className="h-6 w-6 text-[#2596be] mx-auto mb-2" />
          <p className="text-xs text-[#677E8A]">Membership Level</p>
          <p className="font-semibold text-[#0E1D21]">{user.membershipLevel}</p>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-4 text-center">
          <Clock className="h-6 w-6 text-[#2596be] mx-auto mb-2" />
          <p className="text-xs text-[#677E8A]">Last Login</p>
          <p className="font-semibold text-[#0E1D21]">{formatDate(user.lastLogin)}</p>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-4 text-center">
          <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-xs text-[#677E8A]">Account Status</p>
          <p className="font-semibold text-green-600">Active</p>
        </div>
      </div>
    </div>
  );
}

// ---------- Health Tab ----------
function HealthTab({ user }) {
  const [selectedCategory, setSelectedCategory] = useState('records');

  const categories = [
    { id: 'records', label: 'Medical Records' },
    { id: 'vaccines', label: 'Vaccinations' },
    { id: 'tests', label: 'Lab Tests' },
    { id: 'timeline', label: 'Health Timeline' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 border-b border-[#E5E7EB]">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
              selectedCategory === category.id
                ? 'text-[#2596be] border-b-2 border-[#2596be] bg-[#2596be]/5'
                : 'text-[#677E8A] hover:text-[#2596be] hover:bg-gray-50'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {selectedCategory === 'records' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HealthRecord label="Blood Pressure" value="120/80" status="Normal" icon={Activity} />
          <HealthRecord label="Cholesterol" value="180 mg/dL" status="Borderline" icon={Droplets} />
          <HealthRecord label="Blood Sugar" value="95 mg/dL" status="Normal" icon={Thermometer} />
          <HealthRecord label="BMI" value="24.2" status="Healthy" icon={Weight} />
        </div>
      )}

      {selectedCategory === 'vaccines' && (
        <div className="space-y-4">
          <VaccineRecord name="COVID-19 Booster" date="Jan 15, 2024" status="Completed" />
          <VaccineRecord name="Flu Shot" date="Oct 20, 2023" status="Completed" />
          <VaccineRecord name="Tetanus" date="May 10, 2022" status="Due 2027" />
        </div>
      )}

      {selectedCategory === 'tests' && (
        <div className="space-y-4">
          <TestRecord name="Annual Blood Work" date="Apr 15, 2024" doctor="Dr. Chen" />
          <TestRecord name="Dental Checkup" date="May 20, 2024" doctor="Dr. Smith" />
          <TestRecord name="Eye Examination" date="Jun 10, 2024" doctor="Dr. Johnson" />
        </div>
      )}

      {selectedCategory === 'timeline' && (
        <div className="space-y-4">
          <TimelineEvent date="Mar 15, 2024" title="Annual Checkup" description="Routine examination completed" status="completed" />
          <TimelineEvent date="Feb 28, 2024" title="Prescription Renewal" description="Blood pressure medication refilled" status="completed" />
          <TimelineEvent date="Apr 15, 2024" title="Lab Tests Scheduled" description="Annual blood work scheduled" status="upcoming" />
        </div>
      )}

      <div className="flex gap-3 pt-6 border-t border-[#E5E7EB]">
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:bg-[#122E34] transition-colors">
          <Plus className="h-4 w-4" />
          Add Health Record
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be] hover:text-[#2596be] transition-colors">
          <Download className="h-4 w-4" />
          Export Records
        </button>
      </div>
    </div>
  );
}

function HealthRecord({ label, value, status, icon: Icon }) {
  const statusColor = {
    Normal: 'bg-green-100 text-green-800',
    Healthy: 'bg-green-100 text-green-800',
    Borderline: 'bg-amber-100 text-amber-800',
    High: 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#2596be]" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-[#677E8A]">{label}</p>
          <p className="text-lg font-semibold text-[#0E1D21]">{value}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}>
          {status}
        </span>
      </div>
      <div className="text-xs text-[#677E8A]">Last updated: 2 weeks ago</div>
    </div>
  );
}

function VaccineRecord({ name, date, status }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="font-medium text-[#0E1D21]">{name}</p>
          <p className="text-sm text-[#677E8A]">Administered: {date}</p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
        status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
      }`}>
        {status}
      </span>
    </div>
  );
}

function TestRecord({ name, date, doctor }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <p className="font-medium text-[#0E1D21]">{name}</p>
          <p className="text-sm text-[#677E8A]">Scheduled: {date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-[#677E8A]">Doctor</p>
        <p className="font-medium text-[#0E1D21]">{doctor}</p>
      </div>
    </div>
  );
}

function TimelineEvent({ date, title, description, status }) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${
          status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
        }`}></div>
        <div className="w-px h-full bg-gray-300 mt-2"></div>
      </div>
      <div className="flex-1 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-[#0E1D21]">{title}</p>
          <span className="text-sm text-[#677E8A]">{date}</span>
        </div>
        <p className="text-sm text-[#677E8A]">{description}</p>
      </div>
    </div>
  );
}

// ---------- ORDERS TAB (Full Implementation with Status Dropdown) ----------
function OrdersTab({ user }) {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest',
    search: ''
  });

  // Load orders from localStorage on mount
  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user]);

  // Apply filters & sorting whenever orders or filters change
  useEffect(() => {
    filterAndSortOrders();
  }, [orders, filters]);

  const loadOrders = () => {
    setLoading(true);
    try {
      const allOrders = JSON.parse(localStorage.getItem('edpharma_orders') || '[]');
      const userOrders = allOrders.filter(order => order.userId === user.id);
      userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(userOrders);
      setFilteredOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
      setOrders([]);
      setFilteredOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let result = [...orders];

    if (filters.status !== 'all') {
      result = result.filter(order => order.status === filters.status);
    }

    if (filters.search.trim()) {
      const query = filters.search.toLowerCase();
      result = result.filter(order =>
        order.id.toLowerCase().includes(query) ||
        order.items.some(item => item.name.toLowerCase().includes(query))
      );
    }

    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'highest':
        result.sort((a, b) => b.total - a.total);
        break;
      case 'lowest':
        result.sort((a, b) => a.total - b.total);
        break;
    }

    setFilteredOrders(result);
  };

  // Universal status change handler
  const handleStatusChange = (orderId, newStatus) => {
    try {
      const allOrders = JSON.parse(localStorage.getItem('edpharma_orders') || '[]');
      const index = allOrders.findIndex(o => o.id === orderId);
      if (index !== -1) {
        allOrders[index].status = newStatus;
        localStorage.setItem('edpharma_orders', JSON.stringify(allOrders));

        // Update local state
        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // Also update selected order if modal is open
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status. Please try again.');
    }
  };

  const handleCancelOrder = (orderId) => {
    handleStatusChange(orderId, 'cancelled');
  };

  const stats = {
    total: orders.length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  // Status configuration – using account page color palette
  const statusConfig = {
    processing: {
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      icon: Clock,
      label: 'Processing'
    },
    shipped: {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: Truck,
      label: 'Shipped'
    },
    delivered: {
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: CheckCircle,
      label: 'Delivered'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: XCircle,
      label: 'Cancelled'
    },
    pending: {
      color: 'bg-orange-100 text-orange-800 border-orange-200',
      icon: AlertTriangle,
      label: 'Pending Review'
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-12 h-12 border-4 border-[#2596be]/20 border-t-[#2596be] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#677E8A]">Total Orders</p>
              <p className="text-2xl font-bold text-[#0E1D21] mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#677E8A]">Processing</p>
              <p className="text-2xl font-bold text-[#0E1D21] mt-1">{stats.processing}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
              <Clock className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#677E8A]">Delivered</p>
              <p className="text-2xl font-bold text-[#0E1D21] mt-1">{stats.delivered}</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-5 border border-[#E5E7EB]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#677E8A]">Total Spent</p>
              <p className="text-2xl font-bold text-[#0E1D21] mt-1">
                ${stats.totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0E1D21] mb-2">
              <Filter className="h-4 w-4 text-[#677E8A]" />
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#0E1D21] focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be]"
            >
              <option value="all">All Statuses</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="pending">Pending Review</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#0E1D21] mb-2">
              <ArrowUpDown className="h-4 w-4 text-[#677E8A]" />
              Sort By
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#0E1D21] focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be]"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-[#0E1D21] mb-2">
              <Search className="h-4 w-4 text-[#677E8A]" />
              Search Orders
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#677E8A]" />
              <input
                type="text"
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                placeholder="Order ID or product name..."
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E5E7EB] bg-white text-[#0E1D21] placeholder:text-[#677E8A] focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be]"
              />
              {filters.search && (
                <button
                  onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#677E8A] hover:text-[#2596be]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#E5E7EB] p-12 text-center">
            <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Package className="h-10 w-10 text-[#677E8A]" />
            </div>
            <h3 className="text-lg font-semibold text-[#0E1D21] mb-2">No orders found</h3>
            <p className="text-[#677E8A] mb-6">
              {filters.status !== 'all' || filters.search
                ? 'Try adjusting your filters'
                : "You haven't placed any orders yet"}
            </p>
            <button
              onClick={() => router.push('/shop')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow"
            >
              <ShoppingCart className="h-5 w-5" />
              Start Shopping
            </button>
          </div>
        ) : (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              statusConfig={statusConfig}
              onViewDetails={() => {
                setSelectedOrder(order);
                setShowDetails(true);
              }}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showDetails}
        onClose={() => {
          setShowDetails(false);
          setSelectedOrder(null);
        }}
        onCancelOrder={handleCancelOrder}
        statusConfig={statusConfig}
      />
    </div>
  );
}

// ---------- Order Card Component (with Status Dropdown) ----------
function OrderCard({ order, statusConfig, onViewDetails, onStatusChange }) {
  const StatusIcon = statusConfig[order.status]?.icon || Clock;
  const firstItem = order.items?.[0] || {};

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-shadow duration-200">
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
          {/* Product Image */}
          <div className="w-20 h-20 bg-white rounded-lg border border-[#E5E7EB] p-2 flex-shrink-0">
            <img
              src={firstItem.image || '/products/default.png'}
              alt={firstItem.name || 'Product'}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/products/default.png';
              }}
            />
          </div>

          {/* Order Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-bold text-lg text-[#0E1D21]">{order.id}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1.5 ${statusConfig[order.status]?.color}`}>
                <StatusIcon className="h-3.5 w-3.5" />
                {statusConfig[order.status]?.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-[#677E8A]">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(order.date).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                ${order.total.toFixed(2)}
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                {order.items?.length || 0} item(s)
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 md:self-center">
          <button
            onClick={onViewDetails}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-sm font-medium hover:shadow-md transition-shadow"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>

          {/* Status Dropdown */}
          <select
            value={order.status}
            onChange={(e) => onStatusChange(order.id, e.target.value)}
            className="px-3 py-2 rounded-lg border border-[#E5E7EB] bg-white text-[#0E1D21] text-sm focus:outline-none focus:ring-2 focus:ring-[#2596be]/20 focus:border-[#2596be]"
          >
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
            <option value="pending">Pending Review</option>
          </select>

          <button className="p-2 rounded-lg border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be] hover:text-[#2596be] transition-colors">
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Footer Row – Shipping, Payment, Delivery */}
      <div className="border-t border-[#E5E7EB] pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-[#677E8A] mt-0.5" />
            <div>
              <p className="text-xs font-medium text-[#677E8A] uppercase tracking-wider">Shipping</p>
              <p className="text-sm text-[#0E1D21]">
                {order.shipping?.city}, {order.shipping?.state}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <CreditCard className="h-4 w-4 text-[#677E8A] mt-0.5" />
            <div>
              <p className="text-xs font-medium text-[#677E8A] uppercase tracking-wider">Payment</p>
              <p className="text-sm text-[#0E1D21]">•••• {order.payment?.last4}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Truck className="h-4 w-4 text-[#677E8A] mt-0.5" />
            <div>
              <p className="text-xs font-medium text-[#677E8A] uppercase tracking-wider">Delivery</p>
              <p className="text-sm text-[#0E1D21] capitalize">{order.delivery || 'Standard'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Warning */}
      {order.items?.some(item => item.isPrescription) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Prescription order</span>
        </div>
      )}
    </div>
  );
}

// ---------- Order Details Modal ----------
function OrderDetailsModal({ order, isOpen, onClose, onCancelOrder, statusConfig }) {
  if (!isOpen || !order) return null;

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#0E1D21]">Order Details</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-[#677E8A] hover:text-[#0E1D21] transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Order Summary Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-[#677E8A] uppercase tracking-wider mb-1">Order Number</p>
                <p className="text-lg font-bold text-[#0E1D21]">{order.id}</p>
              </div>
              <div>
                <p className="text-xs text-[#677E8A] uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-lg font-bold text-[#0E1D21]">
                  {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-[#677E8A] uppercase tracking-wider mb-1">Status</p>
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium border inline-flex items-center gap-1.5 ${statusConfig[order.status]?.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  {statusConfig[order.status]?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-[#0E1D21] mb-4">Items Ordered</h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 border border-[#E5E7EB] rounded-xl">
                  <div className="w-20 h-20 bg-white border border-[#E5E7EB] rounded-lg p-2 flex-shrink-0">
                    <img
                      src={item.image || '/products/default.png'}
                      alt={item.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/products/default.png';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between">
                      <div>
                        <p className="font-medium text-[#0E1D21]">{item.name}</p>
                        <p className="text-sm text-[#677E8A] mt-1">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-[#0E1D21] mt-2 sm:mt-0">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                    {item.isPrescription && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 mt-2 bg-blue-100 text-blue-800 text-xs rounded-full">
                        <FileText className="h-3 w-3" />
                        Prescription Required
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping & Payment */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-[#0E1D21] mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-[#2596be]" />
                Shipping Address
              </h4>
              <div className="space-y-1 text-sm">
                <p className="font-medium">{order.shipping?.fullName}</p>
                <p>{order.shipping?.address}</p>
                <p>{order.shipping?.city}, {order.shipping?.state} {order.shipping?.zipCode}</p>
                <p className="mt-2">{order.shipping?.phone}</p>
                <p>{order.shipping?.email}</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="font-semibold text-[#0E1D21] mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#2596be]" />
                Payment Information
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Subtotal</span>
                  <span className="font-medium">${order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Shipping</span>
                  <span className="font-medium">${order.shippingCost?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#677E8A]">Tax</span>
                  <span className="font-medium">${order.tax?.toFixed(2)}</span>
                </div>
                <div className="border-t border-[#E5E7EB] pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#0E1D21]">Total</span>
                    <span className="font-bold text-[#0E1D21]">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-[#677E8A]">Payment Method</p>
                  <p className="font-medium">{order.payment?.type} •••• {order.payment?.last4}</p>
                  <p className="text-sm text-[#677E8A] mt-1">{order.payment?.cardName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-end border-t border-[#E5E7EB] pt-6">
            {order.status === 'processing' && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to cancel this order?')) {
                    onCancelOrder(order.id);
                  }
                }}
                className="px-6 py-2.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 font-medium transition-colors flex items-center justify-center gap-2"
              >
                <XCircle className="h-4 w-4" />
                Cancel Order
              </button>
            )}
            <button className="px-6 py-2.5 rounded-lg border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be] hover:text-[#2596be] font-medium transition-colors flex items-center justify-center gap-2">
              <Printer className="h-4 w-4" />
              Print Invoice
            </button>
            <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2">
              <Truck className="h-4 w-4" />
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- Prescriptions Tab ----------
function PrescriptionsTab({ user }) {
  const prescriptions = [
    { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', refills: 3, expires: 'Jun 15, 2024' },
    { name: 'Atorvastatin', dosage: '20mg', frequency: 'Once daily', refills: 2, expires: 'May 20, 2024' },
    { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', refills: 1, expires: 'Apr 30, 2024' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-xl p-4">
          <p className="text-sm text-[#677E8A]">Active Prescriptions</p>
          <p className="text-2xl font-bold text-[#0E1D21]">{user.stats?.activePrescriptions || 0}</p>
        </div>
        <div className="bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-xl p-4">
          <p className="text-sm text-[#677E8A]">Refills Pending</p>
          <p className="text-2xl font-bold text-[#0E1D21]">2</p>
        </div>
        <div className="bg-gradient-to-r from-violet-500/5 to-purple-500/5 rounded-xl p-4">
          <p className="text-sm text-[#677E8A]">Expiring Soon</p>
          <p className="text-2xl font-bold text-[#0E1D21]">1</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {prescriptions.map((med, index) => (
          <div key={index} className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#0E1D21]">{med.name}</h3>
                <p className="text-sm text-[#677E8A]">{med.dosage}</p>
              </div>
              <Pill className="h-8 w-8 text-violet-600" />
            </div>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#677E8A]">Frequency</span>
                <span className="font-medium text-[#0E1D21]">{med.frequency}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#677E8A]">Refills Left</span>
                <span className="font-medium text-[#0E1D21]">{med.refills}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#677E8A]">Expires</span>
                <span className="font-medium text-[#0E1D21]">{med.expires}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 rounded-lg border border-[#E5E7EB] text-sm font-medium hover:border-[#2596be] hover:text-[#2596be] transition-colors">
                View Details
              </button>
              <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-sm font-medium hover:shadow-md transition-shadow">
                Request Refill
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-[#E5E7EB]">
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow">
          <Plus className="h-5 w-5" />
          Upload Prescription
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be] hover:text-[#2596be] transition-colors">
          <FileText className="h-5 w-5" />
          View History
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#E5E7EB] text-[#677E8A] hover:border-[#2596be] hover:text-[#2596be] transition-colors">
          <Printer className="h-5 w-5" />
          Print All
        </button>
      </div>
    </div>
  );
}

// ---------- Security Tab ----------
function SecurityTab({ user }) {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg text-[#0E1D21]">Security Status</h3>
            <p className="text-sm text-[#677E8A]">Your account security is strong</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-green-600">Protected</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <SecuritySetting
          icon={Lock}
          title="Password"
          description="Last changed 2 months ago"
          action="Change Password"
          status="active"
        />
        <SecuritySetting
          icon={Shield}
          title="Two-Factor Authentication"
          description="Add an extra layer of security"
          action={twoFactor ? "Disable 2FA" : "Enable 2FA"}
          status={twoFactor ? "active" : "inactive"}
          toggle={setTwoFactor}
          toggled={twoFactor}
        />
        <SecuritySetting
          icon={Smartphone}
          title="Trusted Devices"
          description="2 devices connected"
          action="Manage Devices"
          status="active"
        />
        <SecuritySetting
          icon={Bell}
          title="Login Notifications"
          description="Get alerts for new logins"
          action="Configure"
          status="active"
        />
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <h3 className="font-semibold text-lg text-[#0E1D21] mb-4">Recent Login Activity</h3>
        <div className="space-y-3">
          <LoginActivity device="iPhone 14" location="New York, NY" time="2 hours ago" trusted={true} />
          <LoginActivity device="MacBook Pro" location="San Francisco, CA" time="1 day ago" trusted={true} />
          <LoginActivity device="Windows Desktop" location="Chicago, IL" time="3 days ago" trusted={false} />
        </div>
      </div>
    </div>
  );
}

function SecuritySetting({ icon: Icon, title, description, action, status, toggle, toggled }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[#E5E7EB] hover:border-[#2596be]/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center">
          <Icon className="h-6 w-6 text-[#2596be]" />
        </div>
        <div>
          <h4 className="font-medium text-[#0E1D21]">{title}</h4>
          <p className="text-sm text-[#677E8A]">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {status === 'active' ? (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Inactive
          </span>
        )}
        {toggle ? (
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={toggled}
              onChange={() => toggle(!toggled)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2596be]"></div>
          </label>
        ) : (
          <button className="text-[#2596be] font-medium hover:text-[#122E34]">
            {action}
          </button>
        )}
      </div>
    </div>
  );
}

function LoginActivity({ device, location, time, trusted }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0">
      <div className="flex items-center gap-3">
        <Smartphone className="h-5 w-5 text-[#677E8A]" />
        <div>
          <p className="font-medium text-[#0E1D21]">{device}</p>
          <p className="text-sm text-[#677E8A]">{location} • {time}</p>
        </div>
      </div>
      {trusted ? (
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Trusted
        </span>
      ) : (
        <button className="text-red-600 font-medium hover:text-red-800 text-sm">
          Revoke
        </button>
      )}
    </div>
  );
}

// ---------- Subscription Tab ----------
function SubscriptionTab({ user }) {
  const plans = [
    { name: 'Basic', price: 0, features: ['Basic Access', 'Standard Support', 'Limited Storage'], active: false },
    { name: 'Premium', price: 29.99, features: ['Priority Access', '24/7 Support', 'Extended Storage', 'Advanced Analytics'], active: true },
    { name: 'Enterprise', price: 99.99, features: ['Unlimited Access', 'Dedicated Support', 'Unlimited Storage', 'Custom Solutions'], active: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-lg text-[#0E1D21]">Current Plan</h3>
            <p className="text-sm text-[#677E8A]">
              {user.subscription?.plan} • ${user.subscription?.price}/month
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium">
              Active
            </div>
            <div className="text-right">
              <p className="text-sm text-[#677E8A]">Renews on</p>
              <p className="font-medium text-[#0E1D21]">{user.subscription?.renewalDate || 'N/A'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.name} 
            className={`border rounded-xl p-5 ${
              plan.active 
                ? 'border-[#2596be] bg-gradient-to-b from-[#2596be]/5 to-transparent' 
                : 'border-[#E5E7EB]'
            }`}
          >
            {plan.active && (
              <div className="px-3 py-1 rounded-full bg-[#2596be] text-white text-xs font-medium inline-block mb-4">
                Current Plan
              </div>
            )}
            <h3 className="text-xl font-bold text-[#0E1D21] mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold text-[#0E1D21]">${plan.price}</span>
              <span className="text-[#677E8A]">/month</span>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-[#677E8A]">{feature}</span>
                </li>
              ))}
            </ul>
            {plan.active ? (
              <button className="w-full py-2.5 rounded-lg bg-gray-100 text-[#0E1D21] font-medium">
                Current Plan
              </button>
            ) : (
              <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow">
                Upgrade Plan
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <h3 className="font-semibold text-lg text-[#0E1D21] mb-4">Billing History</h3>
        <div className="space-y-3">
          <BillingItem date="Mar 1, 2024" amount={29.99} status="Paid" />
          <BillingItem date="Feb 1, 2024" amount={29.99} status="Paid" />
          <BillingItem date="Jan 1, 2024" amount={29.99} status="Paid" />
        </div>
      </div>
    </div>
  );
}

function BillingItem({ date, amount, status }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB] last:border-0">
      <div>
        <p className="font-medium text-[#0E1D21]">Monthly Subscription</p>
        <p className="text-sm text-[#677E8A]">{date}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-[#0E1D21]">${amount.toFixed(2)}</span>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {status}
        </span>
        <button className="text-[#2596be] font-medium hover:text-[#122E34]">
          Invoice
        </button>
      </div>
    </div>
  );
}

// ---------- Settings Tab ----------
function SettingsTab({ user }) {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    promotional: false
  });

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <h3 className="font-semibold text-lg text-[#0E1D21] mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <ToggleSetting
            label="Email Notifications"
            description="Receive updates via email"
            checked={notifications.email}
            onChange={() => toggleNotification('email')}
          />
          <ToggleSetting
            label="SMS Alerts"
            description="Get important alerts via SMS"
            checked={notifications.sms}
            onChange={() => toggleNotification('sms')}
          />
          <ToggleSetting
            label="Push Notifications"
            description="App push notifications"
            checked={notifications.push}
            onChange={() => toggleNotification('push')}
          />
          <ToggleSetting
            label="Promotional Emails"
            description="Special offers and updates"
            checked={notifications.promotional}
            onChange={() => toggleNotification('promotional')}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <h3 className="font-semibold text-lg text-[#0E1D21] mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <ToggleSetting
            label="Share Health Data"
            description="Anonymous data for research"
            checked={true}
            onChange={() => {}}
          />
          <ToggleSetting
            label="Public Profile"
            description="Visible to other patients"
            checked={false}
            onChange={() => {}}
          />
          <ToggleSetting
            label="Data Export"
            description="Allow data download"
            checked={true}
            onChange={() => {}}
          />
          <ToggleSetting
            label="Auto-sync"
            description="Sync data across devices"
            checked={true}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E5E7EB] p-5">
        <h3 className="font-semibold text-lg text-[#0E1D21] mb-4">Account Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-red-300 hover:bg-red-50 transition-all group">
            <Trash2 className="h-5 w-5 text-red-500" />
            <div className="text-left">
              <p className="font-medium text-[#0E1D21]">Delete Account</p>
              <p className="text-sm text-[#677E8A]">Permanently remove your account</p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 rounded-xl border border-[#E5E7EB] hover:border-amber-300 hover:bg-amber-50 transition-all group">
            <Download className="h-5 w-5 text-amber-500" />
            <div className="text-left">
              <p className="font-medium text-[#0E1D21]">Export Data</p>
              <p className="text-sm text-[#677E8A]">Download all your data</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleSetting({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-[#0E1D21]">{label}</p>
        <p className="text-sm text-[#677E8A]">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          className="sr-only peer" 
          checked={checked}
          onChange={onChange}
        />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#2596be]"></div>
      </label>
    </div>
  );
}