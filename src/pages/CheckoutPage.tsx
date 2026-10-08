import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  CreditCard,
  Truck,
  ShieldCheck,
  Lock,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, setCurrentView, currentUser, showToast } =
    useStore();

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Sophia Laurent',
    email: currentUser?.email || 'sophia.laurent@elegance.com',
    phone: currentUser?.phone || '+1 (212) 555-0192',
    address: currentUser?.address || '784 Madison Avenue, Apt 14B',
    city: currentUser?.city || 'New York',
    postalCode: currentUser?.postalCode || '10065',
    country: currentUser?.country || 'United States',
    notes: 'Please handle with care. Fragile couture package.',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('883');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">
          Your shopping bag is empty
        </h2>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white"
          style={{ backgroundColor: '#8E1EA2' }}
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);

    const order = placeOrder({
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      shippingAddress: {
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
      },
      paymentMethod,
      notes: formData.notes,
    });

    setIsSubmitting(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            Secure Checkout
          </span>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
            Complete Your Couture Order
          </h1>
        </div>
        <button
          onClick={() => setCurrentView('cart')}
          className="text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Bag</span>
        </button>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Shipping & Payment Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. Customer Shipping Details */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  1. Shipping Destination
                </h2>
                <span className="text-xs text-slate-400">All fields required</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address (for order updates)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number (for courier delivery)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / Suite / Apartment
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Postal Code / ZIP
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    required
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Special Delivery Instructions or Gift Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold text-slate-900">
                  2. Payment Method
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-[#8E1EA2]" />
                  <span>256-Bit Encrypted</span>
                </div>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#8E1EA2] bg-[#FFC0DE]/20 text-[#8E1EA2] shadow-sm'
                      : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Credit Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-[#8E1EA2] bg-[#FFC0DE]/20 text-[#8E1EA2] shadow-sm'
                      : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <span className="font-serif font-black text-sm italic">PayPal</span>
                  <span>PayPal Express</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-[#8E1EA2] bg-[#FFC0DE]/20 text-[#8E1EA2] shadow-sm'
                      : 'border-slate-200 text-slate-600 bg-slate-50 hover:bg-white'
                  }`}
                >
                  <Truck className="w-5 h-5" />
                  <span>Cash on Delivery</span>
                </button>
              </div>

              {/* Card Inputs */}
              {paymentMethod === 'card' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-200 font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExp}
                        onChange={e => setCardExp(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-200 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={e => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white rounded-lg border border-slate-200 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'paypal' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-center">
                  You will be securely authenticated with your PayPal account to finalize your purchase with 1-Click protection.
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  <p className="font-semibold text-slate-900 mb-1">Cash on Delivery Terms:</p>
                  <p>Pay in cash upon arrival of your courier. Our team will verify the contact number before shipment dispatch.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Review & Place Order */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6 lg:sticky lg:top-28">
            <h2 className="font-serif text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
              Order Review ({cart.length} {cart.length === 1 ? 'Design' : 'Designs'})
            </h2>

            {/* Selected Products Strip */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <div className="w-12 h-14 rounded-lg overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 truncate">
                      {item.product.name}
                    </h4>
                    <span className="text-slate-500">
                      Qty: {item.quantity} · {item.size} · {item.color.name}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${cartTotal.subtotal.toFixed(2)}
                </span>
              </div>
              {cartTotal.discount > 0 && (
                <div className="flex justify-between text-[#8E1EA2] font-semibold">
                  <span>Promotional Savings</span>
                  <span className="tabular-nums">-${cartTotal.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Courier Shipping</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  {cartTotal.shipping === 0 ? 'Free' : `$${cartTotal.shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Sales Tax</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  ${cartTotal.tax.toFixed(2)}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold text-slate-900">
                <span>Grand Total</span>
                <span className="tabular-nums text-2xl text-[#8E1EA2]">
                  ${cartTotal.total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl font-semibold text-sm text-white shadow-xl shadow-[#8E1EA2]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ backgroundColor: '#8E1EA2' }}
            >
              <CheckCircle className="w-5 h-5" />
              <span>Place Order (${cartTotal.total.toFixed(2)})</span>
            </button>

            <div className="text-center text-[11px] text-slate-400 space-y-1">
              <p>By placing this order, product stock will be instantly deducted.</p>
              <p>Complimentary 30-day returns and courier exchange guaranteed.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
