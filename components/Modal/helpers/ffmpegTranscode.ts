import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { MutableRefObject } from "react";
import { load } from "./ffmpegLoad";

export const transcode = async (
  videoURL: string,
  ffmpegRef: MutableRefObject<FFmpeg>,
  setLoading: (status: boolean) => void
) => {
  setLoading(true);
  await load(ffmpegRef);
  const ffmpeg = ffmpegRef.current;
  await ffmpeg.writeFile("input.webm", await fetchFile(videoURL));
  await ffmpeg.exec(["-i", "input.webm", "output.gif"]);
  await ffmpeg.exec([
    "-i",
    "input.webm",
    "-vf",
    "palettegen",
    "_tmp_palette.png",
  ]);
  await ffmpeg.exec([
    "-i",
    "input.webm",
    "-i",
    "_tmp_palette.png",
    "-filter_complex",
    "paletteuse",
    "-r",
    "10",
    "output.gif",
  ]);
  const fileData = await ffmpeg.readFile("output.gif");
  const data = new Uint8Array(fileData as ArrayBuffer);
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: "image/gif" })
  );
  console.log(url);
  setLoading(false);
  return url;
};
