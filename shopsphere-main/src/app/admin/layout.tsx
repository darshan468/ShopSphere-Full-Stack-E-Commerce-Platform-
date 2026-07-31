import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth';
import { AdminSidebar } from '@/components/AdminSidebar';

/**
 * Layout shared by every /admin/* page except /admin/login.
 * Redirects to the login page if there is no valid admin session.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
