import ContentContainer from "@/components/common/ContentContainer";

type TradeStateViewProps = {
  type: "loading" | "error";
};

export default function TradeStateView({ type }: TradeStateViewProps) {
  const isLoading = type === "loading";

  return (
    <div className="mx-auto mt-2 flex w-full max-w-[1440px] flex-col gap-7">
      <ContentContainer className="border-border-sub bg-content-area m-0 flex min-h-[300px] w-full items-center justify-center border-3 px-5 py-7 md:px-10">
        <div className="text-title-main-dark flex flex-col items-center gap-3 text-center">
          <p className="text-xl font-bold">
            {isLoading ? "거래 정보를 불러오는 중입니다." : "거래 정보를 불러오지 못했습니다."}
          </p>

          {!isLoading && <p className="text-sm opacity-70">잠시 후 다시 시도해주세요.</p>}
        </div>
      </ContentContainer>
    </div>
  );
}
