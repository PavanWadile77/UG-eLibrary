import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, increment } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { RESOURCE_CATEGORIES } from '../constants';
import { Search, BookOpen, Download, Bookmark, Eye, Filter, PlayCircle, FileText, ChevronDown, User, Clock, Library } from 'lucide-react';

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
    <div className="flex-1 bg-[#F8FAFC] min-h-screen font-sans selection:bg-[#2563EB]/20 relative overflow-hidden">
      {/* Subtle Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2563EB]/[0.03] to-transparent pointer-events-none" />
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#3B82F6]/[0.04] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[500px] h-[500px] bg-[#10B981]/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <Header title="My Library" />

      <main className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Search and Filters */}
        <div className="bg-white/70 backdrop-blur-2xl rounded-[24px] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white flex flex-col md:flex-row gap-5 relative z-20">
          <div className="flex-1 relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-[22px] w-[22px] text-slate-400 group-focus-within:text-[#2563EB] transition-colors duration-300" />
            <input
              type="text"
              placeholder="Search Notes, Books or Videos..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full h-[56px] bg-slate-50/50 hover:bg-slate-50 focus:bg-white border border-slate-200/60 rounded-[18px] px-5 pl-[52px] outline-none focus:border-[#2563EB] focus:ring-[4px] focus:ring-[#2563EB]/15 transition-all duration-300 font-medium text-[15px] text-slate-800 placeholder:text-slate-400 shadow-[inset_0_2px_4px_rgba(0,0,0,0.01)]"
            />
          </div>
          
          <div className="flex gap-4 flex-wrap md:flex-nowrap">
            <div className="relative group min-w-[140px] flex-1 md:flex-none">
              <select
                value={semesterFilter}
                onChange={e => setSemesterFilter(e.target.value)}
                className="w-full h-[56px] appearance-none bg-white hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-[16px] px-5 outline-none focus:border-[#2563EB] focus:ring-[4px] focus:ring-[#2563EB]/15 font-bold text-[15px] text-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
            </div>

            <div className="relative group min-w-[180px] flex-1 md:flex-none">
              <select
                value={subjectFilter}
                onChange={e => setSubjectFilter(e.target.value)}
                className="w-full h-[56px] appearance-none bg-white hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-[16px] px-5 outline-none focus:border-[#2563EB] focus:ring-[4px] focus:ring-[#2563EB]/15 font-bold text-[15px] text-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
              >
                {subjectsList.length === 0 && <option value="">No subjects available</option>}
                {subjectsList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
            </div>

            <div className="relative group min-w-[180px] flex-1 md:flex-none">
              <select
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
                className="w-full h-[56px] appearance-none bg-white hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-[16px] px-5 outline-none focus:border-[#2563EB] focus:ring-[4px] focus:ring-[#2563EB]/15 font-bold text-[15px] text-slate-700 transition-all duration-300 shadow-sm cursor-pointer"
              >
                <option value="All Categories">All Categories</option>
                {RESOURCE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-slate-400 pointer-events-none group-focus-within:text-[#2563EB] transition-colors" />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mt-10">
            <div className="h-full bg-[#2563EB] w-1/3 animate-pulse rounded-full"></div>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-24 bg-white/50 backdrop-blur-md rounded-[32px] border border-slate-200 border-dashed shadow-sm mt-8">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-100">
              <BookOpen className="h-10 w-10 text-slate-300" />
            </div>
            <h3 className="text-[24px] font-extrabold text-slate-800 tracking-tight">No resources found</h3>
            <p className="text-[15px] text-slate-500 mt-3 font-medium">Try adjusting your filters or search query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
            {filteredResources.map((resource, idx) => {
              const linkUrl = resource.fileUrl || resource.url || '';
              return (
              <div 
                key={resource.id} 
                onClick={() => {
                  handleAction(null, linkUrl);
                }} 
                className="bg-white rounded-[24px] border border-slate-100/80 shadow-[0_4px_24px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(37,99,235,0.08)] transition-all duration-500 group flex flex-col overflow-hidden cursor-pointer hover:-translate-y-2 hover:border-blue-200 relative"
                style={{ animation: `fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${(idx % 10) * 0.05}s both` }}
              >
                <div className="p-8 pb-6 flex-1 relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="inline-flex items-center px-4 py-2 rounded-[14px] text-[13px] font-extrabold tracking-wide uppercase bg-blue-50/80 text-[#2563EB] border border-blue-100/50">
                      {resource.type === 'Video Links' ? <PlayCircle className="w-4 h-4 mr-2" /> : <FileText className="w-4 h-4 mr-2" />}
                      {resource.type}
                    </span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); toggleBookmark(resource.id); }} 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-slate-400 bg-slate-50 hover:text-[#2563EB] hover:bg-blue-50 transition-all relative z-20 group/btn shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-slate-100"
                    >
                      <Bookmark className="h-[20px] w-[20px] group-hover/btn:fill-blue-100 transition-all duration-300" />
                    </button>
                  </div>
                  
                  <h3 className="font-extrabold text-slate-900 text-[24px] leading-[1.3] mb-6 group-hover:text-[#2563EB] transition-colors line-clamp-2 tracking-tight">
                    {resource.title || resource.name}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                        <Library className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[15px] font-bold text-slate-700 truncate">{resource.subject}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 shadow-sm">
                        <Bookmark className="w-[18px] h-[18px]" />
                      </div>
                      <span className="text-[15px] font-bold text-slate-700">{resource.semester}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] flex items-center justify-center text-white font-bold text-[14px] shadow-md shadow-blue-500/20 ring-2 ring-white">
                        {(resource.uploadedByName || 'T')[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[15px] font-bold text-slate-800 leading-tight">{resource.uploadedByName || 'Teacher'}</span>
                        <span className="text-[13px] font-medium text-slate-400 mt-0.5">Recently added</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-slate-100 to-transparent opacity-80"></div>
                
                <div className="px-8 py-5 bg-white flex items-center justify-between relative z-10 group-hover:bg-slate-50/30 transition-colors">
                  <div className="flex gap-6">
                    <div className="flex flex-col">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Views</span>
                      <span className="text-[15px] font-bold text-slate-700 flex items-center gap-2"><Eye className="h-4 w-4 text-[#3B82F6]" /> {resource.views || 0}</span>
                    </div>
                    <div className="w-[1px] h-9 bg-slate-100"></div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">Downloads</span>
                      <span className="text-[15px] font-bold text-slate-700 flex items-center gap-2"><Download className="h-4 w-4 text-[#10B981]" /> {resource.downloads || 0}</span>
                    </div>
                  </div>
                  <div className="flex gap-3 relative z-20">
                    <button 
                      onClick={(e) => handleAction(e, linkUrl)}
                      className="h-12 w-12 flex items-center justify-center text-slate-500 bg-white border border-slate-200 hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-blue-50/80 hover:shadow-[0_8px_20px_rgba(37,99,235,0.15)] rounded-full transition-all duration-300"
                      title="Preview"
                    >
                      <Eye className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={(e) => handleAction(e, linkUrl)}
                      className="h-12 w-12 flex items-center justify-center text-slate-500 bg-white border border-slate-200 hover:border-[#2563EB]/40 hover:text-[#2563EB] hover:bg-blue-50/80 hover:shadow-[0_8px_20px_rgba(37,99,235,0.15)] rounded-full transition-all duration-300"
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
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}
