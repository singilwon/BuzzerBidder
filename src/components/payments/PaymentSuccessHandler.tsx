"use client";

import { useApprovePayments } from "@/features/payments/hooks/useApprovePayments";
import { usePaymentSearchParams } from "@/features/payments/hooks/usePaymentSearchParams";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function PaymentSuccessHandler() {
  const router = useRouter();
  const approvePayments = useApprovePayments();
  const { paymentKey, orderId, amount, isValid } = usePaymentSearchParams();

  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (!isValid || !paymentKey || !orderId) {
      router.push("/mypage/bizz");
      return;
    }

    approvePayments.mutate({ paymentKey, orderId, amount });
  }, [isValid, paymentKey, orderId, amount, approvePayments, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-lg font-semibold">결제 승인 처리 중입니다...</p>
    </div>
  );
}
