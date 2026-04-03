import React from "react";
import { CompassRose } from "../components/PirateDecorations.jsx";
import { ROLES } from "../data/characters.js";

export default function WinnerScreen({ slots, teamNames, winner, scores, colors, onReset }) {
  const tied = winner === -1;
  const winColor = !tied ? colors[winner] : "#C8960C";

  return (
    <div style={{ position: "relative", minHeight: "100vh", padding: "40px 20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CompassRose />
      
      <div style={{ maxWidth: "600px", width: "100%", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div style={{textAlign:"center", marginBottom:"32px"}}>
          <div style={{fontFamily:"'Cinzel',serif", color:"#5D6D7E", fontSize:"12px", letterSpacing:"5px", marginBottom:"16px", fontWeight:700}}>
            ☠ FINAL VERDICT ☠
          </div>
          
          {tied ? (
            <div className="animate-pop-in" style={{fontFamily:"'Cinzel',serif", color:"#C8960C", fontWeight:900, fontSize:"clamp(32px, 8vw, 56px)"}}>
              IT'S A TIE!
            </div>
          ) : (
            <div className="animate-pop-in">
              <div style={{fontFamily:"'Cinzel',serif", color:winColor, fontWeight:700, fontSize:"clamp(18px, 4vw, 24px)", letterSpacing:"2px"}}>
                {teamNames[winner]}
              </div>
              <div style={{
                fontFamily:"'Cinzel',serif", color:"#C8960C", fontWeight:900,
                fontSize:"clamp(40px, 10vw, 70px)", lineHeight:1,
                textShadow:"0 4px 12px rgba(200,150,12,0.3)"
              }}>
                WINS! 🏆
              </div>
            </div>
          )}
        </div>

        {/* Score Comparison */}
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px", marginBottom:"32px"}}>
          {[0,1].map(ti => {
            const isWinner = winner === ti;
            return (
              <div key={ti} className="pirate-card rope-border" style={{
                padding: "20px 12px",
                borderTop: `4px solid ${colors[ti]}`,
                background: isWinner ? `${colors[ti]}08` : "#FFFFFF",
                transform: isWinner ? "scale(1.02)" : "scale(0.98)",
                transition: "all 0.3s"
              }}>
                {isWinner && (
                  <div style={{
                    position:"absolute", top:"-12px", left:"50%", transform:"translateX(-50%)",
                    background:"#C8960C", color:"#FFFFFF", fontSize:"10px",
                    fontFamily:"'Cinzel',serif", padding:"4px 16px",
                    borderRadius:"20px", fontWeight:900, whiteSpace:"nowrap",
                    boxShadow: "0 2px 8px rgba(200,150,12,0.4)"
                  }}>
                    ★ WINNER ★
                  </div>
                )}
                
                <div style={{fontFamily:"'Cinzel',serif", color:colors[ti], fontWeight:700, fontSize:"14px", textAlign:"center", marginBottom:"8px"}}>
                  {teamNames[ti]}
                </div>
                <div style={{fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"48px", color:colors[ti], textAlign:"center", lineHeight:1}}>
                  {scores[ti]}
                </div>
                <div style={{color:"#5D6D7E", fontSize:"10px", textAlign:"center", marginBottom:"16px", fontFamily: "'Cinzel',serif", fontWeight:700}}>POINTS</div>
                
                <div style={{borderTop: "1px dashed #E8E0D4", paddingTop: "12px"}}>
                  {ROLES.map(r => {
                    const c = slots[ti][r.key];
                    if (!c) return null;
                    const pts = r.key==="tra" ? -(c.s.tra + c.basePwr) : c.s[r.key] + c.basePwr;
                    const ptsCol = r.key==="tra" ? "#E74C3C" : pts>=15?"#27AE60":pts>=8?"#C8960C":"#E67E22";
                    return (
                      <div key={r.key} style={{display:"flex", justifyContent:"space-between", alignItems:"center", padding:"6px 0", borderBottom:"1px solid #FAF8F5"}}>
                        <div>
                          <div style={{fontFamily:"'Cinzel',serif", fontSize:"8px", color:r.key==="tra"?"#7D3C98":r.col, fontWeight: 700}}>{r.label}</div>
                          <div style={{fontSize:"11px", color:"#1A1A2E", fontWeight:600}}>{c.name.split(" ").slice(-2).join(" ")}</div>
                        </div>
                        <span style={{fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"14px", color:ptsCol}}>
                          {r.key==="tra"?`-${c.basePwr} PWR | -${c.s.tra}`:`+${c.basePwr} PWR | +${c.s[r.key]}`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{textAlign: "center"}}>
          <button className="gold-btn animate-pop-in" style={{animationDelay: "0.5s", padding: "16px 48px", fontSize: "16px"}} onClick={onReset}>
            ⚓ RETURN TO PORT ⚓
          </button>
        </div>
      </div>
    </div>
  );
}
