import ClientApi from "@/lib/clientApi";

type HistoryPaymentsParams = {
  startDate?: string;
  endDate?: string;
  paymentStatus?: string;
  page?: number;
  size?: number;
};

export const createPayments = async ({ amount }: { amount: number }) => {
  const res = await ClientApi<CreatePaymentsResponse>("/payments", {
    method: "POST",
    body: JSON.stringify({ amount }),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }
  return res.data;
};

export const approvePayments = async (
  payload: ApprovePaymentsRequest
): Promise<ApprovePaymentsResponse> => {
  const res = await ClientApi<ApprovePaymentsResponse>("/payments/confirm", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const historyPayments = async ({
  startDate,
  endDate,
  paymentStatus,
  page,
  size,
}: HistoryPaymentsParams): Promise<HistoryPaymentsResponse> => {
  const res = await ClientApi<HistoryPaymentsResponse>("/payments/history", {
    method: "GET",
    params: {
      startDate,
      endDate,
      PaymentStatus: paymentStatus,
      page,
      size,
    },
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const payBalance = async (dealId: string) => {
  const res = await ClientApi(`/users/me/deals/live/${dealId}/payment`, {
    method: "POST",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};

export const myWallet = async (): Promise<{ bizz: number }> => {
  const res = await ClientApi<{ bizz: number }>("/wallet/bizz", {
    method: "GET",
  });

  if (res.resultCode !== "200") {
    throw new Error(res.msg);
  }

  return res.data;
};
