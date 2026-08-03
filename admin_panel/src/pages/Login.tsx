import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import { 
  School, FileText, BookOpen, MonitorPlay, 
  FileQuestion, PlayCircle, Loader2 
} from 'lucide-react';

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
      
      // We let App.tsx handle the routing logic based on whether they have a profile or not.
      navigate('/');
    } catch (err: any) {
      console.error("Authentication failed:", err);
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { text: 'Notes', icon: <FileText className="w-3.5 h-3.5" /> },
    { text: 'Books', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { text: 'PPTs', icon: <MonitorPlay className="w-3.5 h-3.5" /> },
    { text: 'Previous Papers', icon: <FileQuestion className="w-3.5 h-3.5" /> },
    { text: 'Video Lectures', icon: <PlayCircle className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] font-sans selection:bg-cyan-500/30">
      
      {/* Background Animated Particles/Circles */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
      
      {/* Light Particles Texture */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at center, white 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }}></div>
      
      {/* Login Card */}
      <div 
        className="relative z-10 w-[95%] md:w-[90%] lg:w-[450px] p-[40px] rounded-[24px] flex flex-col items-center"
        style={{
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.2)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
          animation: 'slideUpFade 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}
      >
        
        {/* Floating Logo */}
        <div className="relative mb-6" style={{ animation: 'float 3.5s ease-in-out infinite' }}>
          <div className="absolute inset-0 bg-blue-400/40 rounded-full blur-[16px]"></div>
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_0_24px_rgba(59,130,246,0.6)]">
            <School className="h-10 w-10" />
          </div>
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-[28px] lg:text-[36px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-cyan-300 mb-2 text-center tracking-tight leading-tight">
          UG eLibrary
        </h1>
        <p className="text-white/85 text-sm font-medium text-center mb-8 tracking-wide">
          India's Smart Digital Learning Platform
        </p>

        {/* Feature Section */}
        <div className="w-full flex flex-wrap justify-center gap-2.5 mb-10">
          {features.map((f, idx) => (
            <div 
              key={idx} 
              className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-full border border-white/10 text-white/90 text-xs font-semibold backdrop-blur-sm shadow-sm" 
              style={{ animation: `fadeInUp 0.5s ease-out ${0.2 + idx * 0.1}s both` }}
            >
              <div className="text-cyan-300 bg-white/10 p-0.5 rounded-full">{f.icon}</div>
              {f.text}
            </div>
          ))}
        </div>

        {error && (
          <div className="w-full mb-6 rounded-[14px] bg-rose-500/20 border border-rose-500/50 p-3.5 text-sm font-semibold text-rose-200 text-center backdrop-blur-sm shadow-lg animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        {/* Google Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          aria-label="Continue with Google"
          className="group relative flex w-full h-[56px] items-center justify-center gap-3 rounded-[16px] bg-white text-[16px] font-bold text-slate-800 shadow-[0_8px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-blue-400/50 disabled:opacity-80 disabled:hover:translate-y-0 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all duration-300 overflow-hidden"
          style={{ animation: 'fadeInUp 0.5s ease-out 0.8s both' }}
        >
          {/* Ripple effect overlay */}
          <div className="absolute inset-0 bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          
          <div className="relative flex items-center justify-center gap-3 w-full h-full">
            {loading ? (
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            ) : (
              <>
                <svg className="h-[22px] w-[22px]" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </div>
        </button>

        {/* Footer */}
        <div 
          className="mt-8 flex items-center justify-center gap-4 text-[12px] font-medium text-white/50"
          style={{ animation: 'fadeIn 0.5s ease-out 1s both' }}
        >
          <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-1 py-0.5">Privacy Policy</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-1 py-0.5">Terms</a>
          <span>•</span>
          <a href="#" className="hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 rounded px-1 py-0.5">Help Center</a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </div>
  );
}
