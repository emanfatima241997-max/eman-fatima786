import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES_LIST } from '../data/initialData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  Award,
  Clock,
  Star,
  CheckCircle,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, setCurrentView, setSelectedProductId } = useStore();

  // Countdown timer for Special Offer section
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const newArrivals = products.filter(p => p.isNewArrival).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);
  const trendingDresses = products.filter(p => p.isTrending).slice(0, 3);

  // Customer Reviews
  const featuredReviews = [
    {
      name: 'Victoria Hastings',
      location: 'New York, NY',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      comment:
        'The Royal Purple Embroidered Gala Gown exceeded every expectation. The weight of the silk drape and precision of the beadwork is rivaled only by Paris couture houses.',
      dress: 'Royal Purple Embroidered Gala Gown',
    },
    {
      name: 'Genevieve Moreau',
      location: 'Paris, France',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      comment:
        'The pastel pink maxi dress is luminous. It fits like a dream, moves with majestic grace, and arrived wrapped in scented archival tissue inside a custom boutique box.',
      dress: 'Ethereal Pastel Pink Silk Maxi',
    },
    {
      name: 'Charlotte Davenport',
      location: 'London, UK',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
      comment:
        'Finding genuine 100% mulberry silk dresses with architectural corsetry at this price point is unheard of. Their customer concierge service is impeccable.',
      dress: 'Blush Blossom Bridal Reception',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF9F8] border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Editorial Headline & Actions */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC0DE]/40 border border-[#ED96D7]/40 text-xs font-semibold tracking-wide text-[#8E1EA2]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Autumn Haute Couture Collection · 2026</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-slate-900 tracking-tight leading-[1.08] text-balance">
                Elegance Designed for Every Woman
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
                Discover our signature designer collection: from regal embroidered Shalwar Kameez and chic silk pants & shirt sets, to heavy hand-embellished pastel formals, ethereal flared maxis, and effortless casual pret.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 rounded-xl font-semibold text-sm text-white shadow-lg shadow-[#8E1EA2]/25 hover:opacity-95 transition-all active:scale-95 flex items-center gap-2"
                  style={{ backgroundColor: '#8E1EA2' }}
                >
                  <span>Shop Collection</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentView('categories');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-800 bg-white border border-slate-200 hover:border-[#8E1EA2] hover:text-[#8E1EA2] shadow-sm transition-all active:scale-95"
                >
                  Explore Categories
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-200/60 grid grid-cols-3 gap-4 text-xs text-slate-500">
                <div>
                  <span className="block font-bold text-slate-900 text-sm tabular-nums">
                    100%
                  </span>
                  <span>Pure Mulberry Silk</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-sm tabular-nums">
                    Bespoke
                  </span>
                  <span>Couture Tailoring</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-sm tabular-nums">
                    Complimentary
                  </span>
                  <span>Global Express</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[3/4] sm:aspect-[4/5]">
                <img
                  src={products[0]?.images[0]}
                  alt="High fashion luxury model wearing blush pink and royal purple gown"
                  className="w-full h-full object-cover object-top"
                />

                {/* Floating Highlight Card */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E1EA2]">
                      Signature Piece
                    </span>
                    <h4 className="font-serif font-semibold text-slate-900 text-sm line-clamp-1">
                      {products[0]?.name}
                    </h4>
                    <span className="text-xs font-bold text-slate-900 tabular-nums">
                      ${products[0]?.price}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      if (products[0]) {
                        setSelectedProductId(products[0].id);
                        setCurrentView('product-detail');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity shrink-0"
                    style={{ backgroundColor: '#8E1EA2' }}
                  >
                    View Dress
                  </button>
                </div>
              </div>

              {/* Decorative Subtle Background Aura */}
              <div
                className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: '#FFC0DE' }}
              />
              <div
                className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: '#8E1EA2' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
              Curated Wardrobe
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              Featured Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('categories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 text-sm font-semibold text-[#8E1EA2] hover:underline flex items-center gap-1"
          >
            <span>View All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_LIST.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-4 inset-x-4 text-white">
                <span className="text-[11px] font-medium text-[#FFC0DE] block">
                  {cat.count}
                </span>
                <h3 className="font-serif text-lg font-semibold tracking-tight text-white group-hover:text-[#FFC0DE] transition-colors">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
              Fresh Off The Runway
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              New Arrivals
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 text-sm font-semibold text-[#8E1EA2] hover:underline flex items-center gap-1"
          >
            <span>Browse All New Pieces</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 4. Special Offers Promotional Banner with Countdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="relative rounded-2xl p-8 sm:p-12 overflow-hidden shadow-xl border border-pink-200/50"
          style={{
            background: 'linear-gradient(135deg, #FFF1F7, #FFE2F1, #FAF0F9)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-white text-[#8E1EA2] shadow-sm inline-block">
                Limited Gala Promotion · 20% Off
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 leading-tight">
                Exclusive Evening Gala Offer
              </h2>
              <p className="text-sm sm:text-base text-slate-600 max-w-lg">
                Enjoy 20% off all floor-sweeping designer evening gowns and silk maxis. Limited atelier production batches remain for immediate dispatch.
              </p>

              {/* Visual Countdown Box */}
              <div className="pt-2 flex items-center gap-3">
                <div className="flex items-center gap-2 text-center">
                  <div className="bg-white rounded-lg p-2.5 min-w-[58px] shadow-sm border border-pink-100">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-[#8E1EA2]">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Hours</span>
                  </div>
                  <span className="text-xl font-bold text-slate-400">:</span>
                  <div className="bg-white rounded-lg p-2.5 min-w-[58px] shadow-sm border border-pink-100">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-[#8E1EA2]">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Mins</span>
                  </div>
                  <span className="text-xl font-bold text-slate-400">:</span>
                  <div className="bg-white rounded-lg p-2.5 min-w-[58px] shadow-sm border border-pink-100">
                    <span className="block font-mono text-xl sm:text-2xl font-bold text-[#8E1EA2]">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] text-slate-400 uppercase font-medium">Secs</span>
                  </div>
                </div>

                <div className="hidden sm:block pl-4 text-xs text-slate-500 border-l border-pink-200">
                  <div className="flex items-center gap-1 font-semibold text-rose-600">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Low Stock Alert</span>
                  </div>
                  <span>Fewer than 15 pieces remaining at offer rate</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setCurrentView('shop');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-7 py-3 rounded-xl font-semibold text-sm text-white shadow-md hover:opacity-95 transition-all"
                  style={{ backgroundColor: '#8E1EA2' }}
                >
                  Shop Special Offers
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm rounded-xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={products[1]?.images[0]}
                  alt="Royal Purple Embroidered Gala Gown"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#8E1EA2] text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                  20% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
              Loved By Our Patrons
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
              Best Sellers
            </h2>
          </div>
          <button
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-3 sm:mt-0 text-sm font-semibold text-[#8E1EA2] hover:underline flex items-center gap-1"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* 6. Trending Collection Spotlight */}
      <section className="bg-gradient-to-b from-white to-[#FAF8FA] py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
              Trending Silhouettes
            </span>
            <h2 className="text-3xl font-serif font-bold text-slate-900">
              The Season's Most Desired Dresses
            </h2>
            <p className="text-sm text-slate-600">
              Captivating cuts, dramatic draping, and soft romantic hues trending across international galas and high-fashion capitals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingDresses.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            The Atelier Standard
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
            Why Choose Women Clothing
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Premium Quality</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              100% Grade 6A mulberry silk and French lace with artisanal hand-finishing.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Secure Shopping</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Bank-grade 256-bit encrypted checkout with verified buyer protection.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Fast Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Complimentary expedited express delivery worldwide on orders over $150.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Easy Returns</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hassle-free 30-day returns and exchanges with prepaid return courier labels.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-slate-900">Personal Concierge</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dedicated fashion stylists ready to assist with sizing and gala coordination.
            </p>
          </div>
        </div>
      </section>

      {/* 8. Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
            Client Stories
          </span>
          <h2 className="text-3xl font-serif font-bold text-slate-900 mt-1">
            Praised by Women Worldwide
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredReviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl bg-white border border-slate-100 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#ED96D7]/30 flex items-center justify-center font-bold text-[#8E1EA2] text-sm">
                  {rev.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900">{rev.name}</span>
                    <CheckCircle className="w-3 h-3 text-[#8E1EA2]" />
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
