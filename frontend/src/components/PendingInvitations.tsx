'use client'

import { useState } from 'react';
import { GroupInvitation } from '@/types';
import { respondToGroupInvitation } from '@/lib/api';
import { CheckIcon, XIcon, MailIcon } from '@/components/icons';
import { EmptyState } from '@/components/EmptyState';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface PendingInvitationsProps {
  invitations: GroupInvitation[];
  onInvitationUpdate: () => void; // Callback to refetch data after accept/decline
  isLoading?: boolean; // Prop to indicate loading state
}

// Skeleton component for Invitation Item
const InvitationSkeleton = () => (
  <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-700/50 rounded-md animate-pulse">
    <div className="space-y-1.5">
      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
      <div className="h-3 w-40 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
    <div className="flex space-x-2">
      <div className="w-8 h-8 rounded-md bg-gray-300 dark:bg-gray-600"></div>
      <div className="w-8 h-8 rounded-md bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </div>
);

const PendingInvitations: React.FC<PendingInvitationsProps> = ({ invitations, onInvitationUpdate, isLoading = false }) => {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleResponse = async (invitationId: string, action: 'accept' | 'decline') => {
    setProcessingId(invitationId);
    const actionVerb = action === 'accept' ? 'Accepting' : 'Declining';
    const successVerb = action === 'accept' ? 'accepted' : 'declined';
    
    const promise = respondToGroupInvitation(invitationId, action);

    toast.promise(promise, {
      loading: `${actionVerb} invitation...`,
      success: (success) => {
        if (success) {
          onInvitationUpdate(); // Trigger data refetch in parent
          setProcessingId(null);
          return `Invitation ${successVerb} successfully.`;
        } else {
          // Handle case where API call succeeds but returns false (e.g., invitation not found)
          setProcessingId(null);
          return `Failed to ${action.toLowerCase()} invitation. It might have been withdrawn.`;
        }
      },
      error: (err) => {
        setProcessingId(null);
        return `Error ${actionVerb.toLowerCase()} invitation: ${err instanceof Error ? err.message : 'Unknown error'}`;
      },
    });
  };

  return (
    <div className="bg-white dark:bg-[#2f3136] rounded-lg border border-[#e6e6e6] dark:border-[#40444b] shadow-sm p-4 min-h-[150px] flex flex-col">
      <h3 className="text-base font-semibold text-[#37352f] dark:text-white mb-3 flex-shrink-0">
        Pending Group Invitations
      </h3>
      <div className="flex-grow flex flex-col">
        {isLoading ? (
          <div className="space-y-2 flex-grow flex flex-col justify-center">
            <InvitationSkeleton />
            <InvitationSkeleton />
          </div>
        ) : invitations.length > 0 ? (
          <div className="space-y-2">
            {invitations.map(inv => (
              <div key={inv.id} className="flex items-center justify-between p-3 bg-[#f7f6f3] dark:bg-[#36393f] rounded-md border border-[#e6e6e6] dark:border-[#40444b]">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#37352f] dark:text-white truncate">{inv.groupName}</p>
                  <p className="text-xs text-[#6b7280] dark:text-[#b9bbbe] truncate">
                    Invited by {inv.inviterName} on {formatDate(inv.invitedAt)}
                  </p>
                </div>
                <div className="flex space-x-2 flex-shrink-0 ml-2">
                  <Button 
                    variant="accept"
                    size="icon"
                    onClick={() => handleResponse(inv.id, 'accept')}
                    disabled={!!processingId}
                    aria-label={`Accept invitation to ${inv.groupName}`}
                  >
                    {processingId === inv.id && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>} 
                    {processingId !== inv.id && <CheckIcon className="w-4 h-4" />}
                  </Button>
                  <Button 
                    variant="decline"
                    size="icon"
                    onClick={() => handleResponse(inv.id, 'decline')}
                    disabled={!!processingId}
                    aria-label={`Decline invitation to ${inv.groupName}`}
                  >
                    {processingId === inv.id && <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>}
                    {processingId !== inv.id && <XIcon className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={MailIcon}
            title="No pending invitations"
            message="You're all caught up!"
            className="flex-grow flex flex-col justify-center items-center text-center"
          />
        )}
      </div>
    </div>
  );
};

export { PendingInvitations }; 