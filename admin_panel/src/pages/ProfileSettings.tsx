import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc, writeBatch, collection, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { User, School, Target, Save, CheckCircle2, AlertCircle, Moon, Bell, Settings } from 'lucide-react';
import SearchableCollegeDropdown, { College } from '../components/SearchableCollegeDropdown';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState<any>(null);

  // Personal Info states
  const [name, setName] = useState('');

  // Form states
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [examInterests, setExamInterests] = useState<string[]>([]);
  
  // UI toggles
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [emailNotifs, setEmailNotifs] = useState(true);

  const handleThemeToggle = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const defaultBranches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics & Telecommunication', 'Chemical Engineering', 'Pharmacy', 
    'Computer Science and Engineering', 'Electronics and Computer Engineering', 'Data Science', 'Other'
  ];
  const competitiveExamsList = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

  useEffect(() => {
    async function loadData() {
      let p = null;
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_user_profile');
        if (stored) p = JSON.parse(stored);
      } else {
        const u = auth?.currentUser;
        if (u) {
          const docSnap = await getDoc(doc(db, 'users', u.uid));
          if (docSnap.exists()) p = docSnap.data();
        }
      }
      
        if (p) {
          setProfile(p);
          setName(p.name || '');
          setBranch(p.branch || '');
          setSemester(p.semester || 'Sem 1');
          setExamInterests(p.competitiveInterests || []);
        
        // Setup initial selected college if exists
        if (p.dteCode && p.collegeName) {
           setSelectedCollege({ dteCode: p.dteCode, name: p.collegeName, id: p.dteCode });
        }
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!name.trim() || name.trim().length < 3 || name.trim().length > 50) {
      setError('Name must be between 3 and 50 characters.');
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        name: name.trim(),
        collegeName: selectedCollege ? selectedCollege.name : profile.collegeName,
        dteCode: selectedCollege ? selectedCollege.dteCode : profile.dteCode,
        branch,
        semester,
        competitiveInterests: examInterests
      };

      const nameChanged = name.trim() !== profile.name;

      if (isFirebaseDemo) {
        const p = { ...profile, ...updatedData };
        localStorage.setItem('demo_user_profile', JSON.stringify(p));
        setProfile(p);
        
        if (nameChanged) {
          const storedRes = localStorage.getItem('demo_resources');
          if (storedRes) {
            const list = JSON.parse(storedRes);
            const updatedList = list.map((r: any) => {
              if (r.uploadedBy === p.userId) return { ...r, uploadedByName: updatedData.name };
              return r;
            });
            localStorage.setItem('demo_resources', JSON.stringify(updatedList));
          }
        }
      } else {
        const u = auth?.currentUser;
        if (u) {
          await updateDoc(doc(db, 'users', u.uid), updatedData);
          setProfile({ ...profile, ...updatedData });
          
          if (nameChanged) {
            const batch = writeBatch(db);
            const q = query(collection(db, 'resources'), where('uploadedBy', '==', u.uid));
            const snap = await getDocs(q);
            snap.forEach((d) => {
              batch.update(d.ref, { uploadedByName: updatedData.name });
            });
            await batch.commit();
          }
        }
      }
      
      const collegeChanged = selectedCollege && selectedCollege.dteCode !== profile.dteCode;
      if (collegeChanged) {
        setSuccess('College updated successfully');
      } else {
        setSuccess('Profile updated successfully');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const toggleExam = (exam: string) => {
    setExamInterests(prev => 
      prev.includes(exam) ? prev.filter(e => e !== exam) : [...prev, exam]
    );
  };

  if (!profile) return <div className="p-8 font-sans font-medium text-slate-500">Loading Profile...</div>;

  const availableBranches = selectedCollege && selectedCollege.branches
    ? selectedCollege.branches.split(/[,|]/).map(b => b.trim()).filter(Boolean)
    : defaultBranches;

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-b from-[#F8FAFC] to-[#EEF4FF] dark:from-slate-900 dark:to-slate-950 transition-colors font-sans selection:bg-blue-100 relative overflow-hidden">
      
      {/* Subtle Blue Blurred Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/10 dark:bg-blue-500/5 rounded-full blur-[100px] pointer-events-none -z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/10 dark:bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none -z-0"></div>

      <Header title="Account Settings" />

      <main className="relative z-10 p-6 lg:p-10 max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <h1 className="text-[34px] font-bold text-slate-900 dark:text-white tracking-tight mb-2">Profile Settings</h1>
        
        {/* Core Profile Info Header */}
        <div className="bg-white dark:bg-slate-800 rounded-[24px] border border-[#E5E7EB] dark:border-slate-700 shadow-[0_8px_30px_rgba(0,0,0,0.04)] p-8 flex flex-col md:flex-row items-center gap-8 transition-all">
          
          <div className="h-[90px] w-[90px] rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 shadow-[0_0_24px_rgba(59,130,246,0.3)] flex items-center justify-center text-white ring-4 ring-white dark:ring-slate-800">
            <User className="h-10 w-10" />
          </div>
          <div className="flex-1 text-center md:text-left flex flex-col md:items-start items-center">
            <h2 className="text-[32px] font-bold text-slate-900 dark:text-white tracking-tight leading-tight">{profile.name}</h2>
            <p className="text-[#6B7280] dark:text-slate-400 font-medium mt-1.5 text-[16px]">{profile.email}</p>
          </div>
          <div className="flex-shrink-0">
             <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-5 py-2 rounded-full text-[14px] font-bold shadow-sm shadow-blue-500/20 inline-block uppercase tracking-wide">
                {profile.role}
             </span>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-[16px] flex items-center gap-3 font-medium border border-red-100 dark:border-red-800/50 shadow-sm">
            <AlertCircle className="h-5 w-5 flex-shrink-0" /> {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400 rounded-[16px] flex items-center gap-3 font-medium border border-emerald-100 dark:border-emerald-800/50 shadow-sm">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0" /> {success}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-8">
          
          {/* Personal Information Section */}
          <div className="bg-white dark:bg-slate-800 rounded-[22px] border border-[#E5E7EB] dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-[24px] font-semibold text-slate-800 dark:text-white">Personal Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative group md:col-span-2">
                <input
                  required
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  minLength={3}
                  maxLength={50}
                  className="peer w-full h-[56px] border border-[#E5E7EB] dark:border-slate-600 bg-transparent dark:text-white rounded-[16px] px-4 pt-4 pb-1 text-[16px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-transparent hover:border-slate-300 dark:hover:border-slate-500 font-medium"
                  placeholder="Full Name"
                />
                <label className="absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#6B7280] dark:text-slate-400 transition-all peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[12px] peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:-translate-y-0 peer-[:not(:placeholder-shown)]:text-[12px] pointer-events-none font-medium">Full Name *</label>
              </div>
              
              <div className="relative group md:col-span-2">
                <input
                  type="email"
                  value={profile.email}
                  readOnly
                  disabled
                  className="peer w-full h-[56px] border border-[#E5E7EB] dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-[#6B7280] dark:text-slate-500 rounded-[16px] px-4 pt-4 pb-1 text-[16px] outline-none cursor-not-allowed font-medium placeholder-transparent"
                  placeholder="Email Address"
                />
                <label className="absolute left-4 top-2 text-[12px] text-[#6B7280] dark:text-slate-500 pointer-events-none font-medium">Email Address</label>
              </div>
            </div>
          </div>

          {/* Academic Information Section */}
          <div className="bg-white dark:bg-slate-800 rounded-[22px] border border-[#E5E7EB] dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <School className="h-6 w-6" />
              </div>
              <h3 className="text-[24px] font-semibold text-slate-800 dark:text-white">Academic Information</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="relative z-50">
                <label className="block text-[15px] font-medium text-[#6B7280] dark:text-slate-400 mb-2">College / Institute</label>
                <div className="dark:text-slate-800 font-medium">
                  <SearchableCollegeDropdown
                    value={selectedCollege ? selectedCollege.dteCode : ''}
                    onChange={(c) => {
                      setSelectedCollege(c);
                      if (c?.branches) {
                        const bList = c.branches.split(/[,|]/).map(x => x.trim()).filter(Boolean);
                        if (!bList.includes(branch)) {
                          setBranch('');
                        }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="relative z-10 group">
                <label className="block text-[15px] font-medium text-[#6B7280] dark:text-slate-400 mb-2">Branch / Department</label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full h-[56px] border border-[#E5E7EB] dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white rounded-[16px] px-4 text-[16px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium hover:border-slate-300 dark:hover:border-slate-500 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Branch</option>
                  {availableBranches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 top-8 flex items-center text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              </div>

              <div className="relative z-0 group">
                <label className="block text-[15px] font-medium text-[#6B7280] dark:text-slate-400 mb-2">Current Semester</label>
                <select
                  value={semester}
                  onChange={e => setSemester(e.target.value)}
                  className="w-full h-[56px] border border-[#E5E7EB] dark:border-slate-600 bg-white dark:bg-slate-800 dark:text-white rounded-[16px] px-4 text-[16px] outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium hover:border-slate-300 dark:hover:border-slate-500 shadow-sm appearance-none cursor-pointer"
                >
                  <option value="" disabled>Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-4 top-8 flex items-center text-slate-400">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Exam Interests Section */}
          <div className="bg-white dark:bg-slate-800 rounded-[22px] border border-[#E5E7EB] dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
              <div className="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="text-[24px] font-semibold text-slate-800 dark:text-white">Competitive Exam Interests</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {competitiveExamsList.map(exam => {
                const isSelected = examInterests.includes(exam);
                return (
                  <button
                    key={exam}
                    type="button"
                    onClick={() => toggleExam(exam)}
                    className={`h-[56px] rounded-[16px] border text-[15px] font-semibold transition-all duration-300 shadow-sm ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 shadow-blue-500/10' 
                        : 'border-[#E5E7EB] dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-300'
                    }`}
                  >
                    {exam}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Save Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto h-[56px] px-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-[16px] rounded-[16px] shadow-[0_8px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_12px_24px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-50 flex justify-center items-center gap-3 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 hover:bg-transparent transition-colors opacity-0 hover:opacity-100"></div>
              <Save className="h-5 w-5" /> 
              <span>Save Changes</span>
            </button>
          </div>
        </form>

        {/* Preferences Section */}
        <div className="bg-white dark:bg-slate-800 rounded-[22px] border border-[#E5E7EB] dark:border-slate-700 shadow-[0_4px_20px_rgba(0,0,0,0.03)] p-8">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
              <Settings className="h-6 w-6" />
            </div>
            <h3 className="text-[24px] font-semibold text-slate-800 dark:text-white">Settings</h3>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                  <Moon className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-200 text-[16px]">Dark Mode</p>
                  <p className="text-[14px] font-medium text-[#6B7280] dark:text-slate-400 mt-0.5">Toggle dark theme interface.</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={handleThemeToggle}
                className={`w-[60px] h-[32px] rounded-full transition-colors relative shadow-inner ${darkMode ? 'bg-blue-600' : 'bg-[#E5E7EB] dark:bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow-sm ${darkMode ? 'left-8' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center border border-slate-100 dark:border-slate-700">
                  <Bell className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-200 text-[16px]">Email Notifications</p>
                  <p className="text-[14px] font-medium text-[#6B7280] dark:text-slate-400 mt-0.5">Receive alerts for new materials.</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setEmailNotifs(!emailNotifs)}
                className={`w-[60px] h-[32px] rounded-full transition-colors relative shadow-inner ${emailNotifs ? 'bg-blue-600' : 'bg-[#E5E7EB] dark:bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all shadow-sm ${emailNotifs ? 'left-8' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
