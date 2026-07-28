export default function PageHero({ eyebrow, title, subtitle, wide }) {
  return (
    <section className="page-hero">
      <div className="shell relative">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className={`${wide ? 'max-w-5xl' : 'max-w-4xl'} text-5xl font-semibold sm:text-7xl`}>{title}</h1>
        {subtitle ? <p className="mt-6 max-w-2xl text-lg leading-7 text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
      </div>
    </section>
  );
}
