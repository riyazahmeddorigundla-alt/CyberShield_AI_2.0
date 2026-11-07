"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ClipboardList, Filter, NotebookPen, Search, ShieldCheck, X } from "lucide-react";
import { demoCases, type CaseStatus, type DemoCase } from "@/lib/demo-data";

export default function Cases() {
  const [cases, setCases] = useState<DemoCase[]>(demoCases);
  const [selectedId, setSelectedId] = useState(demoCases[0].id);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Record<string,string>>({});
  const selected = cases.find(c=>c.id===selectedId);
  const matching = useMemo(()=>cases.filter(c=>(filter==="All" || c.status===filter) && `${c.id} ${c.subject} ${c.from}`.toLowerCase().includes(search.trim().toLowerCase())),[cases,filter,search]);
  const changeStatus=(id:string,status:CaseStatus)=>setCases(old=>old.map(c=>c.id===id?{...c,status}:c));
  return <>
    <div className="page-heading"><div><div className="eyebrow">WORKFLOW / CASE MANAGEMENT</div><h1>Every signal. <span className="gradient-text">One case.</span></h1><p>A preview of analyst triage with selectable cases, filters, status changes and local draft notes.</p></div><span className="tag purple"><ClipboardList size={12}/> DEMO CASES ONLY</span></div>
    <div className="notice"><strong>NOT PERSISTED.</strong> Case edits and notes are held in browser memory for this session. They are demonstration records—not incidents, a database, or an audit trail.</div>
    <div className="panel panel-pad" style={{ marginTop: 19 }}><div className="panel-top"><div><div className="panel-kicker">QUEUE / 001</div><div className="panel-title" style={{ marginTop: 9 }}>Investigation queue</div></div><span className="pill">{matching.length} RESULTS</span></div>
      <div className="form-grid" style={{ marginBottom: 20 }}><div style={{ position: "relative" }}><Search size={15} color="#7290a5" style={{ position:"absolute",left:13,top:15 }}/><input className="input" style={{ paddingLeft: 38 }} value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search subject, sender or case ID" aria-label="Search cases" /></div><div style={{ display: "flex", gap: 10, alignItems:"center" }}><Filter size={16} color="#6f98a8"/><select className="select" aria-label="Filter cases by status" value={filter} onChange={e=>setFilter(e.target.value)}>{["All","Open","Investigating","Closed"].map(s=><option key={s} value={s}>{s === "All" ? "All statuses" : s}</option>)}</select></div></div>
      <div className="table-wrap"><table className="data-table"><thead><tr><th>Case</th><th>Subject / Sender</th><th>Priority</th><th>Status</th><th>Indicators</th><th></th></tr></thead><tbody>{matching.map(c=><tr key={c.id}><td><span className="case-id">{c.id}</span></td><td><strong style={{ display: "block", color: "#d8e8f3", fontSize: 12 }}>{c.subject}</strong><span style={{ color: "#688aa1", fontSize: 10 }}>{c.from}</span></td><td><span className={`pill ${c.priority.toLowerCase()}`}>{c.priority}</span></td><td><span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span></td><td>{c.indicators}</td><td><button className="btn btn-ghost" style={{ padding:"8px 12px" }} onClick={()=>setSelectedId(c.id)}>REVIEW</button></td></tr>)}</tbody></table>{matching.length===0&&<p className="tagline">No cases match your filter.</p>}</div>
    </div>
    <AnimatePresence mode="wait">{selected&&<motion.section key={selected.id} initial={{ opacity:0,y:15 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0,y:-10 }} className="panel panel-pad" style={{ marginTop: 18 }}><div className="panel-top"><div><div className="panel-kicker">CASE FILE / {selected.id}</div><div className="panel-title" style={{ marginTop: 10, fontSize: 20 }}>{selected.subject}</div></div><button className="btn btn-ghost" onClick={()=>setSelectedId("")} style={{ padding:9 }} aria-label="Close case details"><X size={17}/></button></div>
    <div className="data-grid" style={{ marginBottom: 17 }}><div className="indicator-row"><ShieldCheck size={18}/><div><span>ASSIGNED ANALYST</span><strong>{selected.owner}</strong></div></div><div className="indicator-row"><NotebookPen size={18}/><div><span>PRIORITY</span><strong>{selected.priority}</strong></div></div></div>
    <div className="form-grid"><div className="field"><label className="field-label" htmlFor="case-status">UPDATE CASE STATUS (DEMO ONLY)</label><select className="select" id="case-status" value={selected.status} onChange={e=>changeStatus(selected.id,e.target.value as CaseStatus)}>{["Open","Investigating","Closed"].map(s=><option key={s}>{s}</option>)}</select></div><div className="field"><label className="field-label" htmlFor="case-notes">ANALYST NOTES (NOT SAVED)</label><textarea id="case-notes" className="textarea" style={{ minHeight: 90 }} placeholder="Add your investigation observations..." value={notes[selected.id]??""} onChange={e=>setNotes(p=>({...p,[selected.id]:e.target.value}))}/></div></div><div className="chart-foot">THIS DEMONSTRATION DOES NOT STORE CASE UPDATES. PERSISTENT CASES AND AUDIT LOGGING ARRIVE IN A LATER BACKEND PHASE.</div>
    </motion.section>}</AnimatePresence>
  </>;
}
