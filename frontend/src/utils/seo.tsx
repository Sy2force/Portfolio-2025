import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  twitterHandle?: string;
}

export const SEO = ({
  title = 'Portfolio Futuriste | Développeur Full Stack',
  description = 'Portfolio professionnel avec design futuriste ultra-moderne. Découvrez mes projets et services en développement web.',
  keywords = 'développeur, full stack, react, node.js, typescript, portfolio, freelance, web development',
  image = '/og-image.png',
  url = 'https://portfolio.com',
  type = 'website',
  author = 'John Doe',
  twitterHandle = '@johndoe',
}: SEOProps) => {
  const siteTitle = 'Portfolio Futuriste';
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author,
    url: url,
    sameAs: [
      'https://github.com/johndoe',
      'https://linkedin.com/in/johndoe',
      'https://twitter.com/johndoe',
    ],
    jobTitle: 'Full Stack Developer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: description,
    image: image,
    knowsAbout: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'PostgreSQL'],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content={twitterHandle} />
      <meta property="twitter:site" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google" content="notranslate" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#00d9ff" />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
