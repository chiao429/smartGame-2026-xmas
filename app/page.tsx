"use client";

import React from "react";
import { useGameContext } from "@/contexts/GameContextSocket";
import { SetupScreen } from "@/components/SetupScreen";
import { ControlPanel } from "@/components/ControlPanel";
import { EventModal } from "@/components/EventModal";
import { WinScreen } from "@/components/WinScreen";
import { CELLS } from "@/data/cells";

export default function Home() {
  const { gameState, startGame, closeEvent, resetGame } = useGameContext();

  if (!gameState.gameStarted) {
    return <SetupScreen onStart={startGame} />;
  }

  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const currentCell = currentTeam && CELLS.find((cell) => cell.id === currentTeam.position);

  return (
    <main className="xmas-console-page">
      <div className="xmas-console-wrap">
        <header className="xmas-console-header">
          <span className="xmas-console-mark" aria-hidden="true">🎄</span>
          <div><p className="xmas-eyebrow">MERRY CHRISTMAS</p><h1>聖誕探索號</h1><p>主持人控制台</p></div>
        </header>
        <ControlPanel />
      </div>

      <EventModal
        show={gameState.showEvent}
        message={gameState.eventMessage}
        eventType={gameState.eventType}
        onClose={closeEvent}
        hostNote={currentCell?.hostNote}
        eventTitle={currentCell?.name}
      />

      <WinScreen winner={gameState.winner} onRestart={resetGame} />
    </main>
  );
}
