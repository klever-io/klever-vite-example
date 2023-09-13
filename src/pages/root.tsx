import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/auth-context";

export function Root() {
  return (
    <AuthProvider>
      <Outlet />
      <Toaster />
    </AuthProvider>
  );
}
