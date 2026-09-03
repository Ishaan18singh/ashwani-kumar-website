'use client';

import { motion } from 'framer-motion';

// Fades/slides an element in the first time it scrolls into view.
// Replaces the old RevealObserver (a single page-wide IntersectionObserver
// + MutationObserver toggling a shared `.is-visible` class) with
// framer-motion's per-element useInView, which sidesteps the class of bugs
// that setup had with elements inside transformed/animated ancestors (e.g.
// the homepage's auto-scrolling marquee never registering as "in view").
export default function Reveal({ as = 'div', blur = false, className, children, ...props }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 18, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      {...props}
    >
      {children}
    </Tag>
  );
}
