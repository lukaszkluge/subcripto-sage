
import React, { useState } from 'react';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import SubscriptionList from '@/components/subscriptions/SubscriptionList';
import Layout from '@/components/layout/Layout';
import { SubscriptionFormData } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddSubscriptionModal from '@/components/subscriptions/AddSubscriptionModal';
import { useLanguage } from '@/context/LanguageContext';

export default function Dashboard() {
  const { subscriptions, isLoading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { t } = useLanguage();

  const handleAdd = (formData: SubscriptionFormData) => {
    const success = addSubscription(formData);
    if (success) {
      setIsAddModalOpen(false);
    }
    return success;
  };

  const upcomingSubscriptions = [...subscriptions]
    .sort((a, b) => a.nextBillingDate.getTime() - b.nextBillingDate.getTime())
    .slice(0, 3);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">{t('welcome')}</h2>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('welcomeDescription')}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-md shadow-sm hover:shadow transform hover:translate-y-[-2px] transition-all"
                  >
                    {t('addNewSubscription')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="p-6 rounded-lg bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm border border-slate-200/50 dark:border-slate-600/50 shadow-sm h-full">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('upcomingRenewals')}</h3>
              {upcomingSubscriptions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSubscriptions.map((subscription) => {
                    const daysLeft = Math.ceil(
                      (subscription.nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <div
                        key={subscription.id}
                        className="flex justify-between items-center p-3 rounded-lg border border-gray-100 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900 dark:text-gray-100">{subscription.name}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {subscription.nextBillingDate.toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-md ${daysLeft <= 3 ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'
                          }`}>
                          {daysLeft} {daysLeft === 1 ? t('day') : t('days')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-sm">{t('noUpcomingRenewals')}</p>
              )}
            </div>
          </div>
        </div>

        <SubscriptionList
          subscriptions={subscriptions}
          onDelete={deleteSubscription}
          onUpdate={updateSubscription}
          isLoading={isLoading}
        />
      </div>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('addSubscription')}</DialogTitle>
          </DialogHeader>
          <AddSubscriptionModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAdd}
          />
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
