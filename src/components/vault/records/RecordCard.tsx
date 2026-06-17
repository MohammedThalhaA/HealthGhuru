'use client';

import React from 'react';
import { FileText, MoreVertical, Download, Edit2, Trash2 } from 'lucide-react';
import { VaultRecord } from '@/lib/types';
import Link from 'next/link';

interface RecordCardProps {
  record: VaultRecord;
  onDelete?: (id: string) => void;
}

const RecordCard: React.FC<RecordCardProps> = ({ record, onDelete }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatType = (type: string) => {
    return type.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const formattedDate = new Date(record.date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all group relative">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 bg-surface-alt text-primary rounded-xl flex items-center justify-center">
          <FileText className="w-5 h-5" />
        </div>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-20">
              <Link href={`/records/${record.id}`} className="block w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <FileText className="w-4 h-4 mr-2" /> View
              </Link>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <Download className="w-4 h-4 mr-2" /> Download
              </button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <Edit2 className="w-4 h-4 mr-2" /> Edit Tags
              </button>
              <div className="border-t border-gray-100"></div>
              <button 
                onClick={() => { setMenuOpen(false); onDelete?.(record.id); }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center font-medium"
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <Link href={`/records/${record.id}`} className="block">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{record.title}</h3>
        <p className="text-sm text-gray-500 mb-3">{formatType(record.type)} · {formattedDate}</p>
        
        {record.doctorOrFacility && (
          <p className="text-sm text-gray-600 mb-4 truncate">{record.doctorOrFacility}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-auto">
          {record.tags.map(tag => (
            <span key={tag} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-gray-600 text-xs font-medium">
              {tag}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default RecordCard;
