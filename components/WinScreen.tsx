import React from "react";
import { Team } from "@/types/game";

interface WinScreenProps {
  winner: Team | null;
  onRestart?: () => void;
}

const CONFETTI = ["✦", "❄", "✧", "●", "★"];

export const WinScreen: React.FC<WinScreenProps> = ({ winner, onRestart }) => {
  if (!winner) return null;

  return (
    <div className="xmas-win-screen" role="dialog" aria-modal="true" aria-labelledby="xmas-win-title">
      <div className="xmas-confetti" aria-hidden="true">
        {Array.from({ length: 28 }, (_, index) => (
          <span key={index} style={{ left: `${(index * 37) % 100}%`, animationDelay: `${(index % 7) * -0.55}s`, animationDuration: `${4 + (index % 4)}s` }}>
            {CONFETTI[index % CONFETTI.length]}
          </span>
        ))}
      </div>
      <div className="xmas-win-card">
        <div className="xmas-win-star" aria-hidden="true">✦</div>
        <p className="xmas-eyebrow">MERRY CHRISTMAS</p>
        <div className="xmas-win-icon" aria-hidden="true">🏆</div>
        <h1 id="xmas-win-title">恭喜獲勝！</h1>
        <div className="xmas-winner-team">
          <span className="xmas-winner-avatar" style={{ backgroundColor: winner.color }}>
            {winner.image ? <span className="xmas-piece-image" style={{ backgroundImage: `url(${winner.image})` }} /> : winner.emoji}
          </span>
          <strong>{winner.name}</strong>
        </div>
        <p className="xmas-win-message">成功抵達思麥特車站！</p>
        <div className="xmas-win-garland" aria-hidden="true">🎄　✦　🎁　✦　🚂</div>
        {onRestart && <button type="button" className="xmas-button xmas-button-primary xmas-win-restart" onClick={onRestart}>再玩一局</button>}
      </div>
    </div>
  );
};
