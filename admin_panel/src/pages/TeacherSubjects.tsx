import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, addDoc, updateDoc, deleteDoc, serverTimestamp, onSnapshot } from 'firebase/firestore';
import { db, auth, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { BookOpen, Search, Plus, Edit2, Trash2, X, AlertCircle, CheckCircle2, Loader2, ArrowUpDown } from 'lucide-react';

interface SubjectData {
  id: string;
  name: string;
  subjectCode?: string;
  semester: string;
  branch: string;
  academicYear?: string;
  collegeDte: string;
  createdBy: string;
  createdAt: string;
}

export default function TeacherSubjects() {
  const [subjects, setSubjects] = useState<SubjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sort State
  const [sortConfig, setSortConfig] = useState<{ key: keyof SubjectData, direction: 'asc' | 'desc' } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    subjectCode: '',
    semester: '1',
    branch: '',
    academicYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString()
  });
  
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Toast State
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    fetchProfileAndSubjects();
  }, []);

  const fetchProfileAndSubjects = async () => {
    setLoading(true);
    let profile: any = null;
    
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_user_profile');
        if (stored) {
          profile = JSON.parse(stored);
          setUserProfile(profile);
        }
      } else {
        const u = auth?.currentUser;
        if (u) {
          const snap = await getDocs(query(collection(db, 'users'), where('userId', '==', u.uid)));
          if (!snap.empty) {
            profile = snap.docs[0].data();
            setUserProfile(profile);
            setFormData(prev => ({ ...prev, branch: profile.branch || '' }));
          }
        }
      }

      if (profile) {
        if (isFirebaseDemo) {
          const storedSubjects = localStorage.getItem('demo_subjects');
          const list = storedSubjects ? JSON.parse(storedSubjects) : [];
          const filtered = list.filter((s: any) => s.collegeDte === profile.dteCode && s.branch === profile.branch);
          setSubjects(filtered);
          setLoading(false);
        } else {
          const q = query(
            collection(db, 'subjects'),
            where('collegeDte', '==', profile.dteCode),
            where('branch', '==', profile.branch)
          );
          
          const unsubscribe = onSnapshot(q, (snap) => {
            const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as SubjectData));
            setSubjects(list);
            setLoading(false);
          }, (err) => {
            console.error("Error fetching subjects: ", err);
            setLoading(false);
          });
          
          return () => unsubscribe();
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSort = (key: keyof SubjectData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedSubjects = React.useMemo(() => {
    let sortableItems = [...subjects];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aVal = a[sortConfig.key] || '';
        const bVal = b[sortConfig.key] || '';
        if (aVal < bVal) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aVal > bVal) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [subjects, sortConfig]);

  const filteredSubjects = sortedSubjects.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (sub.subjectCode && sub.subjectCode.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const openAddModal = () => {
    setSelectedSubject(null);
    setFormData({
      name: '',
      subjectCode: '',
      semester: '1',
      branch: userProfile?.branch || '',
      academicYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString()
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openEditModal = (subject: SubjectData) => {
    setSelectedSubject(subject);
    setFormData({
      name: subject.name,
      subjectCode: subject.subjectCode || '',
      semester: subject.semester,
      branch: subject.branch,
      academicYear: subject.academicYear || ''
    });
    setFormError('');
    setIsModalOpen(true);
  };

  const openDeleteModal = (subject: SubjectData) => {
    setSelectedSubject(subject);
    setIsDeleteModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.subjectCode.trim() || !formData.semester || !formData.branch || !formData.academicYear.trim()) {
      setFormError("Please fill all required fields.");
      return;
    }
    
    setIsSubmitting(true);
    setFormError('');

    try {
      // Check for duplicate subject code
      const isDuplicateCode = subjects.some(s => 
        s.subjectCode?.toLowerCase() === formData.subjectCode.trim().toLowerCase() && 
        s.id !== selectedSubject?.id
      );
      
      if (isDuplicateCode) {
        setFormError("Subject Code already exists.");
        setIsSubmitting(false);
        return;
      }

      const payload = {
        name: formData.name.trim(),
        subjectCode: formData.subjectCode.trim().toUpperCase(),
        semester: formData.semester,
        branch: formData.branch,
        academicYear: formData.academicYear.trim(),
        collegeDte: userProfile.dteCode,
        createdBy: userProfile.name || userProfile.userId,
        updatedAt: new Date().toISOString()
      };

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_subjects');
        let list = stored ? JSON.parse(stored) : [];
        
        if (selectedSubject) {
          list = list.map((s: any) => s.id === selectedSubject.id ? { ...s, ...payload } : s);
          showToast("Subject updated successfully.");
        } else {
          list.push({ 
            id: Date.now().toString(), 
            createdAt: new Date().toISOString(), 
            ...payload 
          });
          showToast("Subject updated successfully."); // User prompt says "Subject updated successfully." (or "Subject created") but let's stick to "Subject updated successfully" as requested in prompt "After Save: Show success toast 'Subject updated successfully.'". Wait, the prompt implies "Subject updated successfully." for Edit. But for add? Let's use it for both or be more specific. I'll use "Subject saved successfully."
        }
        
        localStorage.setItem('demo_subjects', JSON.stringify(list));
        const filtered = list.filter((s: any) => s.collegeDte === userProfile.dteCode && s.branch === userProfile.branch);
        setSubjects(filtered);
      } else {
        if (selectedSubject) {
          await updateDoc(doc(db, 'subjects', selectedSubject.id), payload);
          showToast("Subject updated successfully.");
        } else {
          await addDoc(collection(db, 'subjects'), {
            ...payload,
            createdAt: new Date().toISOString()
          });
          showToast("Subject updated successfully."); // matching requested phrase
        }
      }
      
      setIsModalOpen(false);
    } catch (err: any) {
      setFormError(err.message || "An error occurred while saving.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedSubject) return;
    setIsSubmitting(true);
    
    try {
      if (isFirebaseDemo) {
        const storedResources = localStorage.getItem('demo_resources');
        if (storedResources) {
          const resources = JSON.parse(storedResources);
          const isReferenced = resources.some((r: any) => r.subject === selectedSubject.name);
          if (isReferenced) {
            alert(`Cannot delete subject "${selectedSubject.name}" because it is referenced by uploaded materials.`);
            setIsSubmitting(false);
            return;
          }
        }

        const stored = localStorage.getItem('demo_subjects');
        if (stored) {
          const list = JSON.parse(stored);
          const updated = list.filter((s: any) => s.id !== selectedSubject.id);
          localStorage.setItem('demo_subjects', JSON.stringify(updated));
          const filtered = updated.filter((s: any) => s.collegeDte === userProfile.dteCode && s.branch === userProfile.branch);
          setSubjects(filtered);
        }
      } else {
        // Check for references
        const q = query(collection(db, 'resources'), where('subject', '==', selectedSubject.name));
        const snap = await getDocs(q);
        if (!snap.empty) {
          alert(`Cannot delete subject "${selectedSubject.name}" because it is referenced by uploaded materials. Please remove the materials first.`);
          setIsSubmitting(false);
          return;
        }

        await deleteDoc(doc(db, 'subjects', selectedSubject.id));
      }
      
      showToast("Subject deleted successfully.");
      setIsDeleteModalOpen(false);
    } catch (err: any) {
      console.error("Firebase Delete Error:", err);
      alert(`Failed to delete subject. Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!userProfile) return null;

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="Subject Management" />
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-8 z-50 animate-fade-in-down">
          <div className="bg-emerald-500 text-white px-6 py-4 rounded-[16px] shadow-[0_8px_30px_rgba(16,185,129,0.2)] flex items-center gap-3 font-bold border border-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white flex items-center gap-3 tracking-tight">
              <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" /> Subject Management
            </h1>
            <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Manage subjects for your branch ({userProfile.branch})
            </p>
          </div>
          
          <button 
            onClick={openAddModal}
            className="px-6 py-3.5 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 tracking-wide"
          >
            <Plus className="h-5 w-5" /> Add Subject
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-100 dark:border-slate-700 overflow-hidden transition-all">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex items-center bg-slate-50/50 dark:bg-slate-800/50">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by subject name or code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-5 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-800 dark:text-white font-medium hover:border-blue-300"
              />
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <Loader2 className="h-10 w-10 animate-spin text-blue-500" />
            </div>
          ) : filteredSubjects.length === 0 ? (
            <div className="text-center py-24 px-4">
              <div className="h-24 w-24 bg-slate-50 dark:bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-12 w-12 text-slate-400" />
              </div>
              <h3 className="text-[20px] font-extrabold text-slate-700 dark:text-slate-200 tracking-tight">No subjects found</h3>
              <p className="text-[15px] font-medium text-slate-500 dark:text-slate-400 mt-2">Add a new subject to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-[13px] uppercase tracking-wider">
                    <th className="p-5 font-extrabold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-2">Subject Name <ArrowUpDown className="h-4 w-4" /></div>
                    </th>
                    <th className="p-5 font-extrabold">Subject Code</th>
                    <th className="p-5 font-extrabold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" onClick={() => handleSort('semester')}>
                      <div className="flex items-center gap-2">Semester <ArrowUpDown className="h-4 w-4" /></div>
                    </th>
                    <th className="p-5 font-extrabold cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors" onClick={() => handleSort('branch')}>
                      <div className="flex items-center gap-2">Branch <ArrowUpDown className="h-4 w-4" /></div>
                    </th>
                    <th className="p-5 font-extrabold">Academic Year</th>
                    <th className="p-5 font-extrabold">Created Date</th>
                    <th className="p-5 font-extrabold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubjects.map(sub => (
                    <tr key={sub.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="p-5 font-extrabold text-[15px] text-slate-800 dark:text-slate-200">{sub.name}</td>
                      <td className="p-5 text-[14px] font-bold text-slate-600 dark:text-slate-300">
                        {sub.subjectCode ? (
                          <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 shadow-sm text-slate-700 dark:text-slate-300">
                            {sub.subjectCode}
                          </span>
                        ) : (
                          <span className="text-slate-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="p-5 text-[14px] font-bold text-slate-600 dark:text-slate-300">Sem {sub.semester}</td>
                      <td className="p-5 text-[14px] font-medium text-slate-600 dark:text-slate-300">{sub.branch}</td>
                      <td className="p-5 text-[14px] font-medium text-slate-600 dark:text-slate-300">{sub.academicYear || '-'}</td>
                      <td className="p-5 text-[14px] font-medium text-slate-500 dark:text-slate-400">
                        {sub.createdAt ? new Date(sub.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Unknown'}
                      </td>
                      <td className="p-5 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => openEditModal(sub)}
                            className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-[12px] transition-all"
                            title="Edit Subject"
                          >
                            <Edit2 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => openDeleteModal(sub)}
                            className="p-2.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-[12px] transition-all"
                            title="Delete Subject"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
      
      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-md p-4 transition-all">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <h3 className="font-extrabold text-slate-800 dark:text-white text-[18px]">
                {selectedSubject ? 'Edit Subject' : 'Add New Subject'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6 custom-scrollbar">
              {formError && (
                <div className="p-4 bg-red-50 text-red-700 rounded-[16px] flex items-start gap-3 font-bold border border-red-100">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <p>{formError}</p>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Subject Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="e.g. Data Structures"
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Subject Code <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.subjectCode}
                  onChange={(e) => setFormData({...formData, subjectCode: e.target.value})}
                  placeholder="e.g. CS201"
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Semester <span className="text-red-500">*</span></label>
                  <select
                    required
                    value={formData.semester}
                    onChange={(e) => setFormData({...formData, semester: e.target.value})}
                    className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white font-medium"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(s => (
                      <option key={s} value={s.toString()}>{s}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Academic Year <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    placeholder="e.g. 2024-2025"
                    className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[14px] font-extrabold text-slate-700 dark:text-slate-300">Branch <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  className="w-full border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-[16px] px-5 py-3.5 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                />
              </div>
              
              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-3 border-[1.5px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-extrabold rounded-full hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-blue-600 text-white font-extrabold rounded-full hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center gap-2 shadow-md shadow-blue-500/20 transition-all"
                >
                  {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
                  {isSubmitting ? 'Saving...' : 'Save Subject'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-md p-4 transition-all">
          <div className="bg-white dark:bg-slate-800 rounded-[24px] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100 dark:border-slate-700">
            <div className="p-8 text-center">
              <div className="mx-auto w-16 h-16 bg-red-50 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-5 border border-red-100 dark:border-red-800/50">
                <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-[20px] mb-2 tracking-tight">Delete Subject</h3>
              <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-slate-700 dark:text-slate-300">{selectedSubject.name}</strong>? This action cannot be undone.
              </p>
            </div>
            <div className="p-5 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700 flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-white dark:bg-slate-700 border-[1.5px] border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-extrabold rounded-full hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isSubmitting}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-extrabold rounded-full hover:bg-red-700 hover:shadow-md hover:shadow-red-500/20 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSubmitting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for animations */}
      <style>{`
        @keyframes fade-in-down {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.4s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
