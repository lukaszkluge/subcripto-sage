
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { SubscriptionFormData } from "@/lib/types";
import { subscriptionFormSchema, SubscriptionFormValues } from "./form/SubscriptionFormSchema";
import { QuickSelectServices, createServiceSelectHandler } from "./form/QuickSelectServices";
import { SubscriptionBasicFields } from "./form/SubscriptionBasicFields";
import { SubscriptionPriceFields } from "./form/SubscriptionPriceFields";
import { SubscriptionCategoryFields } from "./form/SubscriptionCategoryFields";
import { SubscriptionDateFields } from "./form/SubscriptionDateFields";
import { SubscriptionNotificationFields } from "./form/SubscriptionNotificationFields";
import { SubscriptionActionButtons } from "./form/SubscriptionActionButtons";

interface AddSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (subscription: SubscriptionFormData) => void;
  initialData?: Partial<SubscriptionFormData>;
}

export default function AddSubscriptionModal({
  isOpen,
  onClose,
  onAdd,
  initialData,
}: AddSubscriptionModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const defaultValues: Partial<SubscriptionFormValues> = {
    name: "",
    price: 0,
    currency: "USD",
    billingCycle: "monthly",
    category: "entertainment",
    startDate: new Date().toISOString().split("T")[0],
    nextBillingDate: new Date().toISOString().split("T")[0],
    notifyDaysBefore: 5,
    ...initialData,
  };

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionFormSchema),
    defaultValues,
  });

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsLoading(true);
    try {
      onAdd(values as SubscriptionFormData);
      form.reset();
      onClose();
    } catch (error) {
      console.error("Error adding subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create the service selection handler
  const handleServiceSelect = createServiceSelectHandler(form.setValue);

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <QuickSelectServices onServiceSelect={handleServiceSelect} />
            <SubscriptionBasicFields form={form} />
            <SubscriptionPriceFields form={form} />
            <SubscriptionCategoryFields form={form} />
            <SubscriptionDateFields form={form} />
            <SubscriptionNotificationFields form={form} />
          </div>

          <SubscriptionActionButtons 
            onClose={onClose} 
            isLoading={isLoading} 
            isEdit={!!initialData} 
          />
        </form>
      </Form>
    </div>
  );
}
