"use client";

import React, { useState } from 'react';
import { X, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { RecordType, VaultRecord } from '@/lib/types';

interface RecordUploadModalProps {
  onClose: () => void;
  onUpload: (record: Omit<VaultRecord, 'id' | 'memberId' | 'createdAt'>) => void;
}

export function RecordUploadModal({ onClose, onUpload }: RecordUploadModalProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<RecordType>('lab_report');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [doctorOrFacility, setDoctorOrFacility] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !file) return;

    setIsUploading(true);
    let fileUrl = undefined;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        fileUrl = data.url;
      } else {
        console.error('File upload failed:', data.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }

    onUpload({
      type,
      title,
      date,
      doctorOrFacility,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      fileName: file.name,
      fileUrl: fileUrl,
      extractedText: type === 'lab_report' ? 'Mock extracted text for OCR test...' : undefined
    });
    
    setIsUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="bg-white rounded-[24px] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-surface">
          <h2 className="font-heading font-bold text-xl text-dark">Upload Record</h2>
          <button onClick={onClose} className="text-text-muted hover:text-dark transition-colors">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* File Drop Area */}
          <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface-alt hover:bg-surface transition-colors cursor-pointer relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary mb-3 shadow-sm">
              <UploadCloud size={24} />
            </div>
            <p className="font-medium text-dark mb-1">
              {file ? file.name : "Click or drag file to upload"}
            </p>
            <p className="text-xs text-text-muted">PDF, JPG, PNG up to 10MB</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Document Title *</label>
              <input 
                type="text" 
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                placeholder="e.g., Annual Blood Work"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1">Type *</label>
                <select 
                  value={type}
                  onChange={e => setType(e.target.value as RecordType)}
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary appearance-none"
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
                <label className="block text-sm font-medium text-text-primary mb-1">Date *</label>
                <input 
                  type="date" 
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Doctor or Facility</label>
              <input 
                type="text" 
                value={doctorOrFacility}
                onChange={e => setDoctorOrFacility(e.target.value)}
                placeholder="e.g., Dr. Smith / City Lab"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Tags (comma separated)</label>
              <input 
                type="text" 
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="e.g., Annual, Blood, Fasting"
                className="w-full px-4 py-2.5 bg-white border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
            <Button type="button" variant="ghost" onClick={onClose} disabled={isUploading}>Cancel</Button>
            <Button type="submit" variant="primary" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Record'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
