import Button from "@/components/common/Button";
import { useTossPayment } from "@/features/payments/hooks/useTossPayment";

export default function TossPaymentButton({
  amount,
  user,
  onClick,
}: {
  amount: number;
  user: User | null | undefined;
  onClick: () => void;
}) {
  const { requestPayment, isPending } = useTossPayment({ amount, user });

  return (
    <>
      <div className="flex flex-row gap-3">
        <Button
          className="bg-custom-blue max-h-9 w-full text-white md:w-22"
          onClick={requestPayment}
          disabled={isPending}
        >
          충전
        </Button>

        <Button className="bg-custom-red max-h-9 w-full text-white md:w-22" onClick={onClick}>
          출금
        </Button>
      </div>
    </>
  );
}
