import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { MutableRefObject } from "react";
import { load } from "./ffmpegLoad";

export const transcode = async (
  videoURL: string,
  ffmpegRef: MutableRefObject<FFmpeg>
) => {
  await load(ffmpegRef);
  const ffmpeg = ffmpegRef.current;
  await ffmpeg.writeFile("input.webm", await fetchFile(videoURL));
  await ffmpeg.exec(["-i", "input.webm", "output.gif"]);
  const fileData = await ffmpeg.readFile("output.gif");
  const data = new Uint8Array(fileData as ArrayBuffer);
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: "image/gif" })
  );
  console.log(url);
  return url;
};
