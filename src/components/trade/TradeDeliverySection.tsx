import { CARRIER_LABEL_MAP } from "@/utils/carrierCodeMapper";
import Button from "../common/Button";
import ContentContainer from "../common/ContentContainer";
import Input from "../common/Input";
import OptionDropdown from "../common/OptionDropdown";
import Title from "../common/Title";

type TradeDeliverySectionProps = {
  role: "BUYER" | "SELLER";

  address: string;
  addressDetail: string;
  postal: string;
  invoiceNumber: string;
  carrier: Carrier | "";

  onChangeAddress: (value: string) => void;
  onChangeAddressDetail: (value: string) => void;
  onChangePostal: (value: string) => void;
  onChangeInvoiceNumber: (value: string) => void;
  onChangeCarrier: (value: Carrier) => void;

  onSubmit: () => void;
};

export default function TradeDeliverySection({
  role,
  address,
  addressDetail,
  postal,
  invoiceNumber,
  carrier,
  onChangeAddress,
  onChangeAddressDetail,
  onChangePostal,
  onChangeInvoiceNumber,
  onChangeCarrier,
  onSubmit,
}: TradeDeliverySectionProps) {
  const deliveryEditable = role === "BUYER"; // 배송/상세주소
  const invoiceEditable = role === "SELLER"; // 송장/택배사(드롭다운)
  return (
    <div className="flex min-w-full flex-col lg:min-w-[40%]">
      <Title className="text-title-sub ml-3 text-[24px]">배송</Title>
      <ContentContainer className="border-border-main text-title-main-dark grid gap-1 border-3 p-8 text-[11px] font-bold">
        <div className="grid gap-2">
          <p>배송지</p>

          <Input
            value={address}
            placeholder="입력"
            className="h-10 px-3 py-2 sm:py-1"
            onChange={e => onChangeAddress(e.target.value)}
            disabled={!deliveryEditable}
          />
          {!deliveryEditable && (
            <p className="ml-1 text-[10px] opacity-60">구매자만 수정할 수 있어요.</p>
          )}
        </div>

        <div className="grid gap-2">
          <p>상세 주소</p>
          <Input
            value={addressDetail}
            placeholder="입력"
            className="h-10"
            onChange={e => onChangeAddressDetail(e.target.value)}
            disabled={!deliveryEditable}
          />
        </div>

        <div className="grid gap-2">
          <p>우편 번호</p>
          <Input
            value={postal}
            placeholder="입력"
            className="h-10"
            onChange={e => onChangePostal(e.target.value)}
            disabled={!deliveryEditable}
          />
        </div>

        <div className="mt-2 grid gap-2">
          <p>송장 번호</p>
          <Input
            value={invoiceNumber}
            placeholder="입력"
            className="h-10 px-3 py-2 sm:py-1"
            onChange={e => onChangeInvoiceNumber(e.target.value)}
            disabled={!invoiceEditable}
          />
          {!invoiceEditable && (
            <p className="ml-1 text-[10px] opacity-60">판매자만 입력할 수 있어요.</p>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2">
          {/* 드롭다운: 판매자만 변경 가능 */}
          <div className={!invoiceEditable ? "pointer-events-none opacity-60" : ""}>
            <OptionDropdown label={carrier ? CARRIER_LABEL_MAP[carrier] : "택배사 선택"}>
              {Object.entries(CARRIER_LABEL_MAP).map(([code, label]) => (
                <OptionDropdown.Item key={code} onClick={() => onChangeCarrier(code as Carrier)}>
                  {label}
                </OptionDropdown.Item>
              ))}
            </OptionDropdown>
          </div>

          <Button className="max-h-9 border-2" onClick={onSubmit}>
            수정
          </Button>
        </div>
      </ContentContainer>
    </div>
  );
}
