import React, { useState } from "react";
import WelcomeScreen from "./screens/WelcomeScreen.jsx";
import SetupScreen from "./screens/SetupScreen.jsx";
import LobbyScreen from "./screens/LobbyScreen.jsx";
import GameScreen from "./screens/GameScreen.jsx";
import WinnerScreen from "./screens/WinnerScreen.jsx";

export default function App() {
  const [screen, setScreen] = useState("welcome"); // welcome, setup, lobby, game, winner
  const [mode, setMode] = useState(null); // bot, friend, random
  const [gameConfig, setGameConfig] = useState(null);
  const [winnerData, setWinnerData] = useState(null);

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === "bot") setScreen("setup");
    else setScreen("lobby");
  };

  const handleStartBotGame = (config) => {
    setGameConfig(config);
    setScreen("game");
  };

  const handleStartOnlineGame = (config) => {
    setGameConfig(config);
    setScreen("game");
  };

  const handleGameOver = (slots, teamNames, colors, winner, scores) => {
    setWinnerData({ slots, teamNames, colors, winner, scores });
    setScreen("winner");
  };

  const resetToWelcome = () => {
    setScreen("welcome");
    setMode(null);
    setGameConfig(null);
    setWinnerData(null);
    // Realistically you might need to force a disconnect in socket here if quitting mid-game
  };

  return (
    <>
      {screen === "welcome" && <WelcomeScreen onSelectMode={handleSelectMode} />}
      
      {screen === "setup" && (
        <SetupScreen 
          onBack={resetToWelcome} 
          onStart={handleStartBotGame} 
        />
      )}
      
      {screen === "lobby" && (
        <LobbyScreen 
          mode={mode} 
          onBack={resetToWelcome} 
          onGameReady={handleStartOnlineGame} 
        />
      )}

      {screen === "game" && (
        <GameScreen 
          mode={mode}
          initialData={gameConfig}
          onGameOver={handleGameOver}
        />
      )}

      {screen === "winner" && winnerData && (
        <WinnerScreen 
          {...winnerData}
          onReset={resetToWelcome}
        />
      )}
    </>
  );
}
