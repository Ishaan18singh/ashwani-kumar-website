import PageClient from './PageClient';

export const metadata = {
  title: 'About',
  description: 'Biography, current positions and leadership philosophy of Ashwani Kumar, IAS.',
  alternates: { canonical: '/about' }
};

export default function Page() {
  return <PageClient />;
}
