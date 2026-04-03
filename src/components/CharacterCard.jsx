import React, { useState, useEffect } from "react";
import { ROLES } from "../data/characters.js";

export function CharacterCard({ char, isDrawing }) {
  const [realImg, setRealImg] = useState(null);

  // Attempt to fetch a real portrait dynamically when card is revealed
  useEffect(() => {
    if (char && char.name && !isDrawing) {
      setRealImg(null); // Reset when character changes
      
      // We check if the user manually provided a direct img link that isn't ui-avatars
      if (char.img && !char.img.includes('ui-avatars')) {
        setRealImg(char.img);
        return;
      }

      // Use the last part of the name for better API hit rates (e.g. Doflamingo instead of Donquixote)
      const queryName = char.name.split(" ").pop();

      // Try to fetch real image
      fetch(`https://api.api-onepiece.com/v2/characters/en/search?name=${encodeURIComponent(queryName)}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
             const match = data[0]; // just grab the first hit
             if (match.image) {
               setRealImg(match.image);
             } else if (match.filename) {
               setRealImg(match.filename);
             }
          }
        })
        .catch(() => {});
    }
  }, [char, isDrawing]);

  if (!char && !isDrawing) {
    return (
      <div className="pirate-card rope-border" style={{ padding: "24px", textAlign: "center", minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "52px", marginBottom: "8px" }}>🎴</div>
        <div style={{ color: "#5D6D7E", fontSize: "16px", fontFamily: "'Cinzel',serif" }}>Waiting to draw...</div>
      </div>
    );
  }

  if (isDrawing) {
    return (
      <div className="pirate-card rope-border animate-pulse" style={{ padding: "24px", textAlign: "center", minHeight: "420px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#FAF8F5" }}>
        <div className="animate-spin-slow" style={{ fontSize: "52px", marginBottom: "16px" }}>🧭</div>
        <div style={{ color: "#C8960C", fontSize: "18px", fontFamily: "'Cinzel',serif", fontWeight: 700, letterSpacing: "2px" }}>Drawing from Bag...</div>
      </div>
    );
  }

  const activeImg = realImg || char.img;

  return (
    <div className="pirate-card rope-border animate-card-reveal" style={{ 
      padding: "0", 
      textAlign: "center", 
      minHeight: "420px",
      display: "flex",
      flexDirection: "column",
      borderTop: `6px solid ${char.col}`,
      background: `linear-gradient(to bottom, #FFFFFF, ${char.col}0D)`
    }}>
      {/* Card Header */}
      <div style={{ padding: "16px 16px 12px 16px" }}>
        <div style={{fontFamily:"'Cinzel',serif", color:char.col, fontWeight:900, fontSize:"26px", marginBottom: "4px", lineHeight: "1.1"}}>{char.name}</div>
        <div style={{color:"#5D6D7E", fontSize:"12px", fontFamily: "'Cinzel',serif", fontWeight: 700}}>{char.crew}</div>
      </div>

      {/* Card Image Area */}
      <div style={{ padding: "0 16px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ 
          width: "100%", height: "200px", 
          border: "2px solid #E8E0D4", 
          borderRadius: "8px",
          background: `url('${activeImg}') center/cover no-repeat, #FAF8F5`,
          boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
          marginBottom: "16px",
          position: "relative",
          overflow: "hidden"
        }}>
           {/* Fallback image style handles itself gracefully */}
        </div>
        
      {/* Card Details & Bounty */}
      <div style={{ display: "flex", justifyContent: "center", gap: "8px", margin: "0 16px 16px 16px", flexWrap: "wrap" }}>
        
        {/* BASE POWER BADGE */}
        <div style={{
          padding: "6px 12px", background: "#1B2A4A", 
          border: "1px solid #1B2A4A", borderRadius: "4px",
          color: "#FFFFFF", fontSize: "11px", fontFamily: "'Cinzel',serif", fontWeight: 900
        }}>
          ⚡ PWR {char.basePwr}
        </div>

        {char.fruit && char.fruit !== "No Devil Fruit" && (
          <div style={{
            padding: "6px 12px", background: "#7D3C9810", 
            border: "1px solid #7D3C98", borderRadius: "4px",
            color: "#7D3C98", fontSize: "11px", fontFamily: "'Cinzel',serif", fontWeight: 900
          }}>
            🔮 {char.fruit}
          </div>
        )}
        {char.bounty && char.bounty !== "N/A" && char.bounty !== "Unknown" && (
          <div style={{
            padding: "6px 12px", background: "#FAF8F5", 
            border: "1px dashed #C8960C", borderRadius: "4px",
            color: "#C8960C", fontSize: "11px", fontFamily: "'Cinzel',serif", fontWeight: 900, letterSpacing: "1px"
          }}>
            ฿ {char.bounty}
          </div>
        )}
      </div>

      {/* Stats Grid - Pokemon Card Style */}
        <div style={{ 
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", 
          background: "#FFFFFF", padding: "12px", borderRadius: "10px", 
          border: "1px solid #E8E0D4", marginBottom: "16px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
        }}>
           <div style={{ gridColumn: "1 / -1", fontSize: "10px", fontFamily: "'Cinzel',serif", color: "#A0AEC0", letterSpacing: "2px", borderBottom: "1px dashed #E8E0D4", paddingBottom: "6px", marginBottom: "4px" }}>
             BASE STATS
           </div>
           
           <StatRow icon="⚓" label="CAP" val={char.s.cap} />
           <StatRow icon="⚔️" label="DUE" val={char.s.due} />
           <StatRow icon="🛡️" label="TNK" val={char.s.tnk} />
           <StatRow icon="💊" label="HEL" val={char.s.hel} />
           
           {/* Highlight Traitor specifically */}
           <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 8px", background: "#7D3C9811", borderRadius: "4px", marginTop: "4px" }}>
              <span style={{ fontSize: "10px", fontFamily: "'Cinzel',serif", color: "#7D3C98", fontWeight: 700 }}>🗡️ TRAITOR PENALTY</span>
              <span style={{ fontSize: "14px", fontFamily: "'Cinzel',serif", color: "#E74C3C", fontWeight: 900 }}>-{char.s.tra}</span>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ icon, label, val }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 4px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <span style={{ fontSize: "12px" }}>{icon}</span>
        <span style={{ fontSize: "10px", fontFamily: "'Cinzel',serif", color: "#5D6D7E", fontWeight: 700 }}>{label}</span>
      </div>
      <div style={{ fontSize: "13px", fontFamily: "'Cinzel',serif", color: "#1A1A2E", fontWeight: 900 }}>
        {val}
      </div>
    </div>
  );
}
