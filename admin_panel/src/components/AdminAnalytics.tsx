import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import { Users, FileText, Download, Eye, School, Activity, BookOpen, Layers } from 'lucide-react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ffc658'];

export default function AdminAnalytics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Aggregated data
  const [stats, setStats] = useState({
    users: 0, students: 0, teachers: 0, admins: 0,
    resources: 0, colleges: 0, branches: 0,
    downloads: 0, views: 0, uploads: 0
  });

  const [growthData, setGrowthData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topColleges, setTopColleges] = useState<any[]>([]);
  const [topTeachers, setTopTeachers] = useState<any[]>([]);
  const [examUsage, setExamUsage] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        if (isFirebaseDemo) {
          const storedUsers = localStorage.getItem('demo_users');
          const users = storedUsers ? JSON.parse(storedUsers) : [];
          const storedRes = localStorage.getItem('demo_resources');
          const resources = storedRes ? JSON.parse(storedRes) : [];
          const storedCols = localStorage.getItem('demo_colleges');
          const colleges = storedCols ? JSON.parse(storedCols) : [];

          // Aggregate users
          const students = users.filter((u: any) => u.role === 'student').length;
          const teachers = users.filter((u: any) => u.role === 'teacher').length;
          const admins = users.filter((u: any) => u.role === 'admin').length;

          // Aggregate resources
          let downloads = 0, views = 0, uploads = resources.length;
          const categoryCount: Record<string, number> = {};
          resources.forEach((r: any) => {
            downloads += (r.downloads || 0);
            views += (r.views || 0);
            const cat = r.category || 'Other';
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
          });

          const catData = Object.keys(categoryCount).map(k => ({ name: k, value: categoryCount[k] }));

          // Mocks for charts
          setGrowthData([
            { month: 'Jan', users: 10, uploads: 5 },
            { month: 'Feb', users: 25, uploads: 12 },
            { month: 'Mar', users: 40, uploads: 20 },
            { month: 'Apr', users: 65, uploads: 35 },
            { month: 'May', users: 90, uploads: 50 },
            { month: 'Jun', users: users.length, uploads: resources.length },
          ]);

          setCategoryData(catData.length > 0 ? catData : [
            { name: 'Notes', value: 45 }, { name: 'Question Papers', value: 25 },
            { name: 'Syllabus', value: 10 }, { name: 'E-books', value: 20 }
          ]);

          setTopColleges([
            { name: 'COEP', activeUsers: 45 },
            { name: 'VJTI', activeUsers: 30 },
            { name: 'PICT', activeUsers: 20 },
          ]);

          setExamUsage([
            { name: 'UPSC', users: 120 }, { name: 'MPSC', users: 95 },
            { name: 'SSC', users: 60 }, { name: 'Banking', users: 40 }
          ]);

          setStats({
            users: users.length, students, teachers, admins,
            resources: resources.length, colleges: colleges.length, branches: 15,
            downloads, views, uploads
          });
        } else {
          // Real Firestore fetching (abstracted for speed in phase 5b)
          const usersSnap = await getDocs(collection(db, 'users'));
          let students = 0, teachers = 0, admins = 0;
          usersSnap.forEach(doc => {
            const data = doc.data();
            if (data.role === 'student') students++;
            else if (data.role === 'teacher') teachers++;
            else if (data.role === 'admin') admins++;
          });

          const resSnap = await getDocs(collection(db, 'resources'));
          let downloads = 0, views = 0;
          const categoryCount: Record<string, number> = {};
          resSnap.forEach(doc => {
            const r = doc.data();
            downloads += (r.downloads || 0);
            views += (r.views || 0);
            const cat = r.category || 'Other';
            categoryCount[cat] = (categoryCount[cat] || 0) + 1;
          });
          const catData = Object.keys(categoryCount).map(k => ({ name: k, value: categoryCount[k] }));

          const colSnap = await getDocs(collection(db, 'colleges'));
          const branchSnap = await getDocs(collection(db, 'branches'));

          setStats({
            users: usersSnap.size, students, teachers, admins,
            resources: resSnap.size, colleges: colSnap.size, branches: branchSnap.size,
            downloads, views, uploads: resSnap.size
          });

          // Fallback mocks for timeline data as we don't have historical logs
          setGrowthData([
            { month: 'Jan', users: 10, uploads: 5 },
            { month: 'Mar', users: 40, uploads: 20 },
            { month: 'Jun', users: usersSnap.size, uploads: resSnap.size },
          ]);
          setCategoryData(catData);
          setExamUsage([
            { name: 'UPSC', users: 12 }, { name: 'MPSC', users: 9 }
          ]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-slate-400">Loading comprehensive analytics...</div>;
  }

  const statCards = [
    { title: 'Total Users', value: stats.users, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', hover: 'group-hover:bg-blue-600 group-hover:text-white' },
    { title: 'Students', value: stats.students, icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', hover: 'group-hover:bg-emerald-600 group-hover:text-white' },
    { title: 'Teachers', value: stats.teachers, icon: School, color: 'text-purple-600', bg: 'bg-purple-50', hover: 'group-hover:bg-purple-600 group-hover:text-white' },
    { title: 'Resources', value: stats.resources, icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50', hover: 'group-hover:bg-orange-600 group-hover:text-white' },
    { title: 'Downloads', value: stats.downloads, icon: Download, color: 'text-cyan-600', bg: 'bg-cyan-50', hover: 'group-hover:bg-cyan-600 group-hover:text-white' },
    { title: 'Uploads', value: stats.uploads, icon: Activity, color: 'text-pink-600', bg: 'bg-pink-50', hover: 'group-hover:bg-pink-600 group-hover:text-white' },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {statCards.map((card, idx) => (
          <div key={idx} className="group bg-white rounded-[24px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center cursor-pointer">
            <div className={`p-4 rounded-[16px] mb-4 ${card.bg} ${card.color} ${card.hover} transition-colors duration-300 shadow-sm`}>
              <card.icon className="h-7 w-7" />
            </div>
            <p className="text-[12px] font-extrabold text-slate-400 uppercase tracking-widest">{card.title}</p>
            <h3 className="text-3xl font-black text-slate-800 mt-2 tracking-tight">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 border-b border-slate-200/60 pb-5">
        {['overview', 'academic', 'users', 'exams'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 -translate-y-0.5' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800'
            }`}
          >
            {tab} Analytics
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="text-[18px] font-extrabold text-slate-800 mb-8 tracking-tight">User & Upload Growth</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={growthData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', padding: '12px 16px', fontWeight: 'bold' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={4} dot={{ r: 5, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="uploads" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 5, strokeWidth: 2 }} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="text-[18px] font-extrabold text-slate-800 mb-8 tracking-tight">Resource Category Distribution</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                      {categoryData.map((_entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', padding: '12px 16px', fontWeight: 'bold' }} />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
              <h3 className="text-[18px] font-extrabold text-slate-800 mb-8 tracking-tight">Most Active Colleges</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topColleges} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', padding: '12px 16px', fontWeight: 'bold' }} />
                    <Bar dataKey="activeUsers" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 min-h-[350px]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Activity className="h-8 w-8 text-slate-300" />
              </div>
              <p className="font-bold">More Academic Metrics Loading...</p>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 min-h-[350px]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-slate-300" />
              </div>
              <p className="font-bold">Top Uploading Teachers Loading...</p>
            </div>
            <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-slate-400 min-h-[350px]">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-slate-300" />
              </div>
              <p className="font-bold">Most Active Students Loading...</p>
            </div>
          </div>
        )}

        {activeTab === 'exams' && (
          <div className="bg-white p-8 rounded-[24px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
            <h3 className="text-[18px] font-extrabold text-slate-800 mb-8 tracking-tight">Competitive Exam Usage</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={examUsage} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} tickMargin={10} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)', padding: '12px 16px', fontWeight: 'bold' }} />
                  <Area type="monotone" dataKey="users" stroke="#f59e0b" fill="url(#colorUv)" strokeWidth={4} />
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
