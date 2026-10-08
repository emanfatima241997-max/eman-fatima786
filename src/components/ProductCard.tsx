import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Star, ShoppingBag, Eye, AlertCircle } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const {
    setCurrentView,
    setSelectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const isFavorited = isInWishlist(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    // Default to first available size and color
    const defaultSize = product.sizes[0] || 'M';
    const defaultColor = product.colors[0] || { name: 'Soft Pink', hex: '#FFC0DE' };
    addToCart(product, defaultSize, defaultColor, 1);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative flex flex-col bg-white rounded-xl border border-slate-100/90 overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_rgba(142,30,162,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-[3/4] w-full bg-[#FBFBFA] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary subtle highlight overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center text-slate-700 hover:text-[#8E1EA2] transition-transform active:scale-95"
        >
          <Heart
            className={`w-4 h-4 ${
              isFavorited ? 'fill-[#ED96D7] text-[#8E1EA2]' : ''
            }`}
          />
        </button>

        {/* Stock / Sale Notice (Subtle, unboxed single text tag) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 pointer-events-none">
          {product.discountPercent && product.discountPercent > 0 ? (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-white/95 text-[#8E1EA2] shadow-sm">
              Save {product.discountPercent}%
            </span>
          ) : null}
          {isOutOfStock ? (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded bg-slate-900/90 text-white shadow-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="text-[11px] font-semibold tracking-wide px-2 py-0.5 rounded bg-amber-500/90 text-white shadow-sm flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              Only {product.stock} left
            </span>
          ) : null}
        </div>

        {/* Action Reveal Overlay on Desktop */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95 ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'text-white hover:opacity-95'
            }`}
            style={{
              backgroundColor: isOutOfStock ? '#E2E8F0' : '#8E1EA2',
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Quick Add'}</span>
          </button>

          <button
            onClick={e => {
              e.stopPropagation();
              if (onQuickView) onQuickView(product);
              else handleCardClick();
            }}
            className="w-9 h-9 rounded-lg bg-white/95 backdrop-blur-sm shadow-md text-slate-700 hover:text-[#8E1EA2] flex items-center justify-center transition-transform active:scale-95 shrink-0"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2.5 bg-white">
        <div>
          {/* Category & SKU metadata */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-slate-500">
              {product.category}
            </span>
            <span className="font-mono text-[10px] text-slate-400">{product.sku}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-slate-900 group-hover:text-[#8E1EA2] transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
            </div>
            <span className="font-semibold text-slate-700 tabular-nums">
              {product.rating.toFixed(1)}
            </span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Pricing & Stock Status */}
        <div className="pt-2 border-t border-slate-50 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Clean Stock Indicator */}
          <div className="text-right">
            {isOutOfStock ? (
              <span className="text-[11px] font-medium text-rose-600">
                Out of Stock
              </span>
            ) : isLowStock ? (
              <span className="text-[11px] font-medium text-amber-600">
                Only {product.stock} left
              </span>
            ) : (
              <span className="text-[11px] font-medium text-emerald-600">
                In Stock ({product.stock})
              </span>
            )}
          </div>
        </div>

        {/* Mobile View / Quick Add bar */}
        <div className="sm:hidden pt-2 flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`w-full py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'text-white'
            }`}
            style={{
              backgroundColor: isOutOfStock ? '#F1F5F9' : '#8E1EA2',
            }}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Out of Stock' : 'Add to Bag'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
