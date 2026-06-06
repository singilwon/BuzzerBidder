"use client";

import ContentContainer from "@/components/common/ContentContainer";
import ProductCard from "@/components/common/ProductCard";
import ProductsGrid from "@/components/common/ProductsGrid";
import Title from "@/components/common/Title";
import { useMySell } from "@/features/mypage/hooks/useMySell";
import { useExpandableProductList } from "@/features/mypage/hooks/useExpandableProductList";
import EmptyState from "@/components/common/EmptyState";
import { isSellingProduct } from "@/features/mypage/utils/mypageProductFilters";

export default function SaleList({ initialData }: { initialData: ProductCardType[] | undefined }) {
  const { data: mySells } = useMySell({ initialData });

  const sellItems = mySells ?? [];

  const sellingItems = sellItems.filter(isSellingProduct);

  const {
    expanded,
    shownItems: shownProducts,
    canToggle,
    toggleExpanded,
  } = useExpandableProductList({
    items: sellingItems,
  });

  const isEmpty = shownProducts.length === 0;

  return (
    <>
      <Title size="lg">판매중인 목록</Title>

      <ContentContainer className="border-border-sub/50 shadow-flat-light w-full border px-3 py-4 md:w-full">
        <ProductsGrid>
          {isEmpty ? (
            <EmptyState
              title="판매중인 상품이 없습니다"
              description={
                <>
                  아직 등록된 판매 상품이 없어요.
                  <br />
                  상품을 등록해보세요!
                </>
              }
            />
          ) : (
            shownProducts.map(product => (
              <ProductCard context="MY_SELLING" key={product.uid} product={product} />
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
