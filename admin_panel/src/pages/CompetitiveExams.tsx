import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Target, FileText, ChevronRight, Lock, BookOpen, Download, Eye, PlayCircle, Loader2, Library, User, Clock } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';

export default function CompetitiveExams() {
  const exams = [
    { name: 'UPSC', desc: 'Civil Services, NDA, CDS', color: 'from-orange-500 to-amber-500 bg-orange-50 text-orange-600 border-orange-100 hover:border-orange-200' },
    { name: 'MPSC', desc: 'State Services, Group B/C', color: 'from-blue-500 to-indigo-500 bg-blue-50 text-blue-600 border-blue-100 hover:border-blue-200' },
    { name: 'SSC', desc: 'CGL, CHSL, MTS', color: 'from-emerald-500 to-teal-500 bg-emerald-50 text-emerald-600 border-emerald-100 hover:border-emerald-200' },
    { name: 'Banking', desc: 'IBPS, SBI PO/Clerk', color: 'from-purple-500 to-pink-500 bg-purple-50 text-purple-600 border-purple-100 hover:border-purple-200' },
    { name: 'Railway', desc: 'RRB NTPC, Group D', color: 'from-rose-500 to-red-500 bg-rose-50 text-rose-600 border-rose-100 hover:border-rose-200' },
    { name: 'Defence', desc: 'AFCAT, CAPF', color: 'from-slate-600 to-slate-800 bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300' },
  ];

  const [selectedExam, setSelectedExam] = useState<string | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedExam) return;
    
    async function loadMaterials() {
      setLoading(true);
      try {
        if (isFirebaseDemo) {
          const stored = localStorage.getItem('demo_resources');
          if (stored) {
            const list = JSON.parse(stored);
            const filtered = list.filter((r: any) => r.isCompetitive === true && r.examCategory === selectedExam);
            setResources(filtered);
          }
        } else {
          const q = query(
            collection(db, 'resources'),
            where('isCompetitive', '==', true),
            where('examCategory', '==', selectedExam)
          );
          const snap = await getDocs(q);
          const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setResources(list);
        }
      } catch (err) {
        console.error("Failed to load competitive materials", err);
      } finally {
        setLoading(false);
      }
    }
    
    loadMaterials();
  }, [selectedExam]);

  const handleAction = (url: string) => {
    if (!url || !url.trim()) {
      alert("Link not available");
      return;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen font-sans selection:bg-blue-100">
      <Header title="Competitive Exams Library" />

      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        
        {!selectedExam ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8 bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-bl from-orange-100 to-transparent rounded-full blur-3xl opacity-50 -mr-20 -mt-20 pointer-events-none"></div>
              <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight relative z-10">Select Exam Category</h2>
              <p className="text-slate-500 font-medium mt-2 relative z-10 text-[15px]">Free access to premium study materials, previous year papers, and syllabus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map((exam, idx) => (
                <button
                  key={exam.name}
                  onClick={() => setSelectedExam(exam.name)}
                  className={`group flex flex-col items-start p-8 rounded-[24px] border shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${exam.color.split(' ').slice(2).join(' ')}`}
                  style={{ animation: `fadeIn 0.4s ease-out ${(idx % 10) * 0.05}s both` }}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${exam.color.split(' ').slice(0, 2).join(' ')} rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 -mr-10 -mt-10 pointer-events-none`}></div>
                  
                  <div className={`p-3 rounded-[16px] bg-white shadow-sm mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Target className="h-7 w-7 opacity-90" />
                  </div>
                  
                  <h3 className="text-2xl font-extrabold tracking-tight mb-1">{exam.name}</h3>
                  <p className="text-[14px] font-bold opacity-70 mb-6">{exam.desc}</p>
                  
                  <div className="mt-auto flex items-center text-[13px] font-extrabold uppercase tracking-wider bg-white/50 px-4 py-2 rounded-full group-hover:bg-white transition-colors">
                    Browse Materials <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 bg-white p-6 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <button 
                onClick={() => setSelectedExam(null)}
                className="group text-slate-500 hover:text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 px-5 py-2.5 rounded-full border border-slate-200 transition-all duration-300 flex items-center shrink-0 w-fit"
              >
                <ChevronRight className="mr-1.5 h-4 w-4 rotate-180 transition-transform group-hover:-translate-x-1" />
                Back to Categories
              </button>
              <div className="h-8 w-[1px] bg-slate-200 hidden sm:block mx-2"></div>
              <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center">
                <Target className="h-6 w-6 mr-3 text-orange-500" />
                {selectedExam} Study Material
              </h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-32 bg-white rounded-[24px] border border-slate-100 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-orange-100 border-t-orange-500 rounded-full animate-spin mb-4"></div>
                  <p className="font-bold text-slate-500">Loading premium materials...</p>
                </div>
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-[24px] border border-slate-200 border-dashed shadow-sm mt-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
                  <BookOpen className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="text-[20px] font-extrabold text-slate-800 tracking-tight">No resources found</h3>
                <p className="text-[15px] text-slate-500 mt-2 font-medium">No {selectedExam} materials are available at this moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {resources.map((resource, idx) => {
                  const linkUrl = resource.fileUrl || resource.url || '';
                  return (
                    <div 
                      key={resource.id} 
                      onClick={() => handleAction(linkUrl)} 
                      className="bg-white rounded-[20px] border border-slate-100 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.08)] transition-all duration-300 group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-1 relative"
                      style={{ animation: `fadeIn 0.4s ease-out ${(idx % 10) * 0.05}s both` }}
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="p-6 pb-5 flex-1 relative z-10">
                        <div className="flex justify-between items-start mb-5">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[12px] font-extrabold tracking-wide uppercase bg-orange-50 text-orange-700 shadow-sm border border-orange-100/50">
                            {resource.type === 'Video Links' ? <PlayCircle className="w-3.5 h-3.5 mr-1.5" /> : <FileText className="w-3.5 h-3.5 mr-1.5" />}
                            {resource.type}
                          </span>
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-[18px] leading-[1.3] mb-4 group-hover:text-orange-600 transition-colors line-clamp-2">
                          {resource.title || resource.name}
                        </h3>
                        <div className="space-y-2.5">
                          <p className="flex items-center text-[13px] font-medium text-slate-500">
                            <span className="w-6 flex justify-center"><User className="w-[15px] h-[15px] text-slate-400" /></span>
                            <span className="truncate">By {resource.uploadedByName || 'Teacher'}</span>
                          </p>
                          <p className="flex items-center text-[13px] font-medium text-slate-400">
                            <span className="w-6 flex justify-center"><Clock className="w-[14px] h-[14px] text-slate-300" /></span>
                            <span>Recently added</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-100/80 flex items-center justify-between relative z-10 group-hover:bg-slate-50 transition-colors">
                        <div className="flex gap-4 text-[13px] font-bold text-slate-400">
                          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-100"><Eye className="h-3.5 w-3.5" /> {resource.views || 0}</span>
                          <span className="flex items-center gap-1.5 bg-white px-2.5 py-1 rounded-md shadow-sm border border-slate-100"><Download className="h-3.5 w-3.5" /> {resource.downloads || 0}</span>
                        </div>
                        <div className="flex gap-2 relative z-20">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction(linkUrl); }}
                            className="h-10 w-10 flex items-center justify-center text-slate-500 bg-white border border-slate-200 hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50 hover:shadow-md hover:shadow-orange-500/10 rounded-full transition-all duration-300"
                            title="Preview"
                          >
                            {resource.type === 'Video Links' ? <PlayCircle className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </main>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
}
