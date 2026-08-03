import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  Timestamp
} from 'firebase/firestore';
import { db, isFirebaseDemo } from '../firebase';
import Header from '../components/Header';
import { Bell, Send, Trash2, Plus, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  body: string;
  targetDteCode: string;
  targetBranch: string;
  createdAt: string;
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
  const [showForm, setShowForm] = useState(false);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        const list: Notification[] = stored ? JSON.parse(stored) : [
          {
            id: 'n1',
            title: 'New Study Notes Added!',
            body: 'Unit 1 Data Structures notes have been uploaded to Second Year Computer Engineering.',
            targetDteCode: '',
            targetBranch: 'All Branches',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
          {
            id: 'n2',
            title: 'UPSC Exam Schedule Released',
            body: 'Check out the mock test calendars and strategy videos in the UPSC Section.',
            targetDteCode: '',
            targetBranch: 'All Branches',
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
        ];
        setNotifications(list);
      } else {
        const snap = await getDocs(collection(db, 'notifications'));
        const list: Notification[] = [];
        snap.forEach((d) =>
          list.push({ id: d.id, ...d.data() } as Notification)
        );
        list.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
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

    const notification: Notification = {
      id: `notif_${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      targetDteCode: targetDteCode.trim(),
      targetBranch,
      createdAt: new Date().toISOString(),
    };

    try {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        const existing: Notification[] = stored ? JSON.parse(stored) : [];
        existing.unshift(notification);
        localStorage.setItem('demo_notifications', JSON.stringify(existing));
        setNotifications(existing);
        setSuccess('Notification saved to local Demo storage successfully!');
      } else {
        const { id, ...payload } = notification;
        await addDoc(collection(db, 'notifications'), {
          ...payload,
          createdAt: Timestamp.now(),
        });
        setSuccess('Notification sent and stored in Firestore!');
        await fetchNotifications();
      }

      // Reset form
      setTitle('');
      setBody('');
      setTargetDteCode('');
      setTargetBranch('All Branches');
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

  const formatDate = (iso: string) => {
    try {
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen">
      <Header title="Notifications" />

      <main className="p-8">
        {/* Demo mode banner */}
        {isFirebaseDemo && (
          <div className="mb-6 rounded-2xl border border-blue-200 bg-blue-50/70 p-5">
            <p className="font-semibold text-blue-900 text-sm">
              Demo Mode: Notifications are saved to browser <code>localStorage</code>. FCM push delivery
              requires Firebase Cloud Messaging configuration.
            </p>
          </div>
        )}

        {/* Alerts */}
        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 p-4 text-sm font-semibold text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 flex items-center gap-2 rounded-xl bg-green-50 border border-green-200 p-4 text-sm font-semibold text-green-700">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            {success}
          </div>
        )}

        {/* Send Notification Button */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Broadcast Notifications</h2>
            <p className="text-sm text-slate-500 mt-1">
              Send announcements and updates to students. Target all or specific branches.
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(!showForm);
              setError('');
              setSuccess('');
            }}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Notification
          </button>
        </div>

        {/* Compose Form */}
        {showForm && (
          <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Compose Notification
            </h3>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Notification Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. New Notes Uploaded for CE Second Year"
                  maxLength={120}
                />
                <p className="text-xs text-slate-400 mt-1">{title.length}/120</p>
              </div>

              {/* Body */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Message Body *
                </label>
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Enter the full notification message that students will see..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-slate-400 mt-1">{body.length}/500</p>
              </div>

              {/* Target Filters */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Target DTE Code (Optional)
                  </label>
                  <input
                    type="text"
                    value={targetDteCode}
                    onChange={(e) => setTargetDteCode(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. 6006 (leave blank for all)"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Target Branch
                  </label>
                  <select
                    value={targetBranch}
                    onChange={(e) => setTargetBranch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
                  >
                    {BRANCHES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="rounded-xl border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending || !title.trim() || !body.trim()}
                  className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  {sending ? 'Sending...' : 'Send Notification'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notifications List */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="border-b border-slate-100 px-6 py-4">
            <h3 className="font-bold text-slate-800">Sent Notifications History</h3>
            <p className="text-xs text-slate-400 mt-0.5">{notifications.length} total notifications</p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 gap-3 text-slate-500">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <span className="text-sm font-medium">Loading notifications...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Bell className="h-12 w-12 mb-4 opacity-30" />
              <p className="font-semibold text-slate-500">No notifications sent yet</p>
              <p className="text-sm mt-1">Click "New Notification" above to send your first broadcast</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-start justify-between px-6 py-5 hover:bg-slate-50/50 transition-colors group"
                >
                  <div className="flex gap-4">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 border border-blue-100">
                      <Bell className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">{notif.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-relaxed">{notif.body}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-100">
                          {notif.targetBranch || 'All Branches'}
                        </span>
                        {notif.targetDteCode && (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 border border-amber-100">
                            DTE: {notif.targetDteCode}
                          </span>
                        )}
                        <span className="text-xs text-slate-400">
                          {formatDate(notif.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-slate-400 opacity-0 group-hover:opacity-100 hover:border-red-200 hover:bg-red-50 hover:text-red-500 transition-all"
                    title="Delete Notification"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
