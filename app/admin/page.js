import AdminApp from '@/components/AdminApp';

export const metadata = {
  title: 'Admin',
  robots: { index: false, follow: false }
};

export default function AdminPage() {
  return (
    <div className="bg-ivory dark:bg-slate-950">
      <AdminApp />
    </div>
  );
}
