import React from 'react';
import logoImg from '../assets/images/brand_logo_women_clothing_1791437844371.jpg';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showTagline = true,
  showText = true,
  className = '',
  onClick,
}) => {
  const sizeMap = {
    sm: { img: 'w-10 h-10', text: 'text-lg', sub: 'text-[9px]', script: 'text-[10px]' },
    md: { img: 'w-14 h-14', text: 'text-2xl', sub: 'text-[10px]', script: 'text-xs' },
    lg: { img: 'w-20 h-20', text: 'text-3xl', sub: 'text-xs', script: 'text-sm' },
    xl: { img: 'w-28 h-28', text: 'text-4xl', sub: 'text-sm', script: 'text-base' },
  };

  const currentSize = sizeMap[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 select-none ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      {/* Uploaded Luxury Circular Logo Image */}
      <div
        className={`relative shrink-0 rounded-full overflow-hidden p-[2px] transition-transform duration-300 group-hover:scale-105 shadow-md ${currentSize.img}`}
        style={{
          background: 'linear-gradient(135deg, #FFC0DE, #ED96D7, #C654C3, #8E1EA2)',
          boxShadow: '0 4px 14px rgba(198, 84, 195, 0.25)',
        }}
      >
        <div className="w-full h-full rounded-full bg-white overflow-hidden flex items-center justify-center">
          <img
            src={logoImg}
            alt="Women Clothing — Style for Every You"
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Typography Stack */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-serif tracking-tight font-semibold ${currentSize.text} text-slate-900 group-hover:text-[#8E1EA2] transition-colors`}
            >
              Women
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full inline-block mb-1"
              style={{ backgroundColor: '#8E1EA2' }}
            />
          </div>

          <div className="flex items-center gap-1.5 my-0.5">
            <span className="h-[1px] w-3 bg-[#ED96D7]" />
            <span
              className={`tracking-[0.25em] uppercase font-semibold text-slate-700 ${currentSize.sub}`}
            >
              CLOTHING
            </span>
            <span className="h-[1px] w-3 bg-[#ED96D7]" />
          </div>

          {showTagline && (
            <span
              className={`italic font-serif text-[#8E1EA2]/90 tracking-wide ${currentSize.script}`}
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Style for Every You
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export { logoImg };
