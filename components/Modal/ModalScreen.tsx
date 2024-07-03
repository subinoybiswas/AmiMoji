import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  Spinner,
} from "@nextui-org/react";
import { Tabs, Tab, Card } from "@nextui-org/react";
import { downloadHelper } from "./helpers/downloadHelper";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useRef, useState } from "react";
import { transcode } from "./helpers/ffmpegTranscode";
import { load } from "./helpers/ffmpegLoad";

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
  const [loading, setLoading] = useState(false);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleDownload = async (mode: string) => {
    if (mode === "video") {
      try {
        // Fetch the video file as a blob
        const response = await fetch(videoURL);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        downloadHelper(url, "mp4", linkRef);
      } catch (error) {
        console.error("Error downloading video:", error);
      }
    } else if (mode === "gif") {
      try {
        const url = await transcode(videoURL, ffmpegRef, setLoading);
        downloadHelper(url, "gif", linkRef);
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
                  <a ref={linkRef} style={{ display: "none" }} />
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
                          {loading ? <Spinner size="sm" className="" /> : <></>}
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
