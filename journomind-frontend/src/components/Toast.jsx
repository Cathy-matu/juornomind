import { useState, useEffect } from 'react';

export default function Toast({ message, type = 'info', duration = 3000, onClose }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const bgColor = {
    info: 'bg-blue-100 text-blue-800 border-blue-300',
    success: 'bg-green-100 text-green-800 border-green-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    warning: 'bg-amber-100 text-amber-800 border-amber-300',
  }[type];

  return (
    <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg border ${bgColor} text-sm font-medium max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-5`}>
      {message}
    </div>
  );
}
