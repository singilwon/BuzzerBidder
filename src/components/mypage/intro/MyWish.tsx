"use client";
import ContentContainer from "../../common/ContentContainer";
import ProductsGrid from "@/components/common/ProductsGrid";
import ProductCard from "@/components/common/ProductCard";
import Title from "@/components/common/Title";
import { useMyWish } from "@/features/mypage/hooks/useMyWish";
import EmptyState from "@/components/common/EmptyState";

export default function MyWish({ initialData }: { initialData?: ProductCardType[] }) {
  const { data: myWish } = useMyWish({ initialData });
  const isEmpty = !myWish || myWish.length === 0;

  return (
    <>
      <ContentContainer className="flex flex-col justify-between gap-3" bordered={false}>
        <Title size="lg" className="px-2">
          찜 목록
        </Title>
        <ProductsGrid>
          {isEmpty ? (
            <EmptyState
              title="찜으로 등록된 상품이 없습니다"
              description={
                <>
                  관심 있는 상품을 찜해보세요.
                  <br />
                  찜한 상품은 이곳에서 확인할 수 있어요.
                </>
              }
            />
          ) : (
            myWish?.map(product => (
              <ProductCard context="CARD" key={product.uid} product={product} />
            ))
          )}
        </ProductsGrid>
      </ContentContainer>
    </>
  );
}
