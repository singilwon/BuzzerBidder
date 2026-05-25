import { useMutation, useQueryClient } from "@tanstack/react-query";
import { delayedWishToggle, liveWishToggle } from "../api/wishToggle.api";

type WishableItem = {
  id: number;
  type: "LIVE" | "DELAYED";
  isWish?: boolean;
};

type ProductCard = WishableItem & {
  uid: string;
};

type WishToggleVariables = {
  id: number;
  type: "LIVE" | "DELAYED";
};

type WishToggleContext = {
  previousQueries: [readonly unknown[], unknown][];
};

const TARGET_KEYS = [
  "delayedProducts",
  "liveProducts",
  "my-sell",
  "my-purchase",
  "hot-liveProducts",
  "hot-delayedProducts",
  "mostBid-delayedProducts",
];

const isTargetQuery = (queryKey: readonly unknown[]) => {
  return TARGET_KEYS.includes(queryKey[0] as string);
};

// 🔹 공통 updater
const toggleWishUpdater = (id: number, type: "LIVE" | "DELAYED") => (old: unknown) => {
  const match = (item: WishableItem) => item.id === id && item.type === type;

  if (Array.isArray(old)) {
    return old.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item));
  }

  if (old && typeof old === "object" && "items" in old) {
    const list = old as { items: ProductCard[] };

    return {
      ...list,
      items: list.items.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item)),
    };
  }

  if (old && typeof old === "object" && "products" in old) {
    const res = old as { products: ProductCard[]; totalCount: number };

    return {
      ...res,
      products: res.products.map(item => (match(item) ? { ...item, isWish: !item.isWish } : item)),
    };
  }

  return old;
};

export const useWishToggle = () => {
  const qc = useQueryClient();

  return useMutation<boolean, Error, WishToggleVariables, WishToggleContext>({
    mutationFn: ({ id, type }) =>
      type === "LIVE" ? liveWishToggle({ id }) : delayedWishToggle({ id }),

    onMutate: async ({ id, type }) => {
      const targetFilter = {
        predicate: (query: { queryKey: readonly unknown[] }) => isTargetQuery(query.queryKey),
      };

      await qc.cancelQueries(targetFilter);

      const previousQueries = qc.getQueriesData(targetFilter);

      qc.setQueriesData(targetFilter, toggleWishUpdater(id, type));

      return {
        previousQueries,
      };
    },

    onError: (_error, _variables, context) => {
      context?.previousQueries.forEach(([queryKey, data]) => {
        qc.setQueryData(queryKey, data);
      });
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["my-wish"] });
    },
  });
};
