import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { RESOURCE_CATEGORIES } from '../constants';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Link as LinkIcon, Plus, X } from 'lucide-react';

export default function TeacherUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [resourceType, setResourceType] = useState('Notes');
  const [semester, setSemester] = useState('Sem 1');
  const [subject, setSubject] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [materialGroup, setMaterialGroup] = useState('College Material');
  const [competitiveExam, setCompetitiveExam] = useState('UPSC');

  const [userProfile, setUserProfile] = useState<any>(null);
  
  // Dynamic subjects
  const [subjectsList, setSubjectsList] = useState<any[]>([]);

  // Modal State
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');

  useEffect(() => {
    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_user_profile');
      if (stored) setUserProfile(JSON.parse(stored));
    } else {
      const u = auth?.currentUser;
      if (u) {
        getDocs(query(collection(db, 'users'), where('userId', '==', u.uid)))
          .then(snap => {
            if (!snap.empty) setUserProfile(snap.docs[0].data());
          });
      }
    }
  }, []);

  // Fetch approved subjects
  useEffect(() => {
    if (!userProfile?.branch) return;

    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_subjects');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((s: any) => s.collegeDte === userProfile.dteCode && s.branch === userProfile.branch && s.semester === semester.replace('Sem ', ''));
      setSubjectsList(filtered);
      if (filtered.length > 0) setSubject(filtered[0].name);
      else setSubject('');
    } else {
      const q = query(
        collection(db, 'subjects'),
        where('collegeDte', '==', userProfile.dteCode),
        where('branch', '==', userProfile.branch),
        where('semester', '==', semester.replace('Sem ', ''))
      );
      const unsubscribe = onSnapshot(q, (snap) => {
        const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
        setSubjectsList(list);
        if (list.length > 0 && !list.find(s => s.name === subject)) {
          setSubject(list[0].name);
        } else if (list.length === 0) {
          setSubject('');
        }
      });
      return () => unsubscribe();
    }
  }, [semester, userProfile]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    if (materialGroup === 'College Material' && (!subject || !semester)) {
      setError('Please select or create a subject first.');
      return;
    }
    if (!fileUrl.trim()) {
      setError('Please provide a valid Google Drive or Video link.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let newResource: any = {
        title: title.trim(),
        name: title.trim(), // for backwards compatibility
        description: description.trim(),
        type: resourceType,
        fileUrl: fileUrl.trim(),
        url: fileUrl.trim(), // for backwards compatibility
        size: 0,
        uploadedBy: userProfile.userId,
        uploadedByName: userProfile.name,
        downloads: 0,
        views: 0,
        createdAt: isFirebaseDemo ? new Date().toISOString() : serverTimestamp()
      };

      if (materialGroup === 'College Material') {
        newResource.targetCollegeDte = userProfile.dteCode;
        newResource.targetBranch = userProfile.branch;
        newResource.semester = semester;
        newResource.subject = subject;
        newResource.isCompetitive = false;
      } else {
        newResource.examCategory = competitiveExam;
        newResource.subject = competitiveExam; // fallback
        newResource.isCompetitive = true;
      }

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_resources') || '[]';
        const list = JSON.parse(stored);
        list.push({ id: Date.now().toString(), ...newResource });
        localStorage.setItem('demo_resources', JSON.stringify(list));
      } else {
        await addDoc(collection(db, 'resources'), newResource);
      }

      setSuccess('Material saved and published successfully!');
      setTitle('');
      setDescription('');
      setFileUrl('');
    } catch (err: any) {
      setError(err.message || 'Failed to link resource.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) return;
    setLoading(true);
    try {
      const payload = {
        name: newSubjectName.trim(),
        branch: userProfile.branch,
        semester: semester.replace('Sem ', ''),
        collegeDte: userProfile.dteCode,
        createdBy: userProfile.name || userProfile.userId,
        createdAt: new Date().toISOString()
      };

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_subjects');
        const list = stored ? JSON.parse(stored) : [];
        if (list.find((s: any) => s.name.toLowerCase() === payload.name.toLowerCase() && s.branch === payload.branch && s.semester === payload.semester && s.collegeDte === payload.collegeDte)) {
          throw new Error('Subject already exists.');
        }
        list.push({ id: Date.now().toString(), ...payload });
        localStorage.setItem('demo_subjects', JSON.stringify(list));
      } else {
        // Simple duplicate check
        const q = query(
          collection(db, 'subjects'),
          where('name', '==', payload.name),
          where('branch', '==', payload.branch),
          where('semester', '==', payload.semester),
          where('collegeDte', '==', payload.collegeDte)
        );
        const snap = await getDocs(q);
        if (!snap.empty) throw new Error('Subject already exists.');
        
        await addDoc(collection(db, 'subjects'), payload);
      }
      setSuccess('Subject added successfully!');
      setShowSubjectModal(false);
      setNewSubjectName('');
    } catch (err: any) {
      setError(err.message || 'Failed to request subject.');
    } finally {
      setLoading(false);
    }
  };

  if (!userProfile) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen relative">
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
                  {RESOURCE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="text-sm font-semibold text-slate-700">Material Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="College Material" checked={materialGroup === 'College Material'} onChange={e => setMaterialGroup(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    <span className="text-slate-700">College Material</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="Competitive Exam Material" checked={materialGroup === 'Competitive Exam Material'} onChange={e => setMaterialGroup(e.target.value)} className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300" />
                    <span className="text-slate-700">Competitive Exam Material</span>
                  </label>
                </div>
              </div>

              {materialGroup === 'College Material' ? (
                <>
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

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Subject</label>
                    <select
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      {subjectsList.length === 0 && <option value="">No subjects available</option>}
                      {subjectsList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => setShowSubjectModal(true)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" /> Add New Subject
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2 col-span-2">
                  <label className="text-sm font-semibold text-slate-700">Competitive Exam Category</label>
                  <select
                    value={competitiveExam}
                    onChange={e => setCompetitiveExam(e.target.value)}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'].map(ex => (
                      <option key={ex} value={ex}>{ex}</option>
                    ))}
                  </select>
                </div>
              )}

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
                disabled={loading || !subject}
                className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Material'}
              </button>
            </div>

          </form>
        </div>
      </main>

      {/* Subject Creation Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Add New Subject</h3>
              <button onClick={() => setShowSubjectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateSubject} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Subject Name *</label>
                <input
                  required
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="e.g. Engineering Mathematics III"
                  className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !newSubjectName.trim()}
                  className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
