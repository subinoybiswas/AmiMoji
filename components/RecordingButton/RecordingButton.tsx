import animationData from "@/app/static/recordingani.json";
import Lottie from "react-lottie";

export function RecordingButton({
  toggleRecording,
  isRecording,
}: {
  toggleRecording: () => void;
  isRecording: boolean;
}) {
  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="bottom-0 fixed p-6">
      <div className="grid grid-flow-col gap-1 min-w-1/4   self-center place-items-center bg-slate-400/50 p-0.5 rounded-3xl ">
        <button onClick={toggleRecording}>
          <Lottie
            options={defaultOptions}
            height={50}
            width={50}
            isStopped={!isRecording}
          />
        </button>
      </div>
    </div>
  );
}
