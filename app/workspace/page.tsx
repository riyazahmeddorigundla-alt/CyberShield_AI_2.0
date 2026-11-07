"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { Activity, ArrowRight, ArrowUpRight, CheckCircle2, ClipboardCheck, Fingerprint, Gauge, Inbox, MailWarning, Radar, ShieldAlert } from "lucide-react";
import { ActivityChart } from "@/components/activity-chart";
import { demoCases } from "@/lib/demo-data";

const metrics = [
  { label: "Illustrative scans", value: "1,284", foot: "SAMPLE DATASET", accent: "#66f5ee", icon: Inbox, shine: "#66f5ee2c" },
  { label: "Flagged for review", value: "187", foot: "DEMO COUNT", accent: "#fb788b", icon: MailWarning, shine: "#fb788b2c" },
  { label: "Open demo cases", value: "03", foot: "IN-MEMORY EXAMPLES", accent: "#fac67a", icon: ShieldAlert, shine: "#fac67a27" },
  { label: "Resolved examples", value: "94%", foot: "ILLUSTRATIVE ONLY", accent: "#a58bff", icon: Gauge, shine: "#a58bff2c" },
];

export default function Dashboard() {
  return <>
    <div className="page-heading"><div><div className="eyebrow">COMMAND CENTER / OVERVIEW</div><h1>Your security <span className="gradient-text">at a glance.</span></h1><p>A purpose-built investigation workspace. All metrics below are clearly labeled demonstration content until the Python API is connected.</p></div><Link href="/workspace/scanner" className="btn btn-primary">NEW INSPECTION <ArrowRight size={15}/></Link></div>
    <div className="notice"><strong>PHASE 1 · FRONTEND PROTOTYPE</strong> &nbsp;The layout, filters and local email inspection work in the browser. Case metrics and investigation records are demo data—not real ML detections or live alerts.</div>
    <div className="kpi-grid">{metrics.map((m, i) => <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i*.08 }} key={m.label} className="panel kpi-card" style={{ "--accent": m.accent, "--shine": m.shine } as React.CSSProperties}><div className="kpi-icon"><m.icon size={17}/></div><div className="kpi-label">{m.label}</div><div className="kpi-value">{m.value}</div><div className="kpi-foot">{m.foot}</div></motion.div>)}</div>
    <div className="workspace-grid"><section className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">ANALYTICS / 001</div><div className="panel-title" style={{ marginTop: 9 }}>Investigation activity</div></div><span className="pill">DEMO TREND</span></div><ActivityChart/><div className="chart-foot">ILLUSTRATIVE TREND — REAL HISTORICAL SCANS WILL APPEAR AFTER API INTEGRATION</div></section>
      <section className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">EVENT STREAM / 002</div><div className="panel-title" style={{ marginTop: 9 }}>Recent demo activity</div></div><Activity size={17} color="#66f5ee"/></div><div className="activity-list">{[
        { icon: ShieldAlert, title: "Case CS-1042 escalated", sub: "Priority: Critical · Investigation open", time: "10:42" },
        { icon: Radar, title: "Demo indicator correlated", sub: "account-review.example", time: "09:57" },
        { icon: ClipboardCheck, title: "Case CS-1040 resolved", sub: "Analyst review complete (sample)", time: "08:24" },
        { icon: Fingerprint, title: "Indicator review staged", sub: "Structural-analysis example", time: "YEST." },
      ].map((item,i) => <div className="activity-item" key={i}><div className="activity-marker"><item.icon size={16}/></div><div><h4>{item.title}</h4><p>{item.sub}</p></div><time>{item.time}</time></div>)}</div></section>
    </div>
    <section className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">INVESTIGATION QUEUE / 003</div><div className="panel-title" style={{ marginTop: 9 }}>Case preview</div></div><Link href="/workspace/cases" className="tag">VIEW ALL CASES <ArrowUpRight size={12}/></Link></div><div className="table-wrap"><table className="data-table"><thead><tr><th>Case</th><th>Subject</th><th>Priority</th><th>Status</th><th>Owner</th></tr></thead><tbody>{demoCases.slice(0,4).map(c=><tr key={c.id}><td><Link href="/workspace/cases" className="case-id">{c.id}</Link></td><td>{c.subject}</td><td><span className={`pill ${c.priority.toLowerCase()}`}>{c.priority}</span></td><td><span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span></td><td>{c.owner}</td></tr>)}</tbody></table></div></section>
    <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between", gap: 20, alignItems: "center", flexWrap: "wrap" }}><div style={{ color: "#7892a7", fontSize: 11 }}><CheckCircle2 color="#76eac4" size={13} style={{ display: "inline-block", marginRight: 7 }}/>Local-only prototype. No messages are uploaded to a server.</div><Link href="/workspace/intelligence" className="btn btn-ghost">EXPLORE THREAT GRAPH <ArrowRight size={15}/></Link></div>
  </>;
}
