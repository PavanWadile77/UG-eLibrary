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
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="Content & File Moderation" />

      {loading && (
        <div className="h-1 bg-blue-100 dark:bg-blue-900/30 w-full overflow-hidden absolute top-16 left-0 z-10">
          <div className="animate-progress h-full bg-blue-600 dark:bg-blue-500 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-6 md:p-8 max-w-[1400px] mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {error && (
          <div className="rounded-[16px] bg-red-50 dark:bg-red-900/20 p-4 text-[14px] font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> {error}
          </div>
        )}
        {success && (
          <div className="rounded-[16px] bg-emerald-50 dark:bg-emerald-900/20 p-4 text-[14px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {success}
          </div>
        )}

        {/* Search bar */}
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white py-4 pl-14 pr-6 text-[15px] font-medium shadow-[0_4px_20px_rgba(0,0,0,0.03)] outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
            placeholder="Search by file name, uploader name, DTE code, or branch..."
          />
        </div>

        <div className="rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-800/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  <th className="px-8 py-5">Resource Title</th>
                  <th className="px-6 py-5">Format</th>
                  <th className="px-6 py-5">Uploader</th>
                  <th className="px-6 py-5">Class Target</th>
                  <th className="px-6 py-5">DTE Code</th>
                  <th className="px-6 py-5">Engagement</th>
                  <th className="px-6 py-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-24 text-center text-slate-400">
                      <div className="flex flex-col items-center justify-center">
                        <div className="h-20 w-20 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center mb-5">
                          <ShieldAlert className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                        </div>
                        <span className="font-extrabold text-slate-600 dark:text-slate-400 text-[16px]">No study resources match the query.</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-[12px] group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm transition-all text-blue-500 dark:text-blue-400 border border-blue-100 dark:border-blue-800/30">
                            <File className="h-5 w-5" />
                          </div>
                          <span className="font-extrabold text-slate-800 dark:text-slate-200 text-[15px]">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-700 px-3 py-1 text-[11px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-600">
                          {file.type || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-300">{file.uploadedByName || 'Teacher'}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-700 dark:text-slate-200">{file.branch}</span>
                          <span className="text-[12px] font-medium text-slate-400 dark:text-slate-500">{file.year}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-600 dark:text-slate-300">{file.dteCode}</td>
                      <td className="px-6 py-5">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                            <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">{file.views || 0} views</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            <span className="text-[12px] font-bold text-slate-500 dark:text-slate-400">{file.downloads || 0} downloads</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => handleDelete(file)}
                          className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 p-2.5 rounded-[12px] hover:bg-red-50 dark:hover:bg-red-900/30 transition-all opacity-0 group-hover:opacity-100"
                          title="Delete File"
                        >
                          <Trash2 className="h-5 w-5" />
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
