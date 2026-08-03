import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { FileText, Eye, Trash2, BookOpen, FileSpreadsheet, PlayCircle, Loader2 } from 'lucide-react';

interface ResourceData {
  id: string;
  title?: string;
  name?: string;
  type: string;
  subject: string;
  semester: string;
  fileUrl?: string;
  url?: string;
  uploadedBy: string;
  createdAt: string;
}

export default function TeacherMyUploads() {
  const [resources, setResources] = useState<ResourceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchMyUploads();
  }, []);

  const fetchMyUploads = async () => {
    setLoading(true);
    try {
      let myData: ResourceData[] = [];
      const uid = auth.currentUser?.uid || 'demo_admin';

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_resources');
        if (stored) {
          const parsed = JSON.parse(stored);
          myData = parsed.filter((r: any) => r.uploadedBy === uid);
        }
      } else {
        const q = query(collection(db, 'resources'), where('uploadedBy', '==', uid));
        const snap = await getDocs(q);
        myData = snap.docs.map(d => ({ id: d.id, ...d.data() } as ResourceData));
        // Sort manually by date desc if needed, assuming they have createdAt
        myData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      setResources(myData);
    } catch (e) {
      console.error("Failed to fetch uploads", e);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_resources');
        if (stored) {
          const parsed = JSON.parse(stored);
          const updated = parsed.filter((r: any) => r.id !== deleteId);
          localStorage.setItem('demo_resources', JSON.stringify(updated));
        }
      } else {
        await deleteDoc(doc(db, 'resources', deleteId));
      }
      setResources(prev => prev.filter(r => r.id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      console.error("Error deleting document", e);
      alert("Failed to delete. Check permissions or network.");
    } finally {
      setDeleting(false);
    }
  };

  const handleView = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert("Link not available");
    }
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Notes': return <FileText className="h-6 w-6 text-blue-500" />;
      case 'Question Papers': return <FileSpreadsheet className="h-6 w-6 text-amber-500" />;
      case 'Video Links': return <PlayCircle className="h-6 w-6 text-red-500" />;
      default: return <BookOpen className="h-6 w-6 text-emerald-500" />;
    }
  };

  // Stats
  const totalCount = resources.length;
  const notesCount = resources.filter(r => r.type === 'Notes').length;
  const qpCount = resources.filter(r => r.type === 'Question Papers').length;
  const assignmentCount = resources.filter(r => r.type === 'Assignments').length;

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen transition-colors font-sans selection:bg-blue-100">
      <Header title="My Uploads" />

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1">
            <p className="text-[14px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Uploads</p>
            <p className="text-4xl font-black text-slate-800 dark:text-white mt-3 tracking-tight">{totalCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 transition-all hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:-translate-y-1">
            <p className="text-[14px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Notes</p>
            <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mt-3 tracking-tight">{notesCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 transition-all hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] hover:-translate-y-1">
            <p className="text-[14px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Question Papers</p>
            <p className="text-4xl font-black text-amber-600 dark:text-amber-400 mt-3 tracking-tight">{qpCount}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 transition-all hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] hover:-translate-y-1">
            <p className="text-[14px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Assignments</p>
            <p className="text-4xl font-black text-emerald-600 dark:text-emerald-400 mt-3 tracking-tight">{assignmentCount}</p>
          </div>
        </div>

        {/* Uploads List */}
        <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 overflow-hidden transition-all">
          <div className="px-8 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
            <h2 className="font-extrabold text-[18px] text-slate-800 dark:text-white tracking-tight">Uploaded Materials</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-24">
              <div className="bg-slate-50 dark:bg-slate-700/50 h-24 w-24 rounded-full flex items-center justify-center mx-auto mb-6">
                <FolderOpenIcon className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-[20px] font-extrabold text-slate-700 dark:text-slate-200 tracking-tight">No uploads yet</h3>
              <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 mt-2">Materials you upload will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[13px] uppercase tracking-wider">
                    <th className="p-5 font-extrabold">Title</th>
                    <th className="p-5 font-extrabold">Category</th>
                    <th className="p-5 font-extrabold">Subject</th>
                    <th className="p-5 font-extrabold">Semester</th>
                    <th className="p-5 font-extrabold">Upload Date</th>
                    <th className="p-5 font-extrabold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(r => {
                    const linkUrl = r.fileUrl || r.url || '';
                    const title = r.title || r.name || 'Untitled';
                    return (
                      <tr key={r.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-5">
                          <div className="flex items-center gap-4">
                            <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-[12px] shadow-sm">
                              {getIconForType(r.type)}
                            </div>
                            <span className="font-extrabold text-[15px] text-slate-800 dark:text-slate-200">{title}</span>
                          </div>
                        </td>
                        <td className="p-5 text-[14px] font-bold text-slate-600 dark:text-slate-300">{r.type}</td>
                        <td className="p-5 text-[14px] font-medium text-slate-600 dark:text-slate-300">{r.subject}</td>
                        <td className="p-5 text-[14px] font-medium text-slate-600 dark:text-slate-300">{r.semester}</td>
                        <td className="p-5 text-[14px] font-medium text-slate-500 dark:text-slate-400">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
                        </td>
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-3">
                            <button
                              onClick={() => handleView(linkUrl)}
                              className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-[12px] transition-all"
                              title="View Material"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(r.id)}
                              className="p-2.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-[12px] transition-all"
                              title="Delete Material"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-md p-4 transition-all">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-5 border border-red-100 dark:border-red-800/50">
                <Trash2 className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-[20px] mb-2 tracking-tight">Delete Material?</h3>
              <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to delete this material? This action cannot be undone and it will be immediately removed from the Student Library.
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 border-[1.5px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-extrabold rounded-full hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-extrabold rounded-full hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FolderOpenIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 14 1.45-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.55 6a2 2 0 0 1-1.94 1.5H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h3.93a2 2 0 0 1 1.66.9l.82 1.2a2 2 0 0 0 1.66.9H18a2 2 0 0 1 2 2v2" />
    </svg>
  );
}
