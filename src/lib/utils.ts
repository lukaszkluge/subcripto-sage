import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Subscription } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export function getDaysRemaining(targetDate: Date): number {
  const currentDate = new Date();
  
  // Reset hours to compare just the dates
  currentDate.setHours(0, 0, 0, 0);
  const targetCopy = new Date(targetDate);
  targetCopy.setHours(0, 0, 0, 0);
  
  const differenceMs = targetCopy.getTime() - currentDate.getTime();
  return Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
}

export function getNextBillingDate(startDate: Date, billingCycle: Subscription['billingCycle']): Date {
  const now = new Date();
  const result = new Date(startDate);
  
  const addDuration = () => {
    switch (billingCycle) {
      case 'weekly':
        result.setDate(result.getDate() + 7);
        break;
      case 'monthly':
        result.setMonth(result.getMonth() + 1);
        break;
      case 'quarterly':
        result.setMonth(result.getMonth() + 3);
        break;
      case 'yearly':
        result.setFullYear(result.getFullYear() + 1);
        break;
    }
  };

  // Keep adding the duration until the date is in the future
  while (result <= now) {
    addDuration();
  }
  
  return result;
}

export function calculateYearlyCost(subscriptions: Subscription[]): number {
  return subscriptions.reduce((total, sub) => {
    let multiplier;
    switch (sub.billingCycle) {
      case 'weekly':
        multiplier = 52;
        break;
      case 'monthly':
        multiplier = 12;
        break;
      case 'quarterly':
        multiplier = 4;
        break;
      case 'yearly':
        multiplier = 1;
        break;
      default:
        multiplier = 12;
    }
    return total + (sub.price * multiplier);
  }, 0);
}

export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function groupSubscriptionsByCategory(subscriptions: Subscription[]): Record<string, Subscription[]> {
  return subscriptions.reduce((acc, subscription) => {
    const { category } = subscription;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(subscription);
    return acc;
  }, {} as Record<string, Subscription[]>);
}
