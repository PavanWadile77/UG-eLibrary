import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp, query, where, getDocs, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { RESOURCE_CATEGORIES } from '../constants';
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Link as LinkIcon, Plus, X, Settings } from 'lucide-react';

export default function TeacherUpload() {
  const navigate = useNavigate();
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

    console.log({
      title,
      category: resourceType,
      materialType: materialGroup,
      examCategory: competitiveExam,
      fileUrl
    });

    try {
      let newResource: any = {
        title: title.trim(),
        name: title.trim(), // for backwards compatibility
        description: description.trim(),
        type: resourceType,
        category: resourceType,
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

        // Create Demo Notification
        const notifStored = localStorage.getItem('demo_notifications') || '[]';
        const notifList = JSON.parse(notifStored);
        const newNotif = {
          id: `notif_${Date.now()}`,
          title: `New ${resourceType} uploaded`,
          message: `${title} - ${newResource.subject} By: ${userProfile.name}`,
          type: resourceType,
          targetBranch: newResource.targetBranch || 'All Branches',
          semester: newResource.semester || 'All Semesters',
          targetRole: 'student',
          url: fileUrl.trim(),
          createdAt: new Date().toISOString(),
          readBy: []
        };
        notifList.unshift(newNotif);
        localStorage.setItem('demo_notifications', JSON.stringify(notifList));

      } else {
        await addDoc(collection(db, 'resources'), newResource);

        // Create Firestore Notification
        const newNotif = {
          title: `New ${resourceType} uploaded`,
          message: `${title}\n${newResource.subject}\n${newResource.semester || 'All Semesters'}\n${newResource.targetBranch || 'All Branches'}\nBy: ${userProfile.name}`,
          type: resourceType,
          targetBranch: newResource.targetBranch || 'All Branches',
          semester: newResource.semester || 'All Semesters',
          targetRole: 'student',
          url: fileUrl.trim(),
          createdAt: serverTimestamp(),
          readBy: []
        };
        await addDoc(collection(db, 'notifications'), newNotif);
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
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative transition-colors font-sans selection:bg-blue-100">
      <Header title="Upload Resource" />

      <main className="p-6 md:p-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-slate-100 dark:border-slate-700 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden transition-all relative">
          
          {/* Header Gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-8 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
            <div className="relative z-10">
              <h2 className="text-2xl font-extrabold flex items-center gap-3 tracking-tight">
                <UploadCloud className="h-7 w-7" /> Upload Academic Material
              </h2>
              <p className="text-[14px] font-medium text-blue-100/90 mt-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Tagging automatically to: <strong className="font-extrabold text-white ml-1">{userProfile.collegeName} • {userProfile.branch}</strong>
              </p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="p-8 space-y-8">
            {error && <div className="p-4 bg-red-50 text-red-700 rounded-[16px] flex gap-2 font-bold"><AlertCircle className="h-5 w-5" /> {error}</div>}
            {success && <div className="p-4 bg-emerald-50 text-emerald-700 rounded-[16px] flex gap-2 font-bold"><CheckCircle2 className="h-5 w-5" /> {success}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-2 md:col-span-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Resource Title</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g., Chapter 1: Introduction to Data Structures"
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Resource Category</label>
                <select
                  value={resourceType}
                  onChange={e => setResourceType(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300 bg-white"
                >
                  {RESOURCE_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300 block mb-2">Material Type</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 flex items-center p-4 rounded-[16px] border-[1.5px] cursor-pointer transition-all ${materialGroup === 'College Material' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}>
                    <input type="radio" value="College Material" checked={materialGroup === 'College Material'} onChange={e => setMaterialGroup(e.target.value)} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 mr-3" />
                    <span className={`font-bold ${materialGroup === 'College Material' ? 'text-blue-900' : 'text-slate-600'}`}>College Material</span>
                  </label>
                  <label className={`flex-1 flex items-center p-4 rounded-[16px] border-[1.5px] cursor-pointer transition-all ${materialGroup === 'Competitive Exam Material' ? 'border-blue-600 bg-blue-50/50 shadow-sm' : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'}`}>
                    <input type="radio" value="Competitive Exam Material" checked={materialGroup === 'Competitive Exam Material'} onChange={e => setMaterialGroup(e.target.value)} className="w-5 h-5 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-600 mr-3" />
                    <span className={`font-bold ${materialGroup === 'Competitive Exam Material' ? 'text-blue-900' : 'text-slate-600'}`}>Competitive Exam Material</span>
                  </label>
                </div>
              </div>

              {materialGroup === 'College Material' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Semester</label>
                    <select
                      value={semester}
                      onChange={e => setSemester(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300 bg-white"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                        <option key={s} value={`Sem ${s}`}>Semester {s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Subject</label>
                    <select
                      required
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                      className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300 bg-white"
                    >
                      {subjectsList.length === 0 && <option value="">No subjects available</option>}
                      {subjectsList.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
                    </select>
                    <div className="mt-3 flex items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setShowSubjectModal(true)}
                        className="text-[13px] text-blue-600 hover:text-blue-700 font-extrabold flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        <Plus className="h-4 w-4" /> Add New
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/subjects')}
                        className="text-[13px] text-slate-600 hover:text-slate-800 font-extrabold flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg transition-colors hover:bg-slate-100"
                      >
                        <Settings className="h-4 w-4" /> Manage
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Competitive Exam Category</label>
                  <select
                    value={competitiveExam}
                    onChange={e => setCompetitiveExam(e.target.value)}
                    className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300 bg-white"
                  >
                    {['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'].map(ex => (
                      <option key={ex} value={ex}>{ex}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2 md:col-span-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Google Drive URL or Video Link</label>
                <div className="flex gap-2 items-center">
                  <div className="flex-1 relative">
                    <LinkIcon className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                    <input
                      required
                      type="url"
                      value={fileUrl}
                      onChange={e => setFileUrl(e.target.value)}
                      placeholder="https://drive.google.com/..."
                      className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 pl-12 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300"
                    />
                  </div>
                </div>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-blue-500" />
                  Ensure the Google Drive link permission is set to "Anyone with the link can view".
                </p>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Description / Instructions</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Optional details for students..."
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all font-medium hover:border-blue-300 resize-none"
                />
              </div>

            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end items-center gap-4">
              <button
                type="submit"
                disabled={loading || (materialGroup === 'College Material' && !subject)}
                className="w-full md:w-auto px-10 py-3.5 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 disabled:translate-y-0"
              >
                {loading ? 'Saving...' : 'Publish Material'}
              </button>
            </div>

          </form>
        </div>
      </main>

      {/* Subject Creation Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-md p-4 transition-all">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-extrabold text-slate-800 dark:text-white text-[18px]">Add New Subject</h3>
              <button onClick={() => setShowSubjectModal(false)} className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 hover:bg-slate-200 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form onSubmit={handleCreateSubject} className="p-6 space-y-6">
              <div>
                <label className="block text-[14px] font-extrabold text-slate-700 dark:text-slate-300 mb-2">Subject Name *</label>
                <input
                  required
                  type="text"
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  placeholder="e.g. Engineering Mathematics III"
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
              
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubjectModal(false)}
                  className="flex-1 px-4 py-3 border-[1.5px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-extrabold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !newSubjectName.trim()}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md shadow-blue-500/20"
                >
                  {loading ? 'Adding...' : 'Add Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
