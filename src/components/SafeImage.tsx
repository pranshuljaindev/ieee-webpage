import React, { useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackText,
  fallbackIcon,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs text-center rounded ${containerClassName}`}
        role="img"
        aria-label={alt || 'Image placeholder'}
      >
        {fallbackIcon && <div className="mb-1 text-slate-400">{fallbackIcon}</div>}
        <span className="font-mono text-[11px] font-medium tracking-tight text-slate-300 truncate max-w-full px-1">
          {fallbackText || alt || 'Image Unavailable'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      referrerPolicy="no-referrer"
      loading="lazy"
      {...props}
    />
  );
};
