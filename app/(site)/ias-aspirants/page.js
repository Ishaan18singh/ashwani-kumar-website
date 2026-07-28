import PageClient from './PageClient';

export const metadata = {
  title: 'IAS Aspirants',
  description: 'Guidance and resources for civil service aspirants, from Ashwani Kumar, IAS.',
  alternates: { canonical: '/ias-aspirants' }
};

export default function Page() {
  return <PageClient />;
}
