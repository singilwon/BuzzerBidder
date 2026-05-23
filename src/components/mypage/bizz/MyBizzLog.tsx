"use client";

import OptionDropdown from "@/components/common/OptionDropdown";
import BizzLogCard from "./BizzLogCard";
import { useState } from "react";
import { useHistoryWithdrawals } from "@/features/withdrawal/hooks/useHistoryWithdrawals";
import { useSearchParams } from "next/navigation";
import Pagination from "@/components/common/Pagenation";
import { BIZZ_LOG_FILTERS, type BizzLogFilter } from "@/features/payments/constants/bizzLogFilters";
import { filterBizzLogs, sortBizzLogsByRecent } from "@/features/payments/utils/bizzLogUtils";

export default function MyBizzLog({ simple = false }: { simple?: boolean }) {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") ?? 1);

  const { data } = useHistoryWithdrawals({ page });
  const [status, setStatus] = useState<BizzLogFilter>("전체");

  const histories = data?.walletHistories ?? [];
  const totalPages = data?.totalPages ?? 1;

  const sortedLogs = sortBizzLogsByRecent(histories);
  const filteredLogs = filterBizzLogs(sortedLogs, status);

  const isEmpty = filteredLogs.length === 0;

  return (
    <div className="mx-auto w-full max-w-[1440px]">
      {!simple && (
        <OptionDropdown label={status}>
          {BIZZ_LOG_FILTERS.map(v => (
            <OptionDropdown.Item key={v} onClick={() => setStatus(v)}>
              {v}
            </OptionDropdown.Item>
          ))}
        </OptionDropdown>
      )}

      <div className="border-border-sub2 text-border-sub2 bg-content-gray mt-3 grid grid-cols-4 rounded-lg border-2 px-4 py-2 text-center font-bold">
        <div>구분</div>
        <div>일시</div>
        <div>금액</div>
        <div>잔액</div>
      </div>

      <div className="mt-1 flex flex-col gap-3">
        {isEmpty ? (
          <div className="border-border-sub mt-3 flex min-h-[350px] items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9]">
            <p className="text-title-main text-lg font-bold">기록이 없습니다</p>
          </div>
        ) : (
          filteredLogs.map((log, idx) => (
            <BizzLogCard key={`${log.transactionDate}-${idx}`} log={log} />
          ))
        )}
      </div>

      <Pagination totalPages={totalPages} />
    </div>
  );
}
