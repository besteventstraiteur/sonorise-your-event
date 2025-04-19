
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

export const CustomerTypeTabs = () => {
  return (
    <TabsList>
      <TabsTrigger value="all">Tous</TabsTrigger>
      <TabsTrigger value="individual">Particuliers</TabsTrigger>
      <TabsTrigger value="business">Professionnels</TabsTrigger>
    </TabsList>
  );
};
