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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="My Uploads" />

      <main className="p-6 lg:p-8 max-w-7xl mx-auto space-y-8">
        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Total Uploads</p>
            <p className="text-3xl font-bold text-slate-800 mt-2">{totalCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Notes</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{notesCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Question Papers</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">{qpCount}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p className="text-sm font-medium text-slate-500">Assignments</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">{assignmentCount}</p>
          </div>
        </div>

        {/* Uploads List */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="font-bold text-lg text-slate-800">Uploaded Materials</h2>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : resources.length === 0 ? (
            <div className="text-center py-20">
              <FolderOpenIcon className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-700">No uploads yet</h3>
              <p className="text-slate-500 mt-1">Materials you upload will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-sm">
                    <th className="p-4 font-semibold">Title</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Subject</th>
                    <th className="p-4 font-semibold">Semester</th>
                    <th className="p-4 font-semibold">Upload Date</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map(r => {
                    const linkUrl = r.fileUrl || r.url || '';
                    const title = r.title || r.name || 'Untitled';
                    return (
                      <tr key={r.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg">
                              {getIconForType(r.type)}
                            </div>
                            <span className="font-bold text-slate-800">{title}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm font-medium text-slate-600">{r.type}</td>
                        <td className="p-4 text-sm text-slate-600">{r.subject}</td>
                        <td className="p-4 text-sm text-slate-600">{r.semester}</td>
                        <td className="p-4 text-sm text-slate-500">
                          {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Unknown'}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleView(linkUrl)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Material"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(r.id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
            <div className="p-6 text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-2">Delete Material?</h3>
              <p className="text-sm text-slate-500">
                Are you sure you want to delete this material? This action cannot be undone and it will be immediately removed from the Student Library.
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleting}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 disabled:opacity-50 flex justify-center items-center gap-2"
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
