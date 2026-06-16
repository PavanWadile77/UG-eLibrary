import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { RESOURCE_CATEGORIES } from '../constants';
import { Search, BookOpen, Download, Bookmark, Eye, Filter, PlayCircle, FileText } from 'lucide-react';

export default function StudentLibrary() {
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<any[]>([]);
  const [userProfile, setUserProfile] = useState<any>(null);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('Sem 1');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Categories');

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
          const u = auth?.currentUser;
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
              r.targetBranch === profile.branch
            );
          }
        } else {
          const q = query(
            collection(db, 'resources'), 
            where('targetCollegeDte', '==', profile.dteCode),
            where('targetBranch', '==', profile.branch)
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

  // Fetch subjects dynamically based on selected semester
  useEffect(() => {
    if (!userProfile?.branch) {
      setSubjectsList([]);
      setSubjectFilter('');
      return;
    }
    
    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_subjects');
      const list = stored ? JSON.parse(stored) : [];
      const filtered = list.filter((s: any) => s.collegeDte === userProfile.dteCode && s.branch === userProfile.branch && s.semester === semesterFilter.replace('Sem ', ''));
      const names = filtered.map((s: any) => s.name);
      setSubjectsList(names);
      setSubjectFilter(names.length > 0 ? names[0] : '');
    } else {
      const q = query(
        collection(db, 'subjects'),
        where('collegeDte', '==', userProfile.dteCode),
        where('branch', '==', userProfile.branch),
        where('semester', '==', semesterFilter.replace('Sem ', ''))
      );
      getDocs(q).then((snap) => {
        const list = snap.docs.map(doc => doc.data().name);
        setSubjectsList(list);
        setSubjectFilter(list.length > 0 ? list[0] : '');
      }).catch(err => {
        console.error('Failed to load subjects', err);
      });
    }
  }, [semesterFilter, userProfile]);

  const handleAction = async (e: React.MouseEvent | null, url: string) => {
    console.log("HANDLE ACTION CALLED WITH URL:", url);
    if (e) e.stopPropagation();
    if (!url || !url.trim()) {
      alert("Link not available");
      return;
    }
    // Temporarily disabled tracking to prevent Firebase permission errors
    window.open(url, '_blank');
  };

  const toggleBookmark = (id: string) => {
    // Phase 3 mock bookmark
    alert(`Resource ${id} bookmarked! (Saved to local profile)`);
  };

  const filteredResources = resources.filter(r => {
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !r.subject.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (semesterFilter !== 'All' && r.semester !== semesterFilter) return false;
    if (subjectFilter !== 'All' && r.subject !== subjectFilter) return false;
    if (typeFilter !== 'All Categories' && r.type !== typeFilter) return false;
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
              {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
            </select>

            <select
              value={subjectFilter}
              onChange={e => setSubjectFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-slate-700 min-w-[140px]"
            >
              {subjectsList.length === 0 && <option value="">No subjects available</option>}
              {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 font-medium text-slate-700 min-w-[140px]"
            >
              <option value="All Categories">All Categories</option>
              {RESOURCE_CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
            {filteredResources.map(resource => {
              const linkUrl = resource.fileUrl || resource.url || '';
              return (
              <div key={resource.id} onClick={() => {
                console.log("CLICKED RESOURCE:", resource);
                console.log("EXTRACTED LINK:", linkUrl);
                handleAction(null, linkUrl);
              }} className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col overflow-hidden cursor-pointer">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                      {resource.type}
                    </span>
                    <button onClick={(e) => { e.stopPropagation(); toggleBookmark(resource.id); }} className="text-slate-400 hover:text-amber-500 transition-colors z-10 relative">
                      <Bookmark className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {resource.title || resource.name}
                  </h3>
                  <div className="space-y-1 mt-3">
                    <p className="text-xs font-medium text-slate-500">Subject: <span className="text-slate-700">{resource.subject}</span></p>
                    <p className="text-xs font-medium text-slate-500">Semester: <span className="text-slate-700">{resource.semester}</span></p>
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
                      onClick={(e) => handleAction(e, linkUrl)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      {resource.type === 'Video Links' ? <PlayCircle className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, linkUrl)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )})}
          </div>
        )}
      </main>
    </div>
  );
}
