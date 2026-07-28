import PageClient from './PageClient';

export const metadata = {
  title: 'Publications & Media',
  description: 'Articles, public commentary and notable appearances by Ashwani Kumar, IAS.',
  alternates: { canonical: '/publications' }
};

export default function Page() {
  return <PageClient />;
}
