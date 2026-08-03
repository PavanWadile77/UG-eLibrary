import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp,
  serverTimestamp
} from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Bell, Send, Trash2, Plus, Loader2, AlertCircle, CheckCircle2, FileText, PlayCircle, Library } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body?: string;
  message?: string;
  type?: string;
  targetDteCode?: string;
  targetBranch: string;
  semester?: string;
  targetRole?: string;
  createdAt: any;
  readBy?: string[];
  url?: string;
}

const BRANCHES = [
  'All Branches',
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Artificial Intelligence & Data Science',
  'Electrical Engineering',
  'Chemical Engineering',
  'Computer Science and Engineering',
  'Electronics and Computer Engineering',
  'Data Science'
];

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [targetDteCode, setTargetDteCode] = useState('');
  const [targetBranch, setTargetBranch] = useState('All Branches');
  const [targetRole, setTargetRole] = useState('all');
  const [semester, setSemester] = useState('All Semesters');
  const [showForm, setShowForm] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        const list: Notification[] = stored ? JSON.parse(stored) : [];
        setNotifications(list);
      } else {
        const snap = await getDocs(collection(db, 'notifications'));
        const list: Notification[] = [];
        snap.forEach((d) =>
          list.push({ id: d.id, ...d.data() } as Notification)
        );
        list.sort((a, b) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt || 0).getTime();
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt || 0).getTime();
          return tB - tA;
        });
        setNotifications(list);
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to load notifications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) {
      setError('Please enter both a title and message body.');
      return;
    }

    setSending(true);
    setError('');
    setSuccess('');

    const notification: any = {
      title: title.trim(),
      message: body.trim(), // Use message to unify with auto-generated
      targetDteCode: targetDteCode.trim() || null,
      targetBranch,
      semester,
      targetRole,
      readBy: [],
      type: 'Broadcast'
    };

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        const existing: Notification[] = stored ? JSON.parse(stored) : [];
        const newNotif = { id: `notif_${Date.now()}`, createdAt: new Date().toISOString(), ...notification };
        existing.unshift(newNotif);
        localStorage.setItem('demo_notifications', JSON.stringify(existing));
        setNotifications(existing);
        setSuccess('Notification saved to local Demo storage successfully!');
      } else {
        await addDoc(collection(db, 'notifications'), {
          ...notification,
          createdAt: serverTimestamp(),
        });
        setSuccess('Notification sent and stored in Firestore!');
        await fetchNotifications();
      }

      // Reset form
      setTitle('');
      setBody('');
      setTargetDteCode('');
      setTargetBranch('All Branches');
      setSemester('All Semesters');
      setTargetRole('all');
      setShowForm(false);
    } catch (err: any) {
      console.error(err);
      setError('Failed to send notification: ' + (err.message || 'Unknown error'));
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (notifId: string) => {
    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        const existing: Notification[] = stored ? JSON.parse(stored) : [];
        const updated = existing.filter((n) => n.id !== notifId);
        localStorage.setItem('demo_notifications', JSON.stringify(updated));
        setNotifications(updated);
      } else {
        await deleteDoc(doc(db, 'notifications', notifId));
        setNotifications((prev) => prev.filter((n) => n.id !== notifId));
      }
    } catch (err: any) {
      setError('Failed to delete notification.');
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown date';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(date);
    } catch {
      return String(timestamp);
    }
  };

  return (
    <div className="flex-1 bg-[#F8FAFC] dark:bg-slate-900 min-h-screen relative font-sans selection:bg-blue-100 transition-colors">
      <Header title="Notifications" />

      <main className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Demo mode banner */}
        {isFirebaseDemo && (
          <div className="rounded-[20px] border border-blue-200 dark:border-blue-800/50 bg-blue-50/70 dark:bg-blue-900/20 p-5 shadow-sm flex items-center gap-4">
            <div className="p-2.5 bg-blue-100 dark:bg-blue-900/50 rounded-[12px] text-blue-600 dark:text-blue-400">
               <AlertCircle className="h-5 w-5" />
            </div>
            <p className="font-semibold text-blue-900 dark:text-blue-300 text-[14px]">
              Demo Mode: Notifications are saved to browser <code className="bg-blue-100 dark:bg-blue-800/50 px-1.5 py-0.5 rounded-md text-[12px]">localStorage</code>.
            </p>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 rounded-[16px] bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/50 p-4 text-[14px] font-bold text-red-600 dark:text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            {error}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-3 rounded-[16px] bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50 p-4 text-[14px] font-bold text-emerald-600 dark:text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {success}
          </div>
        )}

        {/* Send Notification Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-extrabold text-slate-800 dark:text-white tracking-tight">Manage Notifications</h2>
            <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mt-1">
              View automatic upload notifications and broadcast manual announcements.
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setError('');
              setSuccess('');
            }}
            className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            New Broadcast
          </button>
        </div>

        {/* Compose Form */}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showForm ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h3 className="text-[18px] font-extrabold text-slate-800 dark:text-white mb-6 flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-[12px] text-blue-500">
                 <Bell className="h-5 w-5" />
              </div>
              Compose Broadcast
            </h3>
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Notification Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-[16px] border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white px-5 py-3.5 text-[14px] font-medium outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all placeholder:text-slate-400 shadow-sm"
                  placeholder="e.g. Important Announcement"
                  maxLength={120}
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Message Body <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-[16px] border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 dark:text-white px-5 py-4 text-[14px] font-medium outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none placeholder:text-slate-400 shadow-sm"
                  placeholder="Enter the full broadcast message..."
                  rows={4}
                  maxLength={500}
                />
              </div>

              {/* Target Filters */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-slate-50/50 dark:bg-slate-900/20 p-6 rounded-[20px] border border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target Role
                  </label>
                  <select
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full rounded-[14px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="teacher">Teachers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target Branch
                  </label>
                  <select
                    value={targetBranch}
                    onChange={(e) => setTargetBranch(e.target.value)}
                    className="w-full rounded-[14px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    {BRANCHES.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target Semester
                  </label>
                  <select
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    className="w-full rounded-[14px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  >
                    <option value="All Semesters">All Semesters</option>
                    {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={`Sem ${s}`}>Semester {s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[13px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                    Target DTE Code <span className="text-slate-400 normal-case font-medium">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={targetDteCode}
                    onChange={(e) => setTargetDteCode(e.target.value)}
                    className="w-full rounded-[14px] border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white px-4 py-3 text-[14px] font-medium outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                    placeholder="e.g. 6006"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-3 text-[14px] font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending || !title.trim() || !body.trim()}
                  className="flex items-center gap-2 rounded-full bg-blue-600 px-8 py-3 text-[14px] font-extrabold text-white shadow-lg shadow-blue-500/25 hover:bg-blue-700 disabled:opacity-50 disabled:translate-y-0 hover:-translate-y-0.5 transition-all"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sending ? 'Sending...' : 'Send Broadcast'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="rounded-[24px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-[0_4px_24px_rgba(0,0,0,0.02)] overflow-hidden transition-all">
          <div className="border-b border-slate-100 dark:border-slate-700 px-8 py-6 bg-slate-50/50 dark:bg-slate-800/80 flex justify-between items-center">
            <div>
              <h3 className="font-extrabold text-slate-800 dark:text-white text-[16px] tracking-tight">Notification History</h3>
              <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-1">{notifications.length} total notifications across the platform</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500">
               <Bell className="h-5 w-5" />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 gap-3 text-slate-500">
               <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
               <span className="text-[14px] font-bold">Loading...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <div className="h-20 w-20 rounded-full bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center mb-5">
                <Bell className="h-10 w-10 text-slate-300 dark:text-slate-600" />
              </div>
              <p className="font-extrabold text-slate-600 dark:text-slate-400 text-[16px]">No notifications found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
              {notifications.map((notif) => {
                const isBroadcast = notif.type === 'Broadcast' || !notif.type;
                
                return (
                <div
                  key={notif.id}
                  className="flex flex-col sm:flex-row items-start justify-between px-8 py-6 hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group gap-4"
                >
                  <div className="flex gap-5">
                    <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[16px] border shadow-sm group-hover:scale-110 transition-transform ${
                      isBroadcast ? 'bg-amber-50 border-amber-100 text-amber-500 dark:bg-amber-900/20 dark:border-amber-800/30' : 
                      notif.type === 'Video Links' ? 'bg-red-50 border-red-100 text-red-500' :
                      notif.type === 'Books' ? 'bg-indigo-50 border-indigo-100 text-indigo-500' :
                      'bg-blue-50 border-blue-100 text-blue-500 dark:bg-blue-900/20 dark:border-blue-800/30'
                    }`}>
                      {isBroadcast ? <Bell className="h-5 w-5" /> : 
                       notif.type === 'Video Links' ? <PlayCircle className="h-5 w-5" /> :
                       notif.type === 'Books' ? <Library className="h-5 w-5" /> :
                       <FileText className="h-5 w-5" />}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-800 dark:text-slate-200 text-[15px]">{notif.title}</h4>
                      <p className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-3xl">
                        {notif.body || notif.message}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-2 mt-4">
                        {notif.type && (
                          <span className="inline-flex items-center rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-1 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider border border-slate-200 dark:border-slate-700">
                            {notif.type}
                          </span>
                        )}
                        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-[10px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider border border-blue-100 dark:border-blue-800/50">
                          {notif.targetRole || 'All Roles'}
                        </span>
                        <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-[10px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider border border-blue-100 dark:border-blue-800/50">
                          {notif.targetBranch || 'All Branches'}
                        </span>
                        {notif.semester && notif.semester !== 'All Semesters' && (
                          <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-[10px] font-extrabold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider border border-indigo-100 dark:border-indigo-800/50">
                            {notif.semester}
                          </span>
                        )}
                        <span className="text-[12px] font-bold text-slate-400 flex items-center gap-1.5 ml-2">
                          {formatDate(notif.createdAt)}
                        </span>
                      </div>
                      
                      {notif.readBy && notif.readBy.length > 0 && (
                        <p className="text-[11px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Read by {notif.readBy.length} user(s)
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="sm:ml-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-slate-400 opacity-0 group-hover:opacity-100 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-all self-end sm:self-auto"
                    title="Delete Notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )})}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
