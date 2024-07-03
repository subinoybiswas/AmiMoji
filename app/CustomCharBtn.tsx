import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";
import { Image } from "@nextui-org/react";
export function CustomChar({ onOpen }: { onOpen: () => void }) {
  return (
    <div className=" dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative ">
      <EvervaultCard>
        {" "}
        <Image
          className="rounded-xl"
          src={"/edit.png"}
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
          width={0}
          height={0}
          sizes="100vw"
          alt="Image"
          onClick={onOpen}
        />
      </EvervaultCard>
    </div>
  );
}
