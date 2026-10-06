import React, { useEffect, useState } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(Math.max((window.scrollY / totalHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] bg-slate-950/60 backdrop-blur-sm pointer-events-none"
      aria-hidden="true"
    >
      {/* Prismatic Multi-Color Laser Progress Line */}
      <div
        className="h-full bg-gradient-to-r from-fuchsia-500 via-violet-500 via-cyan-400 via-emerald-400 to-amber-400 transition-all duration-75 ease-out relative"
        style={{ width: `${scrollProgress}%` }}
      >
        {/* Trailing Rainbow Laser Spark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#f43f5e,0_0_20px_#a855f7,0_0_30px_#06d6a0] animate-pulse" />
      </div>
    </div>
  );
};
