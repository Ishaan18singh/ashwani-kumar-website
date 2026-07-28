import { SITE_DATA } from '@/lib/data';
import { slugify } from '@/lib/utils';
import PageClient from './PageClient';

export function generateStaticParams() {
  return SITE_DATA.projects.map((p) => ({ slug: slugify(p.title) }));
}

export function generateMetadata({ params }) {
  const project = SITE_DATA.projects.find((p) => slugify(p.title) === params.slug);
  if (!project) {
    return { title: 'Initiative' };
  }
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${params.slug}` }
  };
}

export default function Page() {
  return <PageClient />;
}
