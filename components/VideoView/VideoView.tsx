"use client";
import React, { useEffect, useRef, useState, createRef, Suspense } from "react";
import { Color, Euler, Matrix4 } from "three";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "./helper/Avatar";
import { Button, useDisclosure } from "@nextui-org/react";
import { Loading } from "./helper/Loading";
import { Spinner } from "@nextui-org/spinner";
import {
  Category,
  FaceLandmarker,
  FilesetResolver,
} from "@mediapipe/tasks-vision";
import options from "@/app/helpers/faceLandMarks";
import { Preload, Loader } from "@react-three/drei";
import ModalScreen from "../Modal/ModalScreen";
import { Controls } from "./helper/Controls";
import { RecordingButton } from "../RecordingButton/RecordingButton";
import { useProgress } from "@react-three/drei";
import toast from "react-hot-toast";
export default function VideoView({
  displayToggle,
  url,
  setUrl,
}: {
  displayToggle: boolean;
  url: string;
  setUrl: (url: string) => void;
}) {
  let video: HTMLVideoElement;
  let faceLandmarker: FaceLandmarker | null = null;
  let lastVideoTime = -1;
  const [blendshapes, setBlendshapes] = useState<Category[] | null>(null);
  const [rotation, setRotation] = useState<Euler | null>(null);
  const avatarRef = createRef<HTMLCanvasElement>();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isRecording, setIsRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string>("");
  const [recordedBlobs, setRecordedBlobs] = useState<Blob[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [stream, setStream] = useState<MediaStream>();
  const [newBlob, setNewBlob] = useState<Blob>();
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<number[]>([0, -1.75, 3]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalProps = {
    isOpen,
    onOpenChange,
    videoURL,
    setUrl,
    onClose,
    toast,
  };

  useEffect(() => {
    const setup = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      faceLandmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        options
      );

      if (videoRef.current) {
        const video = videoRef.current;

        navigator.mediaDevices
          .getUserMedia({
            video: { width: 1280, height: 720 },
            audio: false,
          })
          .then((stream) => {
            stream.addEventListener("loadeddata", () => {
              console.log("loadeddata");
            });

            video.srcObject = stream;
            video.addEventListener("loadeddata", predict);
            video.style.transform = "scaleX(-1)";
          });
      }
    };
    setup();

    const canvas = avatarRef.current;
    // Capture stream from canvas
    const canvasStream = canvas?.captureStream();
    setStream(canvasStream);

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (canvasStream) {
        canvasStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.onstop = handleStop;
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start(100); // collect 100ms of data
      console.log("MediaRecorder started", mediaRecorder);
    }
  }, [mediaRecorder]);

  const predict = async () => {
    let nowInMs = Date.now();
    const video = videoRef.current;
    if (video) {
      if (faceLandmarker && lastVideoTime !== video.currentTime) {
        lastVideoTime = video.currentTime;
        const faceLandmarkerResult = faceLandmarker.detectForVideo(
          video,
          nowInMs
        );

        if (
          faceLandmarkerResult.faceBlendshapes &&
          faceLandmarkerResult.faceBlendshapes.length > 0 &&
          faceLandmarkerResult.faceBlendshapes[0].categories
        ) {
          setBlendshapes(faceLandmarkerResult.faceBlendshapes[0].categories);

          const matrix = new Matrix4().fromArray(
            faceLandmarkerResult.facialTransformationMatrixes![0].data
          );
          setRotation(new Euler().setFromRotationMatrix(matrix));
        }
      }
    }
    requestAnimationFrame(predict);
  };

  const handleDataAvailable = (event: any) => {
    if (event.data && event.data.size > 0) {
      setRecordedBlobs((prevBlobs) => [...prevBlobs, event.data]);
    }
  };

  const handleStop = (event: any) => {
    console.log("Recorder stopped: ", event);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };
  const { progress } = useProgress();
  const startRecording = () => {
    let options = { mimeType: "video/webm", videoBitsPerSecond: 5000000 };
    setRecordedBlobs([]);
    try {
      if (stream === undefined) {
        console.log("Stream is undefined");
        return;
      }
      let recorder = new MediaRecorder(stream, options);
      setMediaRecorder(recorder);
      // setIsStopped(false);
    } catch (e0) {
      console.log("Unable to create MediaRecorder with options Object: ", e0);
    }
    console.log(
      "Created MediaRecorder",
      mediaRecorder,
      "with options",
      options
    );
    if (mediaRecorder === undefined) {
      return;
    }
    mediaRecorder.onstop = handleStop;
    mediaRecorder.ondataavailable = handleDataAvailable;
    mediaRecorder.start(100); // collect 100ms of data
    console.log("MediaRecorder started", mediaRecorder);
  };

  const stopRecording = async () => {
    if (mediaRecorder === undefined) {
      console.log("MediaRecorder is undefined");
      return;
    }
    mediaRecorder.stop();
    console.log("Recorded Blobs: ", recordedBlobs);
    const blob = new Blob(recordedBlobs, { type: "video/webm" });
    setNewBlob(blob);

    const formData = new FormData();
    formData.append("file", blob, "video.webm");
    setIsLoading(true);
    const resp = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await resp.json();
    console.log("data", data, resp.status);
    if (resp.status === 200) {
      setVideoURL(data.url);
      setIsLoading(false);
      onOpen();
    }
  };

  return (
    <div
      className="flex flex-col justify-center content-center items-center h-full w-full  rounded-xl shadow-2xl"
      style={{ aspectRatio: 16 / 9, transition: "all 0.5s ease-in-out" }}
    >
      <video
        ref={videoRef}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: "1.5rem",
          display: displayToggle ? "none" : "",
          aspectRatio: 16 / 9,
          position: "relative",
          zIndex: 2,
        }}
        id="vid"
        autoPlay
      ></video>
      {isLoading && <Spinner size="lg" className="absoulte top-[50%] z-[20]" />}
      {displayToggle && (
        <Suspense fallback={<div>Loading..</div>}>
          <Canvas
            ref={avatarRef}
            style={{
              // aspectRatio: 16 / 9,

              height: "400px",
              width: "400px",
            }}
            camera={{ fov: 14 }}
            shadows
          >
            <Preload all />
            <ambientLight intensity={1.4} />
            {/* <pointLight
              position={[10, 10, 10]}
              color={new Color(1, 1, 0)}
              intensity={0.5}
              castShadow
            />
            <pointLight
              position={[-10, 0, 10]}
              color={new Color(1, 0, 0)}
              intensity={0.5}
              castShadow
            /> */}
            {/* <pointLight position={[0, 20, 10]} intensity={0.5} castShadow /> */}
            <Suspense fallback={<Loading progress={progress} />}>
              {blendshapes && rotation && (
                <Avatar
                  url={url}
                  blendshapes={blendshapes}
                  rotation={rotation}
                  position={position}
                  // headMesh={headMesh}
                />
              )}
            </Suspense>
          </Canvas>
        </Suspense>
      )}
      <Controls setPosition={setPosition} />

      <RecordingButton
        isRecording={isRecording}
        toggleRecording={toggleRecording}
      />

      {/* <Button onPress={onOpen} color="secondary">
            Open Modal
          </Button> */}

      <ModalScreen modalProps={modalProps} />
    </div>
  );
}
