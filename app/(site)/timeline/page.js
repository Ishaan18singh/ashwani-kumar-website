import PageClient from './PageClient';

export const metadata = {
  title: 'Career Timeline',
  description: 'Career timeline of Ashwani Kumar, IAS, from LBSNAA trainee to Director, DITEC.',
  alternates: { canonical: '/timeline' }
};

export default function Page() {
  return <PageClient />;
}
