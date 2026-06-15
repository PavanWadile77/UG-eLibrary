import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, School, FolderOpen, Bell, LogOut } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseDemo } from '../firebase';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: LayoutDashboard, path: '/' },
    { text: 'Colleges & DTE', icon: School, path: '/colleges' },
    { text: 'Content Explorer', icon: FolderOpen, path: '/content' },
    { text: 'Student Profiles', icon: Users, path: '/students' },
    { text: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  const handleLogout = async () => {
    try {
      if (isFirebaseDemo) {
        localStorage.removeItem('demo_admin_logged_in');
        navigate('/login');
        return;
      }
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
      // Force navigate even on error
      navigate('/login');
    }
  };

  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-slate-200 bg-slate-900 text-slate-200">
      {/* Brand Logo Header */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <School className="h-6 w-6 text-blue-500 mr-3" />
        <div>
          <h1 className="font-bold text-lg text-white leading-tight">UG eLibrary</h1>
          <span className="text-xs text-slate-400">Admin Control Console</span>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path;
          return (
            <button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${active ? 'text-amber-400' : 'text-slate-500'}`} />
              {item.text}
            </button>
          );
        })}
      </nav>

      {/* Demo Mode Indicator */}
      {isFirebaseDemo && (
        <div className="mx-4 mb-2 rounded-lg bg-amber-900/30 border border-amber-700/30 px-3 py-2">
          <p className="text-xs font-semibold text-amber-400">⚡ Demo Mode Active</p>
          <p className="text-xs text-amber-500/80 mt-0.5">Using local browser storage</p>
        </div>
      )}

      {/* Logout Footer Section */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-colors"
        >
          <LogOut className="mr-3 h-5 w-5 text-red-500" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
