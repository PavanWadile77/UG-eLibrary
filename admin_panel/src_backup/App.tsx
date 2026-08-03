import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { auth, db, isFirebaseDemo } from './firebase';

import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CollegeManagement from './pages/CollegeManagement';
import ContentManagement from './pages/ContentManagement';
import StudentManagement from './pages/StudentManagement';
import Notifications from './pages/Notifications';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isFirebaseDemo) {
      const isLogged = localStorage.getItem('demo_admin_logged_in') === 'true';
      if (isLogged) {
        setCurrentUser({
          uid: 'demo_admin',
          displayName: 'Demo Admin',
          email: 'admin@demo.ug-elibrary.com'
        });
        setIsAdminUser(true);
      } else {
        setCurrentUser(null);
        setIsAdminUser(false);
      }
      setCheckingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdminUser(true);
          } else {
            setIsAdminUser(false);
            await auth.signOut(); // Force logout if not admin
          }
        } catch (e) {
          console.error("Authentication verify error:", e);
          setIsAdminUser(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdminUser(false);
      }
      setCheckingAuth(false);
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!currentUser || !isAdminUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 pl-64">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth page */}
        <Route path="/login" element={<Login />} />

        {/* Console dashboard routes */}
        <Route 
          path="/" 
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/colleges" 
          element={
            <ProtectedLayout>
              <CollegeManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/content" 
          element={
            <ProtectedLayout>
              <ContentManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/students" 
          element={
            <ProtectedLayout>
              <StudentManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedLayout>
              <Notifications />
            </ProtectedLayout>
          } 
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
