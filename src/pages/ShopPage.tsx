import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  Star,
  Check,
} from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products } = useStore();

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(600);
  const [selectedSize, setSelectedSize] = useState<string>('All');
  const [selectedColor, setSelectedColor] = useState<string>('All');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('All');
  const [selectedMinRating, setSelectedMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('newest');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Available unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => set.add(p.category));
    return ['All', ...Array.from(set)];
  }, [products]);

  const sizes = ['All', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const brandColors = [
    { label: 'All', hex: '' },
    { label: 'Soft Pink', hex: '#FFC0DE' },
    { label: 'Royal Purple', hex: '#8E1EA2' },
    { label: 'Light Magenta', hex: '#ED96D7' },
    { label: 'Elegant Purple', hex: '#C654C3' },
  ];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(product => {
        // Search by name, category, SKU
        if (searchTerm.trim()) {
          const query = searchTerm.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          const matchSku = product.sku.toLowerCase().includes(query);
          if (!matchName && !matchCat && !matchSku) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }

        // Price range
        if (product.price > priceRange) {
          return false;
        }

        // Size filter
        if (selectedSize !== 'All' && !product.sizes.includes(selectedSize)) {
          return false;
        }

        // Color filter
        if (selectedColor !== 'All') {
          const hasColor = product.colors.some(
            c => c.name.toLowerCase() === selectedColor.toLowerCase()
          );
          if (!hasColor) return false;
        }

        // Availability filter
        if (selectedAvailability === 'in-stock') {
          if (product.stock <= 0) return false;
        } else if (selectedAvailability === 'low-stock') {
          if (product.stock <= 0 || product.stock > product.lowStockThreshold) return false;
        } else if (selectedAvailability === 'out-of-stock') {
          if (product.stock > 0) return false;
        }

        // Rating filter
        if (selectedMinRating > 0 && product.rating < selectedMinRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'popular') return (b.reviewsCount || 0) - (a.reviewsCount || 0);
        if (sortBy === 'rated') return b.rating - a.rating;
        // default newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [
    products,
    searchTerm,
    selectedCategory,
    priceRange,
    selectedSize,
    selectedColor,
    selectedAvailability,
    selectedMinRating,
    sortBy,
  ]);

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setPriceRange(600);
    setSelectedSize('All');
    setSelectedColor('All');
    setSelectedAvailability('All');
    setSelectedMinRating(0);
    setSortBy('newest');
  };

  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'All' ||
    priceRange < 600 ||
    selectedSize !== 'All' ||
    selectedColor !== 'All' ||
    selectedAvailability !== 'All' ||
    selectedMinRating > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-slate-100 text-left">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Boutique Catalog
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Shop Designer Dresses
        </h1>
        <p className="text-sm text-slate-600 max-w-2xl">
          Explore our complete collection of handmade evening gowns, party wear, bridal reception attire, and effortless daytime silhouettes crafted from pure mulberry silks.
        </p>
      </div>

      {/* Top Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by dress name, category, or SKU (e.g., Silk Maxi, DR-001)..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2] focus:border-[#8E1EA2]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort & Mobile Filter Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="md:hidden flex items-center gap-2 px-4 py-2.5 text-sm font-medium border border-slate-200 rounded-lg bg-slate-50 text-slate-700"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#8E1EA2]" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#8E1EA2]" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 whitespace-nowrap hidden sm:inline">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2]"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rated">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Filters Sidebar + Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Sidebar (and Mobile Drawer) */}
        <aside
          className={`${
            mobileFilterOpen
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto block'
              : 'hidden md:block md:col-span-3'
          } space-y-6 bg-white md:bg-transparent rounded-xl md:rounded-none`}
        >
          {mobileFilterOpen && (
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 md:hidden">
              <h3 className="font-serif text-lg font-bold text-slate-900">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Reset Filters */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="w-full py-2 px-3 rounded-lg text-xs font-semibold text-[#8E1EA2] bg-[#FFC0DE]/30 border border-[#ED96D7]/40 hover:bg-[#FFC0DE]/50 transition-colors flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}

          {/* Filter: Categories */}
          <div className="space-y-3 pb-5 border-b border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Categories
            </h4>
            <div className="space-y-1.5">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-[#FFC0DE]/40 text-[#8E1EA2] font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Max Price Range */}
          <div className="space-y-3 pb-5 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
                Max Price
              </h4>
              <span className="text-xs font-bold text-[#8E1EA2] tabular-nums">
                ${priceRange}
              </span>
            </div>
            <input
              type="range"
              min="150"
              max="600"
              step="25"
              value={priceRange}
              onChange={e => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#8E1EA2]"
            />
            <div className="flex justify-between text-[11px] text-slate-400">
              <span>$150</span>
              <span>$600+</span>
            </div>
          </div>

          {/* Filter: Size */}
          <div className="space-y-3 pb-5 border-b border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Size
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md border transition-all ${
                    selectedSize === size
                      ? 'border-[#8E1EA2] bg-[#8E1EA2] text-white shadow-sm'
                      : 'border-slate-200 text-slate-700 bg-white hover:border-slate-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Color Palette */}
          <div className="space-y-3 pb-5 border-b border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Color Palette
            </h4>
            <div className="flex flex-wrap gap-2">
              {brandColors.map(c => (
                <button
                  key={c.label}
                  onClick={() => setSelectedColor(c.label)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full border transition-all ${
                    selectedColor === c.label
                      ? 'border-[#8E1EA2] bg-[#FFC0DE]/30 text-[#8E1EA2] font-semibold'
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-50'
                  }`}
                >
                  {c.hex && (
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/10"
                      style={{ backgroundColor: c.hex }}
                    />
                  )}
                  <span>{c.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filter: Stock Availability */}
          <div className="space-y-3 pb-5 border-b border-slate-100">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Availability
            </h4>
            <div className="space-y-1.5">
              {[
                { label: 'All Dresses', val: 'All' },
                { label: 'In Stock Only', val: 'in-stock' },
                { label: 'Low Stock (< 4)', val: 'low-stock' },
                { label: 'Out of Stock', val: 'out-of-stock' },
              ].map(opt => (
                <label
                  key={opt.val}
                  className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer hover:text-slate-900"
                >
                  <input
                    type="radio"
                    name="stockAvailability"
                    checked={selectedAvailability === opt.val}
                    onChange={() => setSelectedAvailability(opt.val)}
                    className="accent-[#8E1EA2]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filter: Rating */}
          <div className="space-y-3 pb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Minimum Rating
            </h4>
            <div className="space-y-1">
              {[
                { label: 'Any Rating', stars: 0 },
                { label: '4.8 Stars & Above', stars: 4.8 },
                { label: '5.0 Stars Perfect', stars: 5.0 },
              ].map(r => (
                <button
                  key={r.stars}
                  onClick={() => setSelectedMinRating(r.stars)}
                  className={`w-full text-left py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-between ${
                    selectedMinRating === r.stars
                      ? 'bg-[#FFC0DE]/40 text-[#8E1EA2] font-semibold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{r.label}</span>
                  </div>
                  {selectedMinRating === r.stars && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>

          {mobileFilterOpen && (
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3 rounded-xl font-semibold text-sm text-white md:hidden"
              style={{ backgroundColor: '#8E1EA2' }}
            >
              Apply Filters ({filteredProducts.length} Results)
            </button>
          )}
        </aside>

        {/* Product Cards Grid Area */}
        <main className="md:col-span-9 space-y-6">
          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
            <span>
              Showing <strong className="text-slate-900">{filteredProducts.length}</strong>{' '}
              {filteredProducts.length === 1 ? 'dress' : 'dresses'}
            </span>
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="text-[#8E1EA2] font-medium hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>

          {/* Products Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-100 shadow-sm space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
                <Filter className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-slate-900">
                No matching dresses found
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Try widening your price range, clearing specific size or color filters, or searching with different keywords.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white transition-opacity"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
