import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { handleSignout } from "../actions/signout.action";

type Props = {
  className?: string;
};

export default function SignoutButton({ className }: Props) {
  return (
    <Button onClick={handleSignout} className={cn("", className)}>
      Signout
    </Button>
  );
}
