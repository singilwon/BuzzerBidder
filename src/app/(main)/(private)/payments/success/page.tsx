import PaymentSuccessHandler from "@/components/payments/PaymentSuccessHandler";
import { Suspense } from "react";

export default function PaymentsSuccessPage() {
  return (
    <>
      <Suspense fallback={null}>
        <PaymentSuccessHandler />
      </Suspense>
    </>
  );
}
