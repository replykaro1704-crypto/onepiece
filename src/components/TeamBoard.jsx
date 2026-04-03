import React from "react";
import { ROLES } from "../data/characters.js";

export function TeamBoard({ name, slots, score, color, isActive }) {
  return (
    <div className="pirate-card" style={{
      padding: "10px 8px",
      borderTop: `3px solid ${color}`,
      background: isActive ? `${color}08` : "#FFFFFF",
      transition: "background 0.3s",
    }}>
      <div style={{
        fontFamily:"'Cinzel',serif", color, fontSize:"12px", fontWeight:700, 
        textAlign:"center", marginBottom:"6px", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"
      }}>
        {name}
      </div>
      <div style={{textAlign:"center", marginBottom:"12px", paddingBottom: "8px", borderBottom: "1px dashed #E8E0D4"}}>
        <span style={{fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"24px", color}}>{score}</span>
        <span style={{color:"#5D6D7E", fontSize:"10px", fontFamily:"'Cinzel',serif", fontWeight:700}}> PTS</span>
      </div>
      
      {ROLES.map(r => {
        const c = slots[r.key];
        const statPts = c ? (r.key==="tra" ? -(c.s.tra + c.basePwr) : c.s[r.key]) : null;
        const totalPts = c ? (r.key==="tra" ? -(c.s.tra + c.basePwr) : c.s[r.key] + c.basePwr) : null;
        
        const ptsCol = totalPts===null ? null : r.key==="tra" ? "#E74C3C" : totalPts>=15?"#27AE60":totalPts>=8?"#C8960C":"#E67E22";
        
        return (
          <div key={r.key} style={{
            display:"flex", alignItems:"center", gap:"6px",
            padding:"6px 4px", fontSize: "12px",
            borderBottom:"1px solid #FAF8F5",
            background: r.key==="tra" ? "#7D3C980A" : "transparent",
          }}>
            <span style={{fontSize:"14px", minWidth:"18px"}}>{r.icon}</span>
            <span style={{
              fontFamily:"'Cinzel',serif", fontSize:"8px", fontWeight:700,
              color: r.key==="tra"?"#7D3C98":r.col,
              minWidth:"45px", letterSpacing:"0.5px", textTransform:"uppercase",
            }}>
              {r.label}
            </span>
            <span style={{
              flex:1, color:c ? "#1A1A2E" : "#A0AEC0",
              overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
              fontWeight: c?600:400,
            }}>
              {c ? c.name.split(" ").slice(-2).join(" ") : "—"}
            </span>
            {c && (
              <span style={{fontSize:"11px", fontWeight:700, minWidth:"40px", textAlign:"right", color:ptsCol, fontFamily:"'Cinzel',serif"}}>
                {r.key==="tra" ? `-${c.basePwr} PWR | -${c.s.tra}` : `+${c.basePwr} PWR | +${c.s[r.key]}`}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
