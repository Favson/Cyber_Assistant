import React from 'react';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center space-y-4">
        <div className="flex items-center space-x-2 text-slate-400">
          <Shield className="w-5 h-5" />
          <span className="font-semibold">CyberSafe AI</span>
        </div>
        <p className="text-sm text-slate-500 max-w-md">
          Built for cybersecurity awareness. This tool is for educational purposes and helps beginners understand online safety.
        </p>
      </div>
    </footer>
  );
}
