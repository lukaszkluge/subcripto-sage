
import React, { useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import { Subscription } from '@/lib/types';
import EmptyState from '@/components/ui/EmptyState';
import { calculateYearlyCost, formatCurrency, groupSubscriptionsByCategory } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddSubscriptionModal from './AddSubscriptionModal';
import { useLanguage } from '@/context/LanguageContext';

interface SubscriptionListProps {
  subscriptions: Subscription[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: any) => void;
  isLoading?: boolean;
}

export default function SubscriptionList({
  subscriptions,
  onDelete,
  onUpdate,
  isLoading = false
}: SubscriptionListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
const { t } = useLanguage();
  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingId(null);
  };

  const handleUpdate = (data: any) => {
    if (editingId) {
      onUpdate(editingId, data);
      handleCloseEditModal();
    }
  };

  const subscriptionToEdit = editingId ? subscriptions.find(sub => sub.id === editingId) : null;

  const yearlyCost = calculateYearlyCost(subscriptions);
  const monthlyCost = yearlyCost / 12;

  const groupedSubscriptions = groupSubscriptionsByCategory(subscriptions);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="h-48 bg-gray-100 rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (subscriptions.length === 0) {
    return (
      <EmptyState
        title={t('noSubscriptions')}
        description={t('addYourFirst')}
        action={{
          label: t('addSubscription'),
          to: "/add",
        }}
      />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 p-5 rounded-xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{t('yourSubscriptions')}</h2>
          <p className="text-sm text-gray-500 mt-1">
            {t('tracking')} {subscriptions.length} {subscriptions.length === 1 ? t('subscription') : t('subscriptions')}
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">{t('monthly')}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(monthlyCost)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">{t('yearly')}</p>
            <p className="text-xl font-bold text-gray-900">{formatCurrency(yearlyCost)}</p>
          </div>
        </div>
      </div>

      {Object.entries(groupedSubscriptions).map(([category, subs]) => (
        <div key={category} className="space-y-4">
          <h3 className="text-md font-medium text-gray-800 capitalize">
            {category} <span className="text-gray-500 text-sm">({subs.length})</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subs.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
                onEdit={handleEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      ))}

      {isEditModalOpen && subscriptionToEdit && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{t('editSubscription')}</DialogTitle>
            </DialogHeader>
            <AddSubscriptionModal
              isOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              onAdd={handleUpdate}
  initialData={{
    ...subscriptionToEdit,
    // Convert dates to strings for the form
    nextBillingDate: subscriptionToEdit?.nextBillingDate instanceof Date
      ? subscriptionToEdit.nextBillingDate.toISOString().split('T')[0]
      : typeof subscriptionToEdit?.nextBillingDate === 'string'
      ? (subscriptionToEdit.nextBillingDate as string).split('T')[0]
      : undefined,
    startDate: subscriptionToEdit?.startDate instanceof Date
      ? subscriptionToEdit.startDate.toISOString().split('T')[0]
      : typeof subscriptionToEdit?.startDate === 'string'
      ? (subscriptionToEdit.startDate as string).split('T')[0]
      : undefined,
  }}
/>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
