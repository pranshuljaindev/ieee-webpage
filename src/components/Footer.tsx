import React from 'react';
import { EVENT_DATA } from '../data/eventData';
import { SafeImage } from './SafeImage';
import { ArrowUp, Mail, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050914] text-slate-400 border-t border-slate-800">
      
      {/* 1. Provided Footer Banner Area (Maintained Aspect Ratio, No Distortion) */}
      <div className="border-b border-slate-800/80 bg-slate-950/60 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <div className="w-full max-w-4xl overflow-hidden rounded-xl border border-slate-800/60 shadow-lg bg-[#070D1E]/40 p-2 sm:p-4">
            <SafeImage
              src={EVENT_DATA.assets.footerBanner}
              alt="IEEE InnovateX 2026 Official Footer Graphic"
              className="w-full h-auto object-contain max-h-32 mx-auto filter brightness-105"
              fallbackText="IEEE InnovateX 2026 - IEEE / IAS / RAS"
            />
          </div>
          <div className="text-[11px] font-mono text-slate-400 mt-2">
            Provided Symposium Banner Asset · 1080×167 Aspect Ratio Maintained
          </div>
        </div>
      </div>

      {/* 2. Main Footer Navigation & Brand Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1 & 2: Brand Lockup & Purpose */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <SafeImage
                src={EVENT_DATA.assets.ieeeLogo}
                alt="IEEE"
                className="h-8 w-auto object-contain filter brightness-110"
                fallbackText="IEEE"
              />
              <div className="h-4 w-[1px] bg-slate-700" />
              <span className="text-lg font-bold text-white tracking-tight">
                {EVENT_DATA.event.shortName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An IEEE Student Society technical initiative fostering research inquiry, robotics development, and applied engineering innovation across emerging disciplines.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span>Contact: {EVENT_DATA.event.contactEmail}</span>
            </div>
          </div>

          {/* Col 3: Navigation Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {EVENT_DATA.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-sky-400 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#register"
                  className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                >
                  Registration Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Associated IEEE Societies */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
              Technical Groups
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {EVENT_DATA.societies.map((soc) => (
                <li key={soc.id}>
                  <a
                    href={soc.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors block"
                  >
                    <span className="font-semibold text-slate-300">{soc.abbr}</span>
                    <span className="block text-[11px] text-slate-400 truncate max-w-xs">{soc.fullName}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Social Media Placeholders */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-semibold text-slate-200 uppercase tracking-wider">
              Connect
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {EVENT_DATA.socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-sky-400 transition-colors flex items-center justify-between"
                  >
                    <span>{social.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">[Placeholder]</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* 3. Bottom Legal & Back to Top Strip */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>
              © {new Date().getFullYear()} {EVENT_DATA.event.name}. Organized by {EVENT_DATA.event.organizer}.
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              All IEEE, IAS, and RAS trademarks and visual marks belong to the Institute of Electrical and Electronics Engineers.
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-800"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
