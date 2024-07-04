import { CustomChar } from "@/app/CustomCharBtn";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ImageList } from "./ImageList";

export function SideBar({
  isVisible,
  toggleVisibility,
  onOpen,
  setUrl,
}: {
  isVisible: boolean;
  toggleVisibility: () => void;
  onOpen: () => void;
  setUrl: (url: string) => void;
}) {
  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  return (
    <motion.nav
      className=" fixed flex flex-col bg-slate-600/30 md:w-1/4 w-[90%] scrolltarget backdrop-blur-lg h-[90%] rounded-xl p-3 gap-2 overflow-y-scroll z-[40]"
      animate={isVisible ? "open" : "closed"}
      variants={variants}
    >
      <div className="bg-slate-600/30 w-full backdrop-blur-lg rounded-xl cursor-pointer hover:border-2 hover:border-blue-500">
        <CustomChar onOpen={onOpen} />
      </div>
      {ImageList.map((obj, index) => {
        return (
          <div
            key={index}
            className="bg-slate-600/30 w-full backdrop-blur-lg rounded-xl cursor-pointer hover:border-2 hover:border-blue-500"
          >
            <Image
              className="rounded-xl"
              src={obj.name}
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
              onClick={() => {
                setUrl(obj.url + "?morphTargets=ARKit");
                toggleVisibility();
              }}
            />
          </div>
        );
      })}
    </motion.nav>
  );
}
