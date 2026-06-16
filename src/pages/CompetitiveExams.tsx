import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Target, FileText, ChevronRight, Lock, BookOpen, Download, Eye, PlayCircle, Loader2 } from 'lucide-react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';

export default function CompetitiveExams() {
  const exams = [
    { name: 'UPSC', desc: 'Civil Services, NDA, CDS', color: 'bg-orange-50 text-orange-600 border-orange-200' },
    { name: 'MPSC', desc: 'State Services, Group B/C', color: 'bg-blue-50 text-blue-600 border-blue-200' },
    { name: 'SSC', desc: 'CGL, CHSL, MTS', color: 'bg-green-50 text-green-600 border-green-200' },
    { name: 'Banking', desc: 'IBPS, SBI PO/Clerk', color: 'bg-purple-50 text-purple-600 border-purple-200' },
    { name: 'Railway', desc: 'RRB NTPC, Group D', color: 'bg-red-50 text-red-600 border-red-200' },
    { name: 'Defence', desc: 'AFCAT, CAPF', color: 'bg-slate-50 text-slate-600 border-slate-200' },
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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Competitive Exams Library" />

      <main className="p-6 lg:p-8 max-w-7xl mx-auto">
        
        {!selectedExam ? (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Select Exam Category</h2>
              <p className="text-slate-500 mt-1">Free access to study materials, previous year papers, and syllabus.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exams.map(exam => (
                <button
                  key={exam.name}
                  onClick={() => setSelectedExam(exam.name)}
                  className={`flex flex-col items-start p-6 rounded-2xl border transition-all hover:shadow-md ${exam.color}`}
                >
                  <Target className="h-8 w-8 mb-4 opacity-80" />
                  <h3 className="text-xl font-bold">{exam.name}</h3>
                  <p className="text-sm font-medium opacity-80 mt-1">{exam.desc}</p>
                  <div className="mt-6 flex items-center text-sm font-bold uppercase tracking-wider">
                    Browse Materials <ChevronRight className="ml-1 h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button 
                onClick={() => setSelectedExam(null)}
                className="text-slate-500 hover:text-slate-800 font-medium bg-white px-4 py-2 rounded-lg border border-slate-200"
              >
                ← Back to Categories
              </button>
              <h2 className="text-2xl font-bold text-slate-800">{selectedExam} Study Material</h2>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-slate-700">No resources found</h3>
                <p className="text-slate-500 mt-1">No {selectedExam} materials available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.map(resource => {
                  const linkUrl = resource.fileUrl || resource.url || '';
                  return (
                    <div key={resource.id} onClick={() => handleAction(linkUrl)} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col overflow-hidden cursor-pointer">
                      <div className="p-6 flex-1">
                        <div className="flex justify-between items-start mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-100 text-orange-800">
                            {resource.type}
                          </span>
                        </div>
                        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                          {resource.title || resource.name}
                        </h3>
                        <div className="space-y-1 mt-3">
                          <p className="text-xs font-medium text-slate-500">By: <span className="text-slate-700">{resource.uploadedByName || 'Teacher'}</span></p>
                        </div>
                      </div>
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex gap-4 text-xs font-medium text-slate-500">
                          <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {resource.views || 0}</span>
                          <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {resource.downloads || 0}</span>
                        </div>
                        <div className="flex gap-2 relative z-10">
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleAction(linkUrl); }}
                            className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Preview"
                          >
                            {resource.type === 'Video Links' ? <PlayCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
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
    </div>
  );
}
