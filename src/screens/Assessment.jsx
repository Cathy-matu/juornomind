import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlineChevronLeft, HiOutlineCheckCircle, HiOutlineHome, HiOutlineUsers, HiOutlineClipboardDocumentCheck, HiOutlineBookOpen } from 'react-icons/hi2';
import NavItem from '../components/NavItem';

const API_URL = import.meta.env.VITE_API_URL || '';

const QUESTIONS = [
  "Over the past week, how often have you had unwanted memories or flashbacks of distressing events you covered?",
  "Have you been avoiding thoughts, feelings, or reminders related to your work?",
  "Have you felt emotionally numb or detached from people around you?",
  "Have you had trouble sleeping or concentrating since your last assignment?",
  "Have you felt irritable, on edge, or easily startled in the past week?"
];

const OPTIONS = ["Never", "Rarely", "Sometimes", "Often", "Almost always"];

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const progress = Math.round(((step + 1) / QUESTIONS.length) * 100);

  const handleAnswer = async (answerValue) => {
    const newAnswers = [...answers, answerValue];
    setAnswers(newAnswers);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      // Submit assessment
      await submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${API_URL}/api/assessment`,
        { answers: finalAnswers },
        { timeout: 10000 }
      );
      setResult(response.data);
      setCompleted(true);
    } catch (err) {
      console.error('Assessment submission error:', err);
      
      const serverDetail = err.response?.data?.message || err.message;
      
      const errorMsg = !API_URL && !window.location.hostname.includes('localhost')
        ? 'API Configuration missing. Please set VITE_API_URL in your environment.'
        : err.response?.status === 400 
        ? 'Invalid answers. Please ensure all questions are answered.'
        : err.code === 'ECONNABORTED' 
        ? 'Connection timeout. Backend may be unavailable.'
        : `Failed to submit assessment. Backend reachable: ${API_URL || 'http://localhost:8000'}. Root cause: ${serverDetail}`;
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setCompleted(false);
    setResult(null);
    setError(null);
  };

  if (completed && result) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col p-6">
        <button onClick={() => navigate('/home')} className="text-2xl mb-8"><HiOutlineChevronLeft className="w-6 h-6" /></button>
        
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="mx-auto w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6">
            <HiOutlineCheckCircle className="text-4xl text-teal-600" />
          </div>
          <h2 className="font-serif text-3xl font-semibold mb-3 text-gray-900">Check-in complete</h2>
          <p className="text-gray-600 max-w-xs mx-auto mb-6 leading-relaxed">
            {result.recommendation}
          </p>
          {result.score !== null && (
            <div className="text-sm text-gray-500">
              Your wellness score: <span className="font-semibold text-teal-600">{result.score}/20</span>
            </div>
          )}
        </div>

        {result.should_connect_expert && (
          <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 mb-6">
            <div className="font-semibold text-teal-900 mb-2">Next steps</div>
            <p className="text-sm text-teal-700 leading-relaxed">Connect with one of our trauma specialists for personalized support.</p>
          </div>
        )}

        <div className="space-y-3">
          <button 
            onClick={() => navigate('/experts')} 
            className="w-full bg-teal-600 text-white py-4 rounded-2xl font-medium hover:bg-teal-700 active:scale-95 transition-all"
          >
            {result.should_connect_expert ? 'Connect with an expert' : 'View experts'}
          </button>
          <button 
            onClick={reset}
            className="w-full border-2 border-teal-300 text-teal-600 py-4 rounded-2xl font-medium hover:bg-teal-50 active:scale-95 transition-all"
          >
            Take again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col p-6 pb-24">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/home')} className="text-2xl hover:opacity-70 transition-opacity"><HiOutlineChevronLeft className="w-6 h-6" /></button>
        <div className="font-serif text-2xl font-semibold text-gray-900">Wellbeing check-in</div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Progress Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium text-gray-600">Question {step + 1} of {QUESTIONS.length}</span>
          <span className="text-sm font-semibold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-teal-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <p className="text-lg leading-relaxed font-medium text-gray-900 mb-8">{QUESTIONS[step]}</p>

      {/* Options */}
      <div className="flex-1 space-y-3">
        {OPTIONS.map((option, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            disabled={loading}
            className="w-full bg-white border border-gray-200 rounded-2xl p-5 text-left font-medium text-gray-700 hover:border-teal-300 hover:shadow-sm active:bg-teal-50 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {option}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="mt-6 text-center">
          <div className="inline-flex">
            <div className="w-5 h-5 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="mt-3 text-sm text-gray-500">Processing your response...</p>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 py-3 px-4 flex justify-around">
        <NavItem icon={HiOutlineHome} label="Home" onClick={() => navigate('/home')} />
        <NavItem icon={HiOutlineUsers} label="Experts" onClick={() => navigate('/experts')} />
        <NavItem icon={HiOutlineClipboardDocumentCheck} label="Check-in" active />
        <NavItem icon={HiOutlineBookOpen} label="Resources" onClick={() => navigate('/resources')} />
      </div>
    </div>
  );
}