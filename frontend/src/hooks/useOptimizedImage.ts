import { useState, useEffect } from 'react';

interface ImageOptions {
  src: string;
  placeholder?: string;
  blur?: boolean;
  quality?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
}

export const useOptimizedImage = ({
  src,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23333"%3E%3C/rect%3E%3C/svg%3E',
  blur = true,
  loading = 'lazy',
}: ImageOptions) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!imageRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(imageRef);

    return () => {
      if (imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef]);

  useEffect(() => {
    if (!isInView && loading === 'lazy') return;

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoading(false);
    };

    img.onerror = () => {
      setIsLoading(false);
    };
  }, [isInView, src, loading]);

  return {
    imageSrc,
    imageRef: setImageRef,
    isLoading,
    imageProps: {
      src: imageSrc,
      loading,
      decoding: 'async' as const,
      className: `${isLoading && blur ? 'blur-sm' : ''} transition-all duration-300`,
      style: {
        backgroundColor: isLoading ? '#1a1a1a' : 'transparent',
      },
    },
  };
};
