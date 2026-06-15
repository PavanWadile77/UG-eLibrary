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
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="User Administration" />
      {loading && <div className="h-1 bg-blue-100 w-full overflow-hidden"><div className="animate-progress h-full bg-blue-600 w-1/3 rounded-full"></div></div>}
      
      <main className="p-8">
        {error && <div className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">{error}</div>}
        {success && <div className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-600">{success}</div>}

        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400"><Search className="h-5 w-5" /></span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
              placeholder="Search by name or email..."
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full md:w-64 rounded-xl border border-slate-300 p-2.5 text-sm outline-none focus:border-blue-500"
          >
            <option value="All">All Roles</option>
            <option value="admin">Admins</option>
            <option value="teacher">Teachers</option>
            <option value="student">Students</option>
          </select>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase">
                <th className="px-6 py-4">Account Details</th>
                <th className="px-6 py-4">Role & Status</th>
                <th className="px-6 py-4">Role Controls</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredUsers.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-400">No users found.</td></tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold uppercase">
                          {user.name?.[0] || 'U'}
                        </div>
                        <div>
                          <div className="font-bold text-slate-800">{user.name}</div>
                          <div className="text-xs text-slate-400">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span className={`w-max px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          user.role === 'admin' ? 'bg-red-100 text-red-700' :
                          user.role === 'teacher' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                        }`}>{user.role}</span>
                        {user.role === 'teacher' && (
                          <span className={`flex items-center gap-1 text-[11px] font-semibold ${
                            user.status === 'suspended' ? 'text-red-600' :
                            user.status === 'pending_approval' ? 'text-amber-600' : 'text-green-600'
                          }`}>
                            {user.status === 'suspended' ? <ShieldAlert className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                            {user.status || 'active'}
                          </span>
                        )}
                        {user.role === 'student' && user.status === 'suspended' && (
                           <span className="text-red-600 text-[11px] font-bold">SUSPENDED</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className="text-xs border border-slate-200 rounded p-1.5 outline-none"
                      >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        {user.status !== 'suspended' ? (
                           <button onClick={() => handleUpdateStatus(user.id, 'suspended')} title="Suspend Account" className="p-2 text-slate-400 hover:bg-amber-50 hover:text-amber-600 rounded-lg"><UserMinus className="h-4 w-4" /></button>
                        ) : (
                           <button onClick={() => handleUpdateStatus(user.id, 'active')} title="Reactivate Account" className="p-2 text-slate-400 hover:bg-green-50 hover:text-green-600 rounded-lg"><ShieldCheck className="h-4 w-4" /></button>
                        )}
                        {user.role === 'teacher' && user.status === 'pending_approval' && (
                          <button onClick={() => handleUpdateStatus(user.id, 'active')} title="Approve Teacher" className="p-2 text-slate-400 hover:bg-green-50 hover:text-green-600 rounded-lg"><ShieldCheck className="h-4 w-4" /></button>
                        )}
                        <button onClick={() => handleDeleteUser(user)} title="Delete Permanently" className="p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
