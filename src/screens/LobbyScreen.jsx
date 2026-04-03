import React, { useState, useEffect } from "react";
import { socket } from "../utils/socket.js";
import { CompassRose } from "../components/PirateDecorations.jsx";

export default function LobbyScreen({ mode, onBack, onGameReady }) {
  const [name, setName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [status, setStatus] = useState("name_entry"); // name_entry | creating | joining | matchmaking | waiting
  const [createdCode, setCreatedCode] = useState(null);

  useEffect(() => {
    socket.connect();
    
    socket.on("room_created", (code) => {
      setCreatedCode(code);
      setStatus("waiting");
    });

    socket.on("game_start", (data) => {
      onGameReady(data); // Transition to game!
    });

    socket.on("error", (msg) => {
      alert("Error: " + msg);
      setStatus("name_entry");
    });

    return () => {
      socket.off("room_created");
      socket.off("game_start");
      socket.off("error");
    };
  }, [onGameReady]);

  const handleAction = () => {
    if (!name.trim()) return;
    
    if (mode === "friend") {
      setStatus("creating");
      socket.emit("create_room", name);
    } else if (mode === "random") {
      setStatus("matchmaking");
      socket.emit("find_match", name);
    }
  };

  const handleJoin = () => {
    if (!name.trim() || !roomCode.trim() || roomCode.length !== 6) return;
    setStatus("joining");
    socket.emit("join_room", { code: roomCode.toUpperCase(), playerName: name });
  };

  const handleCancelMatch = () => {
    socket.emit("cancel_match");
    setStatus("name_entry");
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <CompassRose />
      
      <div className="pirate-card rope-border" style={{ maxWidth: "420px", width: "90%", padding: "32px 24px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <div style={{fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontWeight:900, fontSize:"24px", marginBottom:"8px"}}>
          {mode === "friend" ? "MULTIPLAYER LOBBY" : "RANDOM MATCH"}
        </div>
        
        {status === "name_entry" && (
          <div className="animate-pop-in">
            <div style={{ textAlign: "left", marginBottom: "24px" }}>
              <label style={{display:"block", fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"12px", fontWeight: 700, marginBottom:"8px"}}>
                ENTER YOUR NAME
              </label>
              <input 
                className="pirate-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Pirate/Marine Name"
                maxLength={16}
              />
            </div>

            {mode === "friend" && (
              <div style={{ textAlign: "left", marginBottom: "24px", padding: "16px", background:"#FAF8F5", borderRadius:"8px", border:"1px dashed #E8E0D4" }}>
                <label style={{display:"block", fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"12px", fontWeight: 700, marginBottom:"8px"}}>
                  OR JOIN A ROOM
                </label>
                <div style={{display:"flex", gap:"8px"}}>
                  <input 
                    className="pirate-input"
                    value={roomCode}
                    onChange={e => setRoomCode(e.target.value.toUpperCase())}
                    placeholder="6-LETTER CODE"
                    maxLength={6}
                    style={{fontFamily:"monospace", letterSpacing:"2px", textAlign:"center"}}
                  />
                  <button className="gold-btn" style={{padding:"0 16px"}} disabled={!name || roomCode.length!==6} onClick={handleJoin}>
                    JOIN
                  </button>
                </div>
              </div>
            )}

            <div style={{ display: "flex", gap: "12px" }}>
              <button className="ghost-btn" style={{flex: 1}} onClick={onBack}>BACK</button>
              <button className="gold-btn" style={{flex: 2}} disabled={!name.trim()} onClick={handleAction}>
                {mode === "friend" ? "CREATE ROOM" : "FIND MATCH"}
              </button>
            </div>
          </div>
        )}

        {(status === "waiting" || status === "matchmaking") && (
          <div className="animate-pop-in" style={{padding: "20px 0"}}>
            <div className="animate-pulse" style={{ fontSize: "40px", marginBottom: "16px" }}>🧭</div>
            
            {status === "waiting" ? (
              <>
                <div style={{fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"14px", fontWeight:700, marginBottom:"12px"}}>
                  ROOM CREATED!
                </div>
                <div style={{ color: "#5D6D7E", fontSize: "14px", marginBottom: "8px" }}>Share this code with your friend:</div>
                <div style={{
                  background: "#FAF8F5", border: "2px dashed #C8960C", borderRadius: "8px", 
                  padding: "16px", fontFamily: "monospace", fontSize: "32px", fontWeight: 700,
                  color: "#1B2A4A", letterSpacing: "8px", marginBottom: "24px"
                }}>
                  {createdCode}
                </div>
                <div style={{color:"#5D6D7E", fontSize:"13px", fontStyle:"italic", marginBottom:"24px"}}>Waiting for opponent to join...</div>
              </>
            ) : (
              <>
                <div style={{fontFamily:"'Cinzel',serif", color:"#1B2A4A", fontSize:"16px", fontWeight:700, marginBottom:"12px"}}>
                  SEARCHING THE SEAS...
                </div>
                <div style={{color:"#5D6D7E", fontSize:"13px", fontStyle:"italic", marginBottom:"32px"}}>Looking for a random opponent</div>
              </>
            )}

            <button className="ghost-btn" onClick={handleCancelMatch}>CANCEL</button>
          </div>
        )}
      </div>
    </div>
  );
}
