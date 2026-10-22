export function slugify(s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// An initiative shows a picture only when it carries its own `image`. The
// shared gallery photos used to fill the gaps, but they're all from one
// portrait shoot, so callers render nothing rather than a stand-in.
export function cardImage(i, project) {
  return project?.image || null;
}
