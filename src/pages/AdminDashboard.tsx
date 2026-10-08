import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Product,
  ProductStatus,
  Order,
  OrderStatus,
  Customer,
  Review,
  ContactMessage,
  AdminTab,
} from '../types';
import { BrandLogo } from '../components/BrandLogo';
import {
  LayoutDashboard,
  Package,
  Boxes,
  ShoppingBag,
  Users,
  MessageSquare,
  Mail,
  BarChart3,
  Settings,
  LogOut,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Trash2,
  Edit,
  Eye,
  ExternalLink,
  ChevronRight,
  Sparkles,
  TrendingUp,
  DollarSign,
  ArrowUpRight,
  ShieldCheck,
  Check,
  X,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    adminTab,
    setAdminTab,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock,
    orders,
    updateOrderStatus,
    customers,
    reviews,
    updateReviewStatus,
    deleteReview,
    messages,
    markMessageRead,
    deleteMessage,
    settings,
    updateSettings,
    switchToCustomer,
    showToast,
  } = useStore();

  // Search & Filter within Admin tabs
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');
  const [customerSearch, setCustomerSearch] = useState('');
  const [inventoryFilter, setInventoryFilter] = useState<'all' | 'low' | 'out'>('all');
  const [reportsRange, setReportsRange] = useState<'daily' | 'weekly' | 'monthly'>('monthly');

  // Product Add / Edit Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    sku: '',
    category: 'Designer Dresses',
    price: 250,
    originalPrice: 300,
    stock: 10,
    lowStockThreshold: 3,
    description: '',
    material: '100% Grade 6A Mulberry Silk',
    careInstructions: 'Dry clean only.',
    sizes: 'XS, S, M, L, XL',
    isFeatured: true,
    isNewArrival: true,
    isBestSeller: false,
    isTrending: false,
    status: 'active' as ProductStatus,
  });

  // Selected Order for viewing in Admin
  const [adminViewingOrder, setAdminViewingOrder] = useState<Order | null>(null);

  // Key Statistics Computed
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(
      o => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed'
    ).length;
    const completedOrders = orders.filter(o => o.orderStatus === 'Delivered').length;
    const totalCustomers = customers.filter(c => c.role !== 'admin').length;
    const lowStockProducts = products.filter(
      p => p.stock > 0 && p.stock <= p.lowStockThreshold
    ).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;
    const totalSales = orders
      .filter(o => o.orderStatus !== 'Cancelled')
      .reduce((acc, o) => acc + o.total, 0);

    return {
      totalProducts,
      totalOrders,
      pendingOrders,
      completedOrders,
      totalCustomers,
      lowStockProducts,
      outOfStockProducts,
      totalSales: Math.round(totalSales * 100) / 100,
    };
  }, [products, orders, customers]);

  // Open Product Modal (New or Edit)
  const openAddProductModal = () => {
    setEditingProduct(null);
    setProductForm({
      name: '',
      sku: `DR-00${products.length + 1}`,
      category: 'Designer Dresses',
      price: 220,
      originalPrice: 280,
      stock: 12,
      lowStockThreshold: 3,
      description: 'Handcrafted luxury designer dress made from pure mulberry silk.',
      material: '100% Grade 6A Mulberry Silk',
      careInstructions: 'Professional dry clean only.',
      sizes: 'XS, S, M, L, XL',
      isFeatured: true,
      isNewArrival: true,
      isBestSeller: false,
      isTrending: false,
      status: 'active',
    });
    setIsProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      sku: product.sku,
      category: product.category,
      price: product.price,
      originalPrice: product.originalPrice || product.price,
      stock: product.stock,
      lowStockThreshold: product.lowStockThreshold,
      description: product.description,
      material: product.material,
      careInstructions: product.careInstructions,
      sizes: product.sizes.join(', '),
      isFeatured: !!product.isFeatured,
      isNewArrival: !!product.isNewArrival,
      isBestSeller: !!product.isBestSeller,
      isTrending: !!product.isTrending,
      status: product.status,
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const sizesArray = productForm.sizes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    const defaultColors = [
      { name: 'Soft Pink', hex: '#FFC0DE' },
      { name: 'Royal Purple', hex: '#8E1EA2' },
      { name: 'Light Magenta', hex: '#ED96D7' },
    ];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        sku: productForm.sku,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent:
          productForm.originalPrice > productForm.price
            ? Math.round(
                ((productForm.originalPrice - productForm.price) /
                  productForm.originalPrice) *
                  100
              )
            : 0,
        stock: Number(productForm.stock),
        lowStockThreshold: Number(productForm.lowStockThreshold),
        description: productForm.description,
        material: productForm.material,
        careInstructions: productForm.careInstructions,
        sizes: sizesArray,
        isFeatured: productForm.isFeatured,
        isNewArrival: productForm.isNewArrival,
        isBestSeller: productForm.isBestSeller,
        isTrending: productForm.isTrending,
        status: productForm.status,
      });
    } else {
      addProduct({
        name: productForm.name,
        sku: productForm.sku,
        category: productForm.category,
        price: Number(productForm.price),
        originalPrice: Number(productForm.originalPrice),
        discountPercent:
          productForm.originalPrice > productForm.price
            ? Math.round(
                ((productForm.originalPrice - productForm.price) /
                  productForm.originalPrice) *
                  100
              )
            : 0,
        stock: Number(productForm.stock),
        lowStockThreshold: Number(productForm.lowStockThreshold),
        description: productForm.description,
        material: productForm.material,
        careInstructions: productForm.careInstructions,
        specifications: [
          'Hand-finished luxury hems',
          'Concealed couture invisible zip',
          'Soft breathable natural lining',
        ],
        sizes: sizesArray,
        colors: defaultColors,
        rating: 5.0,
        reviewsCount: 1,
        images: [products[0]?.images[0] || ''],
        isFeatured: productForm.isFeatured,
        isNewArrival: productForm.isNewArrival,
        isBestSeller: productForm.isBestSeller,
        isTrending: productForm.isTrending,
        status: productForm.status,
      });
    }

    setIsProductModalOpen(false);
  };

  // Nav menu items
  const menuItems: { id: AdminTab; label: string; icon: any; count?: number }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, count: products.length },
    {
      id: 'inventory',
      label: 'Inventory',
      icon: Boxes,
      count: stats.lowStockProducts + stats.outOfStockProducts,
    },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
    { id: 'customers', label: 'Customers', icon: Users, count: stats.totalCustomers },
    { id: 'reviews', label: 'Reviews', icon: MessageSquare, count: reviews.length },
    {
      id: 'messages',
      label: 'Messages',
      icon: Mail,
      count: messages.filter(m => !m.isRead).length,
    },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex">
      {/* 1. Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
          {/* Brand Emblem in Admin Sidebar */}
          <div className="p-5 border-b border-slate-800">
            <div className="bg-white rounded-xl p-2 inline-block">
              <BrandLogo size="sm" showTagline={false} />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[11px] font-mono tracking-wider uppercase text-slate-400">
                Atelier Admin Console
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            {menuItems.map(item => {
              const Icon = item.icon;
              const isActive = adminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setAdminTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#8E1EA2] text-white shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Storefront & Signout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            onClick={() => switchToCustomer()}
            className="w-full py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#ED96D7]" />
            <span>View Customer Storefront</span>
          </button>
          <div className="text-[10px] text-slate-500 text-center font-mono pt-1">
            Women Clothing · v2026.10
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-xl font-bold text-slate-900 capitalize">
              {adminTab}
            </h1>
            <span className="text-xs text-slate-400">· Live Storefront Sync</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Action Button */}
            {adminTab === 'products' && (
              <button
                onClick={openAddProductModal}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Dress</span>
              </button>
            )}

            <button
              onClick={() => switchToCustomer()}
              className="text-xs font-semibold text-[#8E1EA2] hover:underline flex items-center gap-1"
            >
              <span>Switch to Shopper View</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Tab Content Body */}
        <main className="p-8 space-y-8">
          {/* TAB 1: DASHBOARD */}
          {adminTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stat Cards Grid (8 Core Metrics) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Revenue
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      ${stats.totalSales.toFixed(2)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      +18.4%
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Orders
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      {stats.totalOrders}
                    </span>
                    <span className="text-xs text-slate-500">
                      {stats.pendingOrders} pending
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Active Catalog
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      {stats.totalProducts} Designs
                    </span>
                    <span className="text-xs text-slate-500">
                      {stats.lowStockProducts} low stock
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Total Clients
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-slate-900 tabular-nums">
                      {stats.totalCustomers}
                    </span>
                    <span className="text-xs text-slate-500">Verified buyers</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pending Fulfillment
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-amber-600 tabular-nums">
                      {stats.pendingOrders}
                    </span>
                    <span className="text-xs text-slate-500">Needs dispatch</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Delivered Orders
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-emerald-600 tabular-nums">
                      {stats.completedOrders}
                    </span>
                    <span className="text-xs text-slate-500">100% Satisfaction</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Low Stock Alerts
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-amber-500 tabular-nums">
                      {stats.lowStockProducts}
                    </span>
                    <span className="text-xs text-amber-600 font-semibold">
                      ≤ {settings.lowStockThreshold} units
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Out of Stock
                  </span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-bold text-rose-600 tabular-nums">
                      {stats.outOfStockProducts}
                    </span>
                    <span className="text-xs text-rose-600 font-semibold">
                      Requires restock
                    </span>
                  </div>
                </div>
              </div>

              {/* Low Stock Warning Banner if any */}
              {stats.lowStockProducts > 0 && (
                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                    <div className="text-xs">
                      <strong className="text-amber-900 block font-semibold">
                        Low Stock Alert — {stats.lowStockProducts} product(s) have 3 or fewer items remaining.
                      </strong>
                      <span className="text-amber-700">
                        Adjust inventory quantities in the Inventory tab to prevent ordering disruptions.
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAdminTab('inventory')}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700"
                  >
                    Manage Inventory
                  </button>
                </div>
              )}

              {/* Recent Orders Overview */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    Recent Customer Orders
                  </h3>
                  <button
                    onClick={() => setAdminTab('orders')}
                    className="text-xs font-semibold text-[#8E1EA2] hover:underline"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-100">
                      <tr>
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Items</th>
                        <th className="py-2.5 px-3">Total</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o.id} className="hover:bg-slate-50/60">
                          <td className="py-3 px-3 font-mono font-bold text-slate-900">
                            {o.orderNumber}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-medium text-slate-900 block">
                              {o.customerName}
                            </span>
                            <span className="text-slate-400 text-[11px]">{o.customerEmail}</span>
                          </td>
                          <td className="py-3 px-3">
                            {o.items.length} {o.items.length === 1 ? 'dress' : 'dresses'}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900 tabular-nums">
                            ${o.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                                o.orderStatus === 'Delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : o.orderStatus === 'Cancelled'
                                  ? 'bg-rose-100 text-rose-800'
                                  : 'bg-[#FFC0DE]/40 text-[#8E1EA2]'
                              }`}
                            >
                              {o.orderStatus}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <button
                              onClick={() => {
                                setAdminViewingOrder(o);
                                setAdminTab('orders');
                              }}
                              className="text-xs text-[#8E1EA2] font-semibold hover:underline"
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS MANAGEMENT */}
          {adminTab === 'products' && (
            <div className="space-y-6">
              {/* Product Controls & Search */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search catalog by name, category, or SKU..."
                    value={productSearch}
                    onChange={e => setProductSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
                <button
                  onClick={openAddProductModal}
                  className="w-full sm:w-auto px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center justify-center gap-1.5 shadow-sm"
                  style={{ backgroundColor: '#8E1EA2' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Designer Dress</span>
                </button>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-3 px-4">Dress</th>
                        <th className="py-3 px-3">SKU</th>
                        <th className="py-3 px-3">Category</th>
                        <th className="py-3 px-3">Price</th>
                        <th className="py-3 px-3">Stock</th>
                        <th className="py-3 px-3">Tags</th>
                        <th className="py-3 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {products
                        .filter(p =>
                          productSearch
                            ? p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                              p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                              p.category.toLowerCase().includes(productSearch.toLowerCase())
                            : true
                        )
                        .map(prod => (
                          <tr key={prod.id} className="hover:bg-slate-50">
                            <td className="py-3 px-4 flex items-center gap-3">
                              <div className="w-10 h-12 rounded bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                                <img
                                  src={prod.images[0]}
                                  alt={prod.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <span className="font-semibold text-slate-900 block truncate max-w-xs">
                                  {prod.name}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  {prod.material.slice(0, 30)}...
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono font-medium text-slate-700">
                              {prod.sku}
                            </td>
                            <td className="py-3 px-3">{prod.category}</td>
                            <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                              ${prod.price}
                            </td>
                            <td className="py-3 px-3">
                              <span
                                className={`px-2 py-0.5 rounded text-[11px] font-semibold tabular-nums ${
                                  prod.stock === 0
                                    ? 'bg-rose-100 text-rose-700'
                                    : prod.stock <= prod.lowStockThreshold
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {prod.stock} in stock
                              </span>
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex flex-wrap gap-1">
                                {prod.isNewArrival && (
                                  <span className="px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 text-[10px]">
                                    New
                                  </span>
                                )}
                                {prod.isBestSeller && (
                                  <span className="px-1.5 py-0.2 rounded bg-pink-50 text-pink-700 text-[10px]">
                                    Best
                                  </span>
                                )}
                              </div>
                            </td>
                            <td className="py-3 px-3 text-right space-x-2">
                              <button
                                onClick={() => openEditProductModal(prod)}
                                className="p-1 text-slate-500 hover:text-[#8E1EA2]"
                                title="Edit product"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${prod.name}" from catalog?`)) {
                                    deleteProduct(prod.id);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-rose-600"
                                title="Delete product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: INVENTORY MANAGEMENT */}
          {adminTab === 'inventory' && (
            <div className="space-y-6">
              {/* Inventory Filter Bar */}
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-600">Filter:</span>
                  <button
                    onClick={() => setInventoryFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      inventoryFilter === 'all'
                        ? 'bg-[#8E1EA2] text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    All Items ({products.length})
                  </button>
                  <button
                    onClick={() => setInventoryFilter('low')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      inventoryFilter === 'low'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Low Stock ({stats.lowStockProducts})
                  </button>
                  <button
                    onClick={() => setInventoryFilter('out')}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      inventoryFilter === 'out'
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Out of Stock ({stats.outOfStockProducts})
                  </button>
                </div>

                <div className="text-xs text-slate-400">
                  Stock decreases automatically when customers place orders.
                </div>
              </div>

              {/* Dedicated Inventory Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Product Name</th>
                      <th className="py-3 px-3">SKU</th>
                      <th className="py-3 px-3">Available Stock</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Quick Stock Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products
                      .filter(p => {
                        if (inventoryFilter === 'low') {
                          return p.stock > 0 && p.stock <= p.lowStockThreshold;
                        }
                        if (inventoryFilter === 'out') {
                          return p.stock === 0;
                        }
                        return true;
                      })
                      .map(item => (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {item.name}
                          </td>
                          <td className="py-3 px-3 font-mono font-medium text-slate-600">
                            {item.sku}
                          </td>
                          <td className="py-3 px-3 font-mono text-sm font-bold tabular-nums text-slate-900">
                            {item.stock}
                          </td>
                          <td className="py-3 px-3">
                            {item.stock === 0 ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700 flex items-center gap-1 w-fit">
                                <XCircle className="w-3 h-3" />
                                Out of Stock
                              </span>
                            ) : item.stock <= item.lowStockThreshold ? (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 w-fit">
                                <AlertTriangle className="w-3 h-3" />
                                Low Stock ({item.stock} left)
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 w-fit">
                                <CheckCircle2 className="w-3 h-3" />
                                In Stock
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="inline-flex items-center gap-1.5 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                              <button
                                onClick={() => updateStock(item.id, Math.max(0, item.stock - 1))}
                                className="w-7 h-7 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors shadow-xs"
                                title="Reduce stock by 1"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-mono font-bold text-slate-900">
                                {item.stock}
                              </span>
                              <button
                                onClick={() => updateStock(item.id, item.stock + 1)}
                                className="w-7 h-7 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors shadow-xs"
                                title="Increase stock by 1"
                              >
                                +
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: ORDERS MANAGEMENT */}
          {adminTab === 'orders' && (
            <div className="space-y-6">
              {/* Order Search & Status Filter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 w-full sm:w-auto">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by Order ID, customer name, phone, or email..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Status:</span>
                  <select
                    value={orderStatusFilter}
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="py-2 px-3 text-xs bg-slate-50 border border-slate-200 rounded-lg font-medium text-slate-700"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Order Number</th>
                      <th className="py-3 px-3">Customer</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Payment</th>
                      <th className="py-3 px-3">Total</th>
                      <th className="py-3 px-3">Change Status</th>
                      <th className="py-3 px-3 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {orders
                      .filter(o => {
                        if (orderStatusFilter !== 'All' && o.orderStatus !== orderStatusFilter) {
                          return false;
                        }
                        if (orderSearch) {
                          const q = orderSearch.toLowerCase();
                          return (
                            o.orderNumber.toLowerCase().includes(q) ||
                            o.customerName.toLowerCase().includes(q) ||
                            o.customerEmail.toLowerCase().includes(q) ||
                            o.customerPhone.toLowerCase().includes(q)
                          );
                        }
                        return true;
                      })
                      .map(order => (
                        <tr key={order.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {order.orderNumber}
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-semibold text-slate-900 block">
                              {order.customerName}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {order.customerPhone}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500">
                            {new Date(order.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="py-3 px-3 uppercase text-[11px] font-semibold text-slate-700">
                            {order.paymentMethod}
                          </td>
                          <td className="py-3 px-3 font-bold text-slate-900 tabular-nums">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="py-3 px-3">
                            <select
                              value={order.orderStatus}
                              onChange={e =>
                                updateOrderStatus(order.id, e.target.value as OrderStatus)
                              }
                              className={`py-1 px-2 rounded-lg text-xs font-semibold border ${
                                order.orderStatus === 'Delivered'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : order.orderStatus === 'Cancelled'
                                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                                  : 'bg-[#FFC0DE]/30 text-[#8E1EA2] border-[#ED96D7]/40'
                              }`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => setAdminViewingOrder(order)}
                              className="p-1 text-slate-500 hover:text-[#8E1EA2]"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: CUSTOMERS MANAGEMENT */}
          {adminTab === 'customers' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search customers by name, email, or telephone..."
                    value={customerSearch}
                    onChange={e => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
                <div className="text-xs text-slate-500 font-semibold">
                  Total Active Customers: {stats.totalCustomers}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Client Name</th>
                      <th className="py-3 px-3">Email</th>
                      <th className="py-3 px-3">Telephone</th>
                      <th className="py-3 px-3">Location</th>
                      <th className="py-3 px-3">Total Orders</th>
                      <th className="py-3 px-3">Total Spent</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {customers
                      .filter(c => c.role !== 'admin')
                      .filter(c =>
                        customerSearch
                          ? c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
                            c.email.toLowerCase().includes(customerSearch.toLowerCase())
                          : true
                      )
                      .map(cust => (
                        <tr key={cust.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-900">
                            {cust.name}
                          </td>
                          <td className="py-3 px-3">{cust.email}</td>
                          <td className="py-3 px-3">{cust.phone}</td>
                          <td className="py-3 px-3">
                            {cust.city ? `${cust.city}, ${cust.country || 'USA'}` : 'N/A'}
                          </td>
                          <td className="py-3 px-3 font-semibold text-slate-900 tabular-nums">
                            {cust.totalOrders}
                          </td>
                          <td className="py-3 px-3 font-bold text-[#8E1EA2] tabular-nums">
                            ${cust.totalSpent.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: REVIEWS MANAGEMENT */}
          {adminTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Reviewer</th>
                      <th className="py-3 px-3">Dress</th>
                      <th className="py-3 px-3">Rating</th>
                      <th className="py-3 px-4">Comment</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3 text-right">Moderation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reviews.map(rev => (
                      <tr key={rev.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-medium text-slate-900">
                          {rev.customerName}
                        </td>
                        <td className="py-3 px-3 text-slate-800 font-serif">
                          {rev.productName}
                        </td>
                        <td className="py-3 px-3 font-bold text-amber-500 tabular-nums">
                          ★ {rev.rating}
                        </td>
                        <td className="py-3 px-4 italic text-slate-600 max-w-sm truncate">
                          "{rev.comment}"
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                              rev.status === 'approved'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rev.status === 'pending'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {rev.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right space-x-1.5">
                          {rev.status !== 'approved' && (
                            <button
                              onClick={() => updateReviewStatus(rev.id, 'approved')}
                              className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold"
                            >
                              Approve
                            </button>
                          )}
                          {rev.status !== 'hidden' && (
                            <button
                              onClick={() => updateReviewStatus(rev.id, 'hidden')}
                              className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-[10px] font-bold"
                            >
                              Hide
                            </button>
                          )}
                          <button
                            onClick={() => deleteReview(rev.id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                            title="Delete review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: MESSAGES MANAGEMENT */}
          {adminTab === 'messages' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Sender</th>
                      <th className="py-3 px-3">Subject</th>
                      <th className="py-3 px-4">Message</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-3">Read Status</th>
                      <th className="py-3 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {messages.map(msg => (
                      <tr
                        key={msg.id}
                        className={msg.isRead ? 'hover:bg-slate-50' : 'bg-[#FFC0DE]/10 hover:bg-[#FFC0DE]/20'}
                      >
                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-900 block">
                            {msg.name}
                          </span>
                          <span className="text-[11px] text-slate-400">{msg.email}</span>
                        </td>
                        <td className="py-3 px-3 font-medium text-slate-800">
                          {msg.subject}
                        </td>
                        <td className="py-3 px-4 text-slate-600 max-w-sm truncate">
                          {msg.message}
                        </td>
                        <td className="py-3 px-3 text-slate-400">
                          {new Date(msg.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => markMessageRead(msg.id, !msg.isRead)}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              msg.isRead
                                ? 'bg-slate-100 text-slate-500'
                                : 'bg-[#8E1EA2] text-white'
                            }`}
                          >
                            {msg.isRead ? 'Read' : 'Mark as Read'}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1 text-slate-400 hover:text-rose-600"
                            title="Delete message"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 8: REPORTS */}
          {adminTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200">
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  Sales & Performance Analytics
                </h3>
                <div className="flex items-center gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map(range => (
                    <button
                      key={range}
                      onClick={() => setReportsRange(range)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize ${
                        reportsRange === range
                          ? 'bg-[#8E1EA2] text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              {/* Best Selling Products */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Top Best-Selling Designer Dresses
                  </h4>
                  <div className="space-y-3">
                    {products.slice(0, 4).map((p, idx) => (
                      <div
                        key={p.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#8E1EA2]">
                            #{idx + 1}
                          </span>
                          <div>
                            <p className="font-semibold text-slate-900">{p.name}</p>
                            <p className="text-slate-400">{p.category} · {p.sku}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900 tabular-nums">
                          ${p.price * (idx + 2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Inventory Velocity & Restock Forecast
                  </h4>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                      <span className="font-medium text-amber-900">
                        Average Atelier Restock Turnaround
                      </span>
                      <strong className="text-amber-900">4 Business Days</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-between">
                      <span className="font-medium text-purple-900">
                        Highest Demand Category
                      </span>
                      <strong className="text-[#8E1EA2]">Designer Evening Silk</strong>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                      <span className="font-medium text-emerald-900">
                        Order Fulfillment Success Rate
                      </span>
                      <strong className="text-emerald-900">99.4%</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: SETTINGS */}
          {adminTab === 'settings' && (
            <div className="max-w-2xl bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                Boutique Configuration Settings
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Store Brand Title
                  </label>
                  <input
                    type="text"
                    value={settings.storeName}
                    onChange={e => updateSettings({ storeName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Low Stock Threshold (Warning Count)
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={settings.lowStockThreshold}
                      onChange={e =>
                        updateSettings({ lowStockThreshold: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Free Shipping Threshold ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={settings.freeShippingMinimum}
                      onChange={e =>
                        updateSettings({ freeShippingMinimum: Number(e.target.value) })
                      }
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Active Promotion Code
                    </label>
                    <input
                      type="text"
                      value={settings.promoCode}
                      onChange={e =>
                        updateSettings({ promoCode: e.target.value.toUpperCase() })
                      }
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono uppercase"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Promo Discount Percentage (%)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={settings.promoDiscountPercent}
                      onChange={e =>
                        updateSettings({
                          promoDiscountPercent: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Store settings saved successfully')}
                    className="px-6 py-2.5 rounded-xl font-semibold text-xs text-white"
                    style={{ backgroundColor: '#8E1EA2' }}
                  >
                    Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Add or Edit Product */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-serif text-xl font-bold text-slate-900">
                {editingProduct ? 'Edit Designer Dress' : 'Add New Designer Dress'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Dress Name
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={e =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">SKU</label>
                  <input
                    type="text"
                    required
                    value={productForm.sku}
                    onChange={e =>
                      setProductForm({ ...productForm, sku: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={e =>
                      setProductForm({ ...productForm, category: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <option value="Shalwar Kameez">Shalwar Kameez</option>
                    <option value="Pants & Shirt">Pants & Shirt</option>
                    <option value="Heavy Formal Wear">Heavy Formal Wear</option>
                    <option value="Luxury Maxis">Luxury Maxis</option>
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Bridal Collection">Bridal Collection</option>
                    <option value="Designer Dresses">Designer Dresses</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e =>
                      setProductForm({ ...productForm, price: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Original / Old Price ($)
                  </label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={e =>
                      setProductForm({
                        ...productForm,
                        originalPrice: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inventory Stock Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={productForm.stock}
                    onChange={e =>
                      setProductForm({ ...productForm, stock: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={productForm.sizes}
                    onChange={e =>
                      setProductForm({ ...productForm, sizes: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Fabric & Material
                  </label>
                  <input
                    type="text"
                    value={productForm.material}
                    onChange={e =>
                      setProductForm({ ...productForm, material: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={e =>
                      setProductForm({ ...productForm, description: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              {/* Flags */}
              <div className="flex flex-wrap gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isNewArrival}
                    onChange={e =>
                      setProductForm({ ...productForm, isNewArrival: e.target.checked })
                    }
                    className="accent-[#8E1EA2]"
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isBestSeller}
                    onChange={e =>
                      setProductForm({ ...productForm, isBestSeller: e.target.checked })
                    }
                    className="accent-[#8E1EA2]"
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isFeatured}
                    onChange={e =>
                      setProductForm({ ...productForm, isFeatured: e.target.checked })
                    }
                    className="accent-[#8E1EA2]"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-white font-semibold shadow-sm"
                  style={{ backgroundColor: '#8E1EA2' }}
                >
                  {editingProduct ? 'Save Product Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Order Detail Viewer for Admin */}
      {adminViewingOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs uppercase font-semibold text-[#8E1EA2]">
                  Order Details
                </span>
                <h3 className="font-mono text-base font-bold text-slate-900">
                  {adminViewingOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setAdminViewingOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <p>
                <strong>Customer:</strong> {adminViewingOrder.customerName} (
                {adminViewingOrder.customerEmail})
              </p>
              <p>
                <strong>Phone:</strong> {adminViewingOrder.customerPhone}
              </p>
              <p>
                <strong>Address:</strong> {adminViewingOrder.shippingAddress.address},{' '}
                {adminViewingOrder.shippingAddress.city}
              </p>
              <p>
                <strong>Payment:</strong> {adminViewingOrder.paymentMethod} (
                {adminViewingOrder.paymentStatus})
              </p>
            </div>

            <div className="py-2 divide-y divide-slate-100 max-h-48 overflow-y-auto">
              {adminViewingOrder.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-900">{item.productName}</p>
                    <p className="text-slate-400">
                      {item.sku} · Size: {item.size} · Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between font-bold text-sm text-slate-900 pt-2 border-t border-slate-100">
              <span>Grand Total</span>
              <span className="text-[#8E1EA2] tabular-nums">
                ${adminViewingOrder.total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => setAdminViewingOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
