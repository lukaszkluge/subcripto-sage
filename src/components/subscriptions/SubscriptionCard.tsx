
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Subscription, CategoryColors } from '@/lib/types';
import { formatCurrency, formatDate, getDaysRemaining } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/context/LanguageContext';

interface SubscriptionCardProps {
  subscription: Subscription;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function SubscriptionCard({ subscription, onEdit, onDelete }: SubscriptionCardProps) {
  const {
    id,
    name,
    price,
    currency,
    billingCycle,
    nextBillingDate,
    category,
  } = subscription;

  const { t } = useLanguage();
  const daysRemaining = getDaysRemaining(nextBillingDate);
  const isRenewingSoon = daysRemaining <= subscription.notifyDaysBefore;

  return (
    <Card className="overflow-hidden transform hover:translate-y-[-2px] transition-all duration-300 glass-card animate-scale-in">
      <div 
        className="h-2" 
        style={{ backgroundColor: CategoryColors[category as keyof typeof CategoryColors] }}
      />
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <div className="inline-flex items-center mb-1">
              <span className="text-xs font-medium py-0.5 px-2 rounded-full bg-blue-50 text-blue-700 mr-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </span>
              {isRenewingSoon && (
                <span className="text-xs py-0.5 px-2 rounded-full bg-yellow-50 text-yellow-700 animate-pulse">
                  {t('renewingSoon')}
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <div className="mt-1 text-sm text-gray-500">
              {formatCurrency(price, currency)} / {billingCycle}
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="min-w-[140px] z-50 bg-white shadow-lg rounded-lg border border-gray-200">
              <DropdownMenuLabel>{t('actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onEdit(id)}>{t('edit')}</DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDelete(id)}
                className="text-red-600 focus:text-red-600"
              >
                {t('delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100 text-sm">
          <div className="flex justify-between mb-1">
            <span className="text-gray-500">{t('nextPayment')}:</span>
            <span className="font-medium text-gray-900">{formatDate(nextBillingDate)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">{t('remaining')}:</span>
            <span className={`font-medium ${daysRemaining <= 3 ? 'text-red-600' : 'text-gray-900'}`}>
              {daysRemaining} {daysRemaining === 1 ? t('day') : t('days')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
