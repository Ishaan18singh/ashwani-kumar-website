'use client';

import { useRef, useState } from 'react';

const ITEMS = [
  { src: '/images/gallery-01.webp', alt: 'Ashwani Kumar in a blue suit, full-length portrait' },
  { src: '/images/gallery-02.webp', alt: 'Ashwani Kumar standing in a formal wood-paneled interior' },
  { src: '/images/gallery-03.webp', alt: 'Close portrait of Ashwani Kumar' },
  { src: '/images/gallery-04.webp', alt: 'Ashwani Kumar in a formal portrait' },
  { src: '/images/gallery-05.webp', alt: 'Black and white portrait of Ashwani Kumar' },
  { src: '/images/screen-style-01.webp', alt: 'Studio portrait of Ashwani Kumar in a cream knit polo' },
  { src: '/images/screen-style-02.webp', alt: 'Black and white studio portrait of Ashwani Kumar' }
];

export default function GalleryGrid() {
  const dialogRef = useRef(null);
  const [active, setActive] = useState(null);

  const open = (item) => {
    setActive(item);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  return (
    <>
      <section className="py-24">
        <div className="shell grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((item) => (
            <button key={item.src} type="button" onClick={() => open(item)} className="group overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="film-card-img w-full object-center transition duration-500 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      </section>
      <dialog
        ref={dialogRef}
        className="m-auto w-[min(94vw,1000px)] rounded-2xl bg-navy-950 p-3 text-white backdrop:bg-black/80"
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-black/60 text-xl"
          aria-label="Close image"
        >
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={active?.src} alt="" className="max-h-[82vh] w-full rounded-xl object-contain" />
        <p className="p-3 text-center text-sm text-slate-300">{active?.alt}</p>
      </dialog>
    </>
  );
}
