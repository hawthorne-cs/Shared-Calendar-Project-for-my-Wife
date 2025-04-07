'use client'

import Link from 'next/link';
import { PlusIcon, UsersIcon } from '@/components/icons';

const QuickActions = () => {
  return (
    <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#40444b] shadow-sm p-4">
      <h3 className="text-base font-semibold text-[#37352f] dark:text-white mb-3">
        Quick Actions
      </h3>
      <div className="space-y-2">
        <Link
          href="/event/new"
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-[#37352f] dark:text-white bg-[#f7f6f3] dark:bg-[#36393f] hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] rounded-md transition-colors shadow-sm"
        >
          <PlusIcon className="w-4 h-4 mr-2 text-[#5865f2]" />
          Schedule New Event
        </Link>
        <Link
          href="/groups/new"
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-[#37352f] dark:text-white bg-[#f7f6f3] dark:bg-[#36393f] hover:bg-[#e6e6e6] dark:hover:bg-[#40444b] rounded-md transition-colors shadow-sm"
        >
          <UsersIcon className="w-4 h-4 mr-2 text-[#5865f2]" />
          Create New Group
        </Link>
      </div>
    </div>
  );
};

export { QuickActions }; 