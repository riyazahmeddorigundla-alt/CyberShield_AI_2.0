"use client";
import { useState } from "react";
import { Fingerprint, Globe2, Link2, Radar, ShieldCheck, Waypoints } from "lucide-react";
import { demoIndicators } from "@/lib/demo-data";

export default function Intelligence() {
  const [selected, setSelected] = useState(0);
  const indicator = demoIndicators[selected];
  return <>
    <div className="page-heading"><div><div className="eyebrow">INTELLIGENCE / EXPLORER</div><h1>Connect the <span className="gradient-text">evidence.</span></h1><p>An interactive indicator relationship visualization using safe documentation-only example domains and IP addresses.</p></div><span className="tag purple"><Radar size={12}/> GRAPH DEMO</span></div>
    <div className="notice"><strong>ILLUSTRATIVE RELATIONSHIPS ONLY.</strong> The graph does not query VirusTotal, DNS, URLhaus or live reputation services. Example domains use the reserved .example suffix.</div>
    <div className="workspace-grid" style={{ marginTop: 19 }}>
      <section className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">RELATIONSHIP MAP / 001</div><div className="panel-title" style={{ marginTop: 9 }}>Demo indicator graph</div></div><Waypoints size={19} color="#66f5ee"/></div>
        <div className="graph-area"><svg className="graph-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{demoIndicators.map((d,i)=><line key={i} x1="50" y1="50" x2={d.x} y2={d.y} stroke={i===selected?"#66f5ee":"#5d8299"} strokeWidth={i===selected?.8:.45} strokeDasharray="1 1.6" opacity={i===selected?".9":".45"}/>)}</svg><div className="graph-center"><ShieldCheck size={36}/></div>
        {demoIndicators.map((d,i)=><div key={d.label}><button aria-label={`Inspect ${d.label}`} title={d.label} className={`graph-node${i===selected?" active":""}`} style={{ left:`${d.x}%`,top:`${d.y}%` }} onClick={()=>setSelected(i)}>{d.type==="IP address"?<Globe2 size={20}/>:<Link2 size={20}/>}</button><span className="graph-label" style={{ left:`${d.x}%`,top:`${d.y+9}%` }}>{d.label.length>19?`${d.label.slice(0,17)}…`:d.label}</span></div>)}
        </div><div className="chart-foot">CLICK A NODE TO INSPECT ITS DEMO METADATA.</div></section>
      <section className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">INDICATOR DETAILS / 002</div><div className="panel-title" style={{ marginTop: 9 }}>Selected evidence</div></div><Fingerprint size={19} color="#a58bff"/></div>
        <span className="tag purple">{indicator.type.toUpperCase()}</span><h2 style={{ fontSize: 23, letterSpacing:"-.035em",wordBreak:"break-word",margin:"24px 0 12px" }}>{indicator.label}</h2><p className="tagline">{indicator.detail}</p><div className="divider"/><div className="field-label">INVESTIGATION CONSIDERATION</div><div className="indicator-row" style={{ marginTop: 13 }}><ShieldCheck size={18}/><div><strong>{indicator.signal}</strong><span>Evidence example — not a reputation verdict</span></div></div><div className="divider"/><div className="panel-kicker">EXPLORER</div><div className="card-list" style={{ marginTop: 12 }}>{demoIndicators.map((d,i)=><button type="button" key={d.label} className="indicator-row" style={{ color: "inherit", cursor: "pointer",textAlign:"left",outline:i===selected?"1px solid #66f5ee":"none" }} onClick={()=>setSelected(i)}><Globe2 size={16}/><div><strong>{d.label}</strong><span>{d.type}</span></div></button>)}</div></section>
    </div>
  </>;
}
