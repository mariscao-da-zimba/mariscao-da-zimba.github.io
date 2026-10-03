// The channel's three Shorts; titles and ownership verified via YouTube on 03/10/2026.
// Keep the published "Turma do Mar" title, rather than silently renaming the work.
export const musicChannel = {
  name: "Mariscao",
  url: "https://www.youtube.com/@mariscaodazimba",
} as const;

export const musicVideos = [
  { videoId: "EczZf3JCFgY", title: "Vem com a turma da maré.",
    url: "https://www.youtube.com/shorts/EczZf3JCFgY",
    image: "/images/official/turma-da-mare-EczZf3JCFgY.jpg" },
  { videoId: "gq3BJ_1M11k", title: "Rosa de ouro.",
    url: "https://www.youtube.com/shorts/gq3BJ_1M11k",
    image: "/images/official/turma-da-mare-gq3BJ_1M11k.jpg" },
  { videoId: "BcA7YE2Vt9s", title: "Vem brincar com a Turma do Mar.",
    url: "https://www.youtube.com/shorts/BcA7YE2Vt9s",
    image: "/images/official/turma-da-mare-BcA7YE2Vt9s.jpg" },
] as const;
