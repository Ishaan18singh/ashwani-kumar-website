'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useI18n } from '@/lib/i18n/context';
import { slugify, cardImage } from '@/lib/utils';

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const { t, data } = useI18n();

  const index = data.projects.findIndex((p) => slugify(p.title) === slug);
  const project = index > -1 ? data.projects[index] : null;

  if (!project) {
    return (
      <section className="pt-40 pb-20 sm:pt-48">
        <div className="shell max-w-4xl">
          <div className="project-detail-body">
            <p className="eyebrow">{t('project.notFound')}</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">{t('project.notFoundTitle')}</h1>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{t('project.notFoundText')}</p>
            <Link href="/projects" className="button-primary mt-8 inline-flex w-fit">
              {t('project.allInitiatives')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const nextProject = data.projects[(index + 1) % data.projects.length];

  return (
    <section className="pt-40 pb-20 sm:pt-48">
      <div className="shell max-w-4xl">
        <div className="project-detail-body">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="project-detail-img" src={`/images/${cardImage(index)}.webp`} alt="" />
          <p className="eyebrow">{t('project.initiative')}</p>
          <h1 className="max-w-3xl text-4xl font-semibold sm:text-6xl">{project.title}</h1>
          <p className="mt-4 text-sm font-bold uppercase tracking-[.15em] text-gold-500">{project.tag}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">{project.summary}</p>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600 dark:text-slate-300">{project.detail}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="button-ghost inline-flex w-fit">
              {t('project.allInitiatives')}
            </Link>
            <Link href={`/projects/${slugify(nextProject.title)}`} className="button-ghost inline-flex w-fit">
              {t('project.nextInitiative')} {nextProject.title} →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
