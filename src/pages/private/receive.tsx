import { Button } from "@/components/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { useNavigate } from "react-router-dom";

export function Receive() {
  const navigate = useNavigate();

  const { address } = useAuth();
  if (!address || address.length === 0) {
    navigate("/");
  }

  function getTruncateAddress(size = 15) {
    const firstPart = address.slice(0, size);
    const lastPart = address.slice(-size);

    return `${firstPart}...${lastPart}`;
  }

  function handleCopy() {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address copied to clipboard",
    });
  }

  return (
    <div className="flex flex-col">
      <span className="text-sm text-slate-500">Your address:</span>
      <span className="font-bold">{getTruncateAddress()}</span>
      <Button className="mt-2" onClick={handleCopy}>
        Copy
      </Button>
    </div>
  );
}
