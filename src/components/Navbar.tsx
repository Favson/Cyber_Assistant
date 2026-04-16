import React from 'react';
import { Shield, Home, Mail, Key, Share2, HelpCircle, Briefcase, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Button } from './ui/Button';

export type PageType = 'home' | 'phishing' | 'password' | 'social' | 'assistant' | 'careers';

interface NavbarProps {
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Navbar({ activePage, setActivePage }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4 mr-2" /> },
    { id: 'phishing', label: 'Phishing Detector', icon: <Mail className="w-4 h-4 mr-2" /> },
    { id: 'password', label: 'Password Checker', icon: <Key className="w-4 h-4 mr-2" /> },
    { id: 'social', label: 'Social Media Safety', icon: <Share2 className="w-4 h-4 mr-2" /> },
    { id: 'assistant', label: 'Am I Safe?', icon: <HelpCircle className="w-4 h-4 mr-2" /> },
    { id: 'careers', label: 'Cyber Careers', icon: <Briefcase className="w-4 h-4 mr-2" /> },
  ];

  const handleNavClick = (id: PageType) => {
    setActivePage(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-900">CyberSafe AI</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? 'default' : 'ghost'}
              className={cn(
                "rounded-full px-4",
                activePage === item.id ? "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-none" : "text-slate-600"
              )}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activePage === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start rounded-xl",
                activePage === item.id ? "bg-blue-50 text-blue-700 hover:bg-blue-100 shadow-none" : "text-slate-600"
              )}
              onClick={() => handleNavClick(item.id)}
            >
              {item.icon}
              {item.label}
            </Button>
          ))}
        </div>
      )}
    </nav>
  );
}
