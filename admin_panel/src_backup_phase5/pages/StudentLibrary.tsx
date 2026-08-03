import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { BookOpen, Search, Filter, Download, Eye, Bookmark, FileText, PlayCircle } from 'lucide-react';

export default function StudentLibrary() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [subjectFilter, setSubjectFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  // Dynamic Subjects
  const [subjectsList, setSubjectsList] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        let profile = null;
        if (isFirebaseDemo) {
          const stored = localStorage.getItem('demo_user_profile');
          if (stored) profile = JSON.parse(stored);
        } else {
          const u = auth.currentUser;
          if (u) {
            const snap = await getDocs(query(collection(db, 'users'), where('userId', '==', u.uid)));
            if (!snap.empty) profile = snap.docs[0].data();
          }
        }
        setUserProfile(profile);

        if (!profile) return;

        // Load resources matching college and branch
        let resData: any[] = [];
        if (isFirebaseDemo) {
          const storedRes = localStorage.getItem('demo_resources');
          if (storedRes) {
            resData = JSON.parse(storedRes).filter((r: any) => 
              r.targetCollegeDte === profile.dteCode && 
              r.targetBranch === profile.branch &&
              r.status === 'approved' // Only show approved
            );
          }
        } else {
          const q = query(
            collection(db, 'resources'), 
            where('targetCollegeDte', '==', profile.dteCode),
            where('targetBranch', '==', profile.branch),
            where('status', '==', 'approved')
          );
          const snap = await getDocs(q);
          snap.forEach(d => resData.push({ id: d.id, ...d.data() }));
        }
        setResources(resData);
      } catch (err) {
        console.error('Failed to load library data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Update subjects based on selected semester
  useEffect(() => {
    const mockSubjects: Record<string, string[]> = {
      'Sem 1': ['Engineering Mathematics I', 'Engineering Physics', 'Basic Electrical'],
      'Sem 2': ['Engineering Mathematics II', 'Engineering Chemistry', 'Programming in C'],
      'Sem 3': ['Data Structures', 'Discrete Mathematics', 'Digital Logic'],
      'Sem 4': ['Operating Systems', 'Database Management', 'Computer Networks']
    };
    
    if (semesterFilter !== 'All') {
      setSubjectsList(mockSubjects[semesterFilter] || []);
      setSubjectFilter('All');
    } else {
      setSubjectsList([]);
      setSubjectFilter('All');
    }
  }, [semesterFilter]);

  const handleAction = async (id: string, type: 'view' | 'download', url: string) => {
    if (!isFirebaseDemo) {
      const field = type === 'view' ? 'views' : 'downloads';
      await updateDoc(doc(db, 'resources', id), { [field]: increment(1) });
    }
    if (type === 'view') {
      window.open(url, '_blank');
    }
  };

  const toggleBookmark = (id: string) => {
    // Phase 3 mock bookmark
    alert(`Resource ${id} bookmarked! (Saved to local profile)`);
  };

  const filteredResources = resources.filter(r => {
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !r.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (semesterFilter !== 'All' && r.semester !== semesterFilter) return false;
    if (subjectFilter !== 'All' && r.subject !== subjectFilter) return false;
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    return true;
  });

  if (!userProfile) return <div className="p-8">Loading Library Context...</div>;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="My Library" />

      <main className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title or subject..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 pl-10 outline-none focus:border-blue-500 focus:bg-white transition-colors"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap md:flex-nowrap">
            <select
              value={semesterFilter}
              onChange={e => setSemesterFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-slate-700 min-w-[120px]"
            >
              <option value="All">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
            </select>

            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              disabled={semesterFilter === 'All'}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-slate-700 min-w-[140px] disabled:opacity-50"
            >
              <option value="All">All Subjects</option>
              {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-slate-700 min-w-[140px]"
            >
              <option value="All">All Formats</option>
              <option>Notes</option>
              <option>Question Papers</option>
              <option>Syllabus</option>
              <option>Video Links</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 w-1/3 animate-pulse rounded-full"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
            <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-700">No resources found</h3>
            <p className="text-slate-500 mt-1">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div key={resource.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col overflow-hidden">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {resource.type}
                    </span>
                    <button onClick={() => toggleBookmark(resource.id)} className="text-slate-400 hover:text-amber-500 transition-colors">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title}
                  </h3>
                  <div className="space-y-1 mt-3">
                    <p className="text-xs font-medium text-slate-500">Subject: <span className="text-slate-700">{resource.subject}</span></p>
                    <p className="text-xs font-medium text-slate-500">Semester: <span className="text-slate-700">{resource.semester}</span></p>
                    <p className="text-xs font-medium text-slate-500">By: <span className="text-slate-700">{resource.uploadedByName}</span></p>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex gap-4 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {resource.views || 0}</span>
                    <span className="flex items-center gap-1"><Download className="h-3.5 w-3.5" /> {resource.downloads || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleAction(resource.id, 'view', resource.fileUrl)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      {resource.type === 'Video Links' ? <PlayCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </button>
                    <button 
                      onClick={() => handleAction(resource.id, 'download', resource.fileUrl)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
