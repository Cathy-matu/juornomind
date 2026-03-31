import { useNavigate } from 'react-router-dom';
import { HiOutlineShieldCheck } from 'react-icons/hi2';

export default function Splash() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-end px-7 pb-10 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute w-[280px] h-[280px] bg-[#1D9E75] rounded-full blur-[60px] opacity-35 -top-16 -right-20" />
      <div className="absolute w-[200px] h-[200px] bg-[#9FE1CB] rounded-full blur-[60px] opacity-25 top-20 -left-16" />

      <div className="relative z-10">
        {/* Logo */}
        <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-xl border border-white/20 flex items-center justify-center mb-6">
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="13" r="5" fill="white" />
            <path d="M7 28c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M17 28v-4M13 26h8" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>

        <h1 className="text-5xl leading-none font-serif text-[#1a1a18] dark:text-white mb-3">
          JournoMind<br /><span className="text-[#1D9E75]">Connect</span>
        </h1>

        <p className="text-[15px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-[320px] mb-10">
          Confidential psychosocial support for journalists across East Africa — before, during, and after the story.
        </p>

        <button
          onClick={() => navigate('/onboarding')}
          className="w-full bg-[#1D9E75] hover:bg-[#0F6E56] text-white py-4 rounded-xl font-medium text-[15px] active:scale-95 transition-all"
          aria-label="Get started with JournoMind"
        >
          Get started
        </button>

        <button
          onClick={() => navigate('/home')}
          className="w-full border-2 border-[#5DCAA5] text-[#1D9E75] hover:bg-[#E1F5EE] py-4 rounded-xl font-medium text-[15px] mt-3 active:scale-95 transition-all"
          aria-label="Sign in to your account"
        >
          Sign in
        </button>

        <div className="flex items-center gap-2 mt-8 justify-center text-xs text-gray-500">
          <HiOutlineShieldCheck className="w-4 h-4" />
          <span>Your identity is always protected. All sessions are anonymous by default.</span>
        </div>
      </div>
    </div>
  );
}