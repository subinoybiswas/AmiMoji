import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { generate } from "random-words";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL, fetchFile } from "@ffmpeg/util";
import { MutableRefObject, useRef } from "react";
import { transcode } from "./helpers/ffmpegTranscode";
export default function ModalScreen({
  modalProps,
}: {
  modalProps: {
    isOpen: boolean;
    onOpenChange: () => void;
    videoURL: string;
  };
}) {
  const ffmpegRef = useRef(new FFmpeg());
  const { isOpen, onOpenChange, videoURL } = modalProps;

  const handleDownload = async (mode: string) => {
    if (mode === "video") {
      try {
        // Fetch the video file as a blob
        const response = await fetch(videoURL);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `amimoji_video_${generate({
          exactly: 2,
          join: "_",
        })}.mp4`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error downloading video:", error);
      }
    } else if (mode === "gif") {
      try {
        const url = await transcode(videoURL, ffmpegRef);

        const link = document.createElement("a");
        link.href = url;
        link.download = `amimoji_gif_${generate({
          exactly: 2,
          join: "_",
        })}.gif`;
        link.style.display = "none";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error converting to GIF:", error);
      }
    }
  };

  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      radius="lg"
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Configure AmiMoji
            </ModalHeader>
            <ModalBody>
              {videoURL && videoURL.length > 0 && (
                <>
                  <video autoPlay className="" src={videoURL}></video>
                  <Tabs aria-label="Options">
                    <Tab key="video" title="Video">
                      <Card>
                        <Button onClick={() => handleDownload("video")}>
                          Download Video
                        </Button>
                      </Card>
                    </Tab>
                    <Tab key="gif" title="GIF">
                      <Card>
                        <Button onClick={() => handleDownload("gif")}>
                          Download GIF
                        </Button>
                      </Card>
                    </Tab>
                  </Tabs>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
