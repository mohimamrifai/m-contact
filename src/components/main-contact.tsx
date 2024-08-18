import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/server";
import React from "react";
import { Button } from "./ui/button";
import AddContact from "./add-contact";
import ListContact from "./list-contact";
import PaginationContact from "./pagination-contact";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export default function MainContact({
  currentPage,
  user,
}: {
  currentPage: number;
  user: KindeUser | null;
}) {
  return (
    <div>
      {user ? (
        <div className="py-3">
          <AddContact userId={user.id} />
          <ListContact currentPage={currentPage} userId={user.id} />
          <PaginationContact />
        </div>
      ) : (
        <div className="h-80 w-full flex flex-col gap-3 items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Belum Ada Daftar Contact
          </p>
          <Button size="sm">
            <LoginLink className="text-sm">Tambahkan</LoginLink>
          </Button>
        </div>
      )}
    </div>
  );
}
