import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { ITransfer, TransactionType, web } from "@klever/sdk-web";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const sendFormSchema = z.object({
  address: z.string().length(62),
  value: z.string().refine((val) => !isNaN(Number(val))),
});

type SendFormValues = z.infer<typeof sendFormSchema>;

export function Send() {
  const navigate = useNavigate();

  const { address } = useAuth();
  if (!address) {
    navigate("/");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SendFormValues>({
    resolver: zodResolver(sendFormSchema),
  });
  const [loading, setLoading] = useState(false);

  function handleValueChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");
  }

  async function send({ address, value }: SendFormValues) {
    setLoading(true);

    try {
      const precision = 6;

      const payload: ITransfer = {
        receiver: address,
        amount: Number(value) * 10 ** precision,
        kda: "KLV",
      };

      const unsignedTransaction = await web.buildTransaction([
        {
          payload,
          type: TransactionType.Transfer,
        },
      ]);

      const signedTransaction = await web.signTransaction(unsignedTransaction);
      const { data, error } = await web.broadcastTransactions([
        signedTransaction,
      ]);
      if (error.length > 0) {
        throw new Error(error);
      }

      const hash = data.txsHashes[0];

      toast({
        title: "Successfully send value!",
        description: (
          <a
            target="_blank"
            href={`https://testnet.kleverscan.org/transaction/${hash}`}
          >
            <p className="max-w-xs truncate underline">{hash}</p>
          </a>
        ),
      });
    } catch (error) {
      console.log("error", error);
      toast({
        variant: "destructive",
        title: String(error),
      });
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit(send)} className="flex flex-col">
      <label className="mt-2" htmlFor="address">
        Address
      </label>
      <Input id="address" {...register("address")} />
      {errors.address && (
        <p className="text-xs text-red-500">{errors.address.message}</p>
      )}

      <label className="mt-2" htmlFor="value">
        Value
      </label>
      <Input
        id="value"
        {...register("value", { onChange: handleValueChange })}
      />
      {errors.value && (
        <p className="text-xs text-red-500">{errors.value.message}</p>
      )}

      <Button disabled={loading} className="mt-4" type="submit">
        Send
      </Button>
    </form>
  );
}
