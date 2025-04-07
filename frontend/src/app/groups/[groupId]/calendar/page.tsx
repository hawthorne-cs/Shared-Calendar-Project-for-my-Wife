'use client'
import { AppShell } from '@/components/app-shell';
import { useParams } from 'next/navigation';

export default function GroupCalendarPage() {
  const params = useParams();
  const groupId = params.groupId;

  return (
    <AppShell>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-[#37352f] dark:text-white mb-4">
          Group Calendar (Placeholder) - Group ID: {groupId}
        </h1>
        <div className="bg-white dark:bg-[#2f3136] rounded-lg p-6 border border-[#e6e6e6] dark:border-[#202225] shadow-sm">
          <p className="text-[#6b7280] dark:text-[#b9bbbe]">
            This page will eventually display the shared calendar for this group.
          </p>
          <p className="mt-4 text-[#6b7280] dark:text-[#b9bbbe]">
            Feature coming soon!
          </p>
        </div>
      </div>
    </AppShell>
  );
} 