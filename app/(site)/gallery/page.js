import PageClient from './PageClient';

export const metadata = {
  title: 'Gallery',
  description: 'Photo gallery of Ashwani Kumar, IAS.',
  alternates: { canonical: '/gallery' }
};

export default function Page() {
  return <PageClient />;
}
