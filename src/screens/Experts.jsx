import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft, HiOutlineHome, HiOutlineUsers, HiOutlineClipboardDocumentCheck, HiOutlineBookOpen } from 'react-icons/hi2';
import NavItem from '../components/NavItem';

const experts = [
  { id: 1, name: "Dr. Nadia Kamau", initials: "NK", color: "teal", specialty: "Trauma & PTSD · Nairobi, Kenya", status: "Available", rating: "4.9", sessions: "128" },
  { id: 2, name: "Okello Mugisha", initials: "OM", color: "amber", specialty: "Conflict Trauma · Kampala, Uganda", status: "In 1hr", rating: "4.8", sessions: "94" },
  { id: 3, name: "Amina Mwangi", initials: "AM", color: "coral", specialty: "Grief & Resilience · Dar es Salaam, TZ", status: "Tomorrow", rating: "4.7", sessions: "67" },
  { id: 4, name: "Dr. Jean-Pierre Habimana", initials: "JH", color: "green", specialty: "Genocide trauma · Kigali, Rwanda", status: "Available", rating: "5.0", sessions: "210" },
];

export default function Experts() {
  const navigate = useNavigate();

  const startSession = (name, initials, color) => {
    navigate(`/chat/${encodeURIComponent(name)}/${initials}/${color}`);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111110] flex flex-col">
      <div className="pt-4 px-6 flex items-center gap-4 border-b pb-4">
        <button onClick={() => navigate('/home')} className="w-9 h-9 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-full border text-xl"><HiOutlineChevronLeft className="w-5 h-5" /></button>
        <div className="font-serif text-2xl">Find an expert</div>
      </div>

      <div className="flex-1 px-6 pt-6 overflow-y-auto pb-20">
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {['All', 'PTSD', 'Conflict', 'Burnout', 'Grief', 'Anxiety'].map((filter, i) => (
            <div key={i} className={`px-5 py-2 whitespace-nowrap text-sm font-medium rounded-full border ${i === 0 ? 'bg-teal-600 text-white border-teal-600' : 'bg-white border-gray-200 dark:bg-zinc-900'}`}>
              {filter}
            </div>
          ))}
        </div>

        {experts.map(expert => (
          <div
            key={expert.id}
            onClick={() => startSession(expert.name, expert.initials, expert.color)}
            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 mb-4 cursor-pointer active:bg-gray-50"
          >
            <div className="flex gap-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold flex-shrink-0
                ${expert.color === 'teal' ? 'bg-teal-100 text-teal-800' : ''}
                ${expert.color === 'amber' ? 'bg-amber-100 text-amber-700' : ''}
                ${expert.color === 'coral' ? 'bg-coral-100 text-coral-700' : ''}
                ${expert.color === 'green' ? 'bg-green-100 text-green-800' : ''}`}>
                {expert.initials}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div className="font-medium text-[15px]">{expert.name}</div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium
                    ${expert.status === 'Available' ? 'bg-teal-100 text-teal-800' : ''}
                    ${expert.status.includes('hr') ? 'bg-amber-100 text-amber-700' : ''}
                    ${expert.status === 'Tomorrow' ? 'bg-coral-100 text-coral-700' : ''}`}>
                    {expert.status}
                  </span>
                </div>

                <div className="text-sm text-gray-600 mt-1">{expert.specialty}</div>

                <div className="text-amber-500 mt-2 text-sm">
                  ★★★★★ <span className="text-gray-500 text-xs"> {expert.rating} · {expert.sessions} sessions</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t py-3 px-4 flex justify-around">
        <NavItem icon={HiOutlineHome} label="Home" onClick={() => navigate('/home')} />
        <NavItem icon={HiOutlineUsers} label="Experts" active />
        <NavItem icon={HiOutlineClipboardDocumentCheck} label="Check-in" onClick={() => navigate('/assessment')} />
        <NavItem icon={HiOutlineBookOpen} label="Resources" onClick={() => navigate('/resources')} />
      </div>
    </div>
  );
}