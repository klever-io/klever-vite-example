import { Button } from "@/components/button";
import { useAuth } from "@/contexts/auth-context";
import { ArrowDownToLine, LogOut, Send } from "lucide-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateLayoutProps {
  children: ReactNode;
}

export function PrivateLayout({ children }: PrivateLayoutProps) {
  const navigate = useNavigate();
  const { setAddress } = useAuth();

  function logout() {
    setAddress("");
    navigate("/");
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="p-4 border border-slate-300 rounded-md shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-bold text-lg">Private Page</h1>
            <h3 className="text-sm">Make transactions or receive any value</h3>
          </div>
          <form onSubmit={logout}>
            <Button type="submit">
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <div className="mt-2 mb-6 h-[1px] w-full bg-slate-300" />

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/private")}
            className="pt-4 pb-3 rounded-md flex flex-col items-center justify-center border border-slate-300 hover:bg-slate-300"
          >
            <Send strokeWidth={1.5} className="w-5 h-5" />
            <span className="text-sm">Send</span>
          </button>
          <button
            onClick={() => navigate("/private/receive")}
            className="pt-4 pb-3 rounded-md flex flex-col items-center justify-center border border-slate-300 hover:bg-slate-300"
          >
            <ArrowDownToLine className="w-5 h-5" />
            <span className="text-sm">Receive</span>
          </button>
        </div>

        <div className="my-4">{children}</div>
      </div>
    </main>
  );
}
