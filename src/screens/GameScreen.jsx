import React, { useState, useEffect, useCallback } from "react";
import { socket } from "../utils/socket.js";
import { CHARS, ROLES, emptySlots, calcScore, isComplete } from "../data/characters.js";
import { getBotMove } from "../utils/botAI.js";
import { Scoreboard } from "../components/Scoreboard.jsx";
import { TeamBoard } from "../components/TeamBoard.jsx";
import { CharacterCard } from "../components/CharacterCard.jsx";
import { CompassRose } from "../components/PirateDecorations.jsx";

const TEAM_COLORS = ["#C0392B", "#2471A3"]; // Red vs Blue

export default function GameScreen({ mode, initialData, onGameOver }) {
  // initialData contains: 
  // BOT mode: { name: "Player", diff: "normal" }
  // ONLINE mode: { players: [{id, name, team}], turn: 0 }
  
  const isOnline = mode === "friend" || mode === "random";
  const [teamNames, setTeamNames] = useState(["Team 1", "Team 2"]);
  const [myTeam, setMyTeam] = useState(0); 
  
  const [slots, setSlots] = useState([emptySlots(), emptySlots()]);
  const [drawnIds, setDrawnIds] = useState(new Set());
  const [turn, setTurn] = useState(0);
  
  const [drawnChar, setDrawnChar] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Initialize game
  useEffect(() => {
    if (isOnline) {
      const players = initialData.players;
      const me = players.find(p => p.id === socket.id);
      if (me) setMyTeam(me.team);
      
      const tNames = ["", ""];
      players.forEach(p => tNames[p.team] = p.name);
      setTeamNames(tNames);
      setTurn(initialData.turn);
    } else {
      setTeamNames([initialData.name, "Sengoku (Bot)"]);
      setMyTeam(0); // Player is always Team 0 in Bot mode
    }
  }, [mode, initialData, isOnline]);

  // Online Synchronization
  useEffect(() => {
    if (!isOnline) return;

    const handleOpponentAction = ({ type, payload }) => {
      if (type === "DRAW") {
        setIsDrawing(true);
        setTimeout(() => {
          setDrawnChar(payload.char);
          setIsDrawing(false);
        }, 1200);
      } else if (type === "ASSIGN") {
        handleAssignRole(payload.roleKey, payload.char, payload.team, true);
      }
    };

    socket.on("opponent_action", handleOpponentAction);
    return () => socket.off("opponent_action", handleOpponentAction);
  }, [isOnline, slots, drawnIds]);

  const score0 = calcScore(slots[0]);
  const score1 = calcScore(slots[1]);
  const isMyTurn = turn === myTeam;

  // Draw Logic
  const handleDraw = () => {
    if (isDrawing || drawnChar || !isMyTurn) return;
    performDraw();
  };

  const performDraw = useCallback(() => {
    setIsDrawing(true);
    
    // Pick random available
    const available = CHARS.filter(c => !drawnIds.has(c.id));
    if (available.length === 0) return; // Should not happen
    
    const randomChar = available[Math.floor(Math.random() * available.length)];
    
    if (isOnline) {
      // In a real secure game, server picks this. For now, trusting client.
      socket.emit("game_action", {
        roomCode: initialData.code || Array.from(socket.rooms).pop(), // simplified
        type: "DRAW",
        payload: { char: randomChar }
      });
    }

    setTimeout(() => {
      setDrawnChar(randomChar);
      setIsDrawing(false);
    }, 1200);
  }, [drawnIds, isOnline, initialData]);

  // Assign Logic
  const assignRoleToTeam = (roleKey, char, teamIndex, isFromNetwork = false) => {
    const newSlots = slots.map((s, i) => i === teamIndex ? { ...s, [roleKey]: char } : s);
    const newIds = new Set([...drawnIds, char.id]);
    
    setSlots(newSlots);
    setDrawnIds(newIds);
    setDrawnChar(null);

    // Notify Over Network
    if (isOnline && !isFromNetwork) {
      socket.emit("game_action", {
        roomCode: initialData.code || Array.from(socket.rooms).pop(),
        type: "ASSIGN",
        payload: { roleKey, char, team: teamIndex }
      });
    }

    // Check Win Condition or Turn Switch
    if (newSlots.every(s => isComplete(s))) {
      const s0 = calcScore(newSlots[0]);
      const s1 = calcScore(newSlots[1]);
      setTimeout(() => {
        onGameOver(newSlots, teamNames, TEAM_COLORS, s0 === s1 ? -1 : (s0 > s1 ? 0 : 1), [s0, s1]);
      }, 1000);
    } else {
      const nextTurn = 1 - turn;
      // Skip turn if the other team is already full
      setTurn(isComplete(newSlots[nextTurn]) ? turn : nextTurn);
    }
  };

  const handleAssignRole = (roleKey, overrideChar = null, overrideTeam = null, isFromNetwork = false) => {
    const charToAssign = overrideChar || drawnChar;
    const teamToAssign = overrideTeam !== null ? overrideTeam : turn;
    if (!charToAssign || slots[teamToAssign][roleKey]) return;
    
    assignRoleToTeam(roleKey, charToAssign, teamToAssign, isFromNetwork);
  };

  // Bot Logic Hook
  useEffect(() => {
    if (isOnline || turn === 0 || !isComplete(slots[0]) && turn === 0) return; // Only run if it's Bot's turn (Team 1)
    
    if (!drawnChar && !isDrawing) {
      setTimeout(() => performDraw(), 1000);
    } else if (drawnChar) {
      setTimeout(() => {
        const bestRoleKey = getBotMove(drawnChar, slots[1], initialData.diff);
        if (bestRoleKey) {
          handleAssignRole(bestRoleKey, drawnChar, 1);
        }
      }, 1500); // "Thinking" time
    }
  }, [turn, drawnChar, isDrawing, isOnline, slots, initialData]);


  return (
    <div style={{ position: "relative", minHeight: "100vh", backgroundColor: "#FAF8F5" }}>
      <CompassRose />
      <Scoreboard teamNames={teamNames} scores={[score0, score1]} colors={TEAM_COLORS} />

      {/* Turn Banner */}
      <div style={{
        background: `linear-gradient(90deg, transparent, ${TEAM_COLORS[turn]}1A, transparent)`,
        borderBottom: `1px solid ${TEAM_COLORS[turn]}40`,
        padding: "8px", textAlign: "center", position: "relative", zIndex: 1
      }}>
        <span style={{fontFamily:"'Cinzel',serif", color:TEAM_COLORS[turn], fontWeight:900, fontSize:"14px", letterSpacing: "1px"}}>
          {teamNames[turn]}'s Turn
        </span>
      </div>

      <div style={{ padding: "16px", maxWidth: "800px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
          
          {/* Left Column: Draw & Assign */}
          <div>
            <CharacterCard char={drawnChar} isDrawing={isDrawing} />
            
            {!drawnChar ? (
              <div style={{ marginTop: "16px" }}>
                <button 
                  className="gold-btn animate-pop-in" 
                  style={{ width: "100%", padding: "16px" }}
                  onClick={handleDraw}
                  disabled={!isMyTurn || isDrawing}
                >
                  {isDrawing ? "DRAWING..." : (!isMyTurn ? `WAITING FOR ${teamNames[turn].toUpperCase()}...` : "🎴 DRAW FROM BAG")}
                </button>
              </div>
            ) : (
              <div className="animate-pop-in" style={{ marginTop: "16px" }}>
                <div style={{fontSize:"10px", color:"#5D6D7E", fontFamily:"'Cinzel',serif", letterSpacing:"1px", marginBottom:"8px", textAlign:"center", fontWeight:700}}>
                  PICK A ROLE
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {ROLES.map(r => {
                    const isFilled = !!slots[turn][r.key];
                    const pts = drawnChar.s[r.key];
                    const isTraitor = r.key === "tra";
                    const ptsColor = isTraitor ? "#E74C3C" : pts >= 8 ? "#27AE60" : pts >= 5 ? "#C8960C" : "#E67E22";

                    return (
                      <button 
                        key={r.key} 
                        className="role-btn"
                        disabled={isFilled || (!isMyTurn && isOnline)}
                        onClick={() => handleAssignRole(r.key)}
                        style={{ position: "relative", overflow: "hidden" }}
                      >
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                          <div>
                            <span style={{marginRight:"4px", fontSize: "14px"}}>{r.icon}</span>
                            <span style={{ fontFamily:"'Cinzel',serif", fontSize:"9px", color: isTraitor ? "#7D3C98" : r.col, fontWeight:700 }}>
                              {r.label}
                            </span>
                          </div>
                          <span style={{fontFamily:"'Cinzel',serif", fontWeight:900, fontSize:"14px", color:ptsColor}}>
                            {isTraitor ? `-${drawnChar.basePwr} PWR | -${pts}` : `+${drawnChar.basePwr} PWR | +${pts}`}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Boards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <TeamBoard name={teamNames[0]} slots={slots[0]} score={score0} color={TEAM_COLORS[0]} isActive={turn === 0} />
            <TeamBoard name={teamNames[1]} slots={slots[1]} score={score1} color={TEAM_COLORS[1]} isActive={turn === 1} />
          </div>

        </div>
      </div>
    </div>
  );
}
