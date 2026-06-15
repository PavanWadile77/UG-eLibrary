import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, isFirebaseDemo } from '../firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { School, User, Target, BookOpen, ChevronRight, CheckCircle2 } from 'lucide-react';

interface College {
  id: string;
  dteCode: string;
  name: string;
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Selections
  const [role, setRole] = useState<'student' | 'teacher' | ''>('');
  const [goal, setGoal] = useState<'higher_ed' | 'competitive' | ''>('');
  const [collegeDte, setCollegeDte] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [branch, setBranch] = useState('');
  const [examInterests, setExamInterests] = useState<string[]>([]);

  // Data
  const [colleges, setColleges] = useState<College[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const branches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics Engineering', 'Electronics & Telecommunication', 'Chemical Engineering',
    'Instrumentation', 'Automobile Engineering', 'Pharmacy', 'MBA', 'MCA',
    'Diploma Branches', 'BSc', 'BCom', 'BA', 'MTech', 'Polytechnic Programs', 'Other Courses'
  ];

  const competitiveExamsList = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

  useEffect(() => {
    async function fetchColleges() {
      try {
        if (isFirebaseDemo) {
          const colsStored = localStorage.getItem('demo_colleges');
          if (colsStored) {
            setColleges(JSON.parse(colsStored));
          } else {
            setColleges([
              { id: '3012', dteCode: '3012', name: 'Veermata Jijabai Technological Institute (VJTI)' },
              { id: '6006', dteCode: '6006', name: 'College of Engineering Pune (COEP)' }
            ]);
          }
        } else {
          const collegesSnap = await getDocs(collection(db, 'colleges'));
          const colList: College[] = [];
          collegesSnap.forEach((doc) => {
            colList.push({ id: doc.id, ...doc.data() } as College);
          });
          setColleges(colList);
        }
      } catch (err) {
        console.error('Failed to fetch colleges:', err);
      }
    }
    if (step === 3 && goal === 'higher_ed' && colleges.length === 0) {
      fetchColleges();
    }
  }, [step, goal, colleges.length]);

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = auth.currentUser;
      if (!user && !isFirebaseDemo) {
        throw new Error('No authenticated user found');
      }

      const uid = isFirebaseDemo ? 'demo_user' : user!.uid;
      const email = isFirebaseDemo ? 'user@demo.com' : user!.email;
      const name = isFirebaseDemo ? 'Demo User' : user!.displayName;

      const profileData = {
        userId: uid,
        name: name,
        email: email,
        role: role,
        collegeName: goal === 'higher_ed' ? collegeName : null,
        dteCode: goal === 'higher_ed' ? collegeDte : null,
        branch: goal === 'higher_ed' ? branch : null,
        competitiveInterests: examInterests,
        createdAt: new Date().toISOString()
      };

      if (isFirebaseDemo) {
        localStorage.setItem('demo_user_profile', JSON.stringify(profileData));
        // Small delay for UX
        await new Promise(resolve => setTimeout(resolve, 800));
        window.location.href = '/'; // Full reload to trigger ProtectedLayout re-eval
      } else {
        await setDoc(doc(db, 'users', uid), profileData);
        window.location.href = '/';
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to save profile. Please try again.');
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && !role) return;
    if (step === 2 && !goal) return;
    
    if (step === 3 && goal === 'higher_ed' && !collegeDte) return;
    if (step === 4 && goal === 'higher_ed' && !branch) {
      handleSaveProfile();
      return;
    }
    
    if (step === 2 && goal === 'competitive') {
      setStep(5); // Jump straight to exams
      return;
    }

    if (step === 5) {
      handleSaveProfile();
      return;
    }

    setStep(s => s + 1);
  };

  const toggleExam = (exam: string) => {
    setExamInterests(prev => 
      prev.includes(exam) ? prev.filter(e => e !== exam) : [...prev, exam]
    );
  };

  const filteredColleges = colleges.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.dteCode.includes(searchQuery)
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-900 px-8 py-6 text-white flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            <p className="text-slate-400 text-sm mt-1">Help us personalize your UG eLibrary experience</p>
          </div>
          <School className="h-10 w-10 text-blue-500 opacity-80" />
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-300 ease-in-out" 
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        <div className="p-8">
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* STEP 1: ROLE */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Are you a Student or Teacher?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setRole('student')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                    role === 'student' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <User className={`h-12 w-12 mb-4 ${role === 'student' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${role === 'student' ? 'text-blue-900' : 'text-slate-600'}`}>I am a Student</span>
                </button>
                <button
                  onClick={() => setRole('teacher')}
                  className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                    role === 'teacher' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <BookOpen className={`h-12 w-12 mb-4 ${role === 'teacher' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span className={`font-semibold ${role === 'teacher' ? 'text-blue-900' : 'text-slate-600'}`}>I am a Teacher</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: GOAL */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-slate-800 mb-6">Select your primary goal</h3>
              <div className="space-y-4">
                <button
                  onClick={() => setGoal('higher_ed')}
                  className={`flex w-full items-center p-5 rounded-xl border-2 text-left transition-all ${
                    goal === 'higher_ed' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                  }`}
                >
                  <School className={`h-8 w-8 mr-4 ${goal === 'higher_ed' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <div>
                    <span className={`block font-bold text-lg ${goal === 'higher_ed' ? 'text-blue-900' : 'text-slate-700'}`}>Higher Education</span>
                    <span className="text-sm text-slate-500">Engineering, Diploma, Pharmacy, Arts, Science, Commerce etc.</span>
                  </div>
                </button>
                
                {role === 'student' && (
                  <button
                    onClick={() => setGoal('competitive')}
                    className={`flex w-full items-center p-5 rounded-xl border-2 text-left transition-all ${
                      goal === 'competitive' ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <Target className={`h-8 w-8 mr-4 ${goal === 'competitive' ? 'text-blue-600' : 'text-slate-400'}`} />
                    <div>
                      <span className={`block font-bold text-lg ${goal === 'competitive' ? 'text-blue-900' : 'text-slate-700'}`}>Competitive Exams Only</span>
                      <span className="text-sm text-slate-500">UPSC, MPSC, SSC, Banking, Railway, Defence (Skip College Selection)</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: COLLEGE SELECTION */}
          {step === 3 && goal === 'higher_ed' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[60vh]">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select your College</h3>
              <input
                type="text"
                placeholder="Search by College Name or DTE Code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 mb-4 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                {filteredColleges.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">No colleges found. Try a different search.</div>
                ) : (
                  filteredColleges.map((college) => (
                    <button
                      key={college.id}
                      onClick={() => {
                        setCollegeDte(college.dteCode);
                        setCollegeName(college.name);
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-colors flex justify-between items-center ${
                        collegeDte === college.dteCode ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="pr-4">
                        <p className={`font-semibold ${collegeDte === college.dteCode ? 'text-blue-900' : 'text-slate-800'}`}>
                          {college.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">DTE Code: {college.dteCode}</p>
                      </div>
                      {collegeDte === college.dteCode && <CheckCircle2 className="h-6 w-6 text-blue-600 shrink-0" />}
                    </button>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 4: BRANCH SELECTION */}
          {step === 4 && goal === 'higher_ed' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[60vh]">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select your Branch / Department</h3>
              <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {branches.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBranch(b)}
                    className={`text-left p-4 rounded-xl border transition-colors ${
                      branch === b ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COMPETITIVE EXAMS (Optional for Higher Ed, Required for Competitive Only) */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {goal === 'competitive' ? 'Select Target Exams' : 'Interested in Competitive Exams? (Optional)'}
              </h3>
              <p className="text-sm text-slate-500 mb-6">Select any exams you are preparing for to get study materials.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {competitiveExamsList.map((exam) => {
                  const isSelected = examInterests.includes(exam);
                  return (
                    <button
                      key={exam}
                      onClick={() => toggleExam(exam)}
                      className={`flex items-center p-4 rounded-xl border-2 transition-colors ${
                        isSelected ? 'border-blue-600 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`h-5 w-5 rounded border flex items-center justify-center mr-3 ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-400'
                      }`}>
                        {isSelected && <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`font-medium ${isSelected ? 'text-blue-900' : 'text-slate-700'}`}>{exam}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between border-t border-slate-100 pt-6">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => goal === 'competitive' && s === 5 ? 2 : s - 1)}
                className="px-6 py-2.5 rounded-lg text-slate-600 font-semibold hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
            ) : <div></div>}

            <button
              onClick={nextStep}
              disabled={loading || (step === 1 && !role) || (step === 2 && !goal) || (step === 3 && !collegeDte) || (step === 4 && !branch) || (step === 5 && goal === 'competitive' && examInterests.length === 0)}
              className="flex items-center px-8 py-2.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
            >
              {loading ? 'Saving...' : (step === 4 && goal === 'higher_ed') || step === 5 ? 'Finish Setup' : 'Continue'}
              {!loading && step < 4 && <ChevronRight className="ml-2 h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
