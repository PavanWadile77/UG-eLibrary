import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { User, School, BookOpen, Target, Save, CheckCircle2, AlertCircle, Moon, Bell } from 'lucide-react';
import { signOut } from 'firebase/auth';

interface College {
  id: string;
  dteCode: string;
  name: string;
}

export default function ProfileSettings() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profile, setProfile] = useState<any>(null);

  // Form states
  const [collegeDte, setCollegeDte] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [examInterests, setExamInterests] = useState<string[]>([]);
  
  // UI toggles
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);

  // Data
  const [colleges, setColleges] = useState<College[]>([]);

  const branches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics & Telecommunication', 'Chemical Engineering', 'Pharmacy', 'Other'
  ];
  const competitiveExamsList = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

  useEffect(() => {
    async function loadData() {
      let p = null;
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_user_profile');
        if (stored) p = JSON.parse(stored);
        
        const colsStored = localStorage.getItem('demo_colleges');
        if (colsStored) setColleges(JSON.parse(colsStored));
        else setColleges([
          { id: '3012', dteCode: '3012', name: 'Veermata Jijabai Technological Institute (VJTI)' },
          { id: '6006', dteCode: '6006', name: 'College of Engineering Pune (COEP)' }
        ]);
      } else {
        const u = auth.currentUser;
        if (u) {
          const docSnap = await getDoc(doc(db, 'users', u.uid));
          if (docSnap.exists()) p = docSnap.data();
        }
      }
      
      if (p) {
        setProfile(p);
        setCollegeDte(p.dteCode || '');
        setCollegeName(p.collegeName || '');
        setBranch(p.branch || '');
        setSemester(p.semester || 'Sem 1');
        setExamInterests(p.competitiveInterests || []);
      }
    }
    loadData();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const updatedData = {
        collegeName,
        dteCode: collegeDte,
        branch,
        semester,
        competitiveInterests: examInterests
      };

      if (isFirebaseDemo) {
        const p = { ...profile, ...updatedData };
        localStorage.setItem('demo_user_profile', JSON.stringify(p));
        setProfile(p);
      } else {
        const u = auth.currentUser;
        if (u) {
          await updateDoc(doc(db, 'users', u.uid), updatedData);
          setProfile({ ...profile, ...updatedData });
        }
      }
      setSuccess('Profile updated successfully! Library will now reflect new preferences.');
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

  if (!profile) return <div className="p-8">Loading Profile...</div>;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Account Settings" />

      <main className="p-6 lg:p-8 max-w-4xl mx-auto space-y-8">
        
        {/* Core Profile Info (Read Only mostly) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-4 border-blue-50">
            {profile.photoUrl ? (
              <img src={profile.photoUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
            ) : (
              <User className="h-10 w-10" />
            )}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-slate-800">{profile.name}</h2>
            <p className="text-slate-500">{profile.email} <span className="mx-2">•</span> <span className="capitalize font-semibold text-blue-600">{profile.role}</span></p>
          </div>
        </div>

        {error && <div className="p-4 bg-red-50 text-red-700 rounded-xl flex gap-2"><AlertCircle className="h-5 w-5" /> {error}</div>}
        {success && <div className="p-4 bg-green-50 text-green-700 rounded-xl flex gap-2"><CheckCircle2 className="h-5 w-5" /> {success}</div>}

        {/* Academic Form */}
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><School className="h-5 w-5 text-blue-600" /> Academic Information</h3>
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
              <label className="text-sm font-semibold text-slate-700">College / Institute</label>
              <select
                value={collegeDte}
                onChange={e => {
                  setCollegeDte(e.target.value);
                  const selected = colleges.find(c => c.dteCode === e.target.value);
                  if (selected) setCollegeName(selected.name);
                }}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {colleges.map(c => <option key={c.id} value={c.dteCode}>{c.name} ({c.dteCode})</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Branch / Department</label>
              <select
                value={branch}
                onChange={e => setBranch(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Current Semester</label>
              <select
                value={semester}
                onChange={e => setSemester(e.target.value)}
                className="w-full border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
              </select>
            </div>
          </div>

          <div className="px-6 py-4 border-t border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-slate-800 flex items-center gap-2"><Target className="h-5 w-5 text-blue-600" /> Competitive Exam Interests</h3>
          </div>

          <div className="p-6 grid grid-cols-2 md:grid-cols-3 gap-3">
            {competitiveExamsList.map(exam => {
              const isSelected = examInterests.includes(exam);
              return (
                <button
                  key={exam}
                  type="button"
                  onClick={() => toggleExam(exam)}
                  className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                    isSelected ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {exam}
                </button>
              );
            })}
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-5 w-5" /> Save Changes
            </button>
          </div>
        </form>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg mb-4">Application Preferences</h3>
          
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Moon className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-700">Dark Mode</p>
                <p className="text-xs text-slate-500">Toggle dark theme interface.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className={`w-12 h-6 rounded-full transition-colors relative ${darkMode ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-slate-400" />
              <div>
                <p className="font-semibold text-slate-700">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive alerts for new materials.</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setEmailNotifs(!emailNotifs)}
              className={`w-12 h-6 rounded-full transition-colors relative ${emailNotifs ? 'bg-blue-600' : 'bg-slate-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${emailNotifs ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
