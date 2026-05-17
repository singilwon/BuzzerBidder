import PaymentResult from "@/components/payments/PaymentResult";

export default function Page() {
  return (
    <PaymentResult
      title="결제가 완료되었습니다"
      description="비즈 충전 내역은 마이페이지에서 확인할 수 있습니다."
      buttonText="마이페이지로 이동"
      href="/mypage/bizz"
    />
  );
}
