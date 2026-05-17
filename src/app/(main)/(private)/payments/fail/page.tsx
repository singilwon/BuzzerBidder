import PaymentResult from "@/components/payments/PaymentResult";

export default function Page() {
  return (
    <PaymentResult
      title="결제에 실패했습니다"
      description="결제 정보를 확인한 뒤 다시 시도해주세요."
      buttonText="마이페이지로 이동"
      href="/mypage/bizz"
    />
  );
}
