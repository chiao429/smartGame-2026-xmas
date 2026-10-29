import React from "react";

interface DiceRollerProps {
  diceValue: number | null;
  isRolling: boolean;
  onRoll: () => void;
  disabled?: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({ diceValue, isRolling, onRoll, disabled }) => (
  <div className="xmas-dice-control">
    <div className={`xmas-dice-face ${isRolling ? "xmas-dice-face-rolling" : ""}`} aria-live="polite" aria-label={isRolling ? "擲骰中" : diceValue ? `骰出 ${diceValue} 點` : "尚未擲骰"}>
      {isRolling ? "🎲" : diceValue ?? "🎲"}
    </div>
    <button type="button" className="xmas-button xmas-button-roll" onClick={onRoll} disabled={disabled || isRolling}>
      {isRolling ? "擲骰中…" : "擲骰子"}
    </button>
  </div>
);
