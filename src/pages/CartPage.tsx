import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Trash2,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  ArrowLeft,
  X,
} from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    setCurrentView,
    settings,
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const freeShippingThreshold = settings.freeShippingMinimum;
  const freeShippingDifference = Math.max(0, freeShippingThreshold - cartTotal.subtotal);
  const freeShippingProgress = Math.min(
    100,
    (cartTotal.subtotal / freeShippingThreshold) * 100
  );

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-serif font-bold text-slate-900">
            Your Shopping Bag is Empty
          </h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            Discover our latest runway arrivals and bespoke designer dresses to add to your luxury wardrobe.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg shadow-[#8E1EA2]/25 hover:opacity-95 transition-all"
          style={{ backgroundColor: '#8E1EA2' }}
        >
          Explore Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex items-baseline justify-between pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            Shopping Bag
          </span>
          <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
            Review Your Selection ({cartTotal.itemsCount} {cartTotal.itemsCount === 1 ? 'item' : 'items'})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-600 transition-colors"
        >
          Empty Bag
        </button>
      </div>

      {/* Free Shipping Progress Indicator */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-medium">
            <Truck className="w-4 h-4 text-[#8E1EA2]" />
            {freeShippingDifference === 0 ? (
              <span className="text-emerald-700 font-semibold">
                Congratulations! You unlocked complimentary Express Delivery.
              </span>
            ) : (
              <span>
                Add <strong className="text-slate-900">${freeShippingDifference.toFixed(2)}</strong> more to unlock Free Express Delivery!
              </span>
            )}
          </div>
          <span className="font-mono text-slate-500 text-[11px] tabular-nums">
            {freeShippingProgress.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${freeShippingProgress}%`,
              background: 'linear-gradient(90deg, #ED96D7, #C654C3, #8E1EA2)',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Itemized Cart List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item, index) => {
            const itemTotal = item.product.price * item.quantity;
            const maxStock = item.product.stock;

            return (
              <div
                key={`${item.productId}-${item.size}-${item.color.hex}-${index}`}
                className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Visual Thumbnail & Metadata */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
                      {item.product.sku}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-900">
                      {item.product.name}
                    </h3>

                    {/* Variant specs */}
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>Size: <strong className="text-slate-800">{item.size}</strong></span>
                      <span aria-hidden="true">·</span>
                      <div className="flex items-center gap-1">
                        <span>Color:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/10 inline-block"
                          style={{ backgroundColor: item.color.hex }}
                        />
                        <span className="text-slate-800">{item.color.name}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      Stock Available: <span className="font-semibold text-slate-700">{maxStock} units</span>
                    </div>
                  </div>
                </div>

                {/* Pricing, Quantity Stepper & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  {/* Quantity Stepper (Restricted to available stock) */}
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() =>
                        updateCartQuantity(item.productId, item.size, item.color.hex, -1)
                      }
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-xs font-bold text-slate-900 tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateCartQuantity(item.productId, item.size, item.color.hex, 1)
                      }
                      disabled={item.quantity >= maxStock}
                      className="px-2.5 py-1 text-slate-600 hover:bg-slate-200 disabled:opacity-30 text-xs font-bold transition-colors"
                      title={item.quantity >= maxStock ? 'Max available stock reached' : ''}
                    >
                      +
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right min-w-[70px]">
                    <span className="block text-base font-bold text-slate-900 tabular-nums">
                      ${itemTotal.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-slate-400 tabular-nums">
                      ${item.product.price} each
                    </span>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() =>
                      removeFromCart(item.productId, item.size, item.color.hex)
                    }
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-xs font-semibold text-slate-600 hover:text-[#8E1EA2] flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>

        {/* Order Summary Module */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
          <h2 className="font-serif text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h2>

          {/* Promo code input */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">
              Promotional Code
            </label>
            {appliedPromo ? (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FFC0DE]/30 border border-[#ED96D7]/40 text-xs">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#8E1EA2]" />
                  <span className="font-bold text-[#8E1EA2]">{appliedPromo}</span>
                  <span className="text-slate-600">({settings.promoDiscountPercent}% Off)</span>
                </div>
                <button
                  onClick={removePromoCode}
                  className="text-slate-400 hover:text-rose-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. ELEGANCE20"
                  value={promoInput}
                  onChange={e => setPromoInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 uppercase rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white rounded-lg transition-opacity"
                  style={{ backgroundColor: '#8E1EA2' }}
                >
                  Apply
                </button>
              </form>
            )}
          </div>

          {/* Financial calculations */}
          <div className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
            <div className="flex justify-between">
              <span>Subtotal ({cartTotal.itemsCount} items)</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${cartTotal.subtotal.toFixed(2)}
              </span>
            </div>

            {cartTotal.discount > 0 && (
              <div className="flex justify-between text-[#8E1EA2] font-semibold">
                <span>Promotional Discount</span>
                <span className="tabular-nums">-${cartTotal.discount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-semibold tabular-nums text-slate-900">
                {cartTotal.shipping === 0 ? (
                  <span className="text-emerald-600 uppercase font-bold text-[11px]">
                    Free
                  </span>
                ) : (
                  `$${cartTotal.shipping.toFixed(2)}`
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax ({settings.taxPercent}%)</span>
              <span className="font-semibold text-slate-900 tabular-nums">
                ${cartTotal.tax.toFixed(2)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-bold text-slate-900">
              <span>Grand Total</span>
              <span className="tabular-nums text-xl text-[#8E1EA2]">
                ${cartTotal.total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Checkout CTA */}
          <button
            onClick={() => {
              setCurrentView('checkout');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white shadow-lg shadow-[#8E1EA2]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2"
            style={{ backgroundColor: '#8E1EA2' }}
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Trust reassurance */}
          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8E1EA2]" />
            <span>Guaranteed Safe & Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
