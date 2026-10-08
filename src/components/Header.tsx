import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import {
  ShoppingBag,
  Heart,
  User,
  ShieldCheck,
  Search,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    cartTotal,
    wishlist,
    currentUser,
    switchToAdmin,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showTopBanner, setShowTopBanner] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { label: 'Home', view: 'home' as const },
    { label: 'Shop Dresses', view: 'shop' as const },
    { label: 'Collections', view: 'categories' as const },
    { label: 'About Us', view: 'about' as const },
    { label: 'Contact', view: 'contact' as const },
  ];

  const handleNavClick = (view: any) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentView('shop');
      setSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 transition-all">
      {/* Slim Promotional Announcement Banner */}
      {showTopBanner && (
        <div
          className="relative text-xs py-1.5 px-4 text-center text-slate-800 font-medium flex items-center justify-center gap-2 overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #FFC0DE, #ED96D7, #C654C3, #FFC0DE)',
          }}
        >
          <div className="flex items-center gap-2 truncate">
            <Sparkles className="w-3.5 h-3.5 text-[#8E1EA2] shrink-0" />
            <span className="font-semibold text-[#8E1EA2]">Autumn Gala Exclusive:</span>
            <span>Complimentary express delivery on orders over $150 · Use code</span>
            <span className="px-1.5 py-0.2 rounded bg-white/80 font-mono text-slate-900 font-bold text-[11px]">
              ELEGANCE20
            </span>
            <span>for 20% off</span>
          </div>
          <button
            onClick={() => setShowTopBanner(false)}
            aria-label="Dismiss banner"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-900 transition-colors p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Top Navigation (3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Wordmark / Logo */}
          <div className="flex items-center">
            <BrandLogo
              size="md"
              showTagline={true}
              onClick={() => handleNavClick('home')}
            />
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-slate-600">
            {navLinks.map(link => {
              const isActive = currentView === link.view;
              return (
                <button
                  key={link.view}
                  onClick={() => handleNavClick(link.view)}
                  className={`relative py-1 transition-colors hover:text-[#8E1EA2] whitespace-nowrap ${
                    isActive
                      ? 'text-[#8E1EA2] font-semibold'
                      : 'text-slate-700'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8E1EA2] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Icon / Toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-600 hover:text-[#8E1EA2] hover:bg-slate-50 rounded-full transition-colors"
              title="Search collection"
              aria-label="Search collection"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavClick('wishlist')}
              className="relative p-2 text-slate-600 hover:text-[#8E1EA2] hover:bg-slate-50 rounded-full transition-colors"
              title="Saved items"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-5 h-5 ${
                  wishlist.length > 0 ? 'fill-[#ED96D7] text-[#8E1EA2]' : ''
                }`}
              />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#8E1EA2] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Bag / Cart */}
            <button
              onClick={() => handleNavClick('cart')}
              className="relative p-2 text-slate-700 hover:text-[#8E1EA2] hover:bg-slate-50 rounded-full transition-colors flex items-center gap-1.5"
              title="Shopping bag"
              aria-label="Shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5" />
                {cartTotal.itemsCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
                    style={{ backgroundColor: '#8E1EA2' }}
                  >
                    {cartTotal.itemsCount}
                  </span>
                )}
              </div>
              <span className="hidden md:inline text-xs font-semibold tabular-nums text-slate-800">
                ${cartTotal.subtotal.toFixed(0)}
              </span>
            </button>

            {/* Customer Account */}
            <button
              onClick={() => handleNavClick('account')}
              className="p-2 text-slate-600 hover:text-[#8E1EA2] hover:bg-slate-50 rounded-full transition-colors hidden sm:flex items-center gap-1 text-xs font-medium"
              title="My Account"
              aria-label="My Account"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="max-w-[80px] truncate text-slate-700">
                  {currentUser.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Admin Switcher Quick Action */}
            <button
              onClick={() => switchToAdmin()}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#8E1EA2] bg-slate-50 hover:bg-[#FFC0DE]/30 border border-slate-200/80 rounded-lg transition-colors whitespace-nowrap"
              title="Open Admin Management System"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#8E1EA2]" />
              <span>Admin Portal</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#8E1EA2] rounded-lg lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {searchOpen && (
          <div className="py-3 border-t border-slate-100">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
              <input
                type="text"
                placeholder="Search designer dresses by name, category, or SKU (e.g., Silk Maxi, DR-001)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-24 py-2 text-sm bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#8E1EA2] focus:border-[#8E1EA2]"
              />
              <button
                type="submit"
                className="absolute right-1 px-4 py-1.5 text-xs font-medium text-white rounded-md transition-opacity"
                style={{ backgroundColor: '#8E1EA2' }}
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.view}
                onClick={() => handleNavClick(link.view)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium ${
                  currentView === link.view
                    ? 'bg-[#FFC0DE]/20 text-[#8E1EA2] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('account')}
                className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg text-left"
              >
                <User className="w-4 h-4 text-[#8E1EA2]" />
                <span>My Account ({currentUser?.name || 'Guest'})</span>
              </button>
              <button
                onClick={() => {
                  switchToAdmin();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 px-3 text-sm font-medium text-[#8E1EA2] bg-[#FFC0DE]/20 rounded-lg text-left"
              >
                <ShieldCheck className="w-4 h-4 text-[#8E1EA2]" />
                <span>Admin Management Dashboard</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
