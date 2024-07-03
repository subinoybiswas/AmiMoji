"use client";
import VideoView from "@/components/VideoView/VideoView";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModelModalScreen from "@/components/Modal/ModelModalScreen";
import { CustomChar } from "./CustomCharBtn";
export default function Home() {
  const displayToggle = true;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: "-100%" },
  };

  const ImageList = [
    {
      name: "/main.png",
      url: "https://models.readyplayer.me/65e5840c374014375e404085.glb",
    },
    {
      name: "/char1.png",
      url: "https://models.readyplayer.me/66850492a6014cc4b10c5a00.glb",
    },
    {
      name: "/char2.png",
      url: "https://models.readyplayer.me/6684fa97a6014cc4b10c39fe.glb",
    },
  ];

  const [url, setUrl] = useState<string>(
    "https://models.readyplayer.me/65e5840c374014375e404085.glb?morphTargets=ARKit"
  );

  
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const modalProps = {
    isOpen,
    onOpenChange,
    setUrl,
    onClose,
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/bg.svg')] bg-cover ">
      {/* {Background taken from https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/} */}
      <div className="fixed h-full w-full backdrop-blur-lg">
        {/* <section className="bg-gray-900 text-white">
    <div className="mx-auto max-w-3xl text-center">
    <h1
    className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
    >
    Understand User Flow.
    
    <span className="sm:block"> Increase Conversion. </span>
    </h1>
    
    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
    numquam ea!
    </p>
    
    <div className="mt-8 flex flex-wrap justify-center gap-4">
    <a
    className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
    href="#"
    >
    Get Started
    </a>
    
    <a
    className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
    href="#"
    >
    Learn More
    </a>
    </div>
    </div>
    </section> */}
        <div className="flex flex-col items-center justify-between  min-h-screen">
          <div className="fixed bg-slate-600/30 w-3/4 backdrop-blur-lg h-3/4 rounded-xl p-5 items-center">
            <motion.nav
              className=" fixed flex flex-col bg-slate-600/30 w-1/4 scrolltarget backdrop-blur-lg h-[90%] rounded-xl p-3 gap-2 overflow-y-scroll"
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
                      }}
                    />
                  </div>
                );
              })}
            </motion.nav>
            <Button
              onClick={toggleVisibility}
              className="top-5 m-2 fixed"
              isIconOnly
            >
              <Sparkles size={16} strokeWidth={3} />
            </Button>
            <VideoView
              displayToggle={displayToggle}
              url={url}
              setUrl={setUrl}
            />
          </div>
          <ModelModalScreen modalProps={modalProps} />
        </div>
      </div>
    </main>
  );
}
