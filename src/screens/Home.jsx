import { useNavigate } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUsers, HiOutlineClipboardDocumentCheck, HiOutlineBookOpen } from 'react-icons/hi2';
import NavItem from '../components/NavItem';

export default function Home() {
  const navigate = useNavigate();

  const startSession = (name, initials, color) => {
    navigate(`/chat/${encodeURIComponent(name)}/${initials}/${color}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between px-6 pt-4 text-xs text-gray-500">
        <span>9:41</span>
        <span>EAT ●●●</span>
      </div>

      <div className="flex-1 px-6 pt-4 pb-24 overflow-y-auto">
        {/* Greeting */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-sm text-gray-600">Good morning,</div>
            <div className="text-3xl font-serif">Amara</div>
          </div>
          <div className="w-11 h-11 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center text-lg font-semibold border-2 border-teal-200">
            AK
          </div>
        </div>

        {/* Crisis Banner */}
        <div 
          onClick={() => navigate('/crisis')}
          className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-4 items-center mb-6 cursor-pointer active:scale-[0.985]"
        >
          <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0 text-lg">
            🛟
          </div>
          <div className="flex-1">
            <div className="font-medium text-red-800 text-sm">Crisis support — available now</div>
            <div className="text-red-700 text-xs">Tap for immediate psychological first aid</div>
          </div>
          <div className="text-red-300 text-2xl">›</div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div onClick={() => navigate('/assessment')} className="bg-teal-50 border border-teal-200 rounded-2xl p-5 cursor-pointer active:scale-[0.98]">
            <HiOutlineClipboardDocumentCheck className="text-3xl mb-3 text-teal-600" />
            <div className="font-medium text-teal-900">Daily check-in</div>
            <div className="text-xs text-teal-700">Wellbeing screening</div>
          </div>
          <div onClick={() => navigate('/resources')} className="bg-green-50 border border-green-200 rounded-2xl p-5 cursor-pointer active:scale-[0.98]">
            <HiOutlineBookOpen className="text-3xl mb-3 text-green-600" />
            <div className="font-medium text-green-900">Resources</div>
            <div className="text-xs text-green-700">Support materials</div>
          </div>
        </div>

        {/* Available Experts */}
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-lg">Available experts</div>
          <div onClick={() => navigate('/experts')} className="text-teal-600 text-sm cursor-pointer">See all →</div>
        </div>

        {/* Expert Cards */}
        <div onClick={() => startSession('Dr. Nadia Kamau', 'NK', 'teal')} className="bg-white border border-gray-200 rounded-2xl p-4 mb-4 flex gap-4 cursor-pointer active:bg-gray-50">
          <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center text-xl font-semibold">NK</div>
          <div className="flex-1">
            <div className="flex justify-between">
              <div className="font-medium">Dr. Nadia Kamau</div>
              <span className="text-xs bg-teal-100 text-teal-800 px-3 py-1 rounded-full">Available</span>
            </div>
            <div className="text-sm text-gray-600 mt-1">Trauma & PTSD Specialist · Nairobi</div>
            <div className="text-amber-500 text-sm mt-1">★★★★★ <span className="text-gray-500 text-xs">4.9 • 128 sessions</span></div>
          </div>
        </div>

        {/* Upcoming Session */}
        <div className="font-semibold text-lg mb-3">Upcoming session</div>
        <div className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-4">
          <div className="w-12 h-12 bg-teal-600 text-white rounded-xl flex flex-col items-center justify-center text-xs">
            <div>Apr</div>
            <div className="text-2xl font-semibold -mt-1">3</div>
          </div>
          <div>
            <div className="font-medium">Debrief — Post-election coverage</div>
            <div className="text-sm text-gray-600 mt-1">Dr. Nadia Kamau • 2:00 PM EAT • Video</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 py-3 px-4 flex justify-around">
        <NavItem icon={HiOutlineHome} label="Home" active />
        <NavItem icon={HiOutlineUsers} label="Experts" onClick={() => navigate('/experts')} />
        <NavItem icon={HiOutlineClipboardDocumentCheck} label="Check-in" onClick={() => navigate('/assessment')} />
        <NavItem icon={HiOutlineBookOpen} label="Resources" onClick={() => navigate('/resources')} />
      </div>
    </div>
  );
}