'use client';

import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { useVault } from '@/lib/context/VaultContext';

interface RecordUploadModalProps {
  onClose: () => void;
}

const RecordUploadModal: React.FC<RecordUploadModalProps> = ({ onClose }) => {
  const { addRecord, activeMember } = useVault();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('lab_report');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctor, setDoctor] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    addRecord({
      id: `rec-${Date.now()}`,
      memberId: activeMember.id,
      title,
      type: type as any,
      date,
      doctorOrFacility: doctor,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      fileName: 'uploaded_document.pdf', // mock
      createdAt: new Date().toISOString()
    });
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Add Record</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-900 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6 w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl bg-gray-50 flex flex-col items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
            <UploadCloud className="w-8 h-8 text-primary-light mb-2" />
            <p className="text-sm font-medium text-gray-700">Drag & drop file here or <span className="text-primary">browse</span></p>
            <p className="text-xs text-gray-400 mt-1">Accepts PDF, JPG, PNG up to 10MB</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Record Type</label>
              <select 
                value={type} onChange={e => setType(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
              >
                <option value="lab_report">Lab Report</option>
                <option value="prescription">Prescription</option>
                <option value="visit_note">Visit Note</option>
                <option value="vaccination">Vaccination</option>
                <option value="insurance">Insurance</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" required value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Complete Blood Count"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input 
                  type="date" required value={date} onChange={e => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor / Facility</label>
                <input 
                  type="text" value={doctor} onChange={e => setDoctor(e.target.value)}
                  placeholder="Optional"
                  className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input 
                type="text" value={tags} onChange={e => setTags(e.target.value)}
                placeholder="e.g. Annual Checkup, Blood"
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-light/20 focus:border-primary-light"
              />
            </div>
          </div>

          <div className="mt-8">
            <button type="submit" className="w-full py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-xl transition-colors shadow-sm hover:shadow">
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecordUploadModal;
