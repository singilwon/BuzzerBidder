import Button from "../common/Button";
import MileStoneSemiTitle from "../common/MileStoneSemiTitle";
import TradeItem from "./TradeItem";

type TradeTimelineStep = {
  key: string;
  title: string;
  description: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
};

type TradeTimelineProps = {
  milestones: TradeTimelineStep[];
};

export default function TradeTimeline({ milestones }: TradeTimelineProps) {
  return (
    <section className="relative min-h-screen py-5">
      <div className="bg-border-main absolute top-5 left-7 h-full w-[3px]" />

      {milestones.map(step => (
        <div key={step.key} className="mb-12">
          <MileStoneSemiTitle title={step.title} className="mb-2 ml-2 rotate-2" />

          <TradeItem>
            {step.description}

            {step.action && (
              <Button
                className={`bg-btn-default ml-3 max-h-7 transition-all hover:scale-101 active:scale-99 ${step.key === "PENDING" ? "bg-custom-red text-white" : ""}`}
                onClick={step.action.onClick}
              >
                {step.action.label}
              </Button>
            )}
          </TradeItem>

          <div className="mt-12 ml-15 w-[95%] border-t-[3px] border-dashed border-[#A1887F]/30" />
        </div>
      ))}
    </section>
  );
}
