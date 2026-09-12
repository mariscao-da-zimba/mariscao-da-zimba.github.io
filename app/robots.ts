import type { MetadataRoute } from "next";
const publicUrl=(process.env.NEXT_PUBLIC_SITE_URL||"http://localhost:4173").replace(/\/$/,"");
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/"},sitemap:`${publicUrl}/sitemap.xml`}}
