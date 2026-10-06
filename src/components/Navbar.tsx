import React, { useState, useEffect } from 'react';
import { EVENT_DATA } from '../data/eventData';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { SafeImage } from './SafeImage';
import { AudioController } from './AudioController';
import { audioEngine } from '../utils/audioEngine';

interface NavbarProps {
  onOpenRegisterModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'schedule', 'speakers', 'about', 'societies'];
      const scrollPos = window.scrollY + 140;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (href: string) => {
    audioEngine.playClick();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#070D1E]/95 backdrop-blur-md border-b border-purple-500/20 shadow-xl shadow-purple-950/20 py-2.5'
          : 'bg-[#070D1E]/80 backdrop-blur-sm border-b border-slate-800/40 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: IEEE logo + Colorful Event Brand */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#hero');
            }}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-lg p-1"
            aria-label="IEEE InnovateX 2026 Home"
          >
            <div className="h-8 flex items-center justify-center p-1 bg-slate-900/80 rounded-lg border border-purple-500/30">
              <SafeImage
                src={EVENT_DATA.assets.ieeeLogo}
                alt="IEEE Official Logo"
                className="h-6 w-auto object-contain filter brightness-110"
                fallbackText="IEEE"
              />
            </div>
            <div className="h-4 w-[1px] bg-slate-700/80 hidden sm:block" aria-hidden="true" />
            <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-pink-300 transition-colors whitespace-nowrap flex items-center gap-1">
              <span>InnovateX</span>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-mono text-sm sm:text-base font-extrabold">
                2026
              </span>
            </span>
          </a>

          {/* Right: Desktop Navigation Links + Audio + Register Action */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-3" aria-label="Main Navigation">
            {EVENT_DATA.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`px-3 py-1.5 text-xs lg:text-sm font-medium transition-all rounded-xl ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-pink-500/50 shadow-sm font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}

            {/* Audio Toggle Control */}
            <div className="mx-1">
              <AudioController />
            </div>

            <div className="w-[1px] h-4 bg-slate-800 mx-1" aria-hidden="true" />

            {/* Primary Action CTA with Vivid Multi-Color Gradient */}
            <button
              onClick={() => {
                audioEngine.playClick();
                onOpenRegisterModal();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs lg:text-sm font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-400 active:scale-95 rounded-xl transition-all duration-150 shadow-lg shadow-purple-950/60 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 border border-pink-400/40 font-mono"
            >
              <span>Register</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-pink-200" aria-hidden="true" />
            </button>
          </nav>

          {/* Mobile Right Controls: Audio + Register + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <AudioController />

            <button
              onClick={() => {
                audioEngine.playClick();
                onOpenRegisterModal();
              }}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-lg transition-colors whitespace-nowrap font-mono shadow-sm"
            >
              Register
            </button>

            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="md:hidden bg-[#0A1024]/98 border-b border-purple-500/30 shadow-2xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          {EVENT_DATA.navigation.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`block px-4 py-2.5 text-base font-medium rounded-xl transition-colors ${
                  isActive
                    ? 'text-pink-300 bg-purple-950/60 border border-pink-500/40 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </a>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                audioEngine.playClick();
                setMobileMenuOpen(false);
                onOpenRegisterModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-center font-bold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-cyan-600 rounded-xl transition-colors shadow-lg shadow-purple-950/60 font-mono"
            >
              <span>Register Now</span>
              <ArrowUpRight className="w-4 h-4 text-pink-200" aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
