"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteContactButton({ id }: { id: number }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  async function deleteContact() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "delete",
        body: JSON.stringify(id),
      });
      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
      toast({
        variant: "default",
        title: "Yeayyy! Berhasil",
        description: "Data berhasil Dihapus.",
      });
      router.push("/");
      router.refresh();
      setIsLoading(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size="sm" variant="destructive">
          Hapus <Trash2 className="w-4 h-4 ms-2" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteContact}>{isLoading ? "Deleting..." : "Continue"}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
