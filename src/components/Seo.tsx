import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Seo({ title, description, noIndex = false }: { title: string; description: string; noIndex?: boolean }) {
  const { pathname } = useLocation();
  useEffect(() => {
    const fullTitle = `${title} | Data Bassey`;
    const url = `https://databassey.com.ng${pathname === '/' ? '/' : pathname}`;
    document.title = fullTitle;
    const values = [
      ['name', 'description', description],
      ['property', 'og:title', fullTitle],
      ['property', 'og:description', description],
      ['property', 'og:type', 'website'],
      ['property', 'og:url', url],
      ['name', 'twitter:card', 'summary'],
      ['name', 'twitter:title', fullTitle],
      ['name', 'twitter:description', description],
      ['name', 'robots', noIndex ? 'noindex' : 'index, follow'],
    ];
    for (const [attribute, key, value] of values) {
      let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.append(tag);
      }
      tag.content = value;
    }
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.append(canonical);
    }
    canonical.href = url;
  }, [title, description, noIndex, pathname]);
  return null;
}
