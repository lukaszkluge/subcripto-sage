
import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { SubscriptionFormValues } from "./SubscriptionFormSchema";

interface SubscriptionNotificationFieldsProps {
  form: UseFormReturn<SubscriptionFormValues>;
}

export function SubscriptionNotificationFields({ form }: SubscriptionNotificationFieldsProps) {
  return (
    <FormField
      control={form.control}
      name="notifyDaysBefore"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Notify Days Before</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="1"
              max="30"
              placeholder="5"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
