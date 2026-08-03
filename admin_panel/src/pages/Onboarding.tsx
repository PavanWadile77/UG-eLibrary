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
    'Electronics & Telecommunication', 'Chemical Engineering', 'Pharmacy', 
    'Computer Science and Engineering', 'Electronics and Computer Engineering', 'Data Science', 'Other',
    'Instrumentation', 'Automobile Engineering', 'MBA', 'MCA',
    'Diploma Branches', 'BSc', 'BCom', 'BA', 'MTech', 'Polytechnic Programs', 'Other Courses'
  ];

  const competitiveExamsList = ['UPSC', 'MPSC', 'SSC', 'Banking', 'Railway', 'Defence'];

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    
    try {
      const user = auth?.currentUser;
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

      console.log('before save');
      if (isFirebaseDemo) {
        localStorage.setItem('demo_user_profile', JSON.stringify(profileData));
        console.log('after localStorage save');
        await new Promise(resolve => setTimeout(resolve, 800));
        console.log('before navigate');
        navigate('/');
        window.location.reload();
        console.log('after navigate');
      } else {
        await setDoc(doc(db, 'users', uid), profileData);
        console.log('after Firestore save');
        console.log('before navigate');
        navigate('/');
        window.location.reload();
        console.log('after navigate');
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#EEF4FF] py-12 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#2563EB]/20 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#3B82F6]/[0.06] rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#2563EB]/[0.05] rounded-full blur-[120px] pointer-events-none"></div>

      <div className="w-full max-w-3xl bg-white/90 backdrop-blur-xl rounded-[28px] shadow-[0_24px_80px_rgba(37,99,235,0.06)] border border-[#2563EB]/10 overflow-hidden relative z-10 transition-all duration-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] px-10 py-10 text-white flex items-center justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-[#3B82F6]/30 to-transparent rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-[36px] font-bold tracking-tight leading-tight">Complete Your Profile</h2>
            <p className="text-blue-100/80 font-medium mt-2 text-[16px]">Personalize your UG eLibrary experience</p>
          </div>
          <div className="relative z-10 h-16 w-16 rounded-full bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <School className="h-8 w-8 text-white drop-shadow-md" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-[6px] w-full bg-slate-100 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#2563EB] to-[#3B82F6] transition-all duration-700 ease-in-out relative rounded-r-full shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
            style={{ width: `${(step / 5) * 100}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 w-20 bg-gradient-to-r from-transparent to-white/40"></div>
          </div>
        </div>

        <div className="p-10 relative min-h-[450px] flex flex-col">
          {error && (
            <div className="mb-8 rounded-[16px] bg-red-50 p-4 text-[16px] font-semibold text-red-600 border border-red-100 flex items-center gap-3 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-red-500"></div> {error}
            </div>
          )}

          {/* STEP 1: ROLE */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-250 flex-1">
              <h3 className="text-[28px] font-bold text-slate-800 mb-8 tracking-tight">Are you a Student or Teacher?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => setRole('student')}
                  className={`group flex flex-col items-center justify-center h-[160px] rounded-[20px] border-[1.5px] transition-all duration-300 relative overflow-hidden ${
                    role === 'student' ? 'border-transparent shadow-[0_12px_40px_rgba(37,99,235,0.15)] bg-blue-50/50 -translate-y-2' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {role === 'student' && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                  {role === 'student' && <div className="absolute top-4 right-4 text-[#2563EB]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                  <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${role === 'student' ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563EB]'}`}>
                    <User className="h-8 w-8" />
                  </div>
                  <span className={`font-bold text-[16px] tracking-wide ${role === 'student' ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>I am a Student</span>
                </button>
                <button
                  onClick={() => setRole('teacher')}
                  className={`group flex flex-col items-center justify-center h-[160px] rounded-[20px] border-[1.5px] transition-all duration-300 relative overflow-hidden ${
                    role === 'teacher' ? 'border-transparent shadow-[0_12px_40px_rgba(37,99,235,0.15)] bg-blue-50/50 -translate-y-2' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {role === 'teacher' && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                  {role === 'teacher' && <div className="absolute top-4 right-4 text-[#2563EB]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                  <div className={`p-4 rounded-full mb-4 transition-colors duration-300 ${role === 'teacher' ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563EB]'}`}>
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <span className={`font-bold text-[16px] tracking-wide ${role === 'teacher' ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>I am a Teacher</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: GOAL */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-250 flex-1">
              <h3 className="text-[28px] font-bold text-slate-800 mb-8 tracking-tight">Select your primary goal</h3>
              <div className="space-y-6">
                <button
                  onClick={() => setGoal('higher_ed')}
                  className={`group flex w-full items-center p-6 h-[110px] rounded-[20px] border-[1.5px] text-left transition-all duration-300 relative overflow-hidden ${
                    goal === 'higher_ed' ? 'border-transparent bg-blue-50/50 shadow-[0_12px_40px_rgba(37,99,235,0.15)] -translate-y-2' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
                  }`}
                >
                  {goal === 'higher_ed' && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                  {goal === 'higher_ed' && <div className="absolute top-4 right-4 text-[#2563EB]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                  
                  <div className={`p-4 rounded-full mr-6 transition-colors duration-300 shrink-0 ${goal === 'higher_ed' ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563EB]'}`}>
                    <School className="h-7 w-7" />
                  </div>
                  <div>
                    <span className={`block font-bold text-[18px] mb-1.5 tracking-tight ${goal === 'higher_ed' ? 'text-[#1E3A8A]' : 'text-slate-800'}`}>Higher Education</span>
                    <span className="text-[14px] font-normal text-slate-500 leading-relaxed">Engineering, Diploma, Pharmacy, Arts, Science, Commerce etc.</span>
                  </div>
                </button>
                
                {role === 'student' && (
                  <button
                    onClick={() => setGoal('competitive')}
                    className={`group flex w-full items-center p-6 h-[110px] rounded-[20px] border-[1.5px] text-left transition-all duration-300 relative overflow-hidden ${
                      goal === 'competitive' ? 'border-transparent bg-blue-50/50 shadow-[0_12px_40px_rgba(37,99,235,0.15)] -translate-y-2' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(0,0,0,0.05)]'
                    }`}
                  >
                    {goal === 'competitive' && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                    {goal === 'competitive' && <div className="absolute top-4 right-4 text-[#2563EB]"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                    
                    <div className={`p-4 rounded-full mr-6 transition-colors duration-300 shrink-0 ${goal === 'competitive' ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-md' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-[#2563EB]'}`}>
                      <Target className="h-7 w-7" />
                    </div>
                    <div>
                      <span className={`block font-bold text-[18px] mb-1.5 tracking-tight ${goal === 'competitive' ? 'text-[#1E3A8A]' : 'text-slate-800'}`}>Competitive Exams Only</span>
                      <span className="text-[14px] font-normal text-slate-500 leading-relaxed">UPSC, MPSC, SSC, Banking, Railway, Defence (Skip College Selection)</span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* STEP 3: COLLEGE SELECTION */}
          {step === 3 && goal === 'higher_ed' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-250 flex flex-col flex-1">
              <h3 className="text-[28px] font-bold text-slate-800 mb-6 tracking-tight">Select your College</h3>
              <div className="font-medium relative z-30">
                <SearchableCollegeDropdown 
                  value={selectedCollege ? selectedCollege.dteCode : ''}
                  onChange={(c) => setSelectedCollege(c)}
                />
              </div>
              <div className="mt-8 p-6 bg-blue-50/50 rounded-[20px] border border-blue-100 flex items-start gap-4">
                <div className="mt-1 bg-gradient-to-br from-[#2563EB] to-[#3B82F6] p-2 rounded-full shadow-md shrink-0"><School className="h-4 w-4 text-white" /></div>
                <p className="text-[15px] font-normal text-slate-600 leading-relaxed">
                  Start typing your College Name or DTE Code to search the master database. 
                  Selecting your college ensures you receive the most relevant study material from your faculty.
                </p>
              </div>
            </div>
          )}

          {/* STEP 4: BRANCH SELECTION */}
          {step === 4 && goal === 'higher_ed' && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-250 flex flex-col flex-1 h-[50vh]">
              <h3 className="text-[28px] font-bold text-slate-800 mb-6 tracking-tight">Select your Branch / Department</h3>
              {selectedCollege?.branches && (
                <div className="mb-6 text-[15px] font-medium text-blue-700 bg-blue-50/50 p-5 rounded-[20px] border border-blue-100 flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.6)] animate-pulse shrink-0"></div>
                  <span>Showing available branches for <b className="font-bold ml-1 text-[#1E3A8A]">{selectedCollege.name}</b></span>
                </div>
              )}
              <div className="flex-1 overflow-y-auto pr-3 grid grid-cols-1 sm:grid-cols-2 gap-5 custom-scrollbar group/scroll">
                {availableBranches.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBranch(b)}
                    className={`text-left p-5 min-h-[90px] rounded-[20px] border-[1.5px] transition-all duration-300 relative overflow-hidden flex items-center ${
                      branch === b ? 'border-transparent bg-blue-50/50 text-[#1E3A8A] font-bold shadow-[0_8px_30px_rgba(37,99,235,0.15)] -translate-y-1' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 text-slate-700 font-semibold hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]'
                    }`}
                  >
                    {branch === b && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                    {branch === b && <div className="absolute right-4 text-[#2563EB]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg></div>}
                    <span className="pr-8">{b}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: COMPETITIVE EXAMS */}
          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-250 flex-1">
              <h3 className="text-[28px] font-bold text-slate-800 mb-3 tracking-tight">
                {goal === 'competitive' ? 'Select Target Exams' : 'Interested in Competitive Exams?'}
              </h3>
              <p className="text-[16px] font-normal text-slate-500 mb-8 flex items-center flex-wrap gap-2">
                {goal !== 'competitive' && <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg text-[12px] font-bold uppercase tracking-wider">Optional</span>}
                Select any exams you are preparing for to get tailored study materials.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {competitiveExamsList.map((exam) => {
                  const isSelected = examInterests.includes(exam);
                  return (
                    <button
                      key={exam}
                      onClick={() => toggleExam(exam)}
                      className={`flex items-center p-5 h-[90px] rounded-[20px] border-[1.5px] transition-all duration-300 relative overflow-hidden ${
                        isSelected ? 'border-transparent bg-blue-50/50 shadow-[0_8px_30px_rgba(37,99,235,0.15)] -translate-y-1' : 'border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.04)]'
                      }`}
                    >
                      {isSelected && <div className="absolute inset-0 rounded-[20px] p-[1.5px] bg-gradient-to-br from-[#2563EB] to-[#3B82F6] pointer-events-none" style={{ mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)", maskComposite: "exclude" }}></div>}
                      
                      <div className={`h-7 w-7 rounded-[8px] border-[2px] flex items-center justify-center mr-5 transition-all duration-300 ${
                        isSelected ? 'bg-gradient-to-br from-[#2563EB] to-[#3B82F6] border-transparent shadow-md' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && <svg className="h-4 w-4 text-white animate-in zoom-in duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      <span className={`font-bold text-[16px] tracking-wide ${isSelected ? 'text-[#1E3A8A]' : 'text-slate-700'}`}>{exam}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-auto pt-10 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(s => goal === 'competitive' && s === 5 ? 2 : s - 1)}
                className="group flex items-center px-6 py-4 rounded-[16px] text-[16px] font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all duration-300"
              >
                <ChevronRight className="mr-2 h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back
              </button>
            ) : <div></div>}

            <button
              onClick={nextStep}
              disabled={loading || (step === 1 && !role) || (step === 2 && !goal) || (step === 3 && !selectedCollege) || (step === 4 && !branch) || (step === 5 && goal === 'competitive' && examInterests.length === 0)}
              className="flex items-center px-10 h-[54px] rounded-[16px] bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white text-[16px] font-bold tracking-wide hover:from-[#1d4ed8] hover:to-[#2563EB] disabled:opacity-50 disabled:from-slate-300 disabled:to-slate-300 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_8px_24px_rgba(37,99,235,0.3)] hover:shadow-[0_12px_32px_rgba(37,99,235,0.4)] disabled:shadow-none hover:-translate-y-1 disabled:translate-y-0"
            >
              {loading ? 'Saving...' : (step === 4 && goal === 'higher_ed') || step === 5 ? 'Finish Setup' : 'Continue'}
              {!loading && step < 4 && <ChevronRight className="ml-2 h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar {
          opacity: 1;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: transparent;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
        }
      `}} />
    </div>
  );
}
