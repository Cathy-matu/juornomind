import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

export default function Crisis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAF8] p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/home')} className="text-3xl"><HiOutlineChevronLeft className="w-8 h-8" /></button>
        <div className="font-serif text-2xl">Crisis support</div>
      </div>

      <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-10 text-center mb-8">
        <div className="text-6xl mb-6">🛟</div>
        <div className="font-serif text-2xl text-red-900 mb-3">You are not alone</div>
        <p className="text-red-700 leading-relaxed">
          A trained crisis counselor is available to speak with you right now, fully anonymously and confidentially.
        </p>
      </div>

      <button 
        onClick={() => navigate('/chat/Crisis%20Counselor/CC/coral')}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-5 rounded-2xl font-medium text-lg active:scale-95 transition-all"
      >
        Connect to crisis counselor now
      </button>

      <p className="text-center text-xs text-gray-500 mt-4 mb-10">Average wait time: under 3 minutes</p>

      <div className="text-lg font-medium mb-5">Immediate self-help</div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="font-medium mb-2">5-4-3-2-1 grounding</div>
          <div className="text-sm text-gray-600">Notice <b>5</b> things you see · <b>4</b> things you touch · <b>3</b> you hear · <b>2</b> you smell · <b>1</b> you taste.</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="font-medium mb-2">Box breathing</div>
          <div className="text-sm text-gray-600">Inhale 4 sec → Hold 4 sec → Exhale 4 sec → Hold 4 sec. Repeat 4–6 times.</div>
        </div>
      </div>
    </div>
  );
}