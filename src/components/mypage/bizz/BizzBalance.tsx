"use client";

import BizzAmount from "@/components/common/BizzAmount";
import ContentContainer from "@/components/common/ContentContainer";
import { useMe } from "@/features/auth/hooks/useMe";
import { useState } from "react";
import TossPaymentButton from "./TossPaymentButton";
import PriceInput from "@/components/common/PriceInput";
import CreateWithdrawal from "@/components/modal/CreateWithdrawal";
import { useMyWallet } from "@/features/payments/hooks/useMyWallet";

export default function BizzBalance() {
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [bizzAmount, setBizzAmount] = useState<number>(0);

  const { data: user } = useMe();
  const { data } = useMyWallet();

  return (
    <ContentContainer
      bordered={false}
      className="mt-4 flex min-h-[200px] flex-col justify-between gap-5 pt-4"
    >
      <div className="text-title-main flex w-full max-w-[520px] flex-col gap-2">
        <span className="text-2xl font-bold">잔액</span>

        <ContentContainer className="border-border-sub/20 shadow-flat-light flex min-h-[120px] items-center px-4 py-3">
          <BizzAmount amount={data?.bizz ?? 0} fontSize="xl" iconSize="xl" />
        </ContentContainer>
      </div>

      <div className="flex w-full max-w-[520px] flex-col justify-end gap-3 md:flex-row md:px-3">
        <PriceInput
          placeholder="충전 또는 출금할 금액 입력"
          value={bizzAmount}
          onChange={setBizzAmount}
          className="h-9 md:w-[290px]"
        />

        <TossPaymentButton
          amount={bizzAmount}
          user={user}
          onOpenWithdrawalModal={() => setIsWithdrawalModalOpen(true)}
        />

        {isWithdrawalModalOpen && (
          <CreateWithdrawal
            initialAmount={bizzAmount}
            onClose={() => setIsWithdrawalModalOpen(false)}
          />
        )}
      </div>
    </ContentContainer>
  );
}
