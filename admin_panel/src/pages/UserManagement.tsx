import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, updateDoc, query } from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Users, Trash2, Search, ShieldAlert, ShieldCheck, UserCog, UserMinus } from 'lucide-react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  role: string;
  collegeName?: string;
  dteCode?: string;
  branch?: string;
  status?: string; // active, suspended, pending_approval
  createdAt: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Search parameters
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');

      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_users');
        const demoList: UserProfile[] = stored ? JSON.parse(stored) : [
          { id: 'admin1', name: 'System Admin', email: 'admin@system.com', photoUrl: '', role: 'admin', status: 'active', createdAt: new Date().toISOString() },
          { id: 't1', name: 'Prof. Ramesh', email: 'ramesh@college.edu', photoUrl: '', role: 'teacher', status: 'pending_approval', collegeName: 'COEP', createdAt: new Date().toISOString() },
          { id: 's1', name: 'Rahul Patil', email: 'rahul@student.com', photoUrl: '', role: 'student', status: 'active', collegeName: 'COEP', branch: 'Computer Engineering', createdAt: new Date().toISOString() },
        ];
        setUsers(demoList);
        setFilteredUsers(demoList);
      } else {
        const q = query(collection(db, 'users'));
        const snap = await getDocs(q);
        const list: UserProfile[] = [];
        snap.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as UserProfile);
        });
        setUsers(list);
        setFilteredUsers(list);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch users database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let result = users;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(u => u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
    }
    if (roleFilter !== 'All') {
      result = result.filter(u => u.role === roleFilter);
    }
    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const list = users.map(u => u.id === userId ? { ...u, status: newStatus } : u);
        localStorage.setItem('demo_users', JSON.stringify(list));
        setUsers(list);
      } else {
        await updateDoc(doc(db, 'users', userId), { status: newStatus });
        setUsers(users.map(u => u.id === userId ? { ...u, status: newStatus } : u));
      }
      setSuccess(`User status updated to ${newStatus}.`);
    } catch (err: any) {
      setError('Failed to update status.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!window.confirm(`Change this user's role to ${newRole}?`)) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const list = users.map(u => u.id === userId ? { ...u, role: newRole } : u);
        localStorage.setItem('demo_users', JSON.stringify(list));
        setUsers(list);
      } else {
        await updateDoc(doc(db, 'users', userId), { role: newRole });
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      }
      setSuccess(`User role changed to ${newRole}.`);
    } catch (err: any) {
      setError('Failed to update role.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (user: UserProfile) => {
    if (!window.confirm(`Permanently delete account for ${user.email}?`)) return;
    setLoading(true);
    try {
      if (isFirebaseDemo) {
        const updated = users.filter((u) => u.id !== user.id);
        localStorage.setItem('demo_users', JSON.stringify(updated));
        setUsers(updated);
      } else {
        await deleteDoc(doc(db, 'users', user.id));
        setUsers(users.filter(u => u.id !== user.id));
      }
      setSuccess('User account deleted permanently.');
    } catch (err: any) {
      setError('Failed to delete user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="User Administration" />
      {loading && (
        <div className="h-1 bg-blue-100 dark:bg-blue-900/30 w-full overflow-hidden absolute top-16 left-0 z-10">
          <div className="animate-progress h-full bg-blue-600 dark:bg-blue-500 w-1/3 rounded-full"></div>
        </div>
      )}
      
      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {error && (
          <div className="rounded-[16px] bg-red-50 dark:bg-red-900/20 p-4 text-[14px] font-bold text-red-600 dark:text-red-400 border border-red-100 dark:border-red-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> {error}
          </div>
        )}
        {success && (
          <div className="rounded-[16px] bg-emerald-50 dark:bg-emerald-900/20 p-4 text-[14px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span> {success}
          </div>
        )}

        <div className="rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row gap-5 justify-between items-center transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <div className="relative w-full md:w-96 group">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 group-focus-within:text-blue-500 transition-colors">
              <Search className="h-5 w-5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-[16px] border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white py-3 pl-12 pr-4 text-[14px] font-medium outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400"
              placeholder="Search by name or email..."
            />
          </div>
          <div className="relative w-full md:w-64">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full appearance-none rounded-[16px] border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white p-3 pr-10 text-[14px] font-medium outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
            >
              <option value="All">All Roles</option>
              <option value="admin">Admins</option>
              <option value="teacher">Teachers</option>
              <option value="student">Students</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all">
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full border-collapse text-left text-[14px]">
              <thead className="bg-slate-50/80 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
                <tr className="text-[12px] font-extrabold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  <th className="px-8 py-5">Account Details</th>
                  <th className="px-8 py-5">Role & Status</th>
                  <th className="px-8 py-5">Role Controls</th>
                  <th className="px-8 py-5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
                {filteredUsers.length === 0 ? (
                  <tr><td colSpan={4} className="px-8 py-16 text-center font-medium text-slate-400 text-[15px]">No users found matching your criteria.</td></tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/40 dark:to-indigo-900/40 flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-lg uppercase shadow-inner border border-blue-200/50 dark:border-blue-700/30">
                            {user.name?.[0] || 'U'}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-800 dark:text-slate-200 text-[15px]">{user.name}</div>
                            <div className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex flex-col gap-2 items-start">
                          <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide border ${
                            user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-200/60 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50' :
                            user.role === 'teacher' ? 'bg-purple-50 text-purple-600 border-purple-200/60 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800/50' : 
                            'bg-blue-50 text-blue-600 border-blue-200/60 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50'
                          }`}>{user.role}</span>
                          {user.role === 'teacher' && (
                            <span className={`flex items-center gap-1.5 text-[12px] font-bold ${
                              user.status === 'suspended' ? 'text-red-600 dark:text-red-400' :
                              user.status === 'pending_approval' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                            }`}>
                              {user.status === 'suspended' ? <ShieldAlert className="h-3.5 w-3.5" /> : <ShieldCheck className="h-3.5 w-3.5" />}
                              {(user.status || 'active').replace('_', ' ')}
                            </span>
                          )}
                          {user.role === 'student' && user.status === 'suspended' && (
                             <span className="text-red-600 dark:text-red-400 text-[12px] font-extrabold flex items-center gap-1.5">
                               <ShieldAlert className="h-3.5 w-3.5" /> SUSPENDED
                             </span>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="relative w-[120px]">
                          <select
                            value={user.role}
                            onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                            className="w-full appearance-none rounded-[12px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white px-3 py-2 pr-8 text-[13px] font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700"
                          >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                            <option value="admin">Admin</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                          {user.status !== 'suspended' ? (
                             <button onClick={() => handleUpdateStatus(user.id, 'suspended')} title="Suspend Account" className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/30 rounded-[12px] transition-all hover:-translate-y-0.5"><UserMinus className="h-4 w-4" /></button>
                          ) : (
                             <button onClick={() => handleUpdateStatus(user.id, 'active')} title="Reactivate Account" className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-[12px] transition-all hover:-translate-y-0.5"><ShieldCheck className="h-4 w-4" /></button>
                          )}
                          {user.role === 'teacher' && user.status === 'pending_approval' && (
                            <button onClick={() => handleUpdateStatus(user.id, 'active')} title="Approve Teacher" className="p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-[12px] transition-all hover:-translate-y-0.5"><ShieldCheck className="h-4 w-4" /></button>
                          )}
                          <button onClick={() => handleDeleteUser(user)} title="Delete Permanently" className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-[12px] transition-all hover:-translate-y-0.5"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #475569;
        }
      `}</style>
    </div>
  );
}
