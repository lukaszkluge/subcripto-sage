
import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
      <footer className="bg-white/80 backdrop-blur-md border-t border-slate-200/80 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} MySubs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
