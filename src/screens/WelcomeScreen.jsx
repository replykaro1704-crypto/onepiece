import React from "react";
import { CompassRose, WaveDivider } from "../components/PirateDecorations.jsx";
import { ROLES } from "../data/characters.js";

export default function WelcomeScreen({ onSelectMode }) {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <CompassRose />
      
      <div style={{ maxWidth: "500px", width: "100%", padding: "40px 20px", position: "relative", zIndex: 1, textAlign: "center" }}>
        {/* Title */}
        <div style={{fontFamily:"'Cinzel',serif", color:"#5D6D7E", fontSize:"11px", letterSpacing:"5px", marginBottom:"8px", fontWeight:700}}>
          ☠ ONE PIECE CARD GAME ☠
        </div>
        <div style={{
          fontFamily:"'Cinzel',serif", fontWeight:900,
          color:"#C8960C", fontSize:"clamp(32px, 8vw, 56px)",
          lineHeight:1.1, letterSpacing:"2px",
          textShadow:"0 2px 4px rgba(0,0,0,0.1)",
          marginBottom: "12px"
        }}>
          GRAND LINE
        </div>
        <div style={{
          fontFamily:"'Cinzel',serif", fontWeight:700,
          color:"#1B2A4A", fontSize:"clamp(20px, 5vw, 32px)",
          letterSpacing:"8px", marginBottom:"32px"
        }}>
          SHOWDOWN
        </div>

        {/* Roles Preview */}
        <div className="pirate-card" style={{ padding: "16px", marginBottom: "32px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px" }}>
          {ROLES.map(r => (
            <div key={r.key} style={{ textAlign: "center", padding: "8px 4px", border: "1px dashed #E8E0D4", borderRadius: "6px" }}>
              <div style={{fontSize: "20px", marginBottom: "4px"}}>{r.icon}</div>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: "8px", fontWeight: 700, color: r.col }}>{r.label}</div>
            </div>
          ))}
        </div>

        <WaveDivider />

        {/* Modes Selection */}
        <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
          <button className="gold-btn animate-pop-in" style={{ animationDelay: "0.1s" }} onClick={() => onSelectMode("bot")}>
            🤖 CHALLENGE THE BOT
          </button>
          
          <div style={{display: "flex", gap: "12px", animationDelay: "0.2s"}} className="animate-pop-in">
            <button className="ghost-btn" style={{flex: 1}} onClick={() => onSelectMode("friend")}>
              🔗 PLAY WITH FRIEND
            </button>
            <button className="ghost-btn" style={{flex: 1}} onClick={() => onSelectMode("random")}>
              🎲 RANDOM MATCH
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ marginTop: "40px", color: "#5D6D7E", fontSize: "12px", fontStyle: "italic" }}>
          ~ Featuring over 300 iconic characters ~
        </div>
      </div>
    </div>
  );
}
