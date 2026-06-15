import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';
import { Trash2, Search, File, ShieldAlert } from 'lucide-react';

interface FileModel {
  id: string;
  name: string;
  url: string;
  storagePath: string;
  type: string;
  uploadedBy: string;
  uploadedByName?: string;
  dteCode: string;
  branch: string;
  year: string;
  subject?: string;
  downloads?: number;
  views?: number;
  createdAt?: string;
}

export default function FileModeration() {
  const [files, setFiles] = useState<FileModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError('');
      const snapshot = await getDocs(collection(db, 'files'));
      const list: FileModel[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as FileModel);
      });
      setFiles(list);
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch syllabus resources.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDelete = async (file: FileModel) => {
    if (!window.confirm(`Permanently delete resource "${file.name}"?`)) return;
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // 1. Remove from Firestore
      await deleteDoc(doc(db, 'files', file.id));

      setSuccess(`Resource "${file.name}" successfully deleted.`);
      fetchFiles();
    } catch (err: any) {
      console.error(err);
      setError('Failed to delete resource: ' + err.message);
      setLoading(false);
    }
  };

  const filtered = files.filter((f) => 
    (f.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.uploadedByName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.dteCode || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (f.branch || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Content & File Moderation" />

      {loading && (
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-8">
        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
        {success && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-600">{success}</div>}

        {/* Search bar */}
        <div className="mb-6 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-12 pr-4 text-sm shadow-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            placeholder="Search by file name, uploader name, DTE code, or branch..."
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-100/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  <th className="px-6 py-4">Resource Title</th>
                  <th className="px-6 py-4">Format</th>
                  <th className="px-6 py-4">Uploader</th>
                  <th className="px-6 py-4">Class Target</th>
                  <th className="px-6 py-4">DTE Code</th>
                  <th className="px-6 py-4">Engagement</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <ShieldAlert className="h-10 w-10 text-slate-300 mb-2" />
                        <span>No study resources match the query.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50/25 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-slate-500" />
                          <span>{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold uppercase text-slate-500">
                        {file.type || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">{file.uploadedByName || 'Teacher'}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {file.branch} ({file.year})
                      </td>
                      <td className="px-6 py-4 text-slate-600">{file.dteCode}</td>
                      <td className="px-6 py-4 text-slate-500 text-xs font-medium">
                        {file.views || 0} views / {file.downloads || 0} downloads
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete(file)}
                          className="text-red-500 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
