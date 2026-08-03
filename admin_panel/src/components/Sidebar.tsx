import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, School, FolderOpen, Bell, LogOut, BookOpen, FileText, Settings, X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth, isFirebaseDemo } from '../firebase';
import { MobileMenuContext } from '../App';

export default function Sidebar({ userProfile }: { userProfile?: any }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useContext(MobileMenuContext);

  const getMenuItems = () => {
    if (!userProfile) return [];

    if (userProfile.role === 'admin') {
      return [
        { text: 'Dashboard Overview', icon: LayoutDashboard, path: '/' },
        { text: 'Content Approval Queue', icon: FileText, path: '/content' },
        { text: 'User Management', icon: Users, path: '/users' },
        { text: 'Colleges & Syllabus', icon: School, path: '/colleges' },
        { text: 'System Settings', icon: Settings, path: '/profile' },
      ];
    } else if (userProfile.role === 'teacher') {
      return [
        { text: 'Teacher Dashboard', icon: LayoutDashboard, path: '/' },
        { text: 'Upload Materials', icon: FileText, path: '/upload' },
        { text: 'My Uploads', icon: FolderOpen, path: '/my-uploads' },
        { text: 'Manage Subjects', icon: BookOpen, path: '/subjects' },
        { text: 'Profile Settings', icon: Settings, path: '/profile' },
      ];
    } else {
      // student
      return [
        { text: 'Student Dashboard', icon: LayoutDashboard, path: '/' },
        { text: 'My Library', icon: BookOpen, path: '/library' },
        { text: 'Competitive Exams', icon: FileText, path: '/competitive' },
        { text: 'Profile Settings', icon: Settings, path: '/profile' },
      ];
    }
  };

  const menuItems = getMenuItems();

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
      navigate('/login');
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-800/50 bg-gradient-to-b from-[#0F172A] via-[#172554] to-[#1E293B] rounded-r-[24px] shadow-[8px_0_40px_rgba(0,0,0,0.25)] text-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0 shadow-2xl shadow-blue-900/20' : '-translate-x-full'} overflow-hidden`}>
        
        {/* Soft Radial Glow behind Logo */}
        <div className="absolute top-[-50px] left-[-50px] w-[250px] h-[250px] bg-blue-500/20 blur-[60px] rounded-full pointer-events-none mix-blend-screen"></div>

        {/* Brand Logo Header */}
        <div className="flex pt-10 pb-8 items-center px-[24px] justify-between relative z-10">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-[60px] h-[60px] rounded-[18px] bg-gradient-to-br from-[#2563EB] to-[#60A5FA] shadow-[0_0_24px_rgba(59,130,246,0.5)] shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
              <School className="h-[28px] w-[28px] text-white relative z-10" />
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="font-bold text-[24px] text-white leading-[1.1] tracking-tight">UG<br />eLibrary</h1>
              <span className="text-[11px] font-semibold tracking-[1.5px] text-blue-200 uppercase mt-1 opacity-80">
                {userProfile?.role ? `${userProfile.role} Portal` : 'Control Console'}
              </span>
            </div>
          </div>
          <button 
            className="md:hidden text-slate-400 hover:text-white transition-colors absolute right-4 top-10"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-5 py-2 overflow-y-auto custom-scrollbar space-y-[12px] relative z-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Check if active (handle base paths as well if needed, for now use exact or prefix for library)
            const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  setIsMobileMenuOpen(false); // auto close on mobile
                }}
                className={`group relative flex w-full items-center rounded-[20px] px-[20px] h-[58px] text-[16px] font-semibold transition-all duration-[180ms] cursor-pointer ${
                  active
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white shadow-[0_12px_30px_rgba(37,99,235,0.35)] border border-white/12 -translate-y-[2px]'
                    : 'text-[#CBD5E1] border border-transparent hover:text-white hover:bg-white/[0.06] hover:-translate-y-[2px]'
                }`}
              >
                {/* Active Indicator Glow */}
                {active && (
                  <div className="absolute left-[3px] top-1/2 -translate-y-1/2 h-[28px] w-[4px] bg-white rounded-full shadow-[0_0_12px_rgba(255,255,255,0.9)]"></div>
                )}
                
                <div className="w-[22px] flex items-center justify-center shrink-0 mr-4">
                  <Icon className={`h-[22px] w-[22px] transition-transform duration-[180ms] group-hover:scale-110 ${active ? 'text-white' : 'text-[#94A3B8] group-hover:text-white'}`} />
                </div>
                <span className="relative z-10 whitespace-nowrap">{item.text}</span>
              </button>
            );
          })}
        </nav>

        {/* Demo Mode Indicator */}
        {isFirebaseDemo && (
          <div className="mx-5 mb-4 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3 relative z-10">
            <p className="text-[13px] font-bold text-amber-500 flex items-center gap-1.5"><span className="animate-pulse">⚡</span> Demo Mode</p>
            <p className="text-[11px] font-medium text-amber-500/70 mt-1">Local browser storage</p>
          </div>
        )}

        <div className="mt-4 pb-8 relative z-10">
          {/* Subtle Divider */}
          <div className="h-px bg-white/[0.08] mx-6 mb-6" />

          {/* Logout Footer Section */}
          <div className="px-5">
            <button
              onClick={handleLogout}
              className="group relative flex w-full h-[58px] items-center justify-center rounded-[20px] border border-[#EF4444] bg-transparent text-[16px] font-semibold text-[#EF4444] transition-all duration-[180ms] hover:bg-gradient-to-r hover:from-[#EF4444] hover:to-rose-600 hover:text-white hover:shadow-[0_8px_20px_rgba(239,68,68,0.25)] hover:border-transparent hover:-translate-y-[2px] cursor-pointer overflow-hidden"
            >
              <div className="w-[22px] flex items-center justify-center shrink-0 mr-3">
                <LogOut className="h-[22px] w-[22px] transition-transform duration-[180ms] group-hover:-translate-x-1" />
              </div>
              <span className="relative z-10 whitespace-nowrap">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
