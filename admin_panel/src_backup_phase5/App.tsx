import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Loader2 } from 'lucide-react';
import { auth, db, isFirebaseDemo } from './firebase';

import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import StudentLibrary from './pages/StudentLibrary';
import CompetitiveExams from './pages/CompetitiveExams';
import TeacherUpload from './pages/TeacherUpload';
import ProfileSettings from './pages/ProfileSettings';
import CollegeManagement from './pages/CollegeManagement';
import ContentManagement from './pages/ContentManagement';
import StudentManagement from './pages/StudentManagement';
import Notifications from './pages/Notifications';

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

function ProtectedLayout({ children, requireRole }: ProtectedLayoutProps & { requireRole?: string[] }) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    if (isFirebaseDemo) {
      const isLogged = localStorage.getItem('demo_admin_logged_in') === 'true';
      if (isLogged) {
        setCurrentUser({
          uid: 'demo_admin',
          displayName: 'Demo User',
          email: 'user@demo.ug-elibrary.com'
        });
        
        // In demo mode, simulate reading a saved profile
        const storedProfile = localStorage.getItem('demo_user_profile');
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        } else {
          // If no profile, they need onboarding
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setCheckingAuth(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile(null); // No profile exists yet, needs onboarding
          }
        } catch (e) {
          console.error("Authentication verify error:", e);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
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

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If user is logged in but has no profile, force them to onboarding
  if (!userProfile && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }

  // If a specific role is required and user doesn't have it, redirect to home
  if (requireRole && userProfile && !requireRole.includes(userProfile.role)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 md:pl-64">
      {window.location.pathname !== '/onboarding' && <Sidebar userProfile={userProfile} />}
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
          path="/onboarding" 
          element={
            <ProtectedLayout>
              <Onboarding />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/library" 
          element={
            <ProtectedLayout requireRole={['student']}>
              <StudentLibrary />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/competitive" 
          element={
            <ProtectedLayout requireRole={['student']}>
              <CompetitiveExams />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/upload" 
          element={
            <ProtectedLayout requireRole={['teacher']}>
              <TeacherUpload />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedLayout requireRole={['student', 'teacher', 'admin']}>
              <ProfileSettings />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/colleges" 
          element={
            <ProtectedLayout requireRole={['admin']}>
              <CollegeManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/content" 
          element={
            <ProtectedLayout requireRole={['admin']}>
              <ContentManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/students" 
          element={
            <ProtectedLayout requireRole={['admin']}>
              <StudentManagement />
            </ProtectedLayout>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedLayout requireRole={['admin']}>
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
