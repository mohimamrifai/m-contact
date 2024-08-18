import {
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/types";

export default function Navbar({ user }: { user: KindeUser | null }) {
  return (
    <div className="flex items-center justify-between border-b-2 py-2">
      {user ? (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.picture || ""} />
            <AvatarFallback>
              {(user.username || user.family_name || user.given_name)?.slice(
                0,
                2
              )}
            </AvatarFallback>
          </Avatar>
          <Link href="/" className="text-lg font-semibold">
            {user.username || user.family_name || user.given_name}
          </Link>
        </div>
      ) : (
        <h2 className="font-bold">Kamu melihat sebagai Tamu</h2>
      )}
      {user ? (
        <Button variant="destructive" size="sm">
          <LogoutLink className="text-sm">Logout</LogoutLink>
          <LogOut className="w-4 h-4 ms-2" />
        </Button>
      ) : (
        <Button size="sm">
          <LoginLink className="text-sm">Sign In</LoginLink>
          <LogIn className="w-4 h-4 ms-2" />
        </Button>
      )}
    </div>
  );
}
