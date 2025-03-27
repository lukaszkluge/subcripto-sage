
import React, { useState } from 'react';
import { useSubscriptions } from '@/hooks/useSubscriptions';
import SubscriptionList from '@/components/subscriptions/SubscriptionList';
import Layout from '@/components/layout/Layout';
import { SubscriptionFormData } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AddSubscriptionModal from '@/components/subscriptions/AddSubscriptionModal';

export default function Dashboard() {
  const { subscriptions, isLoading, addSubscription, updateSubscription, deleteSubscription } = useSubscriptions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

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
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome to SubscriptoSage</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  Track all your subscriptions in one place. Get reminders before your billing cycles renew.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow transform hover:translate-y-[-2px] transition-all"
                  >
                    Add New Subscription
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm h-full">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Renewals</h3>
              {upcomingSubscriptions.length > 0 ? (
                <div className="space-y-3">
                  {upcomingSubscriptions.map((subscription) => {
                    const daysLeft = Math.ceil(
                      (subscription.nextBillingDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                    );
                    return (
                      <div
                        key={subscription.id}
                        className="flex justify-between items-center p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{subscription.name}</p>
                          <p className="text-sm text-gray-500">
                            {subscription.nextBillingDate.toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                          daysLeft <= 3 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {daysLeft} {daysLeft === 1 ? 'day' : 'days'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No upcoming renewals</p>
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
            <DialogTitle>Add Subscription</DialogTitle>
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
