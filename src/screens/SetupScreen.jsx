import React, { useState } from "react";
import { CompassRose } from "../components/PirateDecorations.jsx";

export default function SetupScreen({ onStart, onBack }) {
  const [playerName, setPlayerName] = useState("");
  const [difficulty, setDifficulty] = useState("normal");

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CompassRose />
      
      <div className="pirate-card rope-border" style={{ maxWidth: "400px", width: "90%", padding: "32px 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontWeight:900, fontSize:"24px", marginBottom:"8px"}}>
          VS THE BOT
        </div>
        <div style={{color:"#5D6D7E", fontSize:"14px", marginBottom:"24px", fontStyle: "italic"}}>
          Prepare for battle against the AI
        </div>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{display:"block", fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"12px", fontWeight: 700, marginBottom:"8px"}}>
            ENTER YOUR NAME
          </label>
          <input 
            className="pirate-input"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="e.g. Captain Luffy"
            maxLength={16}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <label style={{display:"block", fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"12px", fontWeight: 700, marginBottom:"8px"}}>
            SELECT DIFFICULTY
          </label>
          <div style={{ display: "flex", gap: "8px" }}>
            {["easy", "normal", "hard"].map(level => (
              <button 
                key={level}
                onClick={() => setDifficulty(level)}
                style={{
                  flex: 1, padding: "10px", borderRadius: "6px", fontFamily: "'Cinzel',serif", fontWeight: 700, fontSize: "11px",
                  background: difficulty === level ? "#1B2A4A" : "#FFFFFF",
                  color: difficulty === level ? "#FFFFFF" : "#5D6D7E",
                  border: `1.5px solid ${difficulty === level ? "#1B2A4A" : "#E8E0D4"}`,
                  cursor: "pointer", transition: "all 0.2s"
                }}>
                {level.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <button className="ghost-btn" style={{flex: 1}} onClick={onBack}>BACK</button>
          <button 
            className="gold-btn" 
            style={{flex: 2}} 
            disabled={!playerName.trim()}
            onClick={() => onStart({ name: playerName, diff: difficulty })}
          >
            START GAME
          </button>
        </div>
      </div>
    </div>
  );
}
