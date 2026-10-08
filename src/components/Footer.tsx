import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from './BrandLogo';
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Welcome to the Women Clothing VIP circle!');
    setNewsletterEmail('');
  };

  const navigateTo = (view: any) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter Highlight Bar */}
        <div className="rounded-2xl p-8 sm:p-10 mb-16 relative overflow-hidden bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800">
          <div
            className="absolute -right-20 -top-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#8E1EA2' }}
          />
          <div
            className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ backgroundColor: '#ED96D7' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-2">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#ED96D7]">
                Privé Fashion Club
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white tracking-tight">
                Subscribe to our newsletter
              </h3>
              <p className="text-slate-400 text-sm max-w-xl">
                Receive private invitations to seasonal runway debuts, bespoke styling insights, and secret 20% member promotions directly to your inbox.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-[#8E1EA2]/40 text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>You are subscribed! Check your inbox for your 20% welcome code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={e => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 px-4 py-3 bg-white/10 rounded-xl text-white placeholder-slate-400 text-sm border border-slate-700 focus:outline-none focus:border-[#C654C3] focus:ring-1 focus:ring-[#C654C3]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 hover:opacity-95 transition-opacity shrink-0"
                    style={{ backgroundColor: '#8E1EA2' }}
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Multi-column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white inline-block p-2 rounded-xl">
              <BrandLogo size="md" showTagline={false} onClick={() => navigateTo('home')} />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              Women Clothing represents the pinnacle of modern femininity, curating luxurious designer gowns, cocktail attire, and bespoke wedding couture crafted with pure mulberry silks, French chantilly lace, and architectural silhouettes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                onClick={e => { e.preventDefault(); showToast('Opening boutique Instagram @womenclothing'); }}
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#8E1EA2] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                onClick={e => { e.preventDefault(); showToast('Opening Facebook page'); }}
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#8E1EA2] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#pinterest"
                onClick={e => { e.preventDefault(); showToast('Opening Pinterest lookbook boards'); }}
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#8E1EA2] transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#twitter"
                onClick={e => { e.preventDefault(); showToast('Opening Twitter feed'); }}
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-[#8E1EA2] transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Shop Collections
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-white transition-colors">
                  All Designer Dresses
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-white transition-colors">
                  Party & Gala Wear
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-white transition-colors">
                  Bridal & Reception Couture
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-white transition-colors">
                  Summer Chiffon Edit
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('categories')} className="hover:text-white transition-colors">
                  Winter Jewel Velvets
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Customer Care
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact Us & Concierge
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-returns')} className="hover:text-white transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shipping-returns')} className="hover:text-white transition-colors">
                  Return & Exchange Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-white transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-white transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-white transition-colors">
                  Track My Order
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-white">
              Flagship Atelier
            </h4>
            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#ED96D7] shrink-0 mt-0.5" />
                <span>742 Fifth Avenue, Atelier 18, New York, NY 10019</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#ED96D7] shrink-0" />
                <span>+1 (800) 845-9623</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#ED96D7] shrink-0" />
                <span>concierge@womenclothing.fashion</span>
              </div>
              <div className="text-xs text-slate-500 pt-2 border-t border-slate-800">
                Opening Hours: Mon–Sat 10:00 AM – 7:00 PM EST
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© 2026 Women Clothing. All Rights Reserved. Style for Every You.</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-[#ED96D7]" />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400 font-medium">Visa · Mastercard · AMEX · PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
