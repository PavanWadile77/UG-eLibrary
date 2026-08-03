import React, { useState } from 'react';
import Header from '../components/Header';
import { Target, FileText, ChevronRight, Lock } from 'lucide-react';

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
                className="text-slate-500 hover:text-slate-800 font-medium"
              >
                ← Back to Categories
              </button>
              <h2 className="text-2xl font-bold text-slate-800">{selectedExam} Study Material</h2>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
              <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-800 mb-2">Phase 3 Implementation</h3>
              <p className="text-slate-500 max-w-md mx-auto">
                The UI routing for {selectedExam} is connected. In production, this view will list PDF notes and Video Lectures specifically tagged for {selectedExam} using the same grid layout as the Student Library.
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
