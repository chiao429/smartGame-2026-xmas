"use client";

import React, { useEffect, useState } from "react";
import { useGameContext } from "@/contexts/GameContextSocket";
import { GameBoard } from "@/components/GameBoard";
import { EventModal } from "@/components/EventModal";
import { WinScreen } from "@/components/WinScreen";
import { CELLS } from "@/data/cells";

export default function GamePage() {
  const { gameState, closeEvent } = useGameContext();
  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const currentCell = currentTeam && CELLS.find((cell) => cell.id === currentTeam.position);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    handleFullscreenChange();

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await document.documentElement.requestFullscreen();
  };

  const displayControls = (
    <button type="button" className={`xmas-fullscreen-button ${isFullscreen ? "is-hidden" : ""}`} onClick={toggleFullscreen}>
      全螢幕
    </button>
  );

  if (!gameState.gameStarted) {
    return (
      <main className="xmas-game-page xmas-waiting-page">
        {displayControls}
        <div className="xmas-waiting-card"><span aria-hidden="true">🚂</span><p className="xmas-eyebrow">MERRY CHRISTMAS</p><h1>聖誕探索號</h1><p>請在主持人控制台設定隊伍並開始旅程。</p></div>
      </main>
    );
  }

  return (
    <main className="xmas-game-page">
      {displayControls}
      <div className="xmas-game-board-area">
        <GameBoard
          teams={gameState.teams}
          currentTeamIndex={gameState.currentTeamIndex}
          diceValue={gameState.diceValue}
          isRolling={gameState.isRolling}
        />
      </div>

      <EventModal
        show={gameState.showEvent}
        message={gameState.eventMessage}
        eventType={gameState.eventType}
        onClose={closeEvent}
        eventTitle={currentCell?.name}
      />

      <WinScreen winner={gameState.winner} />
    </main>
  );
}
