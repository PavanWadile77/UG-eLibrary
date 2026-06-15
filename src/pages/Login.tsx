import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Sparkles, School, PlayCircle } from 'lucide-react';
import { auth, db, isFirebaseDemo } from '../firebase';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // Bootstrap Admin State
  const [isBootstrap, setIsBootstrap] = useState(false);
  const [secretKey, setSecretKey] = useState('');

  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    setSuccess('');
    setLoading(true);

    if (isFirebaseDemo) {
      // Local Demo Mode Login
      localStorage.setItem('demo_admin_logged_in', 'true');
      setSuccess('Logged in successfully in local Demo Mode!');
      setTimeout(() => {
        navigate('/');
      }, 500);
      setLoading(false);
      return;
    }

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (isBootstrap) {
        // Bootstrap flow
        const expectedSecret = import.meta.env.VITE_ADMIN_PANEL_SECRET || "admin123";
        if (secretKey !== expectedSecret) {
          setError("Invalid Administrative Secret Key!");
          await auth.signOut();
          setLoading(false);
          return;
        }

        // Write Admin Profile to Firestore
        await setDoc(userDocRef, {
          userId: user.uid,
          name: user.displayName || 'System Admin',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          role: 'admin',
          dteCode: '',
          collegeName: 'System Administration',
          branch: '',
          year: '',
          status: 'approved',
          createdAt: new Date().toISOString()
        });

        setSuccess('Admin account bootstrapped successfully! You can now log in.');
        setIsBootstrap(false);
        setSecretKey('');
      } else {
        // Standard User Login
        // We let App.tsx handle the routing logic based on whether they have a profile or not.
        navigate('/');
      }
    } catch (err: any) {
      console.error("Authentication failed:", err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    setError('');
    setSuccess('');
    setLoading(true);
    localStorage.setItem('demo_admin_logged_in', 'true');
    setSuccess('Logged in successfully in testing Demo Mode!');
    setTimeout(() => {
      navigate('/');
    }, 500);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-blue-950 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/30">
            <School className="h-8 w-8" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-slate-900">UG eLibrary</h1>
          <p className="mt-1 text-sm text-slate-500">
            {isFirebaseDemo 
              ? 'Local Demo Mode (No Firebase)' 
              : isBootstrap 
                ? 'Bootstrap Administrative Console' 
                : 'Sign in to your Account'}
          </p>
        </div>

        {isFirebaseDemo && (
          <div className="mb-6 rounded-xl bg-blue-50 border border-blue-100 p-4 text-xs font-semibold text-blue-700 text-center">
            Demo Mode Active: Authentications will fall back to local browser storage automatically.
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg bg-green-50 p-4 text-sm font-semibold text-green-600">
            {success}
          </div>
        )}

        <div className="space-y-4">
          {isBootstrap && !isFirebaseDemo && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700">Admin Secret Key</label>
              <div className="relative mt-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Sparkles className="h-5 w-5" />
                </span>
                <input
                  type="password"
                  required
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter secret passcode"
                />
              </div>
              <span className="text-xs text-slate-500 mt-1 block">Matches ADMIN_PANEL_SECRET variable</span>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading || (isBootstrap && !secretKey && !isFirebaseDemo)}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:bg-blue-700 focus:outline-none disabled:bg-blue-400 transition-colors"
          >
            {loading ? (
              'Processing...'
            ) : (
              <>
                <svg className="h-5 w-5 fill-current bg-white rounded-full p-0.5 text-blue-600" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>{isFirebaseDemo ? 'Sign in with Demo' : isBootstrap ? 'Bootstrap with Google' : 'Continue with Google'}</span>
              </>
            )}
          </button>

          {!isFirebaseDemo && (
            <button
              onClick={handleDemoSignIn}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <PlayCircle className="h-5 w-5 text-slate-400" />
              <span>Demo Login (Testing Fallback)</span>
            </button>
          )}
        </div>

        {!isFirebaseDemo && (
          <div className="mt-6 border-t border-slate-200 pt-6 text-center">
            <button
              onClick={() => {
                setIsBootstrap(!isBootstrap);
                setError('');
                setSuccess('');
                setSecretKey('');
              }}
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              {isBootstrap ? 'Back to standard Sign In' : 'Set up first administrator account'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
