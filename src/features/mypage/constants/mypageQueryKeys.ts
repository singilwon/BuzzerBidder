export const mypageQueryKeys = {
  all: ["mypage"] as const,

  wishes: () => [...mypageQueryKeys.all, "wishes"] as const,

  sales: () => [...mypageQueryKeys.all, "sales"] as const,

  purchases: () => [...mypageQueryKeys.all, "purchases"] as const,

  currentPurchases: () => [...mypageQueryKeys.all, "current-purchases"] as const,

  bizz: () => [...mypageQueryKeys.all, "bizz"] as const,
};
