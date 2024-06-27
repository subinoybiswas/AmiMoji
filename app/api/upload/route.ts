import path from "path";
import fs from "fs";

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "uploads", "video.webm");

  // Ensure the uploads directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const files = await req.formData();
  const file = files.get("file") as Blob;
  const fileArray = file.arrayBuffer();

  // Write the blob (file) to the specified filePath
  try {
    fs.writeFileSync(filePath, Buffer.from(await fileArray));
    return Response.json({ message: "File uploaded successfully" });
  } catch (err) {
    console.error("Error saving file:", err);
    return Response.json({ message: "Failed to save file" }, { status: 500 });
  }
}
