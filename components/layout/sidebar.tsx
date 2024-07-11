'use client';
import { DashboardNav } from '@/components/dashboard-nav';
import { moderNavItems, navItems } from '@/constants/data';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export default function Sidebar() {
  const user = useCurrentUser();
  if (!user) {
    return;
  }
  return (
    <nav
      className={cn(`relative hidden h-screen w-72 border-r pt-16 lg:block`)}
    >
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <DashboardNav
              items={user.role.roleName === 'Admin' ? navItems : moderNavItems}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
