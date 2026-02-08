"use client";

import { useRouter } from "next/navigation";
import { Navigation } from "./Navigation";

export function UpcomingLittersNav() {
  const router = useRouter();
  return (
    <Navigation
      currentRoute="dog-profile"
      onNavigate={() => router.push("/")}
    />
  );
}
