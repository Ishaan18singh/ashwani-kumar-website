import { SITE_DATA } from '@/lib/data';
import { SITE_DATA_I18N } from '@/lib/i18n/data';

const mergeArrays = (baseArr, overlayArr, fields) => {
  if (!Array.isArray(baseArr) || !Array.isArray(overlayArr)) return baseArr;
  return baseArr.map((item, i) => {
    const o = overlayArr[i];
    if (!o) return item;
    const copy = Object.assign({}, item);
    fields.forEach((f) => {
      if (o[f] !== undefined) copy[f] = o[f];
    });
    return copy;
  });
};

// Merge translated overlay fields (by array index) onto the canonical
// English SITE_DATA, mirroring the original vanilla-JS i18n.js behaviour.
export function localizedSiteData(lang) {
  const base = SITE_DATA;
  if (lang === 'en' || !base) return base;
  const overlay = SITE_DATA_I18N[lang];
  if (!overlay) return base;

  const out = { ...base, profile: { ...base.profile } };
  if (overlay.profile) {
    ['shortTitle', 'title', 'quote'].forEach((f) => {
      if (overlay.profile[f] !== undefined) out.profile[f] = overlay.profile[f];
    });
  }
  if (overlay.positions) out.positions = overlay.positions;
  out.timeline = mergeArrays(base.timeline, overlay.timeline, ['role', 'org', 'type', 'detail']);
  out.projects = mergeArrays(base.projects, overlay.projects, ['summary', 'detail', 'tag']);
  out.awards = mergeArrays(base.awards, overlay.awards, ['title', 'body']);
  out.recognition = mergeArrays(base.recognition, overlay.recognition, ['title', 'text']);
  if (overlay.extras) out.extras = overlay.extras;
  return out;
}
