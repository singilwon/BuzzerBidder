import ConfirmModal from "../modal/ConfirmModal";

type TradeActionModalsProps = {
  isPayModalOpen: boolean;
  isConfirmModalOpen: boolean;
  onClosePayModal: () => void;
  onCloseConfirmModal: () => void;
  onConfirmPay: () => void;
  onConfirmTrade: () => void;
};

export default function TradeActionModals({
  isPayModalOpen,
  isConfirmModalOpen,
  onClosePayModal,
  onCloseConfirmModal,
  onConfirmPay,
  onConfirmTrade,
}: TradeActionModalsProps) {
  return (
    <>
      {isPayModalOpen && (
        <ConfirmModal
          title="요금을 결제하시겠습니까?"
          description="결제 후 거래가 진행 단계로 넘어갑니다."
          confirmText="결제하기"
          onCancel={onClosePayModal}
          onConfirm={onConfirmPay}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          title="구매를 확정하시겠습니까?"
          description="구매 확정 후에는 거래가 완료되며 되돌릴 수 없습니다."
          confirmText="구매 확정"
          cancelText="취소"
          onCancel={onCloseConfirmModal}
          onConfirm={onConfirmTrade}
        />
      )}
    </>
  );
}
