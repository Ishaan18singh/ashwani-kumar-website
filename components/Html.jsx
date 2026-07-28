// Renders a translated string that legitimately contains markup (e.g. <br>,
// <span class="...">) — same purpose as the original [data-i18n-html] hook.
export default function Html({ as: Tag = 'span', html, className }) {
  return <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
