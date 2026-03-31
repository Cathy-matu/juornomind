import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi2';

const roles = [
  { id: 'field', label: 'Field Journalist', desc: 'Covering events on the ground — conflict, crime, disasters' },
  { id: 'editor', label: 'Editor / Newsroom Manager', desc: 'Managing teams covering traumatic events' },
  { id: 'photo', label: 'Photojournalist / Videographer', desc: 'Visual documentation of events' },
  { id: 'student', label: 'Student / Trainee Journalist', desc: 'Learning the craft in a media programme' },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  return (
    <div className="min-h-screen bg-[#FAFAF8] dark:bg-[#111110]">
      <div className="pt-4 px-6">
        <button onClick={() => navigate('/')} className="w-9 h-9 flex items-center justify-center bg-white dark:bg-zinc-800 rounded-full border border-gray-200 dark:border-gray-700"><HiOutlineChevronLeft className="w-5 h-5" /></button>
      </div>

      <div className="px-6 pt-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">Select your role so we can tailor your experience.</p>

        {roles.map(role => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`p-5 mb-4 rounded-2xl border cursor-pointer transition-all ${
              selectedRole === role.id 
                ? 'border-[#1D9E75] bg-[#E1F5EE] dark:bg-teal-950' 
                : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-zinc-900'
            }`}
          >
            <div className="font-medium text-[15px] mb-1">{role.label}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{role.desc}</div>
          </div>
        ))}

        <button
          onClick={() => navigate('/home')}
          disabled={!selectedRole}
          className="mt-8 w-full bg-[#1D9E75] disabled:bg-gray-300 text-white py-4 rounded-2xl font-medium text-[15px] active:scale-[0.98] transition-all"
        >
          Continue
        </button>
      </div>
    </div>
  );
}