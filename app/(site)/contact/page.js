import PageClient from './PageClient';

export const metadata = {
  title: 'Contact',
  description: 'Contact information for the office of Ashwani Kumar, IAS, Director, DITEC, Government of Assam.',
  alternates: { canonical: '/contact' }
};

export default function Page() {
  return <PageClient />;
}
