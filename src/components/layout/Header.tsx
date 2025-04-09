
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import HeaderActions from './HeaderActions';
import { useLanguage } from '@/context/LanguageContext';

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/80 dark:border-slate-700/80">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
            MySubs
            </span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive('/')}>
            {t('dashboard')}
          </NavLink>
          <NavLink to="/add" active={isActive('/add')}>
            {t('addSubscription')}
          </NavLink>
        </nav>
        
        <div className="flex items-center space-x-4">
          <HeaderActions />
          <Link
            to="/add"
            className="md:hidden bg-primary text-white rounded-md w-10 h-10 flex items-center justify-center shadow-sm hover:shadow transform hover:translate-y-[-1px] transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={cn(
        "relative px-2 py-1 text-sm font-medium transition-colors",
        "before:absolute before:bottom-0 before:left-0 before:h-0.5 before:w-full before:origin-center before:scale-x-0 before:bg-primary before:transition-transform before:duration-300",
        "hover:text-primary hover:before:scale-x-100",
        active ? "text-primary before:scale-x-100" : "text-gray-600 dark:text-gray-300"
      )}
    >
      {children}
    </Link>
  );
}
