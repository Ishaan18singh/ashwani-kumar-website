export function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const INITIATIVE_IMAGES = ['gallery-01', 'gallery-02', 'gallery-03', 'gallery-04', 'gallery-05'];

export function cardImage(i) {
  return INITIATIVE_IMAGES[i % INITIATIVE_IMAGES.length];
}
