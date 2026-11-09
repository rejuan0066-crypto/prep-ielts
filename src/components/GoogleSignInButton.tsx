'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { decodeGoogleJwt, getGoogleClientId } from '@/lib/googleAuthHelper';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleSignInButtonProps {
  mode?: 'login' | 'register';
  className?: string;
  onSuccess?: () => void;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  mode = 'login',
  className = '',
  onSuccess
}) => {
  const router = useRouter();
  const { loginOrRegisterWithGoogle } = useAuth();
  const googleBtnContainerRef = useRef<HTMLDivElement>(null);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [gisLoaded, setGisLoaded] = useState(false);
  const [hasClientId, setHasClientId] = useState(false);

  // Load Google Identity Services SDK script
  useEffect(() => {
    const clientId = getGoogleClientId();
    setHasClientId(!!clientId);

    if (typeof window === 'undefined') return;

    if (window.google?.accounts?.id) {
      setGisLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setGisLoaded(true);
    };
    script.onerror = () => {
      console.warn('Google Identity Services script failed to load.');
    };
    document.body.appendChild(script);

    return () => {
      // cleanup script if unmounted
    };
  }, []);

  const handleCredentialResponse = (response: any) => {
    if (!response?.credential) {
      setErrorMsg('গুগল থেকে সাইন ইন রেসপন্স পাওয়া যায়নি।');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const payload = decodeGoogleJwt(response.credential);
      if (!payload || !payload.email) {
        throw new Error('অকার্যকর গুগল ক্রেডেনশিয়াল টোকেন');
      }

      const res = loginOrRegisterWithGoogle({
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        email: payload.email,
        avatar: payload.picture,
        googleId: payload.sub // Permanent Unique Google User ID
      });

      setLoading(false);

      if (res.success) {
        if (onSuccess) onSuccess();

        if (res.isNewUser) {
          router.push('/diagnostic');
        } else {
          try {
            const saved = localStorage.getItem('prep_ielts_user');
            const parsed = saved ? JSON.parse(saved) : null;
            if (!parsed?.diagnostic?.completed) {
              router.push('/diagnostic');
              return;
            }
          } catch (e) {}
          router.push('/dashboard');
        }
      } else {
        setErrorMsg(res.message || 'গুগল সাইন ইন সম্পন্ন হতে ব্যর্থ হয়েছে।');
      }
    } catch (err: any) {
      setLoading(false);
      setErrorMsg(err?.message || 'গুগল অ্যাকাউন্ট যাচাইয়ে সমস্যা হয়েছে।');
    }
  };

  // Render official Google button when GIS is ready and clientId is present
  useEffect(() => {
    const clientId = getGoogleClientId();
    if (!clientId || !gisLoaded || !window.google?.accounts?.id || !googleBtnContainerRef.current) {
      return;
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });

      // Clear container before rendering
      googleBtnContainerRef.current.innerHTML = '';

      window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        text: mode === 'register' ? 'signup_with' : 'signin_with',
        shape: 'pill',
        logo_alignment: 'left',
        width: 340
      });
    } catch (e) {
      console.error('Failed to render official Google button:', e);
    }
  }, [gisLoaded, hasClientId, mode]);

  // Fallback click handler if native button container isn't rendered or client ID needs setup
  const handleCustomButtonClick = () => {
    const clientId = getGoogleClientId();
    if (clientId && window.google?.accounts?.id) {
      // Trigger Google prompt directly
      window.google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If prompt blocked, guide to click rendered button
        }
      });
      return;
    }

    // If client ID is missing, provide a friendly setup modal / instructions
    const promptId = prompt(
      'গুগল ক্লাউড কনসোলের Google OAuth Client ID লিখুন (অথবা টেস্ট করতে আপনার জিমেইল দিন):',
      clientId || ''
    );
    if (promptId && promptId.trim()) {
      if (promptId.includes('.apps.googleusercontent.com')) {
        localStorage.setItem('prep_ielts_google_client_id', promptId.trim());
        setHasClientId(true);
        alert('গুগল ক্লায়েন্ট আইডি সংরক্ষিত হয়েছে! পৃষ্ঠাটি রিলোড হচ্ছে...');
        window.location.reload();
      } else if (promptId.includes('@')) {
        // Direct mock login for testing if user enters email
        const studentName = promptId.split('@')[0];
        loginOrRegisterWithGoogle({
          name: studentName,
          email: promptId.trim(),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(studentName)}&background=E11D48&color=fff`
        });
        router.push('/diagnostic');
      }
    }
  };

  return (
    <div className={`w-full flex flex-col items-center justify-center space-y-2 ${className}`}>
      
      {/* Official Google Button Container */}
      <div 
        ref={googleBtnContainerRef} 
        className="w-full flex items-center justify-center min-h-[44px]"
      >
        {/* Default button UI until GIS iframe mounts */}
        <button
          type="button"
          onClick={handleCustomButtonClick}
          disabled={loading}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-800 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all border border-slate-300 shadow-xs active:scale-[0.99] cursor-pointer"
        >
          <div className="w-4 h-4 shrink-0">
            <svg className="w-full h-full" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </div>
          <span>
            {loading 
              ? 'গুগল সংযোগ করা হচ্ছে...' 
              : mode === 'register' 
                ? 'Continue with Google' 
                : 'Sign in with Google'}
          </span>
        </button>
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-rose-900/60 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-bold flex items-center gap-1.5 w-full">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

    </div>
  );
};
