/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Shield, ShieldCheck, MoreVertical, Edit2, Key, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { setUserRole } from '@/lib/admin/actions/setUserRole';
import { PillBadge } from '@/components/ui/PillBadge';
import { useToast } from '@/components/providers/ToastProvider';
import { useDialog } from '@/components/providers/DialogProvider';
import { IconButton } from '@/components/ui/IconAction';

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
  const [isUpdating, setIsUpdating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  const { confirm } = useDialog();

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
          <IconButton 
            icon={MoreVertical}
            label="Change Role"
            onClick={() => handleRoleChangeRequest(props.row.original)}
            color="#78909C"
          />
        </div>
      )
    })
  ];

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRoleChangeRequest = async (targetUser: UserRow) => {
    const newRole = targetUser.role === 'admin' ? 'user' : 'admin';
    const description = `You are about to change the role for ${targetUser.name} from ${targetUser.role} to ${newRole}. ${targetUser.role !== 'admin' ? 'This grants full administrative access to the platform.' : ''}`;
    
    const ok = await confirm({
      title: 'Change Role',
      description,
      confirmLabel: 'Confirm Change',
      variant: 'danger'
    });
    
    if (!ok) return;

    setIsUpdating(true);
    try {
      await setUserRole({ targetUserId: targetUser.id, newRole });
      
      // Update local state
      setUsers(users.map(u => u.id === targetUser.id ? { ...u, role: newRole } : u));
      toast.success('User role updated successfully');
    } catch (e) {
      console.error('Failed to change role', e);
      toast.error('Failed to change role. Are you an admin?');
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

    </div>
  );
}
