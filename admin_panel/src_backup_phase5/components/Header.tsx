import React from 'react';
import { auth } from '../firebase';
import { User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const user = auth.currentUser;

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-8">
      <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      
      <div className="flex items-center gap-4">
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
    </header>
  );
}
