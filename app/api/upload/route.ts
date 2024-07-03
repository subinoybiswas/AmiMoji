import path from "path";
import fs from "fs";

import { generateRandomFilename } from "@/app/helpers/generateFileName";
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { firebaseConfig } from "@/app/secrets/firebase";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app, `gs://${process.env.STORAGE_BUCKET}`);

export async function POST(req: Request) {
  const storageRef = ref(storage, `uploads/${generateRandomFilename(10)}`);
  const filePath = path.join(process.cwd(), "uploads", "video.webm");

  // Ensure the uploads directory exists
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
  }

  const files = await req.formData();
  const file = files.get("file") as Blob;
  if (file.size < 100) {
    return Response.json({ message: "File size too small" }, { status: 400 });
  }
  const fileArray = file.arrayBuffer();

  // Write the blob (file) to the specified filePath
  try {
    fs.writeFileSync(filePath, Buffer.from(await fileArray));
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return Response.json(
      {
        url: downloadURL,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error saving file:", err);
    return Response.json({ message: "Failed to save file" }, { status: 500 });
  }
}
