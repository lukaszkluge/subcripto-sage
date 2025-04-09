
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type Language = 'en' | 'pl' | 'de' | 'es';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations = {
  en: {
    dashboard: "Dashboard",
    addSubscription: "Add Subscription",
    yourSubscriptions: "Your Subscriptions",
    monthly: "Monthly",
    yearly: "Yearly",
    noSubscriptions: "No subscriptions yet",
    addYourFirst: "Add your first subscription to start tracking your expenses.",
    tracking: "You're tracking",
    subscriptions: "subscriptions",
    subscription: "subscription",
    languages: "Languages",
    darkMode: "Dark Mode",
  },
  pl: {
    dashboard: "Panel",
    addSubscription: "Dodaj Subskrypcję",
    yourSubscriptions: "Twoje Subskrypcje",
    monthly: "Miesięcznie",
    yearly: "Rocznie",
    noSubscriptions: "Brak subskrypcji",
    addYourFirst: "Dodaj swoją pierwszą subskrypcję, aby zacząć śledzenie wydatków.",
    tracking: "Śledzisz",
    subscriptions: "subskrypcji",
    subscription: "subskrypcję",
    languages: "Języki",
    darkMode: "Tryb Ciemny",
  },
  de: {
    dashboard: "Dashboard",
    addSubscription: "Abo hinzufügen",
    yourSubscriptions: "Deine Abonnements",
    monthly: "Monatlich",
    yearly: "Jährlich",
    noSubscriptions: "Noch keine Abonnements",
    addYourFirst: "Füge dein erstes Abonnement hinzu, um deine Ausgaben zu verfolgen.",
    tracking: "Du verfolgst",
    subscriptions: "Abonnements",
    subscription: "Abonnement",
    languages: "Sprachen",
    darkMode: "Dunkelmodus",
  },
  es: {
    dashboard: "Panel",
    addSubscription: "Añadir Suscripción",
    yourSubscriptions: "Tus Suscripciones",
    monthly: "Mensual",
    yearly: "Anual",
    noSubscriptions: "Aún no hay suscripciones",
    addYourFirst: "Añade tu primera suscripción para comenzar a seguir tus gastos.",
    tracking: "Estás siguiendo",
    subscriptions: "suscripciones",
    subscription: "suscripción",
    languages: "Idiomas",
    darkMode: "Modo Oscuro",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
