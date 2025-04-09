
import React from 'react';
import Header from './Header';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-gray-800 text-foreground dark:text-gray-100 transition-colors duration-200">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
      <footer className="bg-white/80 dark:bg-gray-700/80 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-600/80 py-6 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500 dark:text-gray-300">
          <p>© {currentYear} MySubs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
