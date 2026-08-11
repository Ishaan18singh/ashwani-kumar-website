import { FILMS } from '@/lib/films';
import PageClient from './PageClient';

export function generateStaticParams() {
  return FILMS.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }) {
  const film = FILMS.find((f) => f.slug === params.slug);
  if (!film) {
    return { title: 'Screen & Style' };
  }
  return {
    title: film.title,
    description: film.synopsis,
    alternates: { canonical: `/acting-modeling/${film.slug}` }
  };
}

export default function Page() {
  return <PageClient />;
}
