"use client";
/* eslint-disable @next/next/no-img-element -- verified official logo is a local, dimensioned asset */

import Link from "./document-link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "../content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(()=>{
    if(!open)return;
    const onKeyDown=(event:KeyboardEvent)=>{
      if(event.key==="Escape"){setOpen(false);toggleRef.current?.focus();return}
    };
    const onPointerDown=(event:PointerEvent)=>{if(!headerRef.current?.contains(event.target as Node))setOpen(false)};
    // A navigation disclosure is not a modal: Tab must be able to leave it.
    const onFocusIn=(event:FocusEvent)=>{if(!headerRef.current?.contains(event.target as Node))setOpen(false)};
    const desktop=window.matchMedia("(min-width: 1181px)");
    const onBreakpoint=()=>{if(desktop.matches)setOpen(false)};
    document.addEventListener("keydown",onKeyDown);
    document.addEventListener("pointerdown",onPointerDown);
    document.addEventListener("focusin",onFocusIn);
    desktop.addEventListener("change",onBreakpoint);
    const focusFrame=requestAnimationFrame(()=>navRef.current?.querySelector<HTMLAnchorElement>("a")?.focus());
    return()=>{document.removeEventListener("keydown",onKeyDown);document.removeEventListener("pointerdown",onPointerDown);document.removeEventListener("focusin",onFocusIn);desktop.removeEventListener("change",onBreakpoint);cancelAnimationFrame(focusFrame)};
  },[open]);

  const current=(href:string)=>href==="/"?pathname==="/":pathname===href||pathname.startsWith(`${href}/`);

  return <header ref={headerRef} className="site-header">
    <Link className="brand" href="/" aria-label="Mariscão da Zimba — início" onClick={()=>setOpen(false)}><span className="brand-logo-frame" aria-hidden="true"><img src="/images/official/mariscao-logo-facebook.jpg" width="932" height="951" alt="" fetchPriority="high" /></span><span>Mariscão da Zimba<small>Centro Cultural e Turístico</small></span></Link>
    <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open?"Fechar menu":"Abrir menu"} aria-expanded={open} aria-controls="main-menu" onClick={()=>setOpen((value)=>!value)}><span className="sr-only">{open?"Fechar":"Abrir"} menu</span>{open?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button>
    <nav ref={navRef} id="main-menu" className={open?"open":""} aria-label="Navegação principal">{site.nav.slice(1).filter(([,href])=>href!=="/caminho-dos-butiazais").map(([label,href])=><Link key={href} href={href} aria-current={current(href)?"page":undefined} onClick={()=>setOpen(false)}>{label}</Link>)}<Link className="nav-cta" href="/caminho-dos-butiazais" aria-current={current("/caminho-dos-butiazais")?"page":undefined} onClick={()=>setOpen(false)}>Conheça o Caminho</Link></nav>
  </header>;
}
