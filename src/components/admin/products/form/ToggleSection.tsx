
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

interface ToggleSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const formSchema = z.object({
  available: z.boolean(),
  featured: z.boolean(),
});

export const ToggleSection = ({ form }: ToggleSectionProps) => {
  return (
    <div className="flex justify-between">
      <FormField
        control={form.control}
        name="available"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2">
            <FormLabel>Disponible</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="featured"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between space-x-2">
            <FormLabel>Mis en avant</FormLabel>
            <FormControl>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
