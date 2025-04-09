
import React, { useState } from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function HeaderActions() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pl', name: 'Polski' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
  ];

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Globe className="h-5 w-5" />
            <span className="sr-only">{t('languages')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => setLanguage(lang.code as Language)}
              className={language === lang.code ? "font-bold bg-accent" : ""}
            >
              {lang.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="ghost" 
        size="icon" 
        onClick={toggleTheme}
        className="rounded-full"
      >
        {theme === 'light' ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Sun className="h-5 w-5" />
        )}
        <span className="sr-only">{t('darkMode')}</span>
      </Button>
    </div>
  );
}
