"use client";
import ContentContainer from "../common/ContentContainer";
import { useTradeDetail } from "@/features/trade/hooks/useTrade";
import { useState } from "react";
import { buildMilestones } from "@/utils/buildMilestones";
import { usePayBalance } from "@/features/payments/hooks/usePayBalance";
import { useConfirmTrade } from "@/features/trade/hooks/useConfirmTrade";
import TradeProductSummary from "./TradeProductSummary";
import TradeTimeline from "./TradeTimeline";
import TradeDeliverySection from "./TradeDeliverySection";
import { useTradeDeliveryForm } from "@/features/trade/hooks/useTradeDeliveryForm";
import TradeActionModals from "./TradeActionModals";

type TradeInfoProps = {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
};

export default function TradeInfo({ auctionType, dealId }: TradeInfoProps) {
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const { mutate: payBalanceMutate } = usePayBalance();
  const { mutate: confirmTradeMutate } = useConfirmTrade();

  const { data: tradeData, isLoading, isError } = useTradeDetail({ auctionType, dealId });

  const deliveryForm = useTradeDeliveryForm({
    auctionType,
    dealId,
    tradeData,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !tradeData) return <div>거래 정보를 불러올 수 없습니다.</div>;

  const milestones = buildMilestones({
    role: tradeData.role,
    status: tradeData.status,
    hasTracking: Boolean(tradeData.trackingNumber),
    onPayClick: () => setIsPayModalOpen(true),
    onConfirmClick: () => setIsConfirmModalOpen(true),
  });

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[1440px] flex-col gap-7 overflow-y-hidden">
      <ContentContainer className="border-border-sub bg-content-area m-0 flex w-full flex-col gap-12 gap-y-5 border-3 px-5 py-7 md:w-full md:px-10 lg:flex-row">
        <TradeProductSummary
          image={tradeData.image}
          itemName={tradeData.itemName}
          winningPrice={tradeData.winningPrice}
          status={tradeData.status}
        />
        <TradeDeliverySection
          role={tradeData.role}
          address={deliveryForm.address}
          addressDetail={deliveryForm.addressDetail}
          postal={deliveryForm.postal}
          invoiceNumber={deliveryForm.invoiceNumber}
          carrier={deliveryForm.carrier}
          onChangeAddress={deliveryForm.setAddress}
          onChangeAddressDetail={deliveryForm.setAddressDetail}
          onChangePostal={deliveryForm.setPostal}
          onChangeInvoiceNumber={deliveryForm.setInvoiceNumber}
          onChangeCarrier={deliveryForm.setCarrier}
          onSubmit={deliveryForm.handleSubmit}
        />
      </ContentContainer>
      <TradeTimeline milestones={milestones} />
      <TradeActionModals
        isPayModalOpen={isPayModalOpen}
        isConfirmModalOpen={isConfirmModalOpen}
        onClosePayModal={() => setIsPayModalOpen(false)}
        onCloseConfirmModal={() => setIsConfirmModalOpen(false)}
        onConfirmPay={() => {
          payBalanceMutate(dealId);
          setIsPayModalOpen(false);
        }}
        onConfirmTrade={() => {
          confirmTradeMutate({ type: auctionType, dealId });
          setIsConfirmModalOpen(false);
        }}
      />
    </div>
  );
}
