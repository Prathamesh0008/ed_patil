'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
  User, Phone, MapPin, Calendar, Shield, Bell,
  Heart, Pill, Clock, Package, Settings, LogOut, Edit,
  CheckCircle, AlertCircle, ChevronRight, CreditCard,
  FileText, Star, Lock, Globe, Users, Activity, Eye,
  Download, Share2, MessageSquare, HelpCircle, Home,
  ShoppingCart, FileSearch, HeartPulse, CreditCardIcon
} from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [authLoading, user, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[#677E8A]">Loading account…</p>
      </div>
    );
  }

  if (!user) return null;

  /* ---------------- SAFE USER DATA ---------------- */

  const userData = {
    firstName: user.firstName || 'User',
    lastName: user.lastName || '',
    phone: user.phone || '—',
    address: user.address || 'Not provided',
    dateOfBirth: user.dateOfBirth || '—',
    membershipLevel: user.membershipLevel || 'Standard',
    stats: {
      totalOrders: user.stats?.totalOrders || 0,
      activePrescriptions: user.stats?.activePrescriptions || 0,
      loyaltyPoints: user.stats?.loyaltyPoints || 0,
    },
  };

  const fullName = `${userData.firstName} ${userData.lastName}`;
  const initials = `${userData.firstName?.[0] || ''}${userData.lastName?.[0] || ''}`;

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-[#122E34] to-[#2596be] text-white">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              {initials}
            </div>
            <div>
              <h1 className="text-xl font-bold">My Account</h1>
              <p className="text-sm opacity-80">Welcome, {fullName}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg hover:bg-white/30"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <aside className="bg-white rounded-xl shadow p-6">
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>
            <h2 className="mt-3 font-bold text-lg text-[#0E1D21]">
              {fullName}
            </h2>
            <span className="inline-block mt-2 text-sm px-3 py-1 rounded-full bg-[#2596be]/10 text-[#2596be]">
              {userData.membershipLevel}
            </span>
          </div>

          <nav className="space-y-2">
            {[
              { id: 'profile', label: 'Profile', icon: User },
              { id: 'orders', label: 'Orders', icon: Package },
              { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
              { id: 'health', label: 'Health', icon: Heart },
              { id: 'security', label: 'Security', icon: Shield },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-[#2596be]/10 text-[#2596be]'
                      : 'text-[#677E8A] hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* MAIN PANEL */}
        <main className="lg:col-span-3 space-y-6">

          {/* PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoItem icon={User} label="Full Name" value={fullName} />
                <InfoItem icon={Phone} label="Phone Number" value={userData.phone} />
                <InfoItem icon={Calendar} label="Date of Birth" value={userData.dateOfBirth} />
                <InfoItem icon={MapPin} label="Address" value={userData.address} />
              </div>

              <button
                onClick={() => router.push('/account/edit')}
                className="mt-6 inline-flex items-center gap-2 text-[#2596be] font-medium"
              >
                <Edit size={16} />
                Edit Profile
              </button>
            </div>
          )}

          {/* ORDERS */}
          {activeTab === 'orders' && (
            <StatCard
              title="Orders"
              value={userData.stats.totalOrders}
              icon={Package}
            />
          )}

          {/* PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <StatCard
              title="Active Prescriptions"
              value={userData.stats.activePrescriptions}
              icon={Pill}
            />
          )}

          {/* HEALTH */}
          {activeTab === 'health' && (
            <StatCard
              title="Loyalty Points"
              value={userData.stats.loyaltyPoints}
              icon={HeartPulse}
            />
          )}

          {/* SECURITY */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-4">Security</h2>
              <p className="text-[#677E8A] text-sm">
                Manage your password and account security settings.
              </p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function InfoItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 p-4 border rounded-lg">
      <Icon size={18} className="text-[#2596be]" />
      <div>
        <p className="text-xs text-[#677E8A]">{label}</p>
        <p className="font-semibold text-[#0E1D21]">{value}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-[#2596be]/10 flex items-center justify-center">
        <Icon size={22} className="text-[#2596be]" />
      </div>
      <div>
        <p className="text-sm text-[#677E8A]">{title}</p>
        <p className="text-2xl font-bold text-[#0E1D21]">{value}</p>
      </div>
    </div>
  );
}
