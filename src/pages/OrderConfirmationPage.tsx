import React from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle,
  Package,
  Calendar,
  Truck,
  Printer,
  ArrowRight,
  ShoppingBag,
} from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { selectedOrderId, getOrderById, setCurrentView } = useStore();

  const order = selectedOrderId ? getOrderById(selectedOrderId) : null;

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">
          No order found
        </h2>
        <button
          onClick={() => setCurrentView('home')}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white"
          style={{ backgroundColor: '#8E1EA2' }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success Hero Badge */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Thank you for your order
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Order Confirmed
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          We have received your order <strong>#{order.orderNumber}</strong>. An email confirmation has been sent to <strong>{order.customerEmail}</strong>.
        </p>
      </div>

      {/* Order Details Receipt Box */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Receipt Header Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-6 border-b border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block">Order Number</span>
            <span className="font-mono font-bold text-slate-900 text-sm">
              {order.orderNumber}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block">Order Date</span>
            <span className="font-medium text-slate-800">
              {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block">Payment Method</span>
            <span className="font-medium uppercase text-slate-800">
              {order.paymentMethod === 'card'
                ? 'Credit Card'
                : order.paymentMethod === 'paypal'
                ? 'PayPal'
                : 'Cash on Delivery'}
            </span>
          </div>

          <div>
            <span className="text-slate-400 block">Status</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#FFC0DE]/40 text-[#8E1EA2]">
              {order.orderStatus}
            </span>
          </div>
        </div>

        {/* Shipping Address & Recipient */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-600">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-semibold text-slate-900 block mb-1">
              Customer Information:
            </span>
            <p className="text-slate-900 font-medium">{order.customerName}</p>
            <p>{order.customerEmail}</p>
            <p>{order.customerPhone}</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="font-semibold text-slate-900 block mb-1">
              Delivery Address:
            </span>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Ordered Items List */}
        <div className="space-y-4 pt-2">
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Purchased Couture Pieces
          </h3>

          <div className="divide-y divide-slate-100">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg bg-slate-100 overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{item.productName}</h4>
                    <span className="text-slate-500">
                      SKU: {item.sku} · Size: {item.size} · Color: {item.colorName}
                    </span>
                    <span className="block text-slate-400">Qty: {item.quantity}</span>
                  </div>
                </div>

                <div className="text-right font-bold text-slate-900 tabular-nums">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Summary */}
        <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span className="font-medium text-slate-900 tabular-nums">
              ${order.subtotal.toFixed(2)}
            </span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-[#8E1EA2] font-semibold">
              <span>Discount</span>
              <span className="tabular-nums">-${order.discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span>Shipping</span>
            <span className="font-medium text-slate-900 tabular-nums">
              {order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span className="font-medium text-slate-900 tabular-nums">
              ${order.tax.toFixed(2)}
            </span>
          </div>

          <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
            <span>Total Paid</span>
            <span className="text-lg text-[#8E1EA2] tabular-nums">
              ${order.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Printer className="w-4 h-4 text-slate-600" />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('account');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <Package className="w-4 h-4 text-[#8E1EA2]" />
          <span>View in Order History</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-full sm:w-auto px-8 py-3 rounded-xl text-white font-semibold text-xs flex items-center justify-center gap-2 transition-opacity shadow-md"
          style={{ backgroundColor: '#8E1EA2' }}
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
