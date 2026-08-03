import React, { useContext, useEffect, useState, useRef } from 'react';
import { auth, db, isFirebaseDemo } from '../firebase';
import { doc, getDoc, collection, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { User, Bell, Menu, FileText, CheckCircle2, ChevronRight, PlayCircle, Library } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MobileMenuContext } from '../App';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const user = auth?.currentUser;
  const navigate = useNavigate();
  const location = useLocation();
  const { setIsMobileMenuOpen } = useContext(MobileMenuContext);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_user_profile');
        if (stored) setUserProfile(JSON.parse(stored));
      } else if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          }
        } catch (e) {
          console.error("Error fetching user profile in Header:", e);
        }
      }
    }
    fetchProfile();
  }, [user]);

  useEffect(() => {
    if (!userProfile) return;

    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_notifications');
      if (stored) {
        let list = JSON.parse(stored);
        if (userProfile.role === 'student') {
          list = list.filter((n: any) => 
            (!n.targetRole || n.targetRole === 'student' || n.targetRole === 'all') &&
            (!n.targetBranch || n.targetBranch === 'All Branches' || n.targetBranch === userProfile.branch) &&
            (!n.semester || n.semester === 'All Semesters' || n.semester === (userProfile.semester || 'Sem 1'))
          );
        } else if (userProfile.role === 'teacher') {
          list = list.filter((n: any) => 
            (!n.targetRole || n.targetRole === 'teacher' || n.targetRole === 'all') &&
            (!n.targetBranch || n.targetBranch === 'All Branches' || n.targetBranch === userProfile.branch)
          );
        }
        
        list.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNotifications(list);
        setUnreadCount(list.filter((n: any) => !n.readBy?.includes(userProfile.userId || user?.uid)).length);
      }
    } else {
      const q = collection(db, 'notifications');
      const unsubscribe = onSnapshot(q, (snap) => {
        let list = snap.docs.map(d => ({ id: d.id, ...d.data() } as any));
        
        if (userProfile.role === 'student') {
          list = list.filter((n: any) => 
            (!n.targetRole || n.targetRole === 'student' || n.targetRole === 'all') &&
            (!n.targetBranch || n.targetBranch === 'All Branches' || n.targetBranch === userProfile.branch) &&
            (!n.semester || n.semester === 'All Semesters' || n.semester === (userProfile.semester || 'Sem 1'))
          );
        } else if (userProfile.role === 'teacher') {
          list = list.filter((n: any) => 
            (!n.targetRole || n.targetRole === 'teacher' || n.targetRole === 'all') &&
            (!n.targetBranch || n.targetBranch === 'All Branches' || n.targetBranch === userProfile.branch)
          );
        }

        list.sort((a, b) => {
          const tA = a.createdAt?.toMillis ? a.createdAt.toMillis() : new Date(a.createdAt || 0).getTime();
          const tB = b.createdAt?.toMillis ? b.createdAt.toMillis() : new Date(b.createdAt || 0).getTime();
          return tB - tA;
        });

        setNotifications(list);
        setUnreadCount(list.filter((n: any) => !n.readBy?.includes(userProfile.userId || user?.uid)).length);
      });
      return () => unsubscribe();
    }
  }, [userProfile, user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = async (notif: any) => {
    if (!notif.readBy?.includes(userProfile?.userId || user?.uid)) {
      if (isFirebaseDemo) {
        const stored = localStorage.getItem('demo_notifications');
        if (stored) {
          const list = JSON.parse(stored);
          const idx = list.findIndex((n: any) => n.id === notif.id);
          if (idx !== -1) {
            list[idx].readBy = [...(list[idx].readBy || []), userProfile?.userId || 'demo_user'];
            localStorage.setItem('demo_notifications', JSON.stringify(list));
            setNotifications(list.filter((n: any) => notifications.some(existing => existing.id === n.id)).map((n:any) => n.id === notif.id ? list[idx] : n));
            setUnreadCount(prev => Math.max(0, prev - 1));
          }
        }
      } else {
        try {
          await updateDoc(doc(db, 'notifications', notif.id), {
            readBy: arrayUnion(userProfile?.userId || user?.uid)
          });
        } catch (e) {
          console.error("Error updating notification read status:", e);
        }
      }
    }
    setShowNotifications(false);
    if (notif.url) {
      window.open(notif.url, '_blank');
    }
  };

  const markAllAsRead = async () => {
    if (unreadCount === 0) return;
    
    if (isFirebaseDemo) {
      const stored = localStorage.getItem('demo_notifications');
      if (stored) {
        const list = JSON.parse(stored);
        const uid = userProfile?.userId || 'demo_user';
        list.forEach((n: any) => {
          if (notifications.some(existing => existing.id === n.id) && !n.readBy?.includes(uid)) {
            n.readBy = [...(n.readBy || []), uid];
          }
        });
        localStorage.setItem('demo_notifications', JSON.stringify(list));
        setNotifications(list.filter((n: any) => notifications.some(existing => existing.id === n.id)));
        setUnreadCount(0);
      }
    } else {
      try {
        const uid = userProfile?.userId || user?.uid;
        for (const notif of notifications) {
          if (!notif.readBy?.includes(uid)) {
            await updateDoc(doc(db, 'notifications', notif.id), {
              readBy: arrayUnion(uid)
            });
          }
        }
      } catch (e) {
        console.error("Error marking all as read:", e);
      }
    }
  };

  const isStudent = userProfile?.role === 'student';
  
  // Format relative time
  const getRelativeTime = (timestamp: any) => {
    if (!timestamp) return 'Just now';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <header className="flex h-24 items-center justify-between border-b border-slate-200/50 bg-white/70 backdrop-blur-xl px-8 md:px-12 shrink-0 sticky top-0 z-30 shadow-[0_2px_20px_rgba(0,0,0,0.02)]">
      <div className="flex items-center">
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="mr-6 text-slate-400 hover:text-slate-800 hover:bg-slate-50 p-2.5 rounded-2xl transition-colors md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <h2 className="text-[28px] font-extrabold text-slate-800 tracking-tight truncate max-w-[200px] sm:max-w-xs">{title}</h2>
      </div>
      
      <div className="flex items-center gap-6 md:gap-10">
        
        {/* Notification Bell Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)} 
            className="relative p-3 text-slate-500 hover:text-[#2563EB] bg-slate-50/50 border border-slate-200/60 hover:bg-white hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] hover:border-[#2563EB]/20 rounded-full transition-all group duration-300"
          >
            <Bell className="h-5 w-5 transition-transform group-hover:rotate-12 group-active:-rotate-12" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-rose-500 text-white text-[10px] font-bold border-2 border-white shadow-[0_0_8px_rgba(244,63,94,0.6)]">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </button>

          {/* Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-[-100px] sm:right-0 mt-3 w-[360px] sm:w-[420px] bg-white rounded-[24px] shadow-[0_16px_40px_rgba(0,0,0,0.12)] border border-slate-100 overflow-hidden z-50 flex flex-col origin-top-right animate-in zoom-in-95 duration-200">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-[16px]">Notifications</h3>
                  <p className="text-[13px] text-slate-500 font-medium">You have {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}</p>
                </div>
                <button onClick={markAllAsRead} className="text-[13px] font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> Mark all read
                </button>
              </div>

              <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                      <Bell className="w-8 h-8 text-slate-300" />
                    </div>
                    <p className="font-bold text-slate-600 text-[15px]">You're all caught up!</p>
                    <p className="text-[13px] text-slate-400 font-medium mt-1">No new notifications right now.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-slate-50">
                    {notifications.map(notif => {
                      const isRead = notif.readBy?.includes(userProfile?.userId || user?.uid);
                      const isBroadcast = notif.targetBranch === 'All Branches' && !notif.type;
                      
                      return (
                        <div 
                          key={notif.id} 
                          onClick={() => handleNotificationClick(notif)}
                          className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer flex gap-4 ${isRead ? 'opacity-70' : 'bg-blue-50/30'}`}
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                            isBroadcast ? 'bg-amber-100 text-amber-600' :
                            notif.type === 'Video Links' ? 'bg-red-100 text-red-600' :
                            notif.type === 'Books' ? 'bg-indigo-100 text-indigo-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {isBroadcast ? <Bell className="w-5 h-5" /> :
                             notif.type === 'Video Links' ? <PlayCircle className="w-5 h-5" /> :
                             notif.type === 'Books' ? <Library className="w-5 h-5" /> :
                             <FileText className="w-5 h-5" />}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`text-[14px] leading-tight truncate pr-2 ${isRead ? 'font-bold text-slate-700' : 'font-extrabold text-slate-900'}`}>
                                {notif.title}
                              </h4>
                              <span className="text-[11px] font-bold text-slate-400 whitespace-nowrap shrink-0 mt-0.5">
                                {getRelativeTime(notif.createdAt)}
                              </span>
                            </div>
                            
                            <p className="text-[13px] font-medium text-slate-500 line-clamp-2 leading-relaxed">
                              {notif.body || notif.message}
                            </p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {!isBroadcast && notif.type && (
                                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-500">
                                  {notif.type}
                                </span>
                              )}
                              {!isRead && (
                                <span className="w-2 h-2 rounded-full bg-blue-600 self-center ml-auto"></span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              
              <div className="p-3 border-t border-slate-100 bg-slate-50 text-center">
                <button 
                  onClick={() => { setShowNotifications(false); navigate('/notifications'); }}
                  className="text-[13px] font-extrabold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1 w-full p-2"
                >
                  View all notifications <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-10 w-[1px] bg-slate-200/70 hidden md:block"></div>
        
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-[#2563EB]/5 border border-blue-100/80 px-4 py-2 text-[13px] font-extrabold text-[#2563EB] tracking-wide shadow-sm">
            {isStudent ? (
              '🎓 Student'
            ) : (
              <>
                <div className="h-2 w-2 rounded-full bg-[#2563EB] shadow-[0_0_8px_rgba(37,99,235,0.5)] animate-pulse"></div>
                Platform Admin
              </>
            )}
          </span>
          <div className="flex items-center gap-4 cursor-pointer group p-1.5 pr-4 rounded-full hover:bg-white transition-all border border-transparent hover:border-slate-100 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#2563EB] to-[#3B82F6] text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] group-hover:shadow-[0_4px_16px_rgba(37,99,235,0.35)] transition-all shrink-0 ring-2 ring-white">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <p className="text-[15px] font-extrabold text-slate-800 leading-tight group-hover:text-[#2563EB] transition-colors">
                {isStudent ? (user?.displayName || userProfile?.name || 'Student') : 'Administrator'}
              </p>
              <p className="text-[13px] font-medium text-slate-500 mt-0.5">
                {user?.email || (isStudent ? 'student@ug-elibrary.com' : 'admin@ug-elibrary.com')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
