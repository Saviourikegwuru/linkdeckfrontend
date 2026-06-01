/**
 * Charts.jsx – Reusable chart primitives
 *
 * Exports:
 *   DualLineChart  – two-line chart with interactive hover tooltip
 *   LineChart      – single smooth line chart (legacy / simple use)
 *   BarChart       – vertical bar chart with y-axis gridlines
 *   DonutChart     – segmented donut chart
 *   HeatmapChart   – day × hour grid heatmap
 */

import { useState, useRef } from "react";

/* ─────────────────────────────────────────────────────────────── */
/*  DualLineChart                                                   */
/* ─────────────────────────────────────────────────────────────── */
/**
 * series   { label, data: number[], color, fillColor? }[]
 * labels   string[]  — x-axis tick labels
 * width / height / yMax / yTicks
 */
export function DualLineChart({
  series = [],
  labels = [],        // tooltip-only date labels (one per data point)
  xAxisLabels = [],   // labels rendered on the x-axis inside the SVG
  width = 620,
  height = 240,
  yMax,
  yTicks,
}) {
  const [hoverIdx, setHoverIdx] = useState(null);
  const svgRef = useRef(null);

  const pad = { top: 20, right: 16, bottom: 36, left: 40 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;

  const N = series[0]?.data?.length ?? 0;
  if (N === 0) return null;

  const allVals = series.flatMap((s) => s.data);
  const autoMax = Math.ceil(Math.max(...allVals) / 100) * 100 || 100;
  const maxY = yMax ?? autoMax;
  const autoTicks = Array.from({ length: 5 }, (_, i) => Math.round((i / 4) * maxY));
  const ticks = yTicks ?? autoTicks;

  function xOf(i) {
    return pad.left + (N === 1 ? cw / 2 : (i / (N - 1)) * cw);
  }
  function yOf(v) {
    return pad.top + (1 - v / maxY) * ch;
  }
  function pts(data) {
    return data.map((v, i) => ({ x: xOf(i), y: yOf(v) }));
  }

  function handleMouseMove(e) {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = (e.clientX - rect.left) * (width / rect.width) - pad.left;
    const rawIdx = Math.round((svgX / cw) * (N - 1));
    setHoverIdx(Math.max(0, Math.min(N - 1, rawIdx)));
  }

  const TW = 170;
  const TH = series.length * 22 + 28;

  return (
    <svg
      ref={svgRef}
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible", display: "block" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoverIdx(null)}
    >
      <defs>
        {series.map((s, si) => (
          <linearGradient key={si} id={`dlc-grad-${si}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={s.fillColor ?? s.color} stopOpacity="0.22" />
            <stop offset="100%" stopColor={s.fillColor ?? s.color} stopOpacity="0.02" />
          </linearGradient>
        ))}
      </defs>

      {/* y gridlines + labels */}
      {ticks.map((t) => {
        const y = yOf(t);
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={pad.left + cw} y2={y} stroke="#F0F0F0" strokeWidth="1" />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#ABABAB">{t}</text>
          </g>
        );
      })}

      {/* area fills */}
      {series.map((s, si) => {
        const p = pts(s.data);
        const area =
          `M${p[0].x},${pad.top + ch} ` +
          p.map((pt) => `L${pt.x},${pt.y}`).join(" ") +
          ` L${p[p.length - 1].x},${pad.top + ch} Z`;
        return <path key={si} d={area} fill={`url(#dlc-grad-${si})`} />;
      })}

      {/* lines */}
      {series.map((s, si) => {
        const p = pts(s.data);
        const line = p.map((pt, i) => (i === 0 ? `M${pt.x},${pt.y}` : `L${pt.x},${pt.y}`)).join(" ");
        return (
          <path key={si} d={line} stroke={s.color} strokeWidth="1.8" fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
        );
      })}

      {/* x-axis labels – evenly spaced, uses xAxisLabels prop */}
      {xAxisLabels.map((lbl, i) => {
        if (!lbl) return null;
        const x = pad.left + (xAxisLabels.length === 1 ? cw / 2 : (i / (xAxisLabels.length - 1)) * cw);
        return (
          <text key={i} x={x} y={height - 6} textAnchor="middle" fontSize="11" fill="#ABABAB">
            {lbl}
          </text>
        );
      })}

      {/* hover overlay */}
      {hoverIdx !== null && (() => {
        const hx = xOf(hoverIdx);
        let tx = hx - TW / 2;
        if (tx < pad.left) tx = pad.left;
        if (tx + TW > pad.left + cw) tx = pad.left + cw - TW;
        const ty = pad.top + 4;
        return (
          <g pointerEvents="none">
            <line x1={hx} y1={pad.top} x2={hx} y2={pad.top + ch}
              stroke="#0066FF" strokeWidth="1" strokeDasharray="4 3" />
            {series.map((s, si) => (
              <circle key={si}
                cx={pts(s.data)[hoverIdx].x}
                cy={pts(s.data)[hoverIdx].y}
                r="5" fill={s.color} stroke="#fff" strokeWidth="2" />
            ))}
            {/* tooltip card */}
            <rect x={tx} y={ty} width={TW} height={TH} rx="8" fill="#fff"
              filter="drop-shadow(0 4px 16px rgba(0,0,0,0.13))" />
            <text x={tx + 12} y={ty + 16} fontSize="10" fill="#8D8D8D" fontWeight="500">
              {labels[hoverIdx] ?? `Point ${hoverIdx + 1}`}
            </text>
            {series.map((s, si) => (
              <g key={si}>
                <rect x={tx + 12} y={ty + 24 + si * 22} width="7" height="7" rx="2"
                  fill={s.color} opacity="0.85" />
                <text x={tx + 25} y={ty + 32 + si * 22} fontSize="11" fill="#8D8D8D">{s.label}</text>
                <text x={tx + TW - 12} y={ty + 32 + si * 22} textAnchor="end"
                  fontSize="13" fill="#080707" fontWeight="700">
                  {s.data[hoverIdx]}
                </text>
              </g>
            ))}
          </g>
        );
      })()}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  LineChart (single-series, simple)                              */
/* ─────────────────────────────────────────────────────────────── */
export function LineChart({
  data = [],
  width = 280,
  height = 80,
  color = "#0066FF",
  fill = true,
  labels = [],
}) {
  if (!data.length) return null;
  const pad = { top: 8, right: 8, bottom: labels.length ? 22 : 8, left: 8 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => ({
    x: pad.left + (i / (data.length - 1)) * w,
    y: pad.top + (1 - (v - min) / range) * h,
  }));
  const linePath = pts.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(" ");
  const areaPath =
    `M${pts[0].x},${pad.top + h} ` +
    pts.map((p) => `L${p.x},${p.y}`).join(" ") +
    ` L${pts[pts.length - 1].x},${pad.top + h} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ overflow: "visible" }}>
      {fill && (
        <defs>
          <linearGradient id={`slc-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {fill && <path d={areaPath} fill={`url(#slc-${color.replace("#","")})`} />}
      <path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {labels.map((lbl, i) => (
        <text key={i} x={pad.left + (i / (data.length - 1)) * w} y={height - 4}
          textAnchor="middle" fontSize="9" fill="#8D8D8D">{lbl}</text>
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  BarChart                                                        */
/* ─────────────────────────────────────────────────────────────── */
/**
 * data      { label, value, color? }[]
 * barColor  – default colour when item.color is absent
 */
export function BarChart({
  data = [],
  width = 320,
  height = 120,
  barColor = "#0066FF",
}) {
  if (!data.length) return null;
  const pad = { top: 8, right: 8, bottom: 28, left: 34 };
  const cw = width - pad.left - pad.right;
  const ch = height - pad.top - pad.bottom;
  const max = Math.max(...data.map((d) => d.value), 1);
  const gap = 6;
  const barW = (cw - gap * (data.length - 1)) / data.length;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {[0, 0.5, 1].map((t) => {
        const y = pad.top + (1 - t) * ch;
        return (
          <g key={t}>
            <line x1={pad.left} y1={y} x2={pad.left + cw} y2={y} stroke="#F0F0F0" strokeWidth="1" />
            <text x={pad.left - 6} y={y + 3} textAnchor="end" fontSize="9" fill="#ABABAB">
              {Math.round(t * max)}
            </text>
          </g>
        );
      })}
      {data.map((d, i) => {
        const bh = (d.value / max) * ch;
        const x = pad.left + i * (barW + gap);
        const y = pad.top + ch - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="4" fill={d.color ?? barColor} />
            <text x={x + barW / 2} y={pad.top + ch + 16}
              textAnchor="middle" fontSize="9" fill="#8D8D8D">{d.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  DonutChart                                                      */
/* ─────────────────────────────────────────────────────────────── */
/**
 * segments  { label, value, color }[]
 * size      – overall SVG square size
 * thickness – arc stroke width
 */
export function DonutChart({ segments = [], size = 120, thickness = 18 }) {
  const total = segments.reduce((s, d) => s + d.value, 0) || 1;
  const r = (size / 2) * 0.7;
  const cx = size / 2;
  const cy = size / 2;
  let angle = -Math.PI / 2;
  const arcs = segments.map((seg) => {
    const sweep = (seg.value / total) * 2 * Math.PI;
    const x1 = cx + r * Math.cos(angle);
    const y1 = cy + r * Math.sin(angle);
    angle += sweep;
    const x2 = cx + r * Math.cos(angle);
    const y2 = cy + r * Math.sin(angle);
    const large = sweep > Math.PI ? 1 : 0;
    return { ...seg, d: `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}` };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {arcs.map((arc, i) => (
        <path key={i} d={arc.d} stroke={arc.color}
          strokeWidth={thickness} fill="none" strokeLinecap="butt" />
      ))}
      <circle cx={cx} cy={cy} r={r - thickness} fill="white" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────── */
/*  HeatmapChart                                                    */
/* ─────────────────────────────────────────────────────────────── */
/**
 * data      number[][]  – [row][col] intensity 0–10
 * rowLabels string[]    – e.g. ["Mon","Tue",...]
 * colLabels string[]    – e.g. ["12 AM","3 AM",...]
 * color     string      – base hex colour for cells
 * cellW / cellH         – cell dimensions in px
 */
export function HeatmapChart({
  data = [],
  rowLabels = [],
  colLabels = [],
  color = "#0066FF",
  cellW = 52,
  cellH = 30,
}) {
  if (!data.length) return null;
  const rows = data.length;
  const cols = data[0].length;
  const labelColW = 48;
  const labelRowH = 26;
  const gap = 4;
  const svgW = labelColW + cols * (cellW + gap);
  const svgH = labelRowH + rows * (cellH + gap);

  // parse hex → r,g,b string
  function rgb(hex) {
    return [
      parseInt(hex.slice(1, 3), 16),
      parseInt(hex.slice(3, 5), 16),
      parseInt(hex.slice(5, 7), 16),
    ].join(",");
  }
  const base = rgb(color);

  return (
    <svg width="100%" viewBox={`0 0 ${svgW} ${svgH}`}
      style={{ overflow: "visible", display: "block" }}>
      {/* column headers */}
      {colLabels.map((lbl, ci) => (
        <text key={ci}
          x={labelColW + ci * (cellW + gap) + cellW / 2}
          y={labelRowH - 8}
          textAnchor="middle" fontSize="10" fill="#8D8D8D">{lbl}</text>
      ))}
      {/* rows */}
      {data.map((row, ri) => (
        <g key={ri}>
          <text
            x={labelColW - 8}
            y={labelRowH + ri * (cellH + gap) + cellH / 2 + 4}
            textAnchor="end" fontSize="10" fill="#8D8D8D">{rowLabels[ri] ?? ""}</text>
          {row.map((val, ci) => (
            <rect key={ci}
              x={labelColW + ci * (cellW + gap)}
              y={labelRowH + ri * (cellH + gap)}
              width={cellW} height={cellH} rx="6"
              fill={`rgba(${base},${val > 0 ? (val / 10) * 0.82 + 0.06 : 0.04})`}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
