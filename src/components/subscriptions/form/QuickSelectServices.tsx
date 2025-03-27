
import React from "react";
import { Button } from "@/components/ui/button";
import { DefaultServices } from "@/lib/types";
import { UseFormSetValue } from "react-hook-form";
import { SubscriptionFormValues } from "./SubscriptionFormSchema";

interface QuickSelectServicesProps {
  onServiceSelect: (serviceName: string) => void;
}

export function QuickSelectServices({ onServiceSelect }: QuickSelectServicesProps) {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">Quick Select</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {DefaultServices.slice(0, 8).map((service) => (
          <Button 
            key={service.name}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onServiceSelect(service.name)}
            className="text-xs flex items-center gap-1"
          >
            {service.name}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function createServiceSelectHandler(
  setValue: UseFormSetValue<SubscriptionFormValues>
) {
  return (serviceName: string) => {
    const service = DefaultServices.find(s => s.name === serviceName);
    if (service) {
      setValue("name", service.name);
      setValue("category", service.category as any);
    }
  };
}
