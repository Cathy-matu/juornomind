import { useNavigate, useParams } from 'react-router-dom';
import { HiOutlineHome, HiOutlineUsers, HiOutlineClipboardDocumentCheck, HiOutlineBookOpen, HiOutlineChevronLeft } from 'react-icons/hi2';
import NavItem from '../components/NavItem';
import { useState } from 'react';

export default function Resources() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const resources = [
    { category: "Briefing", tag: "Briefing", color: "teal", title: "Preparing mentally for conflict coverage", desc: "Evidence-based techniques for psychological readiness." },
    { category: "Briefing", tag: "Briefing", color: "teal", title: "Risk assessment framework for journalists", desc: "A comprehensive guide to evaluate hazards before deployment." },
    { category: "Field", tag: "Field tool", color: "amber", title: "Grounding techniques under stress", desc: "Quick exercises to regulate your nervous system." },
    { category: "Field", tag: "Field tool", color: "amber", title: "De-escalation tactics in volatile situations", desc: "Practical methods to stay safe during interviews." },
    { category: "Debrief", tag: "Debrief", color: "green", title: "Post-assignment self-debrief checklist", desc: "A structured 10-minute process." },
    { category: "Debrief", tag: "Debrief", color: "green", title: "Emotional processing after trauma exposure", desc: "Guided reflections to process difficult experiences." },
    { category: "Editors", tag: "Editor guide", color: "blue", title: "Supporting traumatized journalists", desc: "Best practices for editors managing affected staff." },
    { category: "Editors", tag: "Editor guide", color: "blue", title: "Newsroom mental health protocols", desc: "Implementing wellness initiatives for your team." },
  ];

  const filteredResources = selectedFilter === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedFilter);

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col">
      {/* Header */}
      <div className="pt-4 px-6 pb-4 flex items-center gap-4">
        <button onClick={() => navigate('/home')} className="text-2xl"><HiOutlineChevronLeft className="w-6 h-6" /></button>
        <div className="font-serif text-2xl font-semibold">Resources</div>
      </div>

      <div className="flex-1 px-6 overflow-y-auto pb-24">
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-6 scrollbar-hide">
          {['All', 'Briefing', 'Field', 'Debrief', 'Editors'].map((f, i) => (
            <button 
              key={i}
              onClick={() => setSelectedFilter(f)}
              className={`px-5 py-2 text-sm font-medium rounded-full whitespace-nowrap border transition-colors ${
                selectedFilter === f
                  ? 'bg-teal-600 text-white border-teal-600' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-teal-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Resource Cards */}
        {filteredResources.map((res, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-6 mb-4 hover:shadow-sm active:scale-[0.98] transition-all cursor-pointer">
            <span className={`inline-block text-xs font-medium px-4 py-1 rounded-full mb-4
              ${res.color === 'teal' ? 'bg-teal-100 text-teal-800' : ''}
              ${res.color === 'amber' ? 'bg-amber-100 text-amber-700' : ''}
              ${res.color === 'green' ? 'bg-green-100 text-green-800' : ''}
              ${res.color === 'blue' ? 'bg-blue-100 text-blue-800' : ''}`}>
              {res.tag}
            </span>
            <div className="font-medium text-[15px] mb-3 text-gray-900">{res.title}</div>
            <div className="text-sm text-gray-600 leading-relaxed">{res.desc}</div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t py-3 px-4 flex justify-around">
        <NavItem icon={HiOutlineHome} label="Home" onClick={() => navigate('/home')} />
        <NavItem icon={HiOutlineUsers} label="Experts" onClick={() => navigate('/experts')} />
        <NavItem icon={HiOutlineClipboardDocumentCheck} label="Check-in" onClick={() => navigate('/assessment')} />
        <NavItem icon={HiOutlineBookOpen} label="Resources" active />
      </div>
    </div>
  );
}