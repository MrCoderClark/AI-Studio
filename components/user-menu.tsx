"use client";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu({
  name,
  email,
  avatarUrl,
}: {
  name?: string | null;
  email?: string | null;
  avatarUrl?: string | null;
}) {
  const label = name || email || "Account";
  const initial = (name || email || "A").charAt(0).toUpperCase();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button
            aria-label="Account menu"
            className="rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-9">
              {avatarUrl ? <AvatarImage src={avatarUrl} alt={label} /> : null}
              <AvatarFallback
                delay={avatarUrl ? 600 : 0}
                className="bg-gradient-to-br from-violet-400 to-fuchsia-400 text-sm font-bold text-white"
              >
                {initial}
              </AvatarFallback>
            </Avatar>
          </button>
        }
      />
      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <div className="flex flex-col gap-0.5 px-2 py-1.5">
          <span className="truncate text-sm font-medium text-foreground">{label}</span>
          {email ? (
            <span className="truncate text-xs text-muted-foreground">{email}</span>
          ) : null}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/api/auth/sign-out" method="post">
          <DropdownMenuItem
            variant="destructive"
            nativeButton
            render={<button type="submit" className="w-full" />}
          >
            <LogOut />
            Sign out
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
