"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { AlertTriangle, ArrowRight, CheckCircle2, FileText, Link2, MailSearch, RotateCcw, SearchCheck, ShieldQuestion, UploadCloud } from "lucide-react";
import { inspectEmail, type Inspection } from "@/lib/email-inspection";

const sample = { sender: "support@account-review.example", subject: "Urgent action: verify your account", body: "Your account needs attention. Verify your account and confirm your identity. Click here: http://account-review.example/verify. Act now to prevent access problems." };

export default function Scanner() {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [result, setResult] = useState<Inspection | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const inspect = () => {
    setError("");
    if (!body.trim()) { setResult(null); setError("Enter or upload a message body before inspecting it."); return; }
    if (body.length > 100000 || subject.length > 500 || sender.length > 320) { setResult(null); setError("Input exceeds the permitted size (body 100,000; subject 500; sender 320 characters)."); return; }
    setResult(inspectEmail(sender, subject, body));
  };
  const loadSample = () => { setSender(sample.sender); setSubject(sample.subject); setBody(sample.body); setError(""); setResult(null); };
  const reset = () => { setSender(""); setSubject(""); setBody(""); setError(""); setResult(null); if (fileRef.current) fileRef.current.value=""; };
  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    setError(""); setResult(null);
    if (!/\.(eml|txt)$/i.test(file.name)) { setError("Select a .eml or .txt file."); return; }
    if (file.size > 1024 * 1024) { setError("For this browser prototype, upload files smaller than 1 MB."); return; }
    try {
      const text = await file.text();
      if (/\.eml$/i.test(file.name)) {
        const from = text.match(/^from:\s*(.+)$/im)?.[1] ?? "";
        const subjectLine = text.match(/^subject:\s*(.+)$/im)?.[1] ?? "";
        const splitAt = text.search(/\r?\n\r?\n/);
        setSender(from.trim()); setSubject(subjectLine.trim());
        setBody(splitAt >= 0 ? text.slice(splitAt).trim() : text);
      } else { setSender(""); setSubject(""); setBody(text); }
    } catch { setError("Could not read the selected file in your browser."); }
  };

  return <>
    <div className="page-heading"><div><div className="eyebrow">ANALYSIS / EMAIL LAB</div><h1>Decode the <span className="gradient-text">message.</span></h1><p>A real local structural inspection of email text. Your Python ML model will be connected through FastAPI in Phase 2.</p></div><span className="tag purple"><ShieldQuestion size={12}/> NO MODEL CONNECTED</span></div>
    <div className="workspace-grid" style={{ alignItems: "start" }}>
      <section className="panel panel-pad">
        <div className="panel-top"><div><div className="panel-kicker">INPUT / 001</div><div className="panel-title" style={{ marginTop: 9 }}>Email inspection</div></div><MailSearch size={18} color="#66f5ee"/></div>
        <div className="notice"><strong>Private by design in this prototype.</strong> Email text is inspected within your browser; it is not sent to an external API or saved. This is heuristic analysis, <strong>not</strong> an ML phishing verdict.</div>
        <div style={{ margin: "22px 0 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}><label className="field-label" htmlFor="email-file">IMPORT EMAIL (.EML OR .TXT)</label><input id="email-file" ref={fileRef} type="file" accept=".eml,.txt" onChange={handleFile} style={{ fontSize: 11, maxWidth: 235, color: "#a8c5d6" }}/></div>
        <div className="form-grid"><div className="field"><label className="field-label" htmlFor="email-sender">REPORTED SENDER</label><input className="input" id="email-sender" placeholder="support@example.com" value={sender} onChange={e=>setSender(e.target.value)}/></div><div className="field"><label className="field-label" htmlFor="email-subject">SUBJECT</label><input className="input" id="email-subject" placeholder="Subject line" value={subject} onChange={e=>setSubject(e.target.value)}/></div></div>
        <div className="field" style={{ marginTop: 17 }}><label className="field-label" htmlFor="email-body">EMAIL BODY</label><textarea className="textarea" id="email-body" rows={8} placeholder="Paste the text of a suspicious email to inspect its structural indicators..." value={body} onChange={e=>setBody(e.target.value)}/><span style={{ textAlign: "right", fontSize: 10, color: "#6c899e" }}>{body.length.toLocaleString()} / 100,000 CHARACTERS</span></div>
        {error && <div className="notice amber" role="alert" style={{ marginTop: 15 }}><AlertTriangle size={14} style={{ verticalAlign: "middle", marginRight: 8 }}/>{error}</div>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginTop: 23 }}><button className="btn btn-primary" onClick={inspect}><SearchCheck size={15}/> INSPECT LOCALLY <ArrowRight size={15}/></button><button className="btn btn-ghost" onClick={loadSample}><FileText size={15}/> LOAD SAFE SAMPLE</button><button className="btn btn-ghost" onClick={reset} aria-label="Clear email form"><RotateCcw size={15}/> RESET</button></div>
      </section>
      <aside className="panel panel-pad"><div className="panel-top"><div><div className="panel-kicker">METHODOLOGY / 002</div><div className="panel-title" style={{ marginTop: 9 }}>Current capabilities</div></div><CheckCircle2 size={18} color="#76eac4"/></div>
        <div className="card-list">{[
          ["URL extraction", "Find and display visible http:// and https:// links in email text."],
          ["Pressure language", "Identify a small transparent dictionary of account-pressure phrases."],
          ["Link structure", "Flag HTTP and IPv4-style hosts without visiting the links."],
          ["Input protection", "Bounded file sizes and form lengths; no attachment execution."],
        ].map(([name, desc],i)=><div key={name} className="indicator-row"><span style={{ fontSize: 12, fontFamily: "monospace", color: "#66f5ee" }}>0{i+1}</span><div><strong>{name}</strong><span>{desc}</span></div></div>)}</div>
        <div className="divider"/>
        <div style={{ display: "flex", gap: 12, alignItems: "start" }}><UploadCloud size={17} color="#a58bff" style={{ flexShrink: 0 }}/><p className="tagline" style={{ margin: 0 }}>The .eml importer handles simple message bodies and headers only. Full MIME parsing, real ML classification, and case persistence will be provided by the Python backend.</p></div>
      </aside>
    </div>
    {result && <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="panel panel-pad" aria-live="polite"><div className="panel-top"><div><div className="panel-kicker">STRUCTURAL INSPECTION / RESULTS</div><div className="panel-title" style={{ marginTop: 9, fontSize: 19 }}>Observed evidence</div></div><span className="pill medium">HEURISTICS ONLY</span></div>
      <div className="data-grid" style={{ marginBottom: 20 }}><div className="indicator-row"><MailSearch size={22}/><div><span>REPORTED SENDER DOMAIN</span><strong>{result.senderDomain}</strong></div></div><div className="indicator-row"><FileText size={22}/><div><span>WORDS ANALYZED</span><strong>{result.wordCount}</strong></div></div><div className="indicator-row"><Link2 size={22}/><div><span>VISIBLE URLS</span><strong>{result.urls.length}</strong></div></div><div className="indicator-row"><AlertTriangle size={22}/><div><span>MATCHED PRESSURE PHRASES</span><strong>{result.phrases.length}</strong></div></div></div>
      {result.warnings.length ? <div className="notice amber"><strong>Review indicators:</strong><ul style={{ paddingLeft: 18, margin: "8px 0 0" }}>{result.warnings.map(w=><li key={w}>{w}</li>)}</ul></div> : <div className="notice">No configured structural warning rule matched. That does not establish that the email is safe.</div>}
      <div className="workspace-grid equal" style={{ marginTop: 20, marginBottom: 0 }}><div><div className="field-label" style={{ marginBottom: 12 }}>EXTRACTED URLS — NEVER OPENED</div>{result.urls.length ? <div className="card-list">{result.urls.map(url=><div className="indicator-row" key={url}><Link2 size={14}/><div><strong style={{ fontSize: 11 }}>{url}</strong></div></div>)}</div> : <p className="tagline">No URLs found.</p>}</div><div><div className="field-label" style={{ marginBottom: 12 }}>MATCHED PHRASES</div>{result.phrases.length ? <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>{result.phrases.map(p=><span className="pill medium" key={p}>{p}</span>)}</div> : <p className="tagline">No configured phrase matches.</p>}</div></div>
    </motion.section>}
  </>;
}
