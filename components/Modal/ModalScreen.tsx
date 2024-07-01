import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
} from "@nextui-org/react";
import { generate, count } from "random-words";
export default function ModalScreen({
  modalProps,
}: {
  modalProps: {
    isOpen: boolean;
    onOpenChange: () => void;
    videoURL: string;
  };
}) {
  const { isOpen, onOpenChange, videoURL } = modalProps;
  const handleDownload = async () => {
    try {
      // Fetch the video file as a blob
      const response = await fetch(videoURL);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `amimoji_${generate({ exactly: 2, join: "_" })}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading video:", error);
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
                  <Button onClick={handleDownload}>Download</Button>
                </>
              )}
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
