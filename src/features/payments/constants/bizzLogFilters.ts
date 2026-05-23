export const BIZZ_LOG_FILTERS = ["전체", "충전", "출금", "구매", "판매", "입찰", "환불"] as const;

export type BizzLogFilter = (typeof BIZZ_LOG_FILTERS)[number];

export const BIZZ_LOG_TRANSACTION_TYPE_MAP: Record<Exclude<BizzLogFilter, "전체">, string[]> = {
  충전: ["CHARGE"],
  출금: ["WITHDRAW"],
  구매: ["PAY_TO_USER"],
  판매: ["RECEIVE_FROM_USER", "DEAL_SETTLEMENT"],
  입찰: ["BID"],
  환불: ["BID_REFUND", "REFUND"],
};
