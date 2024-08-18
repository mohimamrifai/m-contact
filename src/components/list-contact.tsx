import prisma from "@/lib/db";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ellipsis, PhoneCall } from "lucide-react";
import Link from "next/link";
import DeleteContactButton from "./delete-contact-button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import EditContactButton from "./edit-contact-button";

export default async function ListContact({
  userId,
  currentPage,
}: {
  userId: string;
  currentPage: number;
}) {
  const CONTACT_PER_PAGE = 10
  const contacts = await prisma.contact.findMany({
    where: {
      authorId: userId,
    },
    skip: (currentPage - 1) * CONTACT_PER_PAGE,
    take: CONTACT_PER_PAGE
  });

  return (
    <div className="py-5">
      <Table>
        <TableCaption>A list of your recent contacts.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] font-bold">No</TableHead>
            <TableHead className="font-bold">Nama</TableHead>
            <TableHead className="font-bold">Nomor Handphone</TableHead>
            <TableHead className="font-bold">Menghubungi</TableHead>
            <TableHead className="font-bold">Settings</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              <TableCell className="text-xs md:text-lg">{index + 1}</TableCell>
              <TableCell className="text-xs md:text-lg">{contact.name}</TableCell>
              <TableCell className="text-xs md:text-lg">{contact.number_phone}</TableCell>
              <TableCell className="text-xs md:text-lg">
                <Link
                  href={`https://wa.me/${contact.number_phone}`}
                  target="_blank"
                  className="flex items-center bg-green-500 rounded w-max px-2 py-1 text-white text-xs md:text-sm"
                >
                  Hubungi <PhoneCall className="w-4 h-4 ms-2" />
                </Link>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger>
                    <Ellipsis />
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col gap-2 w-max">
                    <EditContactButton contact={contact} />
                    <DeleteContactButton id={contact.id} />
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
