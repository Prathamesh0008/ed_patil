'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import {
  ArrowLeft, Package, Clock, Truck, CheckCircle,
  XCircle, AlertTriangle, MapPin, CreditCard,
  FileText, Calendar, ShoppingBag, Printer,
  User, Settings, MessageSquare, LogOut, Info
} from 'lucide-react';

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;
  const { user, isLoading: authLoading, logout } = useAuth();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/orders');
    }
  }, [authLoading, user, router]);

  // Load order from localStorage
  useEffect(() => {
    if (!user?.id || !orderId) return;

    setLoading(true);
    try {
      const allOrders = JSON.parse(localStorage.getItem('edpharma_orders') || '[]');
      const foundOrder = allOrders.find(o => o.id === orderId && o.userId === user.id);
      
      if (!foundOrder) {
        router.push('/orders');
        return;
      }
      
      setOrder(foundOrder);
    } catch (error) {
      console.error('Error loading order:', error);
      router.push('/orders');
    } finally {
      setLoading(false);
    }
  }, [user, orderId, router]);

  // Handle order cancellation
  const handleCancelOrder = () => {
    if (!order) return;
    
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        const allOrders = JSON.parse(localStorage.getItem('edpharma_orders') || '[]');
        const index = allOrders.findIndex(o => o.id === order.id);
        if (index !== -1) {
          allOrders[index].status = 'cancelled';
          localStorage.setItem('edpharma_orders', JSON.stringify(allOrders));
          setOrder({ ...order, status: 'cancelled' });
        }
      } catch (error) {
        console.error('Error cancelling order:', error);
        alert('Failed to cancel order. Please try again.');
      }
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Status configuration with refined badge styling
  const statusConfig = {
    processing: {
      color: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-100',
      icon: Clock,
      label: 'Processing'
    },
    shipped: {
      color: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-100',
      icon: Truck,
      label: 'Shipped'
    },
    delivered: {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-100',
      icon: CheckCircle,
      label: 'Delivered'
    },
    cancelled: {
      color: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-100',
      icon: XCircle,
      label: 'Cancelled'
    },
    pending: {
      color: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-100',
      icon: AlertTriangle,
      label: 'Pending Review'
    }
  };

  // Helper to safely format currency
  const formatCurrency = (value) => {
    if (value == null) return '0.00';
    if (typeof value === 'number') return value.toFixed(2);
    if (typeof value === 'object') {
      console.warn('Expected number, got object', value);
      return '0.00';
    }
    return String(value);
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-cyan-50">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#2596be]/20 border-t-[#2596be] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#122E34] font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!order || !user) return null;

  const StatusIcon = statusConfig[order.status]?.icon || Clock;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      {/* Premium Gradient Header */}
      <div className="bg-gradient-to-r from-[#0B2A31] via-[#1A4A54] to-[#2596be] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group w-fit"
            >
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </div>
              <span className="text-sm font-medium">Back to Orders</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-white/90 hidden sm:block">
                {user.firstName} {user.lastName}
              </span>
              <div className="relative group">
                <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold border border-white/30 hover:bg-white/30 transition-colors">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-[#0E1D21]">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-[#677E8A] truncate mt-0.5">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/account" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#677E8A] hover:bg-slate-50 hover:text-[#2596be] transition-colors">
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                    <Link href="/account?tab=settings" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#677E8A] hover:bg-slate-50 hover:text-[#2596be] transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Link href="/help" className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#677E8A] hover:bg-slate-50 hover:text-[#2596be] transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Help & Support
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
              <ShoppingBag className="h-4 w-4" />
              <span className="text-sm font-medium">Order Details</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Order #{order.id}</h1>
            <p className="mt-3 text-base text-white/90 max-w-2xl mx-auto">
              Placed on {new Date(order.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Order Status Card - Premium */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 lg:p-8 mb-8 hover:shadow-2xl transition-shadow duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center flex-shrink-0">
                <Package className="h-6 w-6 text-[#2596be]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#677E8A] uppercase tracking-wider mb-1">Order Number</p>
                <p className="text-xl font-bold text-[#0E1D21] break-all">{order.id}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-6 w-6 text-[#2596be]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#677E8A] uppercase tracking-wider mb-1">Order Date</p>
                <p className="text-xl font-bold text-[#0E1D21]">
                  {new Date(order.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-xs text-[#677E8A] mt-1">
                  {new Date(order.date).toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2596be]/10 to-[#122E34]/10 flex items-center justify-center flex-shrink-0">
                <Info className="h-6 w-6 text-[#2596be]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#677E8A] uppercase tracking-wider mb-1">Status</p>
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border shadow-sm ${statusConfig[order.status]?.color}`}>
                  <StatusIcon className="h-4 w-4" />
                  {statusConfig[order.status]?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Items Ordered */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 lg:p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center">
              <Package className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl lg:text-2xl font-bold text-[#0E1D21]">Items Ordered</h2>
            <span className="ml-auto bg-slate-100 px-3 py-1.5 rounded-full text-sm font-medium text-[#0E1D21]">
              {order.items?.length || 0} {order.items?.length === 1 ? 'item' : 'items'}
            </span>
          </div>
          
          <div className="space-y-5">
            {order.items.map((item, idx) => (
              <div 
                key={idx} 
                className="flex flex-col sm:flex-row gap-5 p-5 bg-white rounded-xl border border-slate-200 hover:border-[#2596be]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-24 h-24 bg-white rounded-lg border border-slate-200 p-2 flex-shrink-0 mx-auto sm:mx-0">
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
                
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg text-[#0E1D21]">{item.name}</h3>
                    <div className="flex flex-wrap gap-3 text-sm">
                      <span className="text-[#677E8A]">Quantity:</span>
                      <span className="font-semibold text-[#0E1D21]">{item.quantity}</span>
                      <span className="text-[#677E8A] mx-1">•</span>
                      <span className="text-[#677E8A]">Unit Price:</span>
                      <span className="font-semibold text-[#0E1D21]">${formatCurrency(item.price)}</span>
                    </div>
                    {item.isPrescription && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full border border-blue-200">
                        <FileText className="h-3.5 w-3.5" />
                        Prescription Required
                      </span>
                    )}
                  </div>
                  
                  <div className="flex flex-col items-end justify-center">
                    <p className="text-xs text-[#677E8A] uppercase tracking-wider mb-1">Total</p>
                    <p className="text-2xl font-bold text-[#2596be]">
                      ${(item.quantity * (item.price || 0)).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 lg:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#0E1D21]">Shipping Address</h3>
            </div>
            
            <div className="space-y-3 text-sm lg:text-base">
              <p className="font-bold text-[#0E1D21] text-base">{order.shipping?.fullName}</p>
              <p className="text-[#0E1D21] leading-relaxed">
                {order.shipping?.address}<br />
                {order.shipping?.city}, {order.shipping?.state} {order.shipping?.zipCode}
              </p>
              <div className="pt-3 mt-3 border-t border-slate-100 space-y-2">
                <p className="flex items-center gap-2 text-[#677E8A]">
                  <span className="font-medium">Phone:</span>
                  <span className="text-[#0E1D21]">{order.shipping?.phone || 'Not provided'}</span>
                </p>
                <p className="flex items-center gap-2 text-[#677E8A]">
                  <span className="font-medium">Email:</span>
                  <span className="text-[#0E1D21] break-all">{order.shipping?.email}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 p-6 lg:p-8 hover:shadow-2xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#0E1D21]">Payment Information</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-xl p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Subtotal</span>
                  <span className="font-semibold text-[#0E1D21]">${formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Shipping</span>
                  <span className="font-semibold text-[#0E1D21]">
                    {order.shippingCost === 0 ? 'FREE' : `$${formatCurrency(order.shippingCost)}`}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#677E8A]">Tax</span>
                  <span className="font-semibold text-[#0E1D21]">${formatCurrency(order.tax)}</span>
                </div>
                <div className="border-t border-slate-200 pt-3 mt-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#0E1D21]">Total</span>
                    <span className="text-2xl font-bold text-[#2596be]">${formatCurrency(order.total)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#2596be]/5 to-[#122E34]/5 rounded-xl border border-[#2596be]/20">
                  <div className="w-10 h-10 rounded-lg bg-white shadow-sm flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-[#2596be]" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#677E8A] uppercase tracking-wider">Payment Method</p>
                    <p className="font-bold text-[#0E1D21]">{order.payment?.type} •••• {order.payment?.last4}</p>
                    <p className="text-xs text-[#677E8A] mt-0.5">{order.payment?.cardName}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons - Professional Layout */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center pt-4 border-t border-slate-200">
          {order.status === 'processing' && (
            <button
              onClick={handleCancelOrder}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-50 to-red-50 text-red-700 font-semibold hover:from-red-50 hover:to-rose-100 border border-red-200 hover:border-red-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow"
            >
              <XCircle className="h-5 w-5" />
              Cancel Order
            </button>
          )}
          
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl border-2 border-slate-200 text-[#677E8A] font-semibold hover:border-[#2596be] hover:text-[#2596be] hover:bg-[#2596be]/5 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow">
            <Printer className="h-5 w-5" />
            Print Invoice
          </button>
          
          <button className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 shadow-md">
            <Truck className="h-5 w-5" />
            Track Order
          </button>
        </div>
      </main>
    </div>
  );
}