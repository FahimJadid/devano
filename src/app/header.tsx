"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { ModeToggle } from "./../components/mode-toggle";
import { LogIn, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const {data: session} = useSession();

  const isSignedIn = !!session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
        <Avatar>
            <AvatarImage src={session?.user?.image ?? ""} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
         {session?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isSignedIn ? (
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOut className="mr-2" />Sign Out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => signIn("google")}>
            <LogIn className="mr-2" />Sign In
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const Header = () => {

  return (
    <header className="py-2 bg-gray-100 dark:bg-gray-900 container mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center text-xl">
          <Link href="/" className="flex gap-2 items-center text-xl hover:underline"/>
          <Image src="/logo.ico" width="60" height="60" alt="application icon" /> Devano
        </div>
        <div className="flex items-center gap-4">
          <AccountDropdown />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;