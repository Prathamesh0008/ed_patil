'use client';

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalOrders: 0, totalRevenue: 0 });
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("edpharma_token");

    const load = async () => {
      const s = await fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${token}` } });
      const su = await fetch("/api/admin/users", { headers: { Authorization: `Bearer ${token}` } });
      const so = await fetch("/api/admin/orders", { headers: { Authorization: `Bearer ${token}` } });

      const sData = await s.json();
      const uData = await su.json();
      const oData = await so.json();

      if (sData.success) setStats(sData);
      if (uData.success) setUsers(uData.users);
      if (oData.success) setOrders(oData.orders);
    };

    load();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <div className="p-5 rounded-2xl border">
          <div className="text-gray-500">Total Users</div>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
        </div>
        <div className="p-5 rounded-2xl border">
          <div className="text-gray-500">Total Orders</div>
          <div className="text-2xl font-bold">{stats.totalOrders}</div>
        </div>
        <div className="p-5 rounded-2xl border">
          <div className="text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold">₹{Number(stats.totalRevenue).toFixed(2)}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* USERS */}
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-bold mb-4">Users</h2>
          <div className="space-y-3 max-h-[520px] overflow-auto">
            {users.map((u) => (
              <div key={u._id} className="p-3 rounded-xl border">
                <div className="font-semibold">{u.firstName} {u.lastName} ({u.role})</div>
                <div className="text-sm text-gray-600">{u.email || "-"} | {u.phone || "-"}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ORDERS */}
        <div className="rounded-2xl border p-5">
          <h2 className="text-xl font-bold mb-4">Orders</h2>
          <div className="space-y-3 max-h-[520px] overflow-auto">
            {orders.map((o) => (
              <div key={o._id} className="p-3 rounded-xl border">
                <div className="font-semibold">
                  Order: {String(o._id).slice(-6)} • ₹{Number(o.total).toFixed(2)} • {o.status}
                </div>
                <div className="text-sm text-gray-600">
                  User: {o.userId?.firstName} {o.userId?.lastName} ({o.userId?.email || "-"})
                </div>
                <div className="text-sm text-gray-600">
                  Items: {o.items?.length || 0}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Link href="/" className="inline-block mt-8 text-blue-600 underline">Back to Home</Link>
    </div>
  );
}
