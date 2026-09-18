import PageClient from './PageClient';

export const metadata = {
  title: 'Internship Programme',
  description: 'An internship programme built on real exposure — see the work, meet the people, then choose with clarity.',
  alternates: { canonical: '/internship' }
};

export default function Page() {
  return <PageClient />;
}
