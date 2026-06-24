'use client';

import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreVertical, ShieldAlert } from 'lucide-react';
import { setUserRole } from '@/lib/admin/actions/setUserRole';
import { PillBadge } from '@/components/ui/PillBadge';
import { useToast } from '@/lib/context/ToastContext';

export type UserRow = {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
};

const columnHelper = createColumnHelper<UserRow>();

export function UserTableClient({ initialUsers }: { initialUsers: UserRow[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRow | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => <span className="font-medium text-[#1A2E1A]">{info.getValue()}</span>,
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => <span className="text-[#78909C]">{info.getValue()}</span>,
    }),
    columnHelper.accessor('plan', {
      header: 'Plan',
      cell: info => (
        <PillBadge active={info.getValue() === 'pro'} className="uppercase text-[10px]">
          {info.getValue()}
        </PillBadge>
      ),
    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => (
        <PillBadge active={info.getValue() === 'admin'} className={info.getValue() === 'admin' ? 'bg-[#F9A825] text-white' : ''}>
          {info.getValue()}
        </PillBadge>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: '',
      cell: props => (
        <div className="flex justify-end">
          <button 
            onClick={() => {
              setSelectedUser(props.row.original);
              setRoleModalOpen(true);
            }}
            className="p-2 text-[#78909C] hover:bg-[#EBF5EB] rounded-md transition-colors"
          >
            <MoreVertical size={16} />
          </button>
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRoleChange = async () => {
    if (!selectedUser) return;
    setIsUpdating(true);
    try {
      const newRole = selectedUser.role === 'admin' ? 'user' : 'admin';
      await setUserRole({ targetUserId: selectedUser.id, newRole });
      
      // Update local state
      setUsers(users.map(u => u.id === selectedUser.id ? { ...u, role: newRole } : u));
      setRoleModalOpen(false);
      toast({ title: 'User role updated successfully', type: 'success' });
    } catch (e) {
      console.error('Failed to change role', e);
      toast({ title: 'Failed to change role. Are you an admin?', type: 'error' });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className="border-b border-[rgba(46,125,50,0.15)] bg-gray-50/50">
                {headerGroup.headers.map(header => (
                  <th key={header.id} className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border-b border-[rgba(46,125,50,0.15)] hover:bg-gray-50/50 transition-colors">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-6 py-4 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {roleModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4 text-[#C62828]">
              <ShieldAlert size={24} />
              <h3 className="font-heading font-bold text-lg">Change Role</h3>
            </div>
            
            <p className="text-[#1A2E1A] mb-6">
              You are about to change the role for <strong>{selectedUser.name}</strong> from <span className="uppercase text-xs font-bold bg-gray-100 px-2 py-1 rounded">{selectedUser.role}</span> to <span className="uppercase text-xs font-bold bg-[#EBF5EB] text-[#2E7D32] px-2 py-1 rounded">{selectedUser.role === 'admin' ? 'user' : 'admin'}</span>.
            </p>
            
            {selectedUser.role !== 'admin' && (
              <p className="text-sm text-[#78909C] mb-6">
                This grants full administrative access to the platform, including the ability to view all user data, modify subscriptions, and manage other admin accounts.
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setRoleModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-[#78909C] hover:bg-gray-100 rounded-lg transition-colors"
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button 
                onClick={handleRoleChange}
                disabled={isUpdating}
                className="px-4 py-2 text-sm font-medium text-white bg-[#C62828] hover:bg-red-800 rounded-lg transition-colors"
              >
                {isUpdating ? 'Updating...' : 'Confirm Change'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
