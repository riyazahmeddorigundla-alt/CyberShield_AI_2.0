"use client";
import { useState } from "react";

const data = [28, 46, 34, 59, 43, 67, 61, 77, 56, 82, 70, 93];
const chartWidth = 600, chartHeight = 220;
const points = data.map((v, i) => `${36 + i * 47},${190 - v * 1.62}`).join(" ");

export function ActivityChart() {
  const [selected, setSelected] = useState<number | null>(null);
  return <div><div style={{ width: "100%", position: "relative" }}>
    <svg role="img" aria-label="Illustrative demo activity chart with 12 data points" className="chart-svg" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
      <defs><linearGradient id="area" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#66f5ee" stopOpacity=".27"/><stop offset="100%" stopColor="#66f5ee" stopOpacity="0"/></linearGradient></defs>
      {[42,90,138,186].map(y => <line key={y} x1="25" y1={y} x2="592" y2={y} stroke="#314459" strokeDasharray="3 6" strokeWidth=".8"/>)}
      <polygon points={`36,200 ${points} 553,200`} fill="url(#area)"/>
      <polyline fill="none" stroke="#67eae5" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" points={points}/>
      {data.map((v, i) => <circle key={i} cx={36 + i * 47} cy={190-v*1.62} r={selected === i ? 7 : 4} stroke="#091623" strokeWidth="3" fill="#8dfffa" onMouseEnter={() => setSelected(i)} onMouseLeave={() => setSelected(null)}/>)}
      {selected !== null && <><rect x={Math.min(36 + selected * 47 - 29, 535)} y={Math.max(7, 168-data[selected]*1.62)} width="60" height="25" rx="6" fill="#1a3a4d" stroke="#66f5ee70"/><text x={Math.min(36+selected*47,564)} y={Math.max(23,184-data[selected]*1.62)} fill="#dfffff" fontSize="11" textAnchor="middle">{data[selected]} demo</text></>}
    </svg>
  </div><div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, fontFamily: "monospace", color: "#6f889d" }}>{["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(d => <span key={d}>{d}</span>)}</div></div>;
}
