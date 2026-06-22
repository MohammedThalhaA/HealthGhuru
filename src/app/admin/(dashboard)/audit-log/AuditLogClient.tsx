'use client';

import React, { useState } from 'react';
import { PillBadge } from '@/components/ui/PillBadge';
import { Eye } from 'lucide-react';

export function AuditLogClient({ initialLogs }: { initialLogs: any[] }) {
  const [selectedLog, setSelectedLog] = useState<any>(null);

  const getActionColor = (type: string) => {
    if (type.includes('delete')) return 'bg-red-100 text-red-800';
    if (type.includes('create') || type.includes('added')) return 'bg-[#EBF5EB] text-[#2E7D32]';
    return 'bg-blue-100 text-blue-800';
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(46,125,50,0.15)] bg-gray-50/50">
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Timestamp</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Admin</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Action</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Target</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]"></th>
            </tr>
          </thead>
          <tbody>
            {initialLogs.map(log => (
              <tr key={log.id} className="border-b border-[rgba(46,125,50,0.15)] hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-[#78909C]">{new Date(log.created_at).toLocaleString()}</td>
                <td className="px-6 py-4 text-sm font-medium text-[#1A2E1A]">{log.admin_name}</td>
                <td className="px-6 py-4 text-sm">
                  <PillBadge active={false} className={`text-[10px] ${getActionColor(log.action_type)}`}>
                    {log.action_type.toUpperCase()}
                  </PillBadge>
                </td>
                <td className="px-6 py-4 text-sm text-[#1A2E1A]">
                  {log.target_table} <span className="text-[#78909C] text-xs">({log.target_id})</span>
                </td>
                <td className="px-6 py-4 text-sm flex justify-end">
                  <button 
                    onClick={() => setSelectedLog(log)}
                    className="p-2 text-[#78909C] hover:bg-[#EBF5EB] hover:text-[#2E7D32] rounded-md transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-heading font-bold text-xl text-[#1A2E1A]">Audit Log Details</h3>
              <button onClick={() => setSelectedLog(null)} className="text-[#78909C] hover:text-[#1A2E1A]">Close</button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-[#78909C] uppercase font-bold mb-1">Admin User</p>
                <p className="text-sm font-medium">{selectedLog.admin_name}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-xs text-[#78909C] uppercase font-bold mb-1">Action Type</p>
                <PillBadge active={false} className={`text-[10px] ${getActionColor(selectedLog.action_type)} inline-block`}>
                  {selectedLog.action_type.toUpperCase()}
                </PillBadge>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-[#C62828] mb-2">Before Value</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                  {selectedLog.before_value ? JSON.stringify(selectedLog.before_value, null, 2) : 'null'}
                </pre>
              </div>
              <div>
                <h4 className="font-bold text-[#2E7D32] mb-2">After Value</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto whitespace-pre-wrap">
                  {selectedLog.after_value ? JSON.stringify(selectedLog.after_value, null, 2) : 'null'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
