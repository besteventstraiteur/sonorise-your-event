
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Upload, Trash, File } from "lucide-react";
import { useBrochures } from '@/hooks/useBrochures';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { Brochure } from '@/types/brochures';

type BrochureFormData = {
  title: string;
  description: string;
  icon: string;
  file: FileList;
};

const AdminBrochures = () => {
  const [open, setOpen] = useState(false);
  const { brochures, isLoading, uploadingFile, uploadBrochure, deleteBrochure } = useBrochures();
  const form = useForm<BrochureFormData>();

  const onSubmit = async (data: BrochureFormData) => {
    if (!data.file[0]) {
      toast.error('Veuillez sélectionner un fichier');
      return;
    }

    await uploadBrochure(data.file[0], {
      title: data.title,
      description: data.description,
      icon: data.icon,
    });

    setOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Brochures</h2>
          <p className="text-muted-foreground">
            Gérez les brochures téléchargeables par les clients
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="w-4 h-4 mr-2" />
              Ajouter une brochure
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter une brochure</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Guide complet..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Description de la brochure..." {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icône (nom Lucide)</FormLabel>
                      <FormControl>
                        <Input placeholder="file-text" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="file"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormLabel>Fichier PDF</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept=".pdf"
                          onChange={(e) => onChange(e.target.files)}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={uploadingFile}>
                  {uploadingFile ? 'Envoi en cours...' : 'Ajouter la brochure'}
                </Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date d'ajout</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brochures.map((brochure: Brochure) => (
              <TableRow key={brochure.id}>
                <TableCell className="font-medium">{brochure.title}</TableCell>
                <TableCell>{brochure.description}</TableCell>
                <TableCell>{new Date(brochure.created_at).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                    >
                      <a href={brochure.file_path} target="_blank" rel="noopener noreferrer">
                        <File className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteBrochure(brochure)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminBrochures;
