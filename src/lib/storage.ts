import { createClient } from "@/lib/supabase/client";

const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif"];
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!IMAGE_TYPES.includes(file.type)) {
    throw new Error("Use a JPG, PNG, WebP or AVIF image.");
  }
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image must be under 5 MB.");
  }

  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 40) || "image";
  const path = `${folder}/${crypto.randomUUID()}-${base}.${ext}`;

  const { error } = await supabase.storage
    .from("images")
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw new Error(error.message);

  return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
}

const FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
];
const MAX_FILE_BYTES = 25 * 1024 * 1024;

export async function uploadFile(
  file: File,
  folder: string,
): Promise<{ url: string; name: string; size: number }> {
  if (!FILE_TYPES.includes(file.type)) {
    throw new Error("Use a PDF, Word or Excel file.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("File must be under 25 MB.");
  }

  const supabase = createClient();
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "pdf";
  const base =
    file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 50) || "file";
  const path = `${folder}/${crypto.randomUUID()}-${base}.${ext}`;

  const { error } = await supabase.storage
    .from("files")
    .upload(path, file, { cacheControl: "31536000", contentType: file.type });
  if (error) throw new Error(error.message);

  return {
    url: supabase.storage.from("files").getPublicUrl(path).data.publicUrl,
    name: file.name,
    size: file.size,
  };
}