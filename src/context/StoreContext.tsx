import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  Customer,
  Review,
  ContactMessage,
  StoreSettings,
  AppView,
  AdminTab,
  OrderStatus,
  ProductColor,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_ORDERS,
  INITIAL_REVIEWS,
  INITIAL_MESSAGES,
  INITIAL_SETTINGS,
} from '../data/initialData';

interface StoreContextType {
  // Navigation & View
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
  selectedOrderId: string | null;
  setSelectedOrderId: (id: string | null) => void;
  adminTab: AdminTab;
  setAdminTab: (tab: AdminTab) => void;

  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  getProductById: (id: string) => Product | undefined;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => { success: boolean; message: string };
  updateCartQuantity: (productId: string, size: string, colorHex: string, delta: number) => void;
  removeFromCart: (productId: string, size: string, colorHex: string) => void;
  clearCart: () => void;
  cartTotal: {
    itemsCount: number;
    subtotal: number;
    discount: number;
    shipping: number;
    tax: number;
    total: number;
  };
  appliedPromo: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;

  // Orders
  orders: Order[];
  placeOrder: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: 'card' | 'paypal' | 'cod';
    notes?: string;
  }) => Order | null;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (id: string) => Order | undefined;

  // Auth / Customers
  currentUser: Customer | null;
  customers: Customer[];
  login: (email: string) => boolean;
  register: (name: string, email: string, phone: string, address?: string, city?: string, postalCode?: string) => Customer;
  logout: () => void;
  updateProfile: (data: Partial<Customer>) => void;
  switchToAdmin: () => void;
  switchToCustomer: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Reviews
  reviews: Review[];
  addReview: (productId: string, rating: number, comment: string, customerName: string, customerEmail: string) => void;
  updateReviewStatus: (reviewId: string, status: 'approved' | 'pending' | 'hidden') => void;
  deleteReview: (reviewId: string) => void;

  // Contact Messages
  messages: ContactMessage[];
  sendContactMessage: (msg: { name: string; email: string; phone: string; subject: string; message: string }) => void;
  markMessageRead: (msgId: string, isRead: boolean) => void;
  deleteMessage: (msgId: string) => void;

  // Store Settings
  settings: StoreSettings;
  updateSettings: (newSettings: Partial<StoreSettings>) => void;

  // Notification Toast
  toast: { message: string; type: 'success' | 'error' | 'info' } | null;
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'wc_products_v2',
  CART: 'wc_cart_v2',
  ORDERS: 'wc_orders_v2',
  CUSTOMERS: 'wc_customers_v2',
  CURRENT_USER: 'wc_current_user_v2',
  WISHLIST: 'wc_wishlist_v2',
  REVIEWS: 'wc_reviews_v2',
  MESSAGES: 'wc_messages_v2',
  SETTINGS: 'wc_settings_v2',
  APPLIED_PROMO: 'wc_applied_promo_v2',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation states
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [adminTab, setAdminTab] = useState<AdminTab>('dashboard');

  // Persistence loaded states
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
    } catch {
      return INITIAL_CUSTOMERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<Customer | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
      // default demo customer
      return INITIAL_CUSTOMERS[0];
    } catch {
      return INITIAL_CUSTOMERS[0];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : ['prod-001', 'prod-005'];
    } catch {
      return ['prod-001', 'prod-005'];
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
    } catch {
      return INITIAL_MESSAGES;
    }
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
    } catch {
      return INITIAL_SETTINGS;
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.APPLIED_PROMO) || null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // Auto-hide toast
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, 3500);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    if (appliedPromo) {
      localStorage.setItem(STORAGE_KEYS.APPLIED_PROMO, appliedPromo);
    } else {
      localStorage.removeItem(STORAGE_KEYS.APPLIED_PROMO);
    }
  }, [appliedPromo]);

  // Product helper
  const getProductById = (id: string) => products.find(p => p.id === id);

  // Add Product
  const addProduct = (productData: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: `prod-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Added "${newProduct.name}" to boutique catalog`);
  };

  // Update Product
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product details updated successfully');
  };

  // Delete Product
  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog', 'info');
  };

  // Update Stock Directly
  const updateStock = (id: string, newStock: number) => {
    const validStock = Math.max(0, Math.floor(newStock));
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, stock: validStock } : p))
    );
    showToast(`Inventory updated to ${validStock} units`);
  };

  // Cart operations
  const addToCart = (
    product: Product,
    size: string,
    color: ProductColor,
    quantity = 1
  ): { success: boolean; message: string } => {
    // Current stock check
    const currentProduct = products.find(p => p.id === product.id) || product;
    if (currentProduct.stock <= 0) {
      showToast('This item is currently out of stock.', 'error');
      return { success: false, message: 'Item is out of stock' };
    }

    const existingItemIndex = cart.findIndex(
      item =>
        item.productId === product.id &&
        item.size === size &&
        item.color.hex === color.hex
    );

    const existingQty = existingItemIndex >= 0 ? cart[existingItemIndex].quantity : 0;
    const requestedTotal = existingQty + quantity;

    if (requestedTotal > currentProduct.stock) {
      const allowedAdd = currentProduct.stock - existingQty;
      if (allowedAdd <= 0) {
        showToast(
          `You already have all ${currentProduct.stock} available units in your bag.`,
          'error'
        );
        return { success: false, message: 'Stock limit reached in cart' };
      }
      showToast(
        `Only ${allowedAdd} additional unit(s) available. Added ${allowedAdd} to bag.`,
        'info'
      );
      setCart(prev => {
        const copy = [...prev];
        copy[existingItemIndex].quantity = currentProduct.stock;
        return copy;
      });
      return { success: true, message: 'Added max available stock' };
    }

    setCart(prev => {
      if (existingItemIndex >= 0) {
        const copy = [...prev];
        copy[existingItemIndex] = {
          ...copy[existingItemIndex],
          quantity: requestedTotal,
        };
        return copy;
      }
      return [
        ...prev,
        {
          productId: product.id,
          product: currentProduct,
          size,
          color,
          quantity,
        },
      ];
    });

    showToast(`Added "${product.name}" (${size}) to your shopping bag.`);
    return { success: true, message: 'Added to cart' };
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    colorHex: string,
    delta: number
  ) => {
    const targetProduct = products.find(p => p.id === productId);
    const maxStock = targetProduct ? targetProduct.stock : 99;

    setCart(prev =>
      prev
        .map(item => {
          if (
            item.productId === productId &&
            item.size === size &&
            item.color.hex === colorHex
          ) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            if (nextQty > maxStock) {
              showToast(`Only ${maxStock} items available in stock`, 'info');
              return { ...item, quantity: maxStock };
            }
            return { ...item, quantity: nextQty };
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (productId: string, size: string, colorHex: string) => {
    setCart(prev =>
      prev.filter(
        item =>
          !(
            item.productId === productId &&
            item.size === size &&
            item.color.hex === colorHex
          )
      )
    );
    showToast('Item removed from bag', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Promo code
  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === settings.promoCode) {
      setAppliedPromo(clean);
      showToast(`Promo "${clean}" applied: ${settings.promoDiscountPercent}% off!`);
      return { success: true, message: 'Promo code applied' };
    }
    showToast('Invalid promotion code. Try "ELEGANCE20"', 'error');
    return { success: false, message: 'Invalid promo code' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promotion code removed', 'info');
  };

  // Cart Totals calculation
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountPercent = appliedPromo ? settings.promoDiscountPercent : 0;
  const discount = Math.round((subtotal * discountPercent) / 100 * 100) / 100;
  const shipping =
    subtotal === 0 || subtotal >= settings.freeShippingMinimum
      ? 0
      : settings.shippingFee;
  const tax =
    Math.round(((subtotal - discount) * settings.taxPercent) / 100 * 100) / 100;
  const total =
    Math.round((subtotal - discount + shipping + tax) * 100) / 100;

  const cartTotal = {
    itemsCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
  };

  // Orders and automatic stock management
  const placeOrder = (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: {
      address: string;
      city: string;
      postalCode: string;
      country: string;
    };
    paymentMethod: 'card' | 'paypal' | 'cod';
    notes?: string;
  }): Order | null => {
    if (cart.length === 0) {
      showToast('Your bag is empty.', 'error');
      return null;
    }

    // Verify stock availability for all items before placing
    for (const item of cart) {
      const currentProduct = products.find(p => p.id === item.productId);
      if (!currentProduct || currentProduct.stock < item.quantity) {
        showToast(
          `Insufficient stock for "${item.product.name}". Only ${currentProduct?.stock || 0} left.`,
          'error'
        );
        return null;
      }
    }

    // 1. Deduct stock for all items
    setProducts(prev =>
      prev.map(prod => {
        const cartMatch = cart.find(c => c.productId === prod.id);
        if (cartMatch) {
          const updatedStock = Math.max(0, prod.stock - cartMatch.quantity);
          return {
            ...prod,
            stock: updatedStock,
          };
        }
        return prod;
      })
    );

    const orderNumber = `WC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerId: currentUser?.id || 'cust-guest',
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      items: cart.map(item => ({
        productId: item.productId,
        productName: item.product.name,
        productImage: item.product.images[0] || item.product.images[0],
        sku: item.product.sku,
        size: item.size,
        colorName: item.color.name,
        colorHex: item.color.hex,
        price: item.product.price,
        quantity: item.quantity,
      })),
      subtotal: cartTotal.subtotal,
      discount: cartTotal.discount,
      shipping: cartTotal.shipping,
      tax: cartTotal.tax,
      total: cartTotal.total,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: orderData.paymentMethod === 'cod' ? 'pending' : 'paid',
      orderStatus: 'Confirmed',
      notes: orderData.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setOrders(prev => [newOrder, ...prev]);

    // Update customer stats if logged in
    if (currentUser) {
      setCustomers(prev =>
        prev.map(c =>
          c.id === currentUser.id
            ? {
                ...c,
                totalOrders: c.totalOrders + 1,
                totalSpent: Math.round((c.totalSpent + cartTotal.total) * 100) / 100,
              }
            : c
        )
      );
    }

    // Clear cart and promo
    clearCart();
    setAppliedPromo(null);
    setSelectedOrderId(newOrder.id);
    setCurrentView('order-confirmation');
    showToast(`Order #${orderNumber} placed successfully!`);
    return newOrder;
  };

  // Update order status with stock restoration if cancelled
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const existingOrder = orders.find(o => o.id === orderId);
    if (!existingOrder) return;

    const previousStatus = existingOrder.orderStatus;

    // If order was cancelled and now changed, or changed TO Cancelled:
    if (newStatus === 'Cancelled' && previousStatus !== 'Cancelled') {
      // Restore stock
      setProducts(prev =>
        prev.map(prod => {
          const item = existingOrder.items.find(i => i.productId === prod.id);
          if (item) {
            return {
              ...prod,
              stock: prod.stock + item.quantity,
            };
          }
          return prod;
        })
      );
      showToast(`Order #${existingOrder.orderNumber} cancelled. Restored inventory.`);
    } else if (previousStatus === 'Cancelled' && newStatus !== 'Cancelled') {
      // Re-deduct stock
      setProducts(prev =>
        prev.map(prod => {
          const item = existingOrder.items.find(i => i.productId === prod.id);
          if (item) {
            return {
              ...prod,
              stock: Math.max(0, prod.stock - item.quantity),
            };
          }
          return prod;
        })
      );
      showToast(`Order #${existingOrder.orderNumber} re-activated. Deducted inventory.`);
    } else {
      showToast(`Order status updated to "${newStatus}"`);
    }

    setOrders(prev =>
      prev.map(o =>
        o.id === orderId
          ? { ...o, orderStatus: newStatus, updatedAt: new Date().toISOString() }
          : o
      )
    );
  };

  const getOrderById = (id: string) => orders.find(o => o.id === id);

  // Auth
  const login = (email: string) => {
    const found = customers.find(
      c => c.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (found) {
      setCurrentUser(found);
      showToast(`Welcome back, ${found.name}!`);
      return true;
    }
    showToast('No account found with this email. Registered a new account.', 'info');
    const newCust = register(email.split('@')[0], email, '+1 (555) 000-0000');
    setCurrentUser(newCust);
    return true;
  };

  const register = (
    name: string,
    email: string,
    phone: string,
    address = '',
    city = '',
    postalCode = ''
  ): Customer => {
    const newCust: Customer = {
      id: `cust-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      role: 'customer',
      address,
      city,
      postalCode,
      country: 'United States',
      createdAt: new Date().toISOString(),
      totalOrders: 0,
      totalSpent: 0,
    };
    setCustomers(prev => [...prev, newCust]);
    setCurrentUser(newCust);
    showToast(`Welcome to Women Clothing, ${name}!`);
    return newCust;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out successfully', 'info');
  };

  const updateProfile = (data: Partial<Customer>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setCustomers(prev => prev.map(c => (c.id === updated.id ? updated : c)));
    showToast('Your profile has been updated');
  };

  const switchToAdmin = () => {
    const adminUser = customers.find(c => c.role === 'admin') || INITIAL_CUSTOMERS[2];
    setCurrentUser(adminUser);
    setCurrentView('admin');
    showToast('Switched to Store Administrator View');
  };

  const switchToCustomer = () => {
    const demoCust = customers.find(c => c.role === 'customer') || INITIAL_CUSTOMERS[0];
    setCurrentUser(demoCust);
    setCurrentView('home');
    showToast('Switched to Customer Storefront View');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Item removed from wishlist', 'info');
        return prev.filter(id => id !== productId);
      }
      showToast('Item saved to your wishlist');
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Reviews
  const addReview = (
    productId: string,
    rating: number,
    comment: string,
    customerName: string,
    customerEmail: string
  ) => {
    const product = products.find(p => p.id === productId);
    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId,
      productName: product?.name || 'Designer Dress',
      customerName,
      customerEmail,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
      status: 'approved',
    };
    setReviews(prev => [newReview, ...prev]);

    // Recalculate product rating
    if (product) {
      const prodReviews = [...reviews.filter(r => r.productId === productId), newReview];
      const avg =
        prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
      updateProduct(productId, {
        rating: Math.round(avg * 10) / 10,
        reviewsCount: prodReviews.length,
      });
    }

    showToast('Thank you! Your review has been published.');
  };

  const updateReviewStatus = (
    reviewId: string,
    status: 'approved' | 'pending' | 'hidden'
  ) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, status } : r))
    );
    showToast(`Review status set to "${status}"`);
  };

  const deleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast('Review deleted', 'info');
  };

  // Messages
  const sendContactMessage = (msg: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
  }) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: new Date().toISOString(),
      isRead: false,
    };
    setMessages(prev => [newMsg, ...prev]);
    showToast('Your message has been sent to our boutique concierge team.');
  };

  const markMessageRead = (msgId: string, isRead: boolean) => {
    setMessages(prev =>
      prev.map(m => (m.id === msgId ? { ...m, isRead } : m))
    );
  };

  const deleteMessage = (msgId: string) => {
    setMessages(prev => prev.filter(m => m.id !== msgId));
    showToast('Message deleted', 'info');
  };

  // Settings
  const updateSettings = (newSettings: Partial<StoreSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    showToast('Store settings updated');
  };

  return (
    <StoreContext.Provider
      value={{
        currentView,
        setCurrentView,
        selectedProductId,
        setSelectedProductId,
        selectedOrderId,
        setSelectedOrderId,
        adminTab,
        setAdminTab,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        getProductById,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById,
        currentUser,
        customers,
        login,
        register,
        logout,
        updateProfile,
        switchToAdmin,
        switchToCustomer,
        wishlist,
        toggleWishlist,
        isInWishlist,
        reviews,
        addReview,
        updateReviewStatus,
        deleteReview,
        messages,
        sendContactMessage,
        markMessageRead,
        deleteMessage,
        settings,
        updateSettings,
        toast,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
