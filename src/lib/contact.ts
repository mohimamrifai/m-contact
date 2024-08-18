"use server";
import { z } from "zod";
import prisma from "./db";
import { formAddContactSchema } from "@/components/add-contact";

export async function addContact(values: z.infer<typeof formAddContactSchema>) {
  try {
    const { name, number_phone, authorId } = values;
    const result = await prisma.contact.create({
      data: {
        authorId,
        name,
        number_phone,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
}
