
import { z } from "zod";

export const subscriptionFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Price must be greater than 0." }),
  currency: z.string().min(1, { message: "Please select a currency." }),
  billingCycle: z.enum(["monthly", "yearly", "weekly", "quarterly"], {
    message: "Please select a billing cycle.",
  }),
  category: z.enum(["entertainment", "fitness", "gaming", "productivity", "music", "other"], {
    message: "Please select a category.",
  }),
  startDate: z.string().min(1, { message: "Please select a start date." }),
  nextBillingDate: z.string().min(1, { message: "Please select the next billing date." }),
  notifyDaysBefore: z.coerce
    .number()
    .min(1, { message: "Notification days must be at least 1." })
    .max(30, { message: "Notification days can't be more than 30." }),
});

export type SubscriptionFormValues = z.infer<typeof subscriptionFormSchema>;
