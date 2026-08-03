import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { Users, FileText, Download, Eye, School, PlayCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminAnalytics = React.lazy(() => import('../components/AdminAnalytics'));

interface RecentActivity {
  id: string;
  name: string;
  uploadedBy: string;
  timestamp: string;
  type: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [stats, setStats] = useState({
    studentsCount: 0,
    teachersCount: 0,
    collegesCount: 0,
    filesCount: 0,
    totalDownloads: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
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

        // Fetch Stats for Admin
        if (profile?.role === 'admin' || isFirebaseDemo) {
          if (isFirebaseDemo) {
            const colsStored = localStorage.getItem('demo_colleges');
            const colleges = colsStored ? JSON.parse(colsStored).length : 4;
            const filesStored = localStorage.getItem('demo_resources');
            const filesList = filesStored ? JSON.parse(filesStored) : [];
            let downloads = 0; let views = 0;
            const activities: RecentActivity[] = [];

            filesList.forEach((f: any) => {
              downloads += (f.downloads || 0);
              views += (f.views || 0);
              activities.push({
                id: f.id, name: f.title || 'Untitled', uploadedBy: f.uploadedByName || 'Admin', timestamp: f.createdAt || new Date().toISOString(), type: f.type || 'Notes'
              });
            });

            const studentsStored = localStorage.getItem('demo_users');
            const studentsCount = studentsStored ? JSON.parse(studentsStored).length : 8;

            setRecentActivities(activities.slice(0, 5));
            setStats({ studentsCount, teachersCount: 0, collegesCount: colleges, filesCount: filesList.length, totalDownloads: downloads, totalViews: views });
          } else {
            // Real fetch (simplified for Phase 3)
            const collegesSnap = await getDocs(collection(db, 'colleges'));
            setStats(s => ({ ...s, collegesCount: collegesSnap.size }));
          }
        } else if (profile?.role === 'teacher') {
          if (isFirebaseDemo) {
            const filesStored = localStorage.getItem('demo_resources');
            const filesList = filesStored ? JSON.parse(filesStored) : [];
            const myFiles = filesList.filter((f: any) => f.uploadedBy === (auth?.currentUser?.uid || 'demo_admin'));
            const activities: RecentActivity[] = myFiles.map((f: any) => ({
              id: f.id, name: f.title || 'Untitled', uploadedBy: 'Me', timestamp: f.createdAt || new Date().toISOString(), type: f.type || 'Notes'
            }));
            activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            setRecentActivities(activities.slice(0, 3));
            setStats(s => ({ ...s, filesCount: myFiles.length }));
          } else {
            const u = auth?.currentUser;
            if (u) {
              const snap = await getDocs(query(collection(db, 'resources'), where('uploadedBy', '==', u.uid)));
              const activities: RecentActivity[] = snap.docs.map(d => {
                const data = d.data();
                return {
                  id: d.id, name: data.title || data.name || 'Untitled', uploadedBy: 'Me', timestamp: data.createdAt || new Date().toISOString(), type: data.type || 'Notes'
                };
              });
              activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
              setRecentActivities(activities.slice(0, 3));
              setStats(s => ({ ...s, filesCount: snap.size }));
            }
          }
        }
      } catch (err) {
        console.error("Dashboard loading failed:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen">
        <Header title="Dashboard Overview" />
        <div className="h-1.5 bg-blue-100/50 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      </div>
    );
  }

  // ==== STUDENT VIEW ====
  if (userProfile?.role === 'student') {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen transition-colors font-sans">
        <Header title={`Welcome, ${userProfile.name ? userProfile.name.split(' ')[0] : 'Student'}!`} />
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => navigate('/library')} className="group text-left bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[24px] shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/20 transition-colors duration-500"></div>
              <BookOpen className="h-14 w-14 text-blue-200 mb-6 drop-shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <h2 className="text-3xl font-extrabold mb-3 text-white tracking-tight relative z-10">My Library</h2>
              <p className="text-blue-100/90 font-medium text-[15px] relative z-10">Browse {userProfile.branch} materials for {userProfile.collegeName}.</p>
            </button>

            <button onClick={() => navigate('/competitive')} className="group text-left bg-white border border-slate-100 p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(245,158,11,0.08)] hover:border-orange-100 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="h-14 w-14 rounded-[16px] bg-orange-50 border border-orange-100 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:border-orange-500 transition-colors duration-300 shadow-sm">
                <FileText className="h-7 w-7 text-orange-500 group-hover:text-white transition-colors duration-300" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight group-hover:text-orange-600 transition-colors">Competitive Exams</h2>
              <p className="text-slate-500 font-medium text-[15px]">Access premium UPSC, MPSC, Banking, and SSC materials.</p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==== TEACHER VIEW ====
  if (userProfile?.role === 'teacher') {
    return (
      <div className="flex-1 bg-[#F8FAFC] min-h-screen transition-colors font-sans">
        <Header title={`Welcome, Professor ${userProfile.name ? userProfile.name.split(' ')[0] : ''}`} />
        <main className="p-6 md:p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => navigate('/upload')} className="group text-left cursor-pointer bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-[24px] shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mb-20 group-hover:bg-white/20 transition-colors duration-500"></div>
              <FileText className="h-14 w-14 text-purple-200 mb-6 drop-shadow-md group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <h2 className="text-3xl font-extrabold mb-3 text-white tracking-tight relative z-10">Upload Material</h2>
              <p className="text-purple-100/90 font-medium text-[15px] relative z-10">Share premium notes, PPTs, or videos with your classes.</p>
            </button>

            <div className="bg-white border border-slate-100 p-8 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-extrabold text-slate-800 tracking-tight">Recent Uploads</h2>
                <div className="bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 shadow-sm">
                  <span className="text-[13px] font-extrabold text-blue-700 uppercase tracking-wider">Total: {stats.filesCount}</span>
                </div>
              </div>
              
              {recentActivities.length === 0 ? (
                <div className="text-center py-10 bg-slate-50/50 rounded-[16px] border border-dashed border-slate-200">
                  <p className="text-slate-500 font-medium text-[15px]">You haven't uploaded any materials yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="group flex items-center justify-between p-4 bg-slate-50/50 rounded-[16px] border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 hover:shadow-sm">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-white rounded-[12px] border border-slate-100 shadow-sm group-hover:shadow group-hover:scale-105 transition-all">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-[15px] leading-tight group-hover:text-blue-700 transition-colors">{activity.name}</p>
                          <p className="text-[13px] font-medium text-slate-500 mt-0.5">{new Date(activity.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => navigate('/my-uploads')} className="h-8 px-4 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 hover:shadow-sm transition-all duration-300 text-[13px] font-bold">
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==== ADMIN VIEW ====
  return (
    <div className="flex-1 bg-[#F8FAFC] min-h-screen transition-colors font-sans">
      <Header title="Admin Analytics Dashboard" />
      <main className="p-6 md:p-8 max-w-7xl mx-auto">
        {isFirebaseDemo && (
          <div className="mb-8 rounded-[20px] border border-blue-200 bg-blue-50/80 backdrop-blur-sm p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm shadow-blue-500/5">
            <div>
              <h3 className="font-extrabold text-blue-900 text-lg">Running in Local Testing Mode</h3>
              <p className="text-[14px] font-medium text-blue-700/80 mt-1">
                Analytics and trends are simulated securely in your browser cache.
              </p>
            </div>
            <span className="px-4 py-2 bg-blue-600 text-white text-[12px] font-bold rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20 whitespace-nowrap">Demo Mode Active</span>
          </div>
        )}
        <React.Suspense fallback={
          <div className="p-12 text-center">
            <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-500 font-bold">Loading Premium Analytics...</p>
          </div>
        }>
          <AdminAnalytics />
        </React.Suspense>
      </main>
    </div>
  );
}
