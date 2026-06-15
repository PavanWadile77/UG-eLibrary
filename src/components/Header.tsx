import React from 'react';
import { auth } from '../firebase';
import { User, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const user = auth.currentUser;
  const navigate = useNavigate();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      
      <div className="flex items-center gap-6">
        <button onClick={() => navigate('/notifications')} className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
        </button>
        <div className="flex items-center gap-4 border-l border-slate-200 pl-6">
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
            Platform Admin
          </span>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-900 text-white">
              <User className="h-5 w-5" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-slate-800">Administrator</p>
              <p className="text-xs text-slate-500">{user?.email || 'admin@ug-elibrary.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
