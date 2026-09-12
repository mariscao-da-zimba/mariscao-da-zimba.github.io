import type { Metadata } from "next";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function createPageMetadata({ title, description, path, image = "/og.jpg", imageWidth = 1200, imageHeight = 630 }: PageMetadataInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Mariscão da Zimba",
      type: "website",
      locale: "pt_BR",
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
