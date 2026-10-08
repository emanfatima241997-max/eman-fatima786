import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductColor } from '../types';
import {
  Star,
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Share2,
  ChevronRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    selectedProductId,
    getProductById,
    setCurrentView,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    currentUser,
    showToast,
  } = useStore();

  const product = selectedProductId ? getProductById(selectedProductId) : null;

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Variant selections
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  // Review Form state
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState<string>('');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [reviewerEmail, setReviewerEmail] = useState<string>('');
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  // Active accordion tab
  const [activeTab, setActiveTab] = useState<'details' | 'care' | 'delivery'>('details');

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || null);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    if (currentUser) {
      setReviewerName(currentUser.name);
      setReviewerEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-slate-800">
          No dress selected
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

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= product.lowStockThreshold;
  const isFavorited = isInWishlist(product.id);

  // Filter approved reviews for this dress
  const productReviews = reviews.filter(
    r => r.productId === product.id && r.status === 'approved'
  );

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    if (!selectedColor) return;
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    if (!selectedColor) return;
    const res = addToCart(product, selectedSize, selectedColor, quantity);
    if (res.success) {
      setCurrentView('cart');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuantityChange = (delta: number) => {
    const next = quantity + delta;
    if (next < 1) return;
    if (next > product.stock) {
      showToast(`Only ${product.stock} units currently in stock`, 'info');
      return;
    }
    setQuantity(next);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewComment.trim()) {
      showToast('Please provide your name and review remarks', 'error');
      return;
    }

    setSubmittingReview(true);
    addReview(
      product.id,
      reviewRating,
      reviewComment.trim(),
      reviewerName.trim(),
      reviewerEmail.trim() || 'shopper@example.com'
    );
    setReviewComment('');
    setSubmittingReview(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumbs Navigation */}
      <nav className="flex items-center gap-2 text-xs text-slate-500">
        <button
          onClick={() => setCurrentView('home')}
          className="hover:text-slate-900 transition-colors"
        >
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => setCurrentView('shop')}
          className="hover:text-slate-900 transition-colors"
        >
          Shop Dresses
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-400">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>

      {/* Main Dual-Column Product Purchase Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Gallery Module */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Visual */}
          <div className="relative aspect-[3/4] w-full bg-[#FAF9F8] rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top transition-all duration-300"
            />

            {/* Discount Badge */}
            {product.discountPercent && product.discountPercent > 0 ? (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-md bg-white/95 text-[#8E1EA2] text-xs font-bold shadow-sm">
                Save {product.discountPercent}%
              </span>
            ) : null}

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Save to wishlist"
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center text-slate-700 hover:text-[#8E1EA2] transition-transform active:scale-95"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorited ? 'fill-[#ED96D7] text-[#8E1EA2]' : ''
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Strip */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-24 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-[#8E1EA2] ring-2 ring-[#FFC0DE]'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Purchase Module */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
          <div>
            {/* Category & SKU */}
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="uppercase tracking-widest font-semibold text-[#8E1EA2]">
                {product.category}
              </span>
              <span className="font-mono text-slate-400">SKU: {product.sku}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews summary */}
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-600">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
              <span className="font-bold text-slate-900 tabular-nums">
                {product.rating.toFixed(1)}
              </span>
              <span aria-hidden="true">·</span>
              <a href="#reviews-section" className="text-[#8E1EA2] hover:underline">
                {product.reviewsCount} customer reviews
              </a>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-baseline justify-between">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900 tabular-nums">
                ${product.price}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Stock State Indicator */}
            <div>
              {isOutOfStock ? (
                <span className="px-2.5 py-1 rounded bg-rose-100 text-rose-700 text-xs font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-800 text-xs font-bold flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Low Stock Alert — Only {product.stock} items remaining
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  In Stock ({product.stock} available)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          {/* Variant: Colors */}
          {product.colors.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-900">Color:</span>
                <span className="text-slate-500 font-medium">
                  {selectedColor?.name}
                </span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color)}
                    className={`group relative p-1 rounded-full border-2 transition-all ${
                      selectedColor?.hex === color.hex
                        ? 'border-[#8E1EA2] scale-110'
                        : 'border-transparent hover:border-slate-300'
                    }`}
                    title={color.name}
                  >
                    <span
                      className="w-7 h-7 rounded-full block border border-black/10 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Variant: Sizes */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-900">Select Size:</span>
              <button
                onClick={() => showToast('All pieces are tailored true to US luxury sizing.', 'info')}
                className="text-[#8E1EA2] hover:underline"
              >
                Size Guide
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-semibold rounded-lg border transition-all ${
                    selectedSize === size
                      ? 'border-[#8E1EA2] bg-[#8E1EA2] text-white shadow-sm'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-400'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector & Purchase CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-900">Quantity:</span>
              <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1 || isOutOfStock}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 text-xs font-bold text-slate-900 tabular-nums">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock || isOutOfStock}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 disabled:opacity-40 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-slate-400">
                Max available: {product.stock}
              </span>
            </div>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className={`flex-1 py-3.5 px-6 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                  isOutOfStock
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'text-white hover:opacity-95 shadow-[#8E1EA2]/25'
                }`}
                style={{
                  backgroundColor: isOutOfStock ? '#E2E8F0' : '#8E1EA2',
                }}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isOutOfStock ? 'Out of Stock' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className={`sm:w-1/3 py-3.5 px-4 rounded-xl font-semibold text-sm border transition-all active:scale-95 ${
                  isOutOfStock
                    ? 'border-slate-200 text-slate-300 cursor-not-allowed'
                    : 'border-[#8E1EA2] text-[#8E1EA2] hover:bg-[#FFC0DE]/20 bg-white'
                }`}
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Value Props Strip */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-3 text-center text-xs text-slate-500">
            <div className="p-2.5 rounded-lg bg-slate-50">
              <Truck className="w-4 h-4 mx-auto text-[#8E1EA2] mb-1" />
              <span className="block font-semibold text-slate-800">Free Express</span>
              <span>Orders over $150</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50">
              <RotateCcw className="w-4 h-4 mx-auto text-[#8E1EA2] mb-1" />
              <span className="block font-semibold text-slate-800">30-Day Returns</span>
              <span>Complimentary courier</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50">
              <ShieldCheck className="w-4 h-4 mx-auto text-[#8E1EA2] mb-1" />
              <span className="block font-semibold text-slate-800">100% Authentic</span>
              <span>Haute couture grade</span>
            </div>
          </div>

          {/* Product Specifications & Care Tabs */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex border-b border-slate-200">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'details'
                    ? 'border-[#8E1EA2] text-[#8E1EA2]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications & Material
              </button>
              <button
                onClick={() => setActiveTab('care')}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'care'
                    ? 'border-[#8E1EA2] text-[#8E1EA2]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Care Instructions
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'delivery'
                    ? 'border-[#8E1EA2] text-[#8E1EA2]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Delivery & Returns
              </button>
            </div>

            <div className="py-4 text-xs text-slate-600 leading-relaxed">
              {activeTab === 'details' && (
                <div className="space-y-3">
                  <div>
                    <strong className="text-slate-900 block mb-0.5">Material & Fabric:</strong>
                    <span>{product.material}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">Couture Specifications:</strong>
                    <ul className="list-disc pl-4 space-y-1 text-slate-500">
                      {product.specifications.map((spec, i) => (
                        <li key={i}>{spec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-2">
                  <strong className="text-slate-900 block">Garment Preservation:</strong>
                  <p>{product.careInstructions}</p>
                </div>
              )}

              {activeTab === 'delivery' && (
                <div className="space-y-2">
                  <p>
                    <strong>Domestic Delivery:</strong> Dispatched from our Manhattan atelier within 24 business hours. Arrives in 2–3 business days via UPS Express.
                  </p>
                  <p>
                    <strong>International Delivery:</strong> DHL Worldwide Express delivery arrives in 3–5 business days with duties pre-calculated.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Comments Section */}
      <section id="reviews-section" className="pt-10 border-t border-slate-100 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
              Customer Experiences
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1">
              Verified Client Reviews ({productReviews.length})
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Existing Reviews List */}
          <div className="lg:col-span-7 space-y-4">
            {productReviews.length > 0 ? (
              productReviews.map(rev => (
                <div
                  key={rev.id}
                  className="p-5 rounded-xl bg-white border border-slate-100 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {rev.customerName}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {rev.date}
                      </span>
                    </div>
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < rev.rating ? 'fill-amber-400' : 'text-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-100 text-slate-500 text-xs">
                Be the first to share your experience wearing the {product.name}.
              </div>
            )}
          </div>

          {/* Right Column: Write a Review Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-slate-900">
              Leave a Comment & Review
            </h3>
            <p className="text-xs text-slate-500">
              Share details about the fit, silk drape, and how you styled this dress.
            </p>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-left">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Your Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className="p-1 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= reviewRating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-semibold text-slate-700 ml-2">
                    {reviewRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Genevieve M."
                    value={reviewerName}
                    onChange={e => setReviewerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={reviewerEmail}
                    onChange={e => setReviewerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                  />
                </div>
              </div>

              {/* Comment text */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Review Remarks
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the fabric texture, comfort, tailoring, and occasion..."
                  value={reviewComment}
                  onChange={e => setReviewComment(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
                />
              </div>

              <button
                type="submit"
                disabled={submittingReview}
                className="w-full py-2.5 rounded-xl font-semibold text-xs text-white shadow-sm hover:opacity-95 transition-opacity"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
