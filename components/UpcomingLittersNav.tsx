"use client";

import { Navigation } from "./Navigation";
import { useRouter } from "next/navigation";

export function UpcomingLittersNav() {
  const router = useRouter();
  return <Navigation currentRoute="home" onNavigate={() => router.push("/")} />;
}
