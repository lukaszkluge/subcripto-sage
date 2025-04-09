
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
    welcome: "Welcome to MySubs!",
    welcomeDescription: "Track all your subscriptions in one place. Get reminders before your billing cycles renew. Let MySubs gather the details you often forget – so you stay in control, effortlessly.",
    addNewSubscription: "Add New Subscription",
    upcomingRenewals: "Upcoming Renewals",
    noUpcomingRenewals: "No upcoming renewals",
    day: "day",
    days: "days",
    edit: "Edit",
    delete: "Delete",
    cancel: "Cancel",
    update: "Update",
    save: "Save",
    saving: "Saving...",
    editSubscription: "Edit Subscription",
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
    welcome: "Witaj w MySubs!",
    welcomeDescription: "Śledź wszystkie swoje subskrypcje w jednym miejscu. Otrzymuj przypomnienia przed odnowieniem cykli rozliczeniowych. Pozwól MySubs gromadzić szczegóły, o których często zapominasz – abyś pozostał w kontroli, bez wysiłku.",
    addNewSubscription: "Dodaj Nową Subskrypcję",
    upcomingRenewals: "Nadchodzące Odnowienia",
    noUpcomingRenewals: "Brak nadchodzących odnowień",
    day: "dzień",
    days: "dni",
    edit: "Edytuj",
    delete: "Usuń",
    cancel: "Anuluj",
    update: "Aktualizuj",
    save: "Zapisz",
    saving: "Zapisywanie...",
    editSubscription: "Edytuj Subskrypcję",
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
    welcome: "Willkommen bei MySubs!",
    welcomeDescription: "Verfolge alle deine Abonnements an einem Ort. Erhalte Erinnerungen bevor deine Abrechnungszyklen erneuert werden. Lass MySubs die Details sammeln, die du oft vergisst – damit du mühelos die Kontrolle behältst.",
    addNewSubscription: "Neues Abonnement hinzufügen",
    upcomingRenewals: "Anstehende Verlängerungen",
    noUpcomingRenewals: "Keine anstehenden Verlängerungen",
    day: "Tag",
    days: "Tage",
    edit: "Bearbeiten",
    delete: "Löschen",
    cancel: "Abbrechen",
    update: "Aktualisieren",
    save: "Speichern",
    saving: "Speichern...",
    editSubscription: "Abonnement bearbeiten",
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
    welcome: "¡Bienvenido a MySubs!",
    welcomeDescription: "Rastrea todas tus suscripciones en un solo lugar. Recibe recordatorios antes de que se renueven tus ciclos de facturación. Deja que MySubs recopile los detalles que a menudo olvidas, para que mantengas el control sin esfuerzo.",
    addNewSubscription: "Añadir Nueva Suscripción",
    upcomingRenewals: "Próximas Renovaciones",
    noUpcomingRenewals: "No hay próximas renovaciones",
    day: "día",
    days: "días",
    edit: "Editar",
    delete: "Eliminar",
    cancel: "Cancelar",
    update: "Actualizar",
    save: "Guardar",
    saving: "Guardando...",
    editSubscription: "Editar Suscripción",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check if language is stored in localStorage
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'en';
  });

  useEffect(() => {
    // Update localStorage when language changes
    localStorage.setItem('language', language);
  }, [language]);

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
