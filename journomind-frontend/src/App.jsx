import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';

import Splash from './screens/Splash';
import Onboarding from './screens/Onboarding';
import Home from './screens/Home';
import Experts from './screens/Experts';
import Chat from './screens/Chat';
import Assessment from './screens/Assessment';
import Resources from './screens/Resources';
import Crisis from './screens/Crisis';

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <div className="max-w-[430px] mx-auto min-h-screen bg-[#FAFAF8] dark:bg-[#111110] overflow-hidden">
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/chat/:expertName/:initials/:color" element={<Chat />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/crisis" element={<Crisis />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;