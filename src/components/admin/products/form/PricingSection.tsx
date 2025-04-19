
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface PricingSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  selectedType: string;
}

const formSchema = z.object({
  daily_price: z.string().optional(),
  sale_price: z.string().optional(),
});

export const PricingSection = ({ form, selectedType }: PricingSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {selectedType !== 'vente' && (
        <FormField
          control={form.control}
          name="daily_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix journalier (€)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

      {selectedType !== 'location' && (
        <FormField
          control={form.control}
          name="sale_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prix de vente (€)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};
