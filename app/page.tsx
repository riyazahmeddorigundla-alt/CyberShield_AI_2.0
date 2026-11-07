"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Fingerprint, MailSearch, Radar, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { Brand } from "@/components/brand";

const sections = [
  { n: "01 / DETECT", icon: MailSearch, title: "Decode the message.", text: "A focused email inspection workflow designed to turn suspicious text into reviewable indicators." },
  { n: "02 / INVESTIGATE", icon: Fingerprint, title: "Follow the evidence.", text: "Connect domains, linked artifacts and analyst observations in a unified workspace." },
  { n: "03 / RESOLVE", icon: Workflow, title: "Make every decision traceable.", text: "Build toward repeatable investigations with review notes, explicit outcomes and case histories." },
];

export default function Home() {
  return (
    <main className="landing">
      <header className="topnav">
        <Brand />
        <div className="topnav-right"><span className="nav-small">SECURITY, REIMAGINED.</span><span className="tag green"><span className="dot" /> FRONTEND PROTOTYPE</span></div>
      </header>
      <section className="hero">
        <motion.div className="hero-content" initial={{ opacity: 0, y: 27 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75 }}>
          <span className="tag"><Sparkles size={12}/> THE NEXT CHAPTER OF EMAIL DEFENSE</span>
          <h1><span>THREATS</span><span>HAVE</span><span className="gradient-text">SIGNALS.</span></h1>
          <p>See beyond the inbox. A new kind of security workspace built for evidence-led phishing analysis, intelligent investigation and meaningful response.</p>
          <div className="hero-buttons">
            <Link href="/workspace" className="btn btn-primary">ENTER THE WORKSPACE <ArrowRight size={16}/></Link>
            <a className="btn btn-ghost" href="#approach">EXPLORE THE APPROACH <ChevronDown size={15}/></a>
          </div>
          <div className="hero-meta"><span className="mini-line"/><span>CYBERSHIELD AI / VERSION 2.0</span><span>DESIGNED FOR ANALYSTS</span></div>
        </motion.div>
        <motion.div className="orbit-wrap" aria-hidden="true" initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .9 }}>
          <div className="orbit-glow" />
          <motion.div className="orbit-circle" animate={{ rotate: -5 }} transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}>
            <span className="orbit-dot"/><span className="orbit-dot second"/>
            <div className="orbit-center"><ShieldCheck size={69} strokeWidth={1.1}/></div>
            <div className="orbit-label a"><Radar size={16}/> SIGNALS DETECTED</div>
            <div className="orbit-label b"><Fingerprint size={16}/> EVIDENCE-FIRST</div>
          </motion.div>
        </motion.div>
      </section>
      <div className="landing-strip"><span>EMAIL INTELLIGENCE</span><span>◆</span><span>INVESTIGATION WORKFLOWS</span><span>◆</span><span>EXPLAINABLE ANALYSIS</span><span>◆</span><span>SECURITY OPERATIONS</span></div>
      <section className="story" id="approach">
        <div className="story-top"><div><div className="eyebrow">THE WORKFLOW / 001</div><h2>Built for the moments that <span className="gradient-text">matter.</span></h2></div><p>The first release is a working frontend prototype. Your existing Python ML engine and persistent cases will be integrated next.</p></div>
        <div className="story-grid">
          {sections.map(({ n, icon: Icon, title, text }, index) => <motion.article className="story-card" key={n} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .15 }} transition={{ delay: index * .09 }}><span className="story-number">{n}</span><div className="story-card-icon"><Icon size={24}/></div><h3>{title}</h3><p>{text}</p></motion.article>)}
        </div>
        <div style={{ marginTop: 38 }}><Link href="/workspace" className="btn btn-primary">OPEN SOC DEMO <ArrowRight size={16}/></Link></div>
      </section>
      <footer className="landing-footer"><span>© CyberShield AI 2.0 — Educational Security Product Prototype</span><span>BUILT FOR CLARITY. ENGINEERED FOR TRUST.</span></footer>
    </main>
  );
}
