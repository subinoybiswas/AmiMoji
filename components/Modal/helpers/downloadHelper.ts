import { generate } from "random-words";
import { RefObject } from "react";
export const downloadHelper = async (
  url: string,
  filetype: string,
  linkRef: RefObject<HTMLAnchorElement>
) => {
  if (linkRef.current) {
    try {
      const link = linkRef.current;
      link.href = url;
      link.download = `amimoji_${generate({
        exactly: 2,
        join: "_",
      })}.${filetype}`;

      link.click();
    } catch (error: any) {
      throw new Error("Error downloading video:", error);
    }
  }
};
