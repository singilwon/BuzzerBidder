"use client";

import ContentContainer from "@/components/common/ContentContainer";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMyCurrentPurchase } from "@/features/mypage/hooks/useMyCurrentPurchase";
import { useExpandableProductList } from "@/features/mypage/hooks/useExpandableProductList";

export default function BidList({ initialData }: { initialData?: ProductCardType[] }) {
  const { data: purchaseData = [] } = useMyCurrentPurchase({ initialData });
  const isEmpty = purchaseData.length === 0;

  const {
    expanded,
    shownItems: shownProducts,
    canToggle,
    toggleExpanded,
  } = useExpandableProductList({
    items: purchaseData,
  });

  return (
    <>
      <Title size="lg">입찰중인 목록</Title>

      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full border px-3 py-4 md:w-full">
        <ProductsGrid>
          {isEmpty ? (
            <div className="border-border-sub col-span-full flex min-h-[220px] flex-col items-center justify-center rounded-md border-2 border-dashed bg-[#FDF6E9] text-center">
              <p className="text-title-main text-lg font-bold">구매중인 상품이 없습니다</p>
              <p className="mt-2 text-sm opacity-70">입찰을 시도해 보세요!</p>
            </div>
          ) : (
            shownProducts.map(product => (
              <ProductCard context="CARD" key={product.uid} product={product} />
            ))
          )}
        </ProductsGrid>

        {canToggle && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={toggleExpanded}
              className="text-title-sub cursor-pointer text-sm hover:underline"
            >
              {expanded ? "접기" : "더보기"}
            </button>
          </div>
        )}
      </ContentContainer>
    </>
  );
}
