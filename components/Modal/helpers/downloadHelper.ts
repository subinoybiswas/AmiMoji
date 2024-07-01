import { generate } from "random-words";
export const downloadHelper = async (url: string, filetype: string) => {
    try {
      const link = document.createElement("a");
      link.href = url;
      link.download = `amimoji_${generate({
        exactly: 2,
        join: "_",
      })}.${filetype}`;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error: any) {
      throw new Error("Error downloading video:", error);
    }
  };