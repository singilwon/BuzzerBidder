export const isSellingProduct = (product: ProductCardType) => {
  if (product.status?.kind === "time") {
    return true;
  }

  if (product.status?.kind !== "status") {
    return false;
  }

  return product.status.status === "IN_PROGRESS" || product.status.status === "BEFORE_BIDDING";
};
