export type ProductStatus = 'active' | 'draft' | 'archived';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  description: string;
  stock: number;
  lowStockThreshold: number;
  rating: number;
  reviewsCount: number;
  sizes: string[];
  colors: ProductColor[];
  material: string;
  careInstructions: string;
  specifications: string[];
  images: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  status: ProductStatus;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  size: string;
  color: ProductColor;
  quantity: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'card' | 'paypal' | 'cod';
export type PaymentStatus = 'paid' | 'pending';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  sku: string;
  size: string;
  colorName: string;
  colorHex: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  rating: number;
  comment: string;
  date: string;
  status: 'approved' | 'pending' | 'hidden';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  isRead: boolean;
}

export interface StoreSettings {
  storeName: string;
  currency: string;
  currencySymbol: string;
  lowStockThreshold: number;
  freeShippingMinimum: number;
  shippingFee: number;
  taxPercent: number;
  promoCode: string;
  promoDiscountPercent: number;
}

export type AppView =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'categories'
  | 'cart'
  | 'checkout'
  | 'order-confirmation'
  | 'account'
  | 'wishlist'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'shipping-returns'
  | 'admin';

export type AdminTab =
  | 'dashboard'
  | 'products'
  | 'inventory'
  | 'orders'
  | 'customers'
  | 'reviews'
  | 'messages'
  | 'reports'
  | 'settings';
