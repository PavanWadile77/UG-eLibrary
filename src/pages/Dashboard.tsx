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
      <div className="flex-1 bg-slate-50 min-h-screen">
        <Header title="Dashboard Overview" />
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      </div>
    );
  }

  // ==== STUDENT VIEW ====
  if (userProfile?.role === 'student') {
    return (
      <div className="flex-1 bg-slate-50 min-h-screen">
        <Header title={`Welcome, ${userProfile.name ? userProfile.name.split(' ')[0] : 'Student'}!`} />
        <main className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => navigate('/library')} className="text-left bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-3xl shadow-lg shadow-blue-500/30 text-white hover:scale-[1.02] transition-transform">
              <BookOpen className="h-12 w-12 text-blue-200 mb-6" />
              <h2 className="text-2xl font-bold mb-2">My Library</h2>
              <p className="text-blue-100 opacity-90">Browse {userProfile.branch} materials for {userProfile.collegeName}.</p>
            </button>
            <button onClick={() => navigate('/competitive')} className="text-left bg-white border border-slate-200 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all group">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center mb-6 group-hover:bg-orange-100 transition-colors">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Competitive Exams</h2>
              <p className="text-slate-500">Access UPSC, MPSC, Banking, and SSC materials.</p>
            </button>
          </div>
        </main>
      </div>
    );
  }

  // ==== TEACHER VIEW ====
  if (userProfile?.role === 'teacher') {
    return (
      <div className="flex-1 bg-slate-50 min-h-screen">
        <Header title={`Welcome, Professor ${userProfile.name ? userProfile.name.split(' ')[0] : ''}`} />
        <main className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => navigate('/upload')} className="text-left cursor-pointer bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl shadow-lg shadow-purple-500/30 text-white hover:scale-[1.02] transition-transform">
              <FileText className="h-12 w-12 text-purple-200 mb-6" />
              <h2 className="text-2xl font-bold mb-2">Upload Material</h2>
              <p className="text-purple-100 opacity-90">Share notes, PPTs, or videos with your students.</p>
            </button>
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-800">Your Recent Uploads</h2>
                <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  <span className="text-sm font-bold text-blue-700">Total: {stats.filesCount}</span>
                </div>
              </div>
              
              {recentActivities.length === 0 ? (
                <div className="text-center py-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-500 text-sm">You haven't uploaded any materials yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-100 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg border border-slate-100 shadow-sm">
                          <FileText className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{activity.name}</p>
                          <p className="text-xs text-slate-500">{new Date(activity.timestamp).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => navigate('/my-uploads')} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">View All</button>
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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Admin Analytics Dashboard" />
      <main className="p-8">
        {isFirebaseDemo && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-6 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-blue-900">Running in Local Testing mode</h3>
              <p className="text-sm text-blue-700 mt-1">
                Analytics and trends are simulated securely in your browser cache.
              </p>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider">Demo Mode</span>
          </div>
        )}
        <React.Suspense fallback={<div className="p-12 text-center text-slate-400">Loading Analytics Engine...</div>}>
          <AdminAnalytics />
        </React.Suspense>
      </main>
    </div>
  );
}
