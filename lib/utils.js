export function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export const INITIATIVE_IMAGES = ['gallery-01', 'gallery-03', 'gallery-04', 'gallery-05'];

// Initiatives fall back to the shared gallery images, cycled by position.
// A project carrying its own `image` uses that instead.
export function cardImage(i, project) {
  return project?.image || INITIATIVE_IMAGES[i % INITIATIVE_IMAGES.length];
}
