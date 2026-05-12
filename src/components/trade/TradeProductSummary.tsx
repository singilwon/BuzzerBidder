import { tradeStatusToUIStatus } from "@/utils/tradeStatusMapper";
import ContentContainer from "../common/ContentContainer";
import StatusBadge from "../common/StatusBadge";
import Title from "../common/Title";
import WrapperImage from "../common/WrapperImage";

type TradeProductSummaryProps = {
  image: string;
  itemName: string;
  winningPrice: number | string;
  status: DealResponse["status"];
};

export default function TradeProductSummary({
  image,
  itemName,
  winningPrice,
  status,
}: TradeProductSummaryProps) {
  const uiStatus = tradeStatusToUIStatus[status];
  return (
    <div className="flex flex-col lg:min-w-[55%]">
      <Title className="text-title-sub ml-3 text-[24px]">상품 정보</Title>
      <ContentContainer className="border-border-main flex h-full flex-col items-center justify-center gap-10 overflow-auto border-3 p-8 md:flex-row">
        {/* 이미지 */}
        <div className="h-34 w-34 shrink-0">
          <WrapperImage src={image} alt="상품 사진" />
        </div>

        {/* 정보 */}
        <div className="flex flex-col justify-center gap-3">
          <StatusBadge status={uiStatus} className="border-none" />

          <p className="text-title-main-dark text-[20px] font-bold">{itemName}</p>

          <div className="mt-2">
            <p className="text-title-main-dark text-[11px]">낙찰가</p>
            <p className="text-custom-red text-[17px] font-bold">{winningPrice}</p>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
}
