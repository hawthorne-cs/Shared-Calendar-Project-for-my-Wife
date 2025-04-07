"use client"

import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Label } from '@/components/ui/Label';

export default function NewGroupPage() {

  // Basic form state (can be expanded later)
  // const [groupName, setGroupName] = useState('');
  // const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission logic
    console.log('Submitting new group...');
    alert('New group creation form submitted (placeholder)!');
  };

  return (
    <AppShell>
      <div className="p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl font-semibold text-[#37352f] dark:text-white mb-6">
          Create New Group
        </h1>
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#2f3136] rounded-lg p-6 sm:p-8 border border-[#e6e6e6] dark:border-[#202225] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                name="groupName"
                type="text"
                placeholder="Enter group name"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Describe your group"
              />
            </div>
             <div>
              <Label htmlFor="avatar">Group Avatar (Emoji or Image URL)</Label>
              <Input
                id="avatar"
                name="avatar"
                type="text"
                placeholder="e.g., ✨ or https://example.com/image.png"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primaryAction" size="sm">
                Create Group
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AppShell>
  );
} 