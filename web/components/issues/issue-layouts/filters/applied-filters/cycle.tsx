import { observer } from "mobx-react-lite";

// icons
import { X } from "lucide-react";
// types
import { ICycle } from "types";

type Props = {
  handleRemove: (val: string) => void;
  cycles: ICycle[] | undefined;
  values: string[];
};

export const AppliedCycleFilters: React.FC<Props> = observer((props) => {
  const { handleRemove, cycles, values } = props;

  return (
    <>
      {values.map((cycleId) => {
        const cycleDetail = cycles?.find((p) => p.id === cycleId);

        if (!cycleDetail) return null;

        return (
          <div key={cycleId} className="flex items-center gap-1 rounded bg-custom-background-80 p-1 text-xs">
            <span className="normal-case">{cycleDetail.name}</span>
            <button
              type="button"
              className="grid place-items-center text-custom-text-300 hover:text-custom-text-200"
              onClick={() => handleRemove(cycleId)}
            >
              <X size={10} strokeWidth={2} />
            </button>
          </div>
        );
      })}
    </>
  );
});
