import ReactMarkdown from 'react-markdown';
import { safeHttps } from '../../lib/blog';

export default function ArticleBody({ content }: { content: string }) {
  return <div className="article-body"><ReactMarkdown skipHtml urlTransform={value => value.startsWith('#') ? value : safeHttps(value)} components={{
    h1: ({ children }) => <h2>{children}</h2>,
    a: ({ href, children }) => <a href={href} target={href?.startsWith('#') ? undefined : '_blank'} rel="noreferrer">{children}</a>,
    img: ({ src, alt }) => <img src={src} alt={alt || ''} loading="lazy" referrerPolicy="no-referrer" />,
  }}>{content}</ReactMarkdown></div>;
}
