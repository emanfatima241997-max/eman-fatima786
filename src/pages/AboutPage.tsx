import React from 'react';
import { useStore } from '../context/StoreContext';
import { BrandLogo } from '../components/BrandLogo';
import { ArrowRight, Sparkles, Award, Heart, CheckCircle2 } from 'lucide-react';
import { heroImg, bridalPartyImg } from '../data/initialData';

export const AboutPage: React.FC = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC0DE]/40 border border-[#ED96D7]/40 text-xs font-semibold text-[#8E1EA2]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Atelier Story & Vision</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 leading-tight">
            Style for Every You.
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            Founded with the belief that luxury clothing should celebrate the manifold facets of womanhood, <strong>Women Clothing</strong> unites timeless haute couture tailoring with contemporary modern silhouettes.
          </p>

          <p className="text-sm text-slate-600 leading-relaxed">
            From the romantic whisper of tiered silk chiffons to the regal presence of royal purple velvet and blush bridal lace, every dress is sketched, patterned, and stitched in small artisanal batches to honor your most cherished moments.
          </p>

          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentView('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3 rounded-xl font-semibold text-xs text-white shadow-md flex items-center gap-2"
              style={{ backgroundColor: '#8E1EA2' }}
            >
              <span>Explore The Atelier</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5]">
            <img
              src={heroImg}
              alt="Atelier runway gown"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Craftsmanship Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-slate-100">
        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Grade 6A Mulberry Silk
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We partner exclusively with sustainable sericulture farms, weaving our silk crepes, georgettes, and velvets to uncompromising standards.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Bespoke Architectural Draping
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every pattern undergoes rigorous draping on real women of varied statures to ensure comfort, poise, and fluid movement that flows naturally.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#FFC0DE]/30 flex items-center justify-center text-[#8E1EA2]">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-xl font-bold text-slate-900">
            Conscious Limited Batches
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We reject mass production. By producing in limited quantities, we ensure zero inventory waste and exceptional attention to every French seam.
          </p>
        </div>
      </div>
    </div>
  );
};
