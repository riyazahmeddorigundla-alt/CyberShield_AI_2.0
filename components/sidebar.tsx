"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, ArrowUpRight, Boxes, FileSearch, LayoutDashboard, MailSearch, Menu, Radar, ShieldCheck, X } from "lucide-react";
import { Brand } from "@/components/brand";

const links = [
  { href: "/workspace", label: "Command Center", icon: LayoutDashboard },
  { href: "/workspace/scanner", label: "Email Investigation", icon: MailSearch },
  { href: "/workspace/cases", label: "Case Management", icon: FileSearch },
  { href: "/workspace/intelligence", label: "Threat Graph", icon: Radar },
];

export function WorkspaceShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showMobile, setShowMobile] = useState(false);
  const current = links.find((l) => l.href === pathname)?.label ?? "Workspace";
  return (
    <div className="workspace-shell">
      {showMobile && <button aria-label="Close navigation" className="sidebar-backdrop" onClick={() => setShowMobile(false)}/>}
      <aside className={`sidebar${showMobile ? " show" : ""}`}>
        <div className="sidebar-top"><Brand link="/"/></div>
        <div className="sidebar-group"><div className="sidebar-label">01 / OPERATIONS</div>
          <nav aria-label="Workspace navigation">
            {links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} onClick={() => setShowMobile(false)} className={`sidebar-link${pathname === href ? " active" : ""}`}><Icon size={17}/>{label}</Link>)}
          </nav>
        </div>
        <div className="sidebar-group"><div className="sidebar-label">02 / PLATFORM</div>
          <Link className="sidebar-link" href="/"><Boxes size={17}/> Product Overview <ArrowUpRight size={13} style={{ marginLeft: "auto" }}/></Link>
        </div>
        <div className="sidebar-bottom"><div className="mode-card"><Activity className="mode-icon" size={19}/><h4>Frontend demo mode</h4><p>Sample cases are not real incidents. The Python ML API will be connected in Phase 2.</p></div><div style={{ fontSize: 10, color: "#70899f", marginTop: 18, letterSpacing: ".12em" }}>CYBERSHIELD AI / BUILD 0.1</div></div>
      </aside>
      <div className="workspace-main">
        <header className="workspace-topbar"><div style={{ display: "flex", gap: 16, alignItems: "center" }}><button className="mobile-toggle" aria-label={showMobile ? "Close menu" : "Open menu"} onClick={() => setShowMobile((s) => !s)}>{showMobile ? <X size={20}/> : <Menu size={20}/>}</button><span className="workspace-crumb">CYBERSHIELD <span style={{ color: "#4a6479" }}> / </span> <strong>{current.toUpperCase()}</strong></span></div><div className="workspace-topright"><span className="tag purple"><ShieldCheck size={11}/> DEMO ENVIRONMENT</span><span className="top-time">LOCAL WORKSPACE</span></div></header>
        <main className="workspace-body">{children}</main>
      </div>
    </div>
  );
}
