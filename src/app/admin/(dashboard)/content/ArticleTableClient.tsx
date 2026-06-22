'use client';

import React, { useState } from 'react';
import { manageArticle } from '@/lib/admin/actions/manageArticle';
import { PillBadge } from '@/components/ui/PillBadge';
import Link from 'next/link';
import { Trash2, Edit } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export function ArticleTableClient({ initialArticles }: { initialArticles: any[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { addToast } = useToast();

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await manageArticle({ 
        action: 'delete', 
        id: deleteId,
        title: 'delete', // placeholder for zod
        slug: 'delete',
        category: 'Fitness',
        excerpt: 'delete',
        readTime: 1,
        status: 'draft'
      });
      setArticles(articles.filter(a => a.id !== deleteId));
      setDeleteId(null);
      addToast('Article deleted successfully', 'success');
    } catch (e) {
      addToast('Failed to delete article', 'error');
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[rgba(46,125,50,0.15)] bg-gray-50/50">
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Title</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Category</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-[#1A2E1A]"></th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="border-b border-[rgba(46,125,50,0.15)] hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-[#1A2E1A]">{article.title}</td>
                <td className="px-6 py-4 text-sm">
                  <PillBadge active={false} className="text-[10px] bg-gray-100 text-gray-800">{article.category}</PillBadge>
                </td>
                <td className="px-6 py-4 text-sm">
                  <PillBadge active={article.status === 'published'} className={article.status === 'draft' ? 'bg-orange-100 text-orange-800' : 'bg-[#EBF5EB] text-[#2E7D32]'}>
                    {article.status.toUpperCase()}
                  </PillBadge>
                </td>
                <td className="px-6 py-4 text-sm text-[#78909C]">
                  <span suppressHydrationWarning>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                </td>
                <td className="px-6 py-4 text-sm flex justify-end gap-2">
                  <Link href={`/admin/content/${article.id}/edit`} className="p-2 text-[#78909C] hover:bg-[#EBF5EB] rounded-md transition-colors">
                    <Edit size={16} />
                  </Link>
                  <button 
                    onClick={() => setDeleteId(article.id)}
                    className="p-2 text-[#78909C] hover:bg-red-50 hover:text-[#C62828] rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {articles.length === 0 && (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-[#78909C]">No articles found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <h3 className="font-heading font-bold text-lg text-[#C62828] mb-4">Confirm Deletion</h3>
            <p className="text-[#1A2E1A] mb-6">Are you sure you want to delete this article? This is a soft-delete and the history will be retained.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 text-sm text-[#78909C]">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 text-sm text-white bg-[#C62828] rounded-lg hover:bg-red-800">Confirm Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
