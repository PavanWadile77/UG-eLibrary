import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';

export default function TeacherUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState('Notes'); // Notes, Question Papers, Syllabus, Assignments, Lab Manuals, E-books, Video Links
  const [semester, setSemester] = useState('Sem 1');
  const [subject, setSubject] = useState('');
  const [fileUrl, setFileUrl] = useState(''); // Google Drive URL

  const [userProfile, setUserProfile] = useState<any>(null);
  
  // Mapped dynamic subjects
  const [subjectsList, setSubjectsList] = useState<string[]>([]);

  useEffect(() => {
    // Load profile
    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_user_profile');
      if (stored) setUserProfile(JSON.parse(stored));
    } else {
      // In a real app, this would be passed down via context or fetched
      const u = auth.currentUser;
      if (u) {
        // Fetch profile
        getDocs(query(collection(db, 'users'), where('userId', '==', u.uid)))
          .then(snap => {
            if (!snap.empty) setUserProfile(snap.docs[0].data());
          });
      }
    }
  }, []);

  // Dynamically update subjects based on Semester and Branch
  useEffect(() => {
    if (!userProfile?.branch) return;
    
    // Mock subject mapper (In production, this would fetch from Firestore `subjects` collection)
    const mockSubjects: Record<string, string[]> = {
      'Sem 1': ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical'],
      'Sem 2': ['Engineering Mathematics II', 'Engineering Chemistry', 'Programming in C'],
      'Sem 3': ['Data Structures', 'Discrete Mathematics', 'Digital Logic'],
      'Sem 4': ['Operating Systems', 'Database Management', 'Computer Networks']
    };
    
    setSubjectsList(mockSubjects[semester] || ['General Subject 1', 'General Subject 2']);
    setSubject(mockSubjects[semester]?.[0] || 'General Subject 1');
  }, [semester, userProfile]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;

    if (!fileUrl.trim()) {
      setError('Please provide a valid Google Drive or Video link.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const newResource = {
        title,
        description,
        type: resourceType,
        semester,
        subject,
        fileUrl: fileUrl.trim(),
        size: 0, // Not tracked for external links
        uploadedBy: userProfile.userId,
        uploadedByName: userProfile.name,
        targetCollegeDte: userProfile.dteCode,
        targetBranch: userProfile.branch,
        status: 'pending', // Admin needs to approve
        downloads: 0,
        views: 0,
        createdAt: isFirebaseDemo ? new Date().toISOString() : serverTimestamp()
      };

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_resources') || '[]';
        const list = JSON.parse(stored);
        list.push({ id: Date.now().toString(), ...newResource });
        localStorage.setItem('demo_resources', JSON.stringify(list));
      } else {
        await addDoc(collection(db, 'resources'), newResource);
      }

      setSuccess('Resource linked successfully! Pending Admin approval.');
      setTitle('');
      setDescription('');
      setFileUrl('');
    } catch (err: any) {
      setError(err.message || 'Failed to link resource.');
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Upload Resource" />

      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-blue-600 px-6 py-4 flex items-center justify-between text-white">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <UploadCloud className="h-6 w-6" /> Upload Academic Material
              </h2>
              <p className="text-sm text-blue-100 opacity-90 mt-1">
                Tagging automatically to: {userProfile.collegeName} • {userProfile.branch}
              </p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="p-6 space-y-6">
            {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg flex gap-2"><AlertCircle className="h-5 w-5" /> {error}</div>}
            {success && <div className="p-4 bg-green-50 text-green-700 rounded-lg flex gap-2"><CheckCircle2 className="h-5 w-5" /> {success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Resource Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Chapter 1: Introduction to Data Structures"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Resource Category</label>
                <select
                  value={resourceType}
                  onChange={e => setResourceType(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option>Notes</option>
                  <option>Question Papers</option>
                  <option>Syllabus</option>
                  <option>Assignments</option>
                  <option>Lab Manuals</option>
                  <option>E-books</option>
                  <option>Video Links</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Semester</label>
                <select
                  value={semester}
                  onChange={e => setSemester(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                    <option key={s} value={`Sem ${s}`}>Semester {s}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Subject (Dynamic based on Sem & Branch)</label>
                <select
                  required
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Google Drive URL or Video Link</label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
                    <input
                      required
                      type="url"
                      value={fileUrl}
                      onChange={e => setFileUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 pl-10 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500">Ensure the Google Drive link permission is set to "Anyone with the link can view".</p>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Description / Instructions</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Optional details for students..."
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit to Admin for Approval'}
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
