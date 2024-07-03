import {
  AvatarCreator,
  AvatarCreatorConfig,
  AvatarExportedEvent,
} from "@readyplayerme/react-avatar-creator";
import { Modal, ModalContent } from "@nextui-org/react";
import toast from "react-hot-toast";

export default function ModelModalScreen({
  modalProps,
}: {
  modalProps: {
    isOpen: boolean;
    onOpenChange: () => void;
    setUrl: (url: string) => void;
    onClose: () => void;
    toast: (message: string) => void;
  };
}) {
  const { isOpen, onOpenChange, setUrl, onClose } = modalProps;
  const handleOnAvatarExported = (event: AvatarExportedEvent) => {
    setUrl(event.data.url + "?morphTargets=ARKit&textureAtlas=1024");
    toast.success("New Avatar Created!");

    onClose();
  };

  const config: AvatarCreatorConfig = {
    clearCache: true,
    bodyType: "fullbody",
    quickStart: false,
    language: "en",
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
          <div className=" h-[90vh] flex items-center content-center justify-center pt-10">
            <AvatarCreator
              subdomain="amimoji"
              config={config}
              style={{
                width: "100%",
                height: "100%",
              }}
              onAvatarExported={handleOnAvatarExported}
            />
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
