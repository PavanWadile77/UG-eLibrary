import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseDemo, auth } from '../firebase';
import Header from '../components/Header';
import { Users, FileText, Download, Eye, School, PlayCircle, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
          const u = auth.currentUser;
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
        <Header title={`Welcome, ${userProfile.name.split(' ')[0]}!`} />
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
        <Header title={`Welcome, Professor ${userProfile.name.split(' ')[0]}`} />
        <main className="p-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button onClick={() => navigate('/content')} className="text-left bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl shadow-lg shadow-purple-500/30 text-white hover:scale-[1.02] transition-transform">
              <FileText className="h-12 w-12 text-purple-200 mb-6" />
              <h2 className="text-2xl font-bold mb-2">Upload Material</h2>
              <p className="text-purple-100 opacity-90">Share notes, PPTs, or videos with your students.</p>
            </button>
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <h2 className="text-xl font-bold text-slate-800 mb-4">Your Recent Uploads</h2>
              <p className="text-slate-500 text-sm">You haven't uploaded any materials yet.</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // ==== ADMIN VIEW ====
  const cardData = [
    { title: 'Total Students', value: stats.studentsCount, icon: Users, color: 'bg-blue-50 text-blue-600 border-blue-100' },
    { title: 'Colleges Configured', value: stats.collegesCount, icon: School, color: 'bg-purple-50 text-purple-600 border-purple-100' },
    { title: 'Resources Shared', value: stats.filesCount, icon: FileText, color: 'bg-pink-50 text-pink-600 border-pink-100' },
    { title: 'Total Downloads', value: stats.totalDownloads, icon: Download, color: 'bg-cyan-50 text-cyan-600 border-cyan-100' },
    { title: 'Total Views', value: stats.totalViews, icon: Eye, color: 'bg-indigo-50 text-indigo-600 border-indigo-100' },
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Dashboard Overview" />

      <main className="p-8">
        {isFirebaseDemo && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
            <h3 className="font-bold text-blue-900">Running in Local Testing mode</h3>
            <p className="text-sm text-blue-700 mt-1">
              Stats and files listed here are managed locally in your browser cache.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {cardData.map((card, index) => {
            const Icon = card.icon;
            return (
              <div key={index} className={`flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm ${card.color}`}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{card.title}</p>
                  <h3 className="mt-2 text-3xl font-bold text-slate-800">{card.value}</h3>
                </div>
                <div className="rounded-xl p-3 bg-white shadow-sm border border-slate-100">
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Upload Activity</h3>
            <div className="divide-y divide-slate-100">
              {recentActivities.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">No uploads activity logged yet.</div>
              ) : (
                recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{act.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Uploaded by: {act.uploadedBy} • {act.type.toUpperCase()}</p>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{new Date(act.timestamp).toLocaleDateString()}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
