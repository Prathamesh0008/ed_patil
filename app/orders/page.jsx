'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';
import {
  ArrowLeft, Package, Search, Filter, ArrowUpDown,
  ShoppingCart, DollarSign, Clock, Truck, CheckCircle,
  XCircle, AlertTriangle, Eye, Printer, MapPin,
  CreditCard, FileText, Calendar, X, ShoppingBag,
  LogOut, User, Settings, MessageSquare
} from 'lucide-react';

export default function OrdersManagementPage() {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: 'all',
    sortBy: 'newest',
    search: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/orders');
    }
  }, [authLoading, user, router]);

  // Load orders from localStorage
  useEffect(() => {
    if (user?.id) {
      loadOrders();
    }
  }, [user]);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, filters]);

  const loadOrders = () => {
    setLoading(true);
    try {
      const allOrders = JSON.parse(localStorage.getItem('edpharma_orders') || '[]');
      // Show only current user's orders
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

        setOrders(prev =>
          prev.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
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

  // Status configuration
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

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e6f7ff]">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-[#2596be]/20 border-t-[#2596be] rounded-full animate-spin mx-auto mb-6"></div>
          <p className="text-[#677E8A] font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f7ff]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/account"
                className="flex items-center gap-2 text-[#677E8A] hover:text-[#2596be] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span className="text-sm font-medium">Back to Account</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-[#677E8A] hidden sm:inline">
                {user.firstName} {user.lastName}
              </span>
              <div className="relative group">
                <button className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] flex items-center justify-center text-white font-bold">
                  {user.firstName?.[0]}{user.lastName?.[0]}
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#E5E7EB] py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="px-4 py-3 border-b border-[#E5E7EB]">
                    <p className="text-sm font-medium text-[#0E1D21]">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-[#677E8A] truncate">{user.email}</p>
                  </div>
                  <div className="py-2">
                    <Link href="/account" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <User className="h-4 w-4" />
                      My Account
                    </Link>
                    <Link href="/account?tab=settings" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                    <Link href="/help" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#677E8A] hover:bg-gray-50 hover:text-[#2596be] transition-colors">
                      <MessageSquare className="h-4 w-4" />
                      Help & Support
                    </Link>
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0E1D21]">Order Management</h1>
          <p className="text-[#677E8A] mt-1">View, track, and update your orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                <p className="text-sm text-[#677E8A]">Shipped</p>
                <p className="text-2xl font-bold text-[#0E1D21] mt-1">{stats.shipped}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                <Truck className="h-6 w-6 text-white" />
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
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 mb-6">
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
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#2596be] to-[#122E34] text-white font-medium hover:shadow-lg transition-shadow"
              >
                <ShoppingCart className="h-5 w-5" />
                Start Shopping
              </Link>
            </div>
          ) : (
            filteredOrders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
                statusConfig={statusConfig}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

// ---------- Order Card Component ----------
function OrderCard({ order, statusConfig, onStatusChange }) {
  const router = useRouter();
  const StatusIcon = statusConfig[order.status]?.icon || Clock;
  const firstItem = order.items?.[0] || {};

  return (
    <div className="bg-white rounded-xl border border-[#E5E7EB] p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div className="flex items-start gap-4">
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
                ${order.total?.toFixed(2) ?? '0.00'}
              </span>
              <span className="flex items-center gap-1.5">
                <Package className="h-4 w-4" />
                {order.items?.length || 0} item(s)
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 md:self-center">
          <button
            onClick={() => router.push(`/orders/${order.id}`)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#2596be] to-[#122E34] text-white text-sm font-medium hover:shadow-md transition-shadow"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>
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
      {order.items?.some(item => item.isPrescription) && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200 flex items-center gap-2">
          <FileText className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">Prescription order</span>
        </div>
      )}
    </div>
  );
}