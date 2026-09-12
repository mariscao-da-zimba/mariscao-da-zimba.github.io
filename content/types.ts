export type EvidenceLevel = "official" | "institutional" | "project-material" | "press" | "oral-history" | "pending-validation";
export type ProjectStatus = "current" | "historical" | "permanent" | "archive" | "development";
export interface SourceRef { id: string; title: string; institution: string; url?: string; level: EvidenceLevel }
export interface ContentLink { label: string; href: string; external?: boolean }
export interface Project { slug: string; title: string; excerpt: string; description: string; details?: string[]; status: ProjectStatus; year?: string; categories: string[]; resources?: ContentLink[]; sources?: string[] }
export interface Landmark { slug: string; name: string; category: string; description: string; longDescription?: string; culturalThemes: string[]; environmentalThemes: string[]; location?: string; latitude?: number; longitude?: number; sources?: string[] }
export interface EventItem { title: string; date: string; time?: string; address?: string; description: string; category: string; status: "upcoming" | "past"; link?: string }
