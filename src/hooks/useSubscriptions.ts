
import { useState, useEffect } from 'react';
import { Subscription, SubscriptionFormData } from '@/lib/types';
import { generateUniqueId, getNextBillingDate } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const LOCAL_STORAGE_KEY = 'subscriptions';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load subscriptions from localStorage on initial mount
  useEffect(() => {
    const loadSubscriptions = () => {
      try {
        const savedSubscriptions = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedSubscriptions) {
          const parsed = JSON.parse(savedSubscriptions);
          // Convert string dates back to Date objects
          const formattedSubscriptions = parsed.map((sub: any) => ({
            ...sub,
            nextBillingDate: new Date(sub.nextBillingDate),
            startDate: new Date(sub.startDate)
          }));
          setSubscriptions(formattedSubscriptions);
        }
      } catch (error) {
        console.error('Error loading subscriptions:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load your subscriptions.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscriptions));
    }
  }, [subscriptions, isLoading]);

  // Check for upcoming renewals and show notifications
  useEffect(() => {
    const checkForNotifications = () => {
      const today = new Date();
      
      subscriptions.forEach(subscription => {
        const daysUntilRenewal = Math.ceil(
          (subscription.nextBillingDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
        );
        
        if (daysUntilRenewal === subscription.notifyDaysBefore) {
          toast({
            title: "Upcoming Renewal",
            description: `${subscription.name} will renew in ${daysUntilRenewal} days (${subscription.nextBillingDate.toLocaleDateString()})`,
          });
        }
      });
    };
    
    // Check on mount and then daily
    checkForNotifications();
    const intervalId = setInterval(checkForNotifications, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [subscriptions]);

  const addSubscription = (formData: SubscriptionFormData) => {
    try {
      const startDate = new Date(formData.startDate);
      const nextBillingDate = formData.nextBillingDate 
        ? new Date(formData.nextBillingDate)
        : getNextBillingDate(startDate, formData.billingCycle);
      
      const newSubscription: Subscription = {
        ...formData,
        id: generateUniqueId(),
        startDate,
        nextBillingDate,
      };
      
      setSubscriptions(prev => [...prev, newSubscription]);
      
      toast({
        title: "Subscription Added",
        description: `${newSubscription.name} has been added to your subscriptions.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding subscription:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add subscription.",
      });
      return false;
    }
  };

  const updateSubscription = (id: string, formData: SubscriptionFormData) => {
    try {
      const startDate = new Date(formData.startDate);
      const nextBillingDate = formData.nextBillingDate 
        ? new Date(formData.nextBillingDate) 
        : getNextBillingDate(startDate, formData.billingCycle);
      
      setSubscriptions(prev => 
        prev.map(sub => 
          sub.id === id 
            ? { ...formData, id, startDate, nextBillingDate } 
            : sub
        )
      );
      
      toast({
        title: "Subscription Updated",
        description: `${formData.name} has been updated.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error updating subscription:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update subscription.",
      });
      return false;
    }
  };

  const deleteSubscription = (id: string) => {
    try {
      const subscription = subscriptions.find(sub => sub.id === id);
      if (!subscription) return false;
      
      setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      
      toast({
        title: "Subscription Deleted",
        description: `${subscription.name} has been removed from your subscriptions.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting subscription:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete subscription.",
      });
      return false;
    }
  };

  return {
    subscriptions,
    isLoading,
    addSubscription,
    updateSubscription,
    deleteSubscription
  };
}
