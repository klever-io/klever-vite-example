import { Outlet } from "react-router-dom";
import { AuthProvider } from "../contexts/auth-context";

export function Root() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
