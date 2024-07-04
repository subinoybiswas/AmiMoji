"use client";

import { Suspense, useState } from "react";
import { Sparkles } from "lucide-react";
import { Button, useDisclosure } from "@nextui-org/react";
import ModelModalScreen from "@/components/Modal/ModelModalScreen";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import { SideBar } from "@/components/SideBar/Sidebar";
import { LandingPage } from "@/components/LandingPage/LandingPage";
const VideoView = dynamic(() => import("@/components/VideoView/VideoView"), {
  ssr: false,
});

export default function Home() {
  const [displayToggle, setDisplayToggle] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [url, setUrl] = useState<string>("/default.glb");

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const modalProps = {
    isOpen,
    onOpenChange,
    setUrl,
    onClose,
    toast,
    toggleVisibility,
  };
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-[url('/bg.svg')] bg-cover ">
          {/* {Background taken from https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/} */}
          <div className="font-tiny text-4xl fixed left-0 top-0 p-5">
            AmiMoji
          </div>
          <div className="fixed h-full w-full backdrop-blur-lg">
            {displayToggle ? (
              <div className="flex flex-col items-center justify-between  min-h-screen">
                <div className="fixed bg-slate-600/30 md:w-3/4 w-full backdrop-blur-lg h-3/4 rounded-xl p-5 items-center">
                  <SideBar
                    isVisible={isVisible}
                    toggleVisibility={toggleVisibility}
                    onOpen={onOpen}
                    setUrl={setUrl}
                  />
                  <Button
                    onClick={toggleVisibility}
                    className="top-5 m-2 fixed z-[40]"
                    isIconOnly
                  >
                    <Sparkles size={16} strokeWidth={3} />
                  </Button>
                  <Suspense fallback={<div>Loading...</div>}>
                    <VideoView
                      displayToggle={displayToggle}
                      url={url}
                      setUrl={setUrl}
                    />
                  </Suspense>
                </div>
                <ModelModalScreen modalProps={modalProps} />
              </div>
            ) : (
              <LandingPage setDisplayToggle={setDisplayToggle} />
            )}
          </div>
          <Toaster
            toastOptions={{
              style: {
                padding: "12px",
                color: "#FFFFFF",
                borderRadius: "12px",
                backgroundColor: "rgba(31, 41, 55, 0.8)", // 20% transparent background
                backdropFilter: "blur(10px)",
              },
            }}
          />
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
