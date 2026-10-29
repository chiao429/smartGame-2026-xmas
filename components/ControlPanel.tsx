"use client";

import React, { useState } from "react";
import { useGameContext } from "@/contexts/GameContextSocket";
import { DiceRoller } from "./DiceRoller";
import { TeamStatusPanel } from "./TeamStatusPanel";

export const ControlPanel: React.FC = () => {
  const { gameState, rollDice, resetGame, manualMove } = useGameContext();
  const [manualSteps, setManualSteps] = useState(1);

  if (!gameState.gameStarted) return null;

  const currentTeam = gameState.teams[gameState.currentTeamIndex];
  const movementDisabled = gameState.showEvent || !!gameState.winner || gameState.isRolling;

  return (
    <div className="xmas-control-layout">
      <section className="xmas-control-card">
        <div className="xmas-section-heading">
          <span className="xmas-heading-icon" aria-hidden="true">🎄</span>
          <div><p className="xmas-eyebrow">NOW PLAYING</p><h2>目前回合</h2></div>
        </div>

        {currentTeam && (
          <div className="xmas-active-team">
            <span className="xmas-active-team-avatar" style={{ backgroundColor: currentTeam.color }}>
              {currentTeam.image ? <span className="xmas-piece-image" style={{ backgroundImage: `url(${currentTeam.image})` }} /> : currentTeam.emoji}
            </span>
            <div><span>現在輪到</span><strong>{currentTeam.name}</strong><small>第 {currentTeam.position} 格</small></div>
            {currentTeam.isResting && <span className="xmas-rest-tag">暫停中</span>}
          </div>
        )}

        <DiceRoller diceValue={gameState.diceValue} isRolling={gameState.isRolling} onRoll={rollDice} disabled={gameState.showEvent || !!gameState.winner} />

        <div className="xmas-manual-control">
          <div className="xmas-subheading"><span>手動移動</span><span>選擇 1–6 格</span></div>
          <div className="xmas-manual-row">
            <input type="number" min="1" max="6" value={manualSteps} onChange={(event) => setManualSteps(Number(event.target.value))} disabled={movementDisabled} aria-label="手動前進格數" />
            <button type="button" className="xmas-button xmas-button-secondary" onClick={() => manualMove(manualSteps)} disabled={movementDisabled || manualSteps < 1 || manualSteps > 6}>前進</button>
          </div>
          <div className="xmas-step-buttons" role="group" aria-label="快速選擇前進格數">
            {[1, 2, 3, 4, 5, 6].map((step) => (
              <button type="button" key={step} aria-pressed={manualSteps === step} className={manualSteps === step ? "is-selected" : ""} onClick={() => setManualSteps(step)} disabled={movementDisabled}>{step}</button>
            ))}
          </div>
        </div>
      </section>

      <TeamStatusPanel teams={gameState.teams} currentTeamIndex={gameState.currentTeamIndex} />

      <div className="xmas-control-actions">
        <a className="xmas-button xmas-button-primary" href="/game" target="_blank" rel="noopener noreferrer">🖥️　開啟投影畫面</a>
        <button type="button" className="xmas-button xmas-button-quiet" onClick={resetGame}>重新開始</button>
      </div>
    </div>
  );
};
