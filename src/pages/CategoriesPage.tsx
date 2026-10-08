import React from 'react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES_LIST } from '../data/initialData';
import { ArrowRight, Sparkles } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase font-semibold tracking-widest text-[#8E1EA2]">
          Curated Portfolios
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900">
          Explore Couture Categories
        </h1>
        <p className="text-sm text-slate-600">
          Discover our specialized collections tailored for grand galas, sunset weddings, garden soirees, and polished daywear.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {CATEGORIES_LIST.map(cat => (
          <div
            key={cat.id}
            onClick={() => {
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group relative rounded-2xl overflow-hidden aspect-[3/4] bg-slate-100 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={cat.image}
              alt={cat.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent" />

            <div className="absolute bottom-5 inset-x-5 text-white space-y-1">
              <span className="text-[11px] font-semibold text-[#FFC0DE] block">
                {cat.count}
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight text-white group-hover:text-[#FFC0DE] transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {cat.description}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-semibold text-[#FFC0DE] group-hover:translate-x-1 transition-transform">
                <span>View Designs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
