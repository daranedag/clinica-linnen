export const imageKitEndpoint =
  process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/$/, "") || "";

export function isImageKitConfigured() {
  return imageKitEndpoint.startsWith("https://ik.imagekit.io/");
}
