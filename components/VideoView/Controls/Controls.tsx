import { Button } from "@nextui-org/react";
import { BiSolidUpArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

export function Controls({
  setPosition,
}: {
  setPosition: (value: React.SetStateAction<number[]>) => void;
}) {
  return (
    <div className="right-0 fixed bottom-0 p-7 flex flex-col gap-0.5">
      <Button
        size="sm"
        variant="faded"
        isIconOnly
        className="rounded-lg bg-slate-500/20"
        onClick={() =>
          setPosition((prevPosition) => {
            return [prevPosition[0], prevPosition[1] + 0.05, prevPosition[2]];
          })
        }
      >
        <BiSolidUpArrow />
      </Button>
      <Button
        size="sm"
        variant="faded"
        isIconOnly
        className="rounded-lg bg-slate-500/20"
        onClick={() =>
          setPosition((prevPosition) => {
            return [prevPosition[0], prevPosition[1] - 0.05, prevPosition[2]];
          })
        }
      >
        <BiSolidDownArrow />
      </Button>
    </div>
  );
}
