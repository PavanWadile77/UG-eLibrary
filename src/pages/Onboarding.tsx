import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, isFirebaseDemo } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { School, User, Target, BookOpen, ChevronRight } from 'lucide-react';
import SearchableCollegeDropdown, { College } from '../components/SearchableCollegeDropdown';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Selections
  const [role, setRole] = useState<'student' | 'teacher' | ''>('');
  const [goal, setGoal] = useState<'higher_ed' | 'competitive' | ''>('');
  const [selectedCollege, setSelectedCollege] = useState<College | null>(null);
  const [branch, setBranch] = useState('');
  const [examInterests, setExamInterests] = useState<string[]>([]);

  const defaultBranches = [
    'Computer Engineering', 'Information Technology', 'AI & DS', 'AI & ML',
    'Mechanical Engineering', 'Civil Engineering', 'Electrical Engineering',
    'Electronics Engineering', 'Electronics & Telecommunication', 'Chemical Engineering',
    'Instrumentation', 'Automobile Engineering', 'Pharmacy', 'MBA', 'MCA',
    'Diploma Branches', 'BSc', 'BCom', 'BA', 'MTech', 'Polytechnic Programs', 'Other Courses'
  ];

  const competitiveExamsList = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

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
        collegeName: goal === 'higher_ed' && selectedCollege ? selectedCollege.name : null,
        dteCode: goal === 'higher_ed' && selectedCollege ? selectedCollege.dteCode : null,
        branch: goal === 'higher_ed' ? branch : null,
        competitiveInterests: examInterests,
        createdAt: new Date().toISOString()
      };

      if (isFirebaseDemo) {
        localStorage.setItem('demo_user_profile', JSON.stringify(profileData));
        await new Promise(resolve => setTimeout(resolve, 800));
        window.location.href = '/'; 
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
    
    if (step === 3 && goal === 'higher_ed' && !selectedCollege) return;
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

  const availableBranches = selectedCollege && selectedCollege.branches
    ? selectedCollege.branches.split(/[,|]/).map(b => b.trim()).filter(Boolean)
    : defaultBranches;

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
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[40vh]">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select your College</h3>
              <SearchableCollegeDropdown 
                value={selectedCollege ? selectedCollege.dteCode : ''}
                onChange={(c) => setSelectedCollege(c)}
              />
              <p className="text-sm text-slate-500 mt-4 px-2">
                Start typing your College Name or DTE Code to search the master database. 
                Selecting your college ensures you receive the most relevant study material from your faculty.
              </p>
            </div>
          )}

          {/* STEP 4: BRANCH SELECTION */}
          {step === 4 && goal === 'higher_ed' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col h-[60vh]">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Select your Branch / Department</h3>
              {selectedCollege?.branches && (
                <div className="mb-4 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
                  Showing available branches for <b>{selectedCollege.name}</b>
                </div>
              )}
              <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableBranches.map((b) => (
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

          {/* STEP 5: COMPETITIVE EXAMS */}
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
              disabled={loading || (step === 1 && !role) || (step === 2 && !goal) || (step === 3 && !selectedCollege) || (step === 4 && !branch) || (step === 5 && goal === 'competitive' && examInterests.length === 0)}
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
