const CLOUD_NAME = "shahdan-store";
const UPLOAD_PRESET = "shahdan_products";

export async function uploadToCloudinary(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await response.json();

  if (!data.secure_url) {
    console.error("Cloudinary upload error:", data);
    throw new Error("فشل رفع الصورة");
  }

  return data.secure_url;
}
