
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

interface SubscriptionBasicFieldsProps {
  form: UseFormReturn<SubscriptionFormValues>;
}

export function SubscriptionBasicFields({ form }: SubscriptionBasicFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Subscription Name</FormLabel>
            <FormControl>
              <Input placeholder="Netflix" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
