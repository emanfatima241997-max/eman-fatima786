import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus } from '../types';
import {
  User,
  Package,
  Heart,
  LogOut,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Eye,
  Trash2,
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    orders,
    wishlist,
    products,
    setSelectedProductId,
    setCurrentView,
    setSelectedOrderId,
    switchToAdmin,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'wishlist'>('orders');

  // Auth form states if logged out
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');

  // Profile edit states
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [editCity, setEditCity] = useState(currentUser?.city || '');
  const [editPostalCode, setEditPostalCode] = useState(currentUser?.postalCode || '');

  // Tracking modal state
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  // Filter orders for current user
  const userOrders = currentUser
    ? orders.filter(
        o => o.customerId === currentUser.id || o.customerEmail === currentUser.email
      )
    : [];

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      login(emailInput);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim() && emailInput.trim()) {
      register(nameInput.trim(), emailInput.trim(), phoneInput.trim());
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: editName,
      phone: editPhone,
      address: editAddress,
      city: editCity,
      postalCode: editPostalCode,
    });
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'Shipped':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Shipped
          </span>
        );
      case 'Processing':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Processing
          </span>
        );
      case 'Confirmed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#FFC0DE]/50 text-[#8E1EA2] flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Confirmed
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
    }
  };

  // If user is not logged in:
  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            Client Privilege
          </span>
          <h1 className="text-3xl font-serif font-bold text-slate-900">
            {authMode === 'login' ? 'Customer Sign In' : 'Create an Account'}
          </h1>
          <p className="text-xs text-slate-500">
            Access your couture purchase history, tracking milestones, and saved wishlist.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
          {/* Quick Demo Login Preset Buttons */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-semibold text-slate-700 block">
              Quick One-Click Sign In:
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => login('sophia.laurent@elegance.com')}
                className="flex-1 py-1.5 px-2 bg-white rounded border border-slate-200 hover:border-[#8E1EA2] text-[11px] font-medium text-slate-800 transition-colors"
              >
                Sophia Laurent (Customer)
              </button>
              <button
                type="button"
                onClick={() => switchToAdmin()}
                className="flex-1 py-1.5 px-2 bg-white rounded border border-slate-200 hover:border-[#8E1EA2] text-[11px] font-medium text-[#8E1EA2] transition-colors"
              >
                Atelier Director (Admin)
              </button>
            </div>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="sophia.laurent@elegance.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  defaultValue="••••••••"
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs text-white shadow-md hover:opacity-95 transition-all"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Sign In to Account
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-xs text-[#8E1EA2] hover:underline"
                >
                  Don't have an account? Create one now
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Eleanor Vance"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={emailInput}
                  onChange={e => setEmailInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-semibold text-xs text-white shadow-md hover:opacity-95 transition-all"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Register Account
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs text-[#8E1EA2] hover:underline"
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Account Overview Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            Customer Account
          </span>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
            Welcome, {currentUser.name}
          </h1>
          <p className="text-xs text-slate-500">
            {currentUser.email} · Member since{' '}
            {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {currentUser.role === 'admin' ? (
            <button
              onClick={() => setCurrentView('admin')}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm"
              style={{ backgroundColor: '#8E1EA2' }}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Go to Admin Dashboard</span>
            </button>
          ) : (
            <button
              onClick={() => switchToAdmin()}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-[#FFC0DE]/30 border border-slate-200 flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E1EA2]" />
              <span>Switch to Admin Mode</span>
            </button>
          )}

          <button
            onClick={logout}
            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex border-b border-slate-200 gap-8">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'orders'
              ? 'border-[#8E1EA2] text-[#8E1EA2]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>My Orders ({userOrders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('wishlist')}
          className={`pb-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'wishlist'
              ? 'border-[#8E1EA2] text-[#8E1EA2]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
            activeTab === 'profile'
              ? 'border-[#8E1EA2] text-[#8E1EA2]'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Address</span>
        </button>
      </div>

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {userOrders.length > 0 ? (
            <div className="space-y-4">
              {userOrders.map(order => (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          {order.orderNumber}
                        </span>
                        {getStatusBadge(order.orderStatus)}
                      </div>
                      <span className="text-xs text-slate-400">
                        Placed on{' '}
                        {new Date(order.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-base font-bold text-slate-900 tabular-nums">
                        ${order.total.toFixed(2)}
                      </span>
                      <button
                        onClick={() => setViewingOrder(order)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8E1EA2] bg-[#FFC0DE]/30 hover:bg-[#FFC0DE]/50 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Track Order</span>
                      </button>
                    </div>
                  </div>

                  {/* Items in order */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg bg-slate-50"
                      >
                        <div className="w-10 h-12 rounded bg-slate-200 overflow-hidden shrink-0">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-semibold text-slate-800 truncate">
                            {item.productName}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Size: {item.size} · Qty: {item.quantity} · ${item.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 space-y-4">
              <Package className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="font-serif text-xl font-bold text-slate-900">
                No orders placed yet
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our catalog to place your first couture dress order.
              </p>
              <button
                onClick={() => setCurrentView('shop')}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Start Shopping
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistProducts.map(product => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm flex flex-col justify-between space-y-3"
                >
                  <div className="aspect-[3/4] rounded-lg overflow-hidden bg-slate-100">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">
                      {product.sku}
                    </span>
                    <h4 className="font-serif font-bold text-slate-900 text-sm">
                      {product.name}
                    </h4>
                    <span className="text-sm font-bold text-[#8E1EA2] tabular-nums">
                      ${product.price}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProductId(product.id);
                      setCurrentView('product-detail');
                    }}
                    className="w-full py-2 rounded-lg text-xs font-semibold text-white"
                    style={{ backgroundColor: '#8E1EA2' }}
                  >
                    View & Purchase
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 space-y-4">
              <Heart className="w-12 h-12 mx-auto text-slate-300" />
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-slate-500">
                Save your favorite runway gowns while browsing.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab: Profile & Address */}
      {activeTab === 'profile' && (
        <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            Edit Profile Details
          </h2>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Default Street Address
              </label>
              <input
                type="text"
                value={editAddress}
                onChange={e => setEditAddress(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={editCity}
                  onChange={e => setEditCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  value={editPostalCode}
                  onChange={e => setEditPostalCode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white"
              style={{ backgroundColor: '#8E1EA2' }}
            >
              Save Profile Updates
            </button>
          </form>
        </div>
      )}

      {/* Order Tracking Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-semibold text-[#8E1EA2]">
                  Order Tracking
                </span>
                <h3 className="font-mono text-base font-bold text-slate-900">
                  {viewingOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setViewingOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-4 py-2">
              {[
                { stage: 'Confirmed', label: 'Order Received & Atelier Checked' },
                { stage: 'Processing', label: 'Silk Hand-Pressing & Packaging' },
                { stage: 'Shipped', label: 'Dispatched with UPS Express' },
                { stage: 'Delivered', label: 'Safely Delivered to Customer' },
              ].map((step, idx) => {
                const stages = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
                const currentIndex = stages.indexOf(viewingOrder.orderStatus);
                const isPassed = currentIndex >= idx;

                return (
                  <div key={step.stage} className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isPassed
                          ? 'bg-[#8E1EA2] text-white'
                          : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <div>
                      <p
                        className={`text-xs font-semibold ${
                          isPassed ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {step.stage}
                      </p>
                      <p className="text-[11px] text-slate-500">{step.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
              <span className="font-semibold text-slate-800 block">
                Destination:
              </span>
              <p className="text-slate-600">
                {viewingOrder.shippingAddress.address}, {viewingOrder.shippingAddress.city},{' '}
                {viewingOrder.shippingAddress.postalCode}
              </p>
            </div>

            <button
              onClick={() => setViewingOrder(null)}
              className="w-full py-2.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
