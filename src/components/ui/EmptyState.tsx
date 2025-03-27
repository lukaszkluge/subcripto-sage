
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    to: string;
  };
}

export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-10 md:p-20 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm animate-fade-in">
      <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-8 max-w-md">{description}</p>
      
      {action && (
        <Link to={action.to}>
          <Button
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-5 h-auto font-medium shadow-md hover:shadow-lg transform hover:translate-y-[-2px] transition-all"
          >
            {action.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
