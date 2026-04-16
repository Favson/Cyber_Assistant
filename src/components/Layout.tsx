import React from 'react';
import { Navbar, PageType } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  activePage: PageType;
  setActivePage: (page: PageType) => void;
}

export function Layout({ children, activePage, setActivePage }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {children}
      </main>
      <Footer />
    </div>
  );
}
