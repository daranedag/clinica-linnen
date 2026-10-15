"use client";

import { Image as ImageKitImage } from "@imagekit/next";
import NextImage, { type ImageProps } from "next/image";

type ClinicImageProps = Omit<ImageProps, "src"> & {
  imageKitPath: string;
  fallbackSrc: string;
  endpoint: string;
};

export function ClinicImage({
  imageKitPath,
  fallbackSrc,
  endpoint,
  alt,
  ...props
}: ClinicImageProps) {
  if (endpoint) {
    return (
      <ImageKitImage
        urlEndpoint={endpoint}
        src={imageKitPath}
        alt={alt}
        transformation={[{ format: "auto", quality: 82 }]}
        {...props}
      />
    );
  }

  return <NextImage src={fallbackSrc} alt={alt} {...props} />;
}
