"use client";
import React from "react";
import { Button } from "./ui/button";
import { Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { number, z } from "zod";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";

export const formEditContactSchema = z.object({
  id: z.number(),
  authorId: z.string(),
  name: z.string().min(2).max(50),
  number_phone: z
    .string()
    .regex(/^(62|0)\d{10,12}$/, "Format No Telp harus benar!"),
});

interface ContactUserProps {
  contact: {
    id: number;
    authorId: string;
    name: string;
    number_phone: string;
  };
}

export default function EditContactButton({ contact }: ContactUserProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formEditContactSchema>>({
    resolver: zodResolver(formEditContactSchema),
    defaultValues: {
      id: contact.id,
      authorId: contact.authorId,
      name: contact.name,
      number_phone: contact.number_phone,
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formEditContactSchema>) {
    try {
      const res = await fetch("/api/contact", {
        method: "put",
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!data) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
      toast({
        variant: "default",
        title: "Yeayyy! Berhasil",
        description: "Data berhasil di update.",
      });
      form.reset();
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm">
          Edit <Edit2 className="w-4 h-4 ms-2" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Tambah Kontak</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Kontak</FormLabel>
                  <FormControl>
                    <Input
                      defaultValue={contact.number_phone}
                      placeholder="Jhon Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Tulis Nama Kontak
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="number_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Handphone</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      //   value={contact.number_phone}
                      defaultValue={contact.number_phone}
                      placeholder="08123456789"
                      {...field}
                      onInput={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace(
                          /[^0-9]/g,
                          ""
                        ); // Memastikan hanya angka yang dimasukkan
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Tulis dengan berawalan 62 atau 0
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Update"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
