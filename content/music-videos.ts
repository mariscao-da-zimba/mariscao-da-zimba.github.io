import { memoryVideo } from "./memory-video";

// Channel listing, oEmbed and formats checked on 08/10/2026.
// Keep the published "Turma do Mar" title, rather than silently renaming the work.
export const musicChannel = {
  name: "Mariscao",
  url: "https://www.youtube.com/@mariscaodazimba",
} as const;

export type MusicVideo = {
  videoId: string;
  title: string;
  url: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  format: "short" | "video";
  sourceId: string;
  durationLabel?: string;
  artworkWidth?: number;
};

export const musicSelectionCheckedOn = "2026-10-08";

// Newest first; Home previews three, Cultura preserves the complete selection.
// The creator explicitly includes Memórias Afetivas in this musical selection.
export const musicVideos: readonly MusicVideo[] = [
  { ...memoryVideo, format: "video", sourceId: "memorias-afetivas" },
  { videoId: "MNs9cumpuG4", title: "Voa Butiazinho.",
    url: "https://www.youtube.com/shorts/MNs9cumpuG4",
    image: "/images/official/turma-da-mare-MNs9cumpuG4.jpg",
    imageWidth: 360, imageHeight: 396, format: "short", durationLabel: "0min30", sourceId: "musica-voa-butiazinho" },
  { videoId: "NKE_dPCSaS8", title: "Boi de Mamão.",
    url: "https://www.youtube.com/shorts/NKE_dPCSaS8",
    image: "/images/official/turma-da-mare-NKE_dPCSaS8.jpg",
    imageWidth: 360, imageHeight: 640, format: "short", durationLabel: "0min59", sourceId: "musica-boi-de-mamao" },
  { videoId: "cr5e8GIuJRY", title: "Circo da Maré",
    url: "https://www.youtube.com/shorts/cr5e8GIuJRY",
    image: "/images/official/turma-da-mare-cr5e8GIuJRY.jpg",
    imageWidth: 1280, imageHeight: 720, format: "short", durationLabel: "2min54", sourceId: "musica-circo-da-mare" },
  { videoId: "SYe6g2kYT4k", title: "Caça ao tesouro.",
    url: "https://www.youtube.com/shorts/SYe6g2kYT4k",
    image: "/images/official/turma-da-mare-SYe6g2kYT4k.jpg",
    imageWidth: 1280, imageHeight: 720, format: "short", durationLabel: "2min25", artworkWidth: 658, sourceId: "musica-caca-ao-tesouro" },
  { videoId: "EczZf3JCFgY", title: "Vem com a turma da maré.",
    url: "https://www.youtube.com/shorts/EczZf3JCFgY",
    image: "/images/official/turma-da-mare-EczZf3JCFgY.jpg",
    imageWidth: 1280, imageHeight: 720, format: "short", sourceId: "musica-turma-mare" },
  { videoId: "gq3BJ_1M11k", title: "Rosa de ouro.",
    url: "https://www.youtube.com/shorts/gq3BJ_1M11k",
    image: "/images/official/turma-da-mare-gq3BJ_1M11k.jpg",
    imageWidth: 1280, imageHeight: 720, format: "short", sourceId: "musica-rosa-ouro" },
  { videoId: "BcA7YE2Vt9s", title: "Vem brincar com a Turma do Mar.",
    url: "https://www.youtube.com/shorts/BcA7YE2Vt9s",
    image: "/images/official/turma-da-mare-BcA7YE2Vt9s.jpg",
    imageWidth: 1280, imageHeight: 720, format: "short", sourceId: "musica-turma-mar" },
] as const;
