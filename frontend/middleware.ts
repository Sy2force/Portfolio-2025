import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['fr', 'en', 'he'];
const defaultLocale = 'fr';

// Map of language-specific routes
const routeMap: Record<string, Record<string, string>> = {
  'about': {
    'fr': 'a-propos',
    'en': 'about',
    'he': 'about'
  },
  'a-propos': {
    'fr': 'a-propos',
    'en': 'about',
    'he': 'about'
  },
  'projects': {
    'fr': 'projects',
    'en': 'projects',
    'he': 'projects'
  },
  'services': {
    'fr': 'services',
    'en': 'services',
    'he': 'services'
  },
  'contact': {
    'fr': 'contact',
    'en': 'contact',
    'he': 'contact'
  },
  'cv': {
    'fr': 'cv',
    'en': 'cv',
    'he': 'cv'
  }
};

function getLocale(request: NextRequest): string {
  // Check for locale in cookie
  const localeCookie = request.cookies.get('i18next');
  if (localeCookie && locales.includes(localeCookie.value)) {
    return localeCookie.value;
  }

  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language');
  if (acceptLanguage) {
    const detectedLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split('-')[0].trim())
      .find(lang => locales.includes(lang));
    
    if (detectedLocale) {
      return detectedLocale;
    }
  }

  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const segments = pathname.split('/').filter(Boolean);
  
  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') // Has file extension
  ) {
    return NextResponse.next();
  }

  const locale = getLocale(request);
  
  // Handle language-specific routes
  if (segments.length > 0) {
    const firstSegment = segments[0];
    
    // Check if this is a route that needs translation
    if (routeMap[firstSegment]) {
      const translatedRoute = routeMap[firstSegment][locale];
      
      // If the route needs to be changed for the current locale
      if (translatedRoute !== firstSegment) {
        const newSegments = [translatedRoute, ...segments.slice(1)];
        const newUrl = new URL('/' + newSegments.join('/'), request.url);
        
        // Preserve query parameters
        newUrl.search = request.nextUrl.search;
        
        return NextResponse.redirect(newUrl);
      }
    }
  }

  // Set locale cookie if not present
  const response = NextResponse.next();
  if (!request.cookies.has('i18next')) {
    response.cookies.set('i18next', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
