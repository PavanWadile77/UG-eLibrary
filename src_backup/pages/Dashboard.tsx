import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Users, FileText, Download, Eye, School, Hourglass } from 'lucide-react';

interface RecentActivity {
  id: string;
  name: string;
  uploadedBy: string;
  timestamp: string;
  type: string;
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    studentsCount: 0,
    teachersCount: 0,
    pendingTeachers: 0,
    collegesCount: 0,
    filesCount: 0,
    totalDownloads: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        
        if (isFirebaseDemo) {
          // Calculate Stats from localStorage Demo data
          const colsStored = localStorage.getItem('demo_colleges');
          const colleges = colsStored ? JSON.parse(colsStored).length : 4; // fallback defaults

          const filesStored = localStorage.getItem('demo_files');
          const filesList = filesStored ? JSON.parse(filesStored) : [
            { id: '1', name: 'Syllabus & Lecture Schedule.pdf', downloads: 12, views: 45, type: 'pdf', createdAt: new Date().toISOString() },
            { id: '2', name: 'Lecture Video - Complexity.mp4', downloads: 4, views: 89, type: 'video', createdAt: new Date().toISOString() }
          ];
          
          let downloads = 0;
          let views = 0;
          const activities: RecentActivity[] = [];

          filesList.forEach((f: any) => {
            downloads += (f.downloads || 0);
            views += (f.views || 0);
            activities.push({
              id: f.id,
              name: f.name || 'Untitled File',
              uploadedBy: 'System Admin',
              timestamp: f.createdAt || new Date().toISOString(),
              type: f.type || 'pdf'
            });
          });

          // Fetch student profiles from local mock
          const studentsStored = localStorage.getItem('demo_students');
          const studentsCount = studentsStored ? JSON.parse(studentsStored).length : 8;

          setRecentActivities(activities.slice(0, 5));
          setStats({
            studentsCount: studentsCount,
            teachersCount: 0,
            pendingTeachers: 0,
            collegesCount: colleges,
            filesCount: filesList.length,
            totalDownloads: downloads,
            totalViews: views
          });
        } else {
          // Fetch from Firestore
          const usersSnap = await getDocs(collection(db, 'users'));
          let students = 0;
          let teachers = 0;
          usersSnap.forEach((doc) => {
            const u = doc.data();
            if (u.role === 'student') students++;
            if (u.role === 'teacher') teachers++;
          });

          const collegesSnap = await getDocs(collection(db, 'colleges'));
          const colleges = collegesSnap.size;

          const filesSnap = await getDocs(collection(db, 'files'));
          const filesCount = filesSnap.size;
          
          let downloads = 0;
          let views = 0;
          const activities: RecentActivity[] = [];

          filesSnap.forEach((doc) => {
            const f = doc.data();
            downloads += (f.downloads || 0);
            views += (f.views || 0);
            activities.push({
              id: doc.id,
              name: f.name || 'Untitled File',
              uploadedBy: f.uploadedByName || 'System Admin',
              timestamp: f.createdAt || new Date().toISOString(),
              type: f.type || 'pdf'
            });
          });

          activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
          setRecentActivities(activities.slice(0, 5));

          setStats({
            studentsCount: students,
            teachersCount: teachers,
            pendingTeachers: 0,
            collegesCount: colleges,
            filesCount: filesCount,
            totalDownloads: downloads,
            totalViews: views
          });
        }
      } catch (err) {
        console.error("Dashboard statistics loading failed:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

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

      {loading && (
        <div className="h-1 bg-blue-100 w-full overflow-hidden">
          <div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div>
        </div>
      )}

      <main className="p-8">
        {isFirebaseDemo && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/50 p-6">
            <h3 className="font-bold text-blue-900">Running in Local Testing mode</h3>
            <p className="text-sm text-blue-700 mt-1">
              Stats and files listed here are managed locally in your browser cache.
            </p>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {cardData.map((card, index) => {
            const Icon = card.icon;
            return (
              <div 
                key={index} 
                className={`flex items-center justify-between rounded-2xl border bg-white p-6 shadow-sm ${card.color}`}
              >
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

        {/* Dynamic Panels */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recent upload logs */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Upload Activity</h3>
            <div className="divide-y divide-slate-100">
              {recentActivities.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-sm">
                  No uploads activity logged yet.
                </div>
              ) : (
                recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{act.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Uploaded by: {act.uploadedBy} • {act.type.toUpperCase()}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(act.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Core ratios panel */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Resource Engagement Ratios</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                  <span>Downloads per Resource Ratio</span>
                  <span className="text-slate-800">
                    {stats.filesCount > 0 ? (stats.totalDownloads / stats.filesCount).toFixed(1) : 0}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div 
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${Math.min(stats.filesCount > 0 ? (stats.totalDownloads / stats.filesCount) * 10 : 0, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-semibold text-slate-600 mb-2">
                  <span>Views per Resource Ratio</span>
                  <span className="text-slate-800">
                    {stats.filesCount > 0 ? (stats.totalViews / stats.filesCount).toFixed(1) : 0}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100">
                  <div 
                    className="h-full rounded-full bg-indigo-500"
                    style={{ width: `${Math.min(stats.filesCount > 0 ? (stats.totalViews / stats.filesCount) * 10 : 0, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
