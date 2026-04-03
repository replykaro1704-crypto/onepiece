import React from "react";

export function Scoreboard({ teamNames, scores, colors }) {
  return (
    <div style={{
      background: "#FFFFFF",
      borderBottom: "1px solid #E8E0D4",
      padding: "12px 16px",
      textAlign: "center",
      position: "relative",
      zIndex: 1,
      boxShadow: "0 2px 10px rgba(0,0,0,0.03)"
    }}>
      <div style={{fontFamily:"'Cinzel',serif", color:"#C8960C", fontSize:"10px", letterSpacing:"3px", marginBottom:"8px", fontWeight: 700}}>
        ☠ GRAND LINE SHOWDOWN ☠
      </div>
      <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"32px"}}>
        <ScorePill name={teamNames[0]} score={scores[0]} color={colors[0]} />
        <span style={{color:"#5D6D7E", fontSize:"14px", fontFamily:"'Cinzel',serif", fontWeight: 700}}>VS</span>
        <ScorePill name={teamNames[1]} score={scores[1]} color={colors[1]} />
      </div>
    </div>
  );
}

function ScorePill({ name, score, color }) {
  return (
    <div style={{textAlign:"center", minWidth: "100px"}}>
      <div style={{fontFamily:"'Cinzel',serif", color, fontSize:"12px", fontWeight:700, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
        {name}
      </div>
      <div style={{fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"26px", color, lineHeight:1.1}}>
        {score}
      </div>
    </div>
  );
}
