// Performance optimization utilities

// Debounce function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Throttle function
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Memoization
export const memoize = <T extends (...args: any[]) => any>(fn: T) => {
  const cache = new Map();
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

// Lazy load images
export const lazyLoadImage = (imageUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(imageUrl);
    img.onerror = reject;
    img.src = imageUrl;
  });
};

// Request idle callback polyfill
export const requestIdleCallback =
  window.requestIdleCallback ||
  ((cb: IdleRequestCallback) => {
    const start = Date.now();
    return setTimeout(() => {
      cb({
        didTimeout: false,
        timeRemaining: () => Math.max(0, 50 - (Date.now() - start)),
      } as IdleDeadline);
    }, 1);
  });

// Cancel idle callback polyfill
export const cancelIdleCallback =
  window.cancelIdleCallback ||
  ((id: number) => clearTimeout(id));

// Prefetch links
export const prefetchLinks = () => {
  const links = document.querySelectorAll('a[href^="/"]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const link = entry.target as HTMLAnchorElement;
        const href = link.getAttribute('href');
        if (href) {
          const linkEl = document.createElement('link');
          linkEl.rel = 'prefetch';
          linkEl.href = href;
          document.head.appendChild(linkEl);
          observer.unobserve(link);
        }
      }
    });
  });

  links.forEach((link) => observer.observe(link));
};

// Optimize animations
export const optimizeAnimations = () => {
  // Reduce motion for users who prefer it
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
  }

  // Pause animations when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      document.querySelectorAll('[data-animation]').forEach((el) => {
        (el as HTMLElement).style.animationPlayState = 'paused';
      });
    } else {
      document.querySelectorAll('[data-animation]').forEach((el) => {
        (el as HTMLElement).style.animationPlayState = 'running';
      });
    }
  });
};

// Memory leak prevention
export const cleanupListeners = (listeners: Array<[EventTarget, string, EventListener]>) => {
  listeners.forEach(([target, type, listener]) => {
    target.removeEventListener(type, listener);
  });
};

// Virtual scroll for large lists
export class VirtualScroll {
  private container: HTMLElement;
  private itemHeight: number;
  private items: any[];
  private visibleItems: number;
  private scrollTop: number = 0;
  private startIndex: number = 0;
  private endIndex: number = 0;

  constructor(container: HTMLElement, items: any[], itemHeight: number) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(container.clientHeight / itemHeight);
    this.endIndex = Math.min(this.visibleItems * 2, this.items.length);

    this.container.addEventListener('scroll', this.handleScroll);
  }

  private handleScroll = throttle(() => {
    this.scrollTop = this.container.scrollTop;
    this.startIndex = Math.floor(this.scrollTop / this.itemHeight);
    this.endIndex = Math.min(
      this.startIndex + this.visibleItems * 2,
      this.items.length
    );
    this.render();
  }, 100);

  private render() {
    const visibleItems = this.items.slice(this.startIndex, this.endIndex);
    // Render visible items
    return visibleItems;
  }

  destroy() {
    this.container.removeEventListener('scroll', this.handleScroll);
  }
}
