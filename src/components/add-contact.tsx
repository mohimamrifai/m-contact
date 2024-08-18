"use client";
import React, { useEffect, useRef, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

export const formAddContactSchema = z.object({
  authorId: z.string(),
  name: z.string().min(2).max(50),
  number_phone: z
    .string()
    .regex(/^(62|0)\d{10,12}$/, "Format No Telp harus benar!"),
});

export default function AddContact({ userId }: { userId: string }) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formAddContactSchema>>({
    resolver: zodResolver(formAddContactSchema),
    defaultValues: {
      authorId: userId,
      name: "",
      number_phone: "",
    },
  });
  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formAddContactSchema>) {
    try {
      const res = await fetch("/api/contact", {
        method: "post",
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
        description: "Data berhasil ditambahkan.",
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
        <Button>Tambah</Button>
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
                    <Input placeholder="Jhon Doe" {...field} />
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
              {isLoading ? "Loading..." : "Tambah"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
