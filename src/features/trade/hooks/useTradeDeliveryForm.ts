import Toast from "@/components/common/Toast";
import { useUpdateAddress } from "@/features/delivery/hooks/useUpdateAddress";
import { useUpdateDelivery } from "@/features/delivery/hooks/useUpdateDelivery";
import { useEffect, useState } from "react";

type UseTradeDeliveryFormParams = {
  auctionType: "LIVE" | "DELAYED";
  dealId: string;
  tradeData?: DealResponse;
};

export const useTradeDeliveryForm = ({
  auctionType,
  dealId,
  tradeData,
}: UseTradeDeliveryFormParams) => {
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [postal, setPostal] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [carrier, setCarrier] = useState<Carrier | "">("");

  const { mutate: updateAddressMutate } = useUpdateAddress();
  const { mutate: updateDeliveryMutate } = useUpdateDelivery();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAddress(tradeData?.deliveryAddress ?? "");
    setAddressDetail(tradeData?.deliveryAddressDetail ?? "");
    setPostal(tradeData?.deliveryPostalCode ?? "");
    setInvoiceNumber(tradeData?.trackingNumber ?? "");
    setCarrier(tradeData?.carrierCode ?? "");
  }, [
    tradeData?.deliveryAddress,
    tradeData?.deliveryAddressDetail,
    tradeData?.deliveryPostalCode,
    tradeData?.carrierCode,
    tradeData?.trackingNumber,
  ]);

  const handleSubmit = () => {
    if (!tradeData) return;

    // 구매자: 배송지 수정
    if (tradeData.role === "BUYER") {
      updateAddressMutate({
        auctionType,
        dealId,
        payload: {
          address,
          addressDetail,
          postalCode: postal,
        },
      });
    }

    if (tradeData.role === "SELLER") {
      if (!carrier) {
        Toast({ message: "택배사를 골라주세요", type: "ERROR" });
        return;
      }
      updateDeliveryMutate({
        auctionType,
        dealId,
        payload: {
          carrierCode: carrier,
          trackingNumber: invoiceNumber,
        },
      });
    }
  };

  return {
    address,
    setAddress,
    addressDetail,
    setAddressDetail,
    postal,
    setPostal,
    invoiceNumber,
    setInvoiceNumber,
    carrier,
    setCarrier,
    handleSubmit,
  };
};
