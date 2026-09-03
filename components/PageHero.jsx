import Reveal from '@/components/Reveal';

export default function PageHero({ eyebrow, title, subtitle, wide, titleClassName }) {
  return (
    <section className="page-hero">
      <Reveal className="shell relative" blur>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={titleClassName || `${wide ? 'max-w-5xl' : 'max-w-4xl'} text-display-m font-semibold`}>{title}</h1>
        {subtitle ? <p className="mt-6 max-w-2xl text-lg leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
      </Reveal>
    </section>
  );
}
