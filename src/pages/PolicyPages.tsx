import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, RotateCcw, FileText } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-left">
      <div className="pb-4 border-b border-slate-100">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Legal & Trust
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Last updated: October 2026</p>
      </div>

      <div className="prose prose-sm text-slate-600 space-y-4 text-xs sm:text-sm leading-relaxed">
        <p>
          At <strong>Women Clothing</strong>, protecting the privacy of our distinguished clientele is paramount. This Privacy Policy details how we collect, safeguard, and utilize your personal information during your luxury shopping journey.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-900 pt-2">
          1. Information We Collect
        </h3>
        <p>
          When you place a couture order or schedule a sizing consultation, we collect essential details including your name, delivery address, billing email, telephone contact, and sizing preferences. We do not store sensitive payment credentials on our servers; transactions are tokenized through accredited bank-grade processors.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-900 pt-2">
          2. How We Utilize Your Data
        </h3>
        <p>
          Your information is exclusively utilized to tailor, package, and courier your designer dresses, send delivery updates, and curate private invitations if enrolled in our Privé Fashion Club. We never sell or license client records to external brokers.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-900 pt-2">
          3. Security & Encryption
        </h3>
        <p>
          All browser sessions, account logins, and checkout actions are safeguarded with 256-bit SSL encryption. Data storage adheres to rigorous privacy standards.
        </p>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-left">
      <div className="pb-4 border-b border-slate-100">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Agreement
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 2026</p>
      </div>

      <div className="prose prose-sm text-slate-600 space-y-4 text-xs sm:text-sm leading-relaxed">
        <p>
          Welcome to the official online boutique of <strong>Women Clothing</strong>. By accessing our platform and placing orders for designer dresses, you accept and agree to abide by these terms.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-900 pt-2">
          1. Artisanal Authenticity & Sizing
        </h3>
        <p>
          Every gown is handcrafted using natural Grade 6A mulberry silk, pure French laces, and tailored linings. Slight organic variations in weave and drape reflect genuine artisanal craftsmanship. Please refer to our detailed sizing specifications before ordering.
        </p>

        <h3 className="font-serif text-lg font-bold text-slate-900 pt-2">
          2. Pricing & Stock Availability
        </h3>
        <p>
          All dress pricing is listed in USD. Our inventory engine tracks stock in real time. In rare events where two clients attempt to purchase the final inventory unit simultaneously, our atelier honors the first timestamped confirmation.
        </p>
      </div>
    </div>
  );
};

export const ShippingReturnsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8 text-left">
      <div className="pb-4 border-b border-slate-100">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Delivery & Care
        </span>
        <h1 className="text-3xl font-serif font-bold text-slate-900 mt-1">
          Shipping & Return Policy
        </h1>
        <p className="text-xs text-slate-400">Atelier Standards: October 2026</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <Truck className="w-6 h-6 text-[#8E1EA2]" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            Complimentary Worldwide Shipping
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            All orders exceeding $150 receive complimentary express courier delivery. Orders below $150 incur a flat $15 delivery fee. Domestic shipments arrive in 2–3 business days via UPS Express.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <RotateCcw className="w-6 h-6 text-[#8E1EA2]" />
          <h3 className="font-serif text-lg font-bold text-slate-900">
            30-Day Effortless Returns
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We want you to feel magnificent in every dress. We offer 30-day returns on unworn gowns with original security tags and archival tissue intact. Complimentary courier pickup labels are included.
          </p>
        </div>
      </div>
    </div>
  );
};
