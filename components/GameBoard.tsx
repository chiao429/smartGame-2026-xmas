import React from "react";
import { Cell, Team } from "@/types/game";
import { CELLS } from "@/data/cells";

interface GameBoardProps {
  teams: Team[];
  currentTeamIndex: number;
  diceValue: number | null;
  isRolling: boolean;
}

const CELL_PLACEMENTS: Record<number, [number, number]> = {
  1: [1, 1], 2: [2, 1], 3: [3, 1], 4: [4, 1],
  5: [4, 2], 6: [4, 3], 7: [4, 4], 8: [3, 4],
  9: [2, 4], 10: [1, 4], 11: [1, 3], 12: [1, 2],
};

const PATH_ARROWS: Record<number, string> = {
  2: "→", 3: "→", 4: "↓", 5: "↓", 6: "↓", 7: "←",
  8: "←", 9: "←", 10: "↑", 11: "↑",
};

export const GameBoard: React.FC<GameBoardProps> = ({ teams, currentTeamIndex, diceValue, isRolling }) => {
  const currentTeam = teams[currentTeamIndex];

  const renderCell = (cell: Cell) => {
    const [column, row] = CELL_PLACEMENTS[cell.id];
    const teamsHere = teams.filter((team) => team.position === cell.id);
    const isCurrentTeamHere = teamsHere.some((team) => team.id === currentTeam?.id);

    return (
      <div
        key={cell.id}
        data-board-cell={cell.id}
        data-cell-type={cell.type}
        className={`xmas-cell ${cell.id === 1 ? "xmas-cell-start" : ""} ${cell.type === "end" ? "xmas-cell-end" : ""} ${isCurrentTeamHere ? "xmas-cell-current" : ""}`}
        style={{ gridColumn: column, gridRow: row }}
        aria-label={`第 ${cell.id} 格，${cell.name}${teamsHere.length ? `，${teamsHere.map((team) => team.name).join("、")}` : ""}`}
      >
        <div className="xmas-cell-meta">
          <span className="xmas-cell-number">{cell.id}</span>
          {PATH_ARROWS[cell.id] && <span className="xmas-cell-arrow" aria-hidden="true">{PATH_ARROWS[cell.id]}</span>}
        </div>
        <div className="xmas-cell-content">
          <span className="xmas-cell-icon" aria-hidden="true">{cell.icon}</span>
          <span className="xmas-cell-name" title={cell.name}>{cell.name}</span>
        </div>
        {teamsHere.length > 0 && (
          <div className="xmas-pieces" aria-label="所在隊伍">
            {teamsHere.map((team) => (
              <span key={team.id} className={`xmas-piece ${team.justArrived ? "piece-arrived" : ""}`} style={{ backgroundColor: team.color }} title={team.name} aria-label={team.name}>
                {team.image ? (
                  <span className="xmas-piece-image" style={{ backgroundImage: `url(${team.image})` }} role="img" aria-label={team.name} />
                ) : (
                  <span aria-hidden="true">{team.emoji}</span>
                )}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="xmas-board-shell">
      <div className="xmas-board-grid">
        {CELLS.map(renderCell)}
        <section className="xmas-center" aria-label="聖誕探索號目前遊戲狀態">
          <span className="xmas-center-snow xmas-center-snow-left" aria-hidden="true">✦</span>
          <span className="xmas-center-snow xmas-center-snow-right" aria-hidden="true">✧</span>
          <div className="xmas-center-heading">
            <span className="xmas-center-train" aria-hidden="true">🚂</span>
            <div>
              <p className="xmas-center-kicker">MERRY CHRISTMAS</p>
              <h1>聖誕探索號</h1>
              <p className="xmas-center-subtitle">聖誕平安・喜樂同行</p>
            </div>
            <span className="xmas-center-tree" aria-hidden="true">🎄</span>
          </div>
          <div className="xmas-center-rule"><span>✦</span></div>
          <div className="xmas-turn-card">
            <div className="xmas-turn-info">
              <span className="xmas-turn-label">輪到隊伍</span>
              <div className="xmas-turn-name-row">
                {currentTeam && (
                  <span className="xmas-current-team-token" style={{ backgroundColor: currentTeam.color }}>
                    {currentTeam.image ? (
                      <span className="xmas-piece-image" style={{ backgroundImage: `url(${currentTeam.image})` }} />
                    ) : (
                      <span aria-hidden="true">{currentTeam.emoji}</span>
                    )}
                  </span>
                )}
                <strong className="xmas-turn-name">{currentTeam?.name ?? "等待隊伍"}</strong>
              </div>
              <span className="xmas-turn-position">目前在第 {currentTeam?.position ?? 1} 格</span>
            </div>
            <div className={`xmas-board-die ${isRolling ? "xmas-board-die-rolling" : ""}`} aria-label={isRolling ? "擲骰中" : `骰子 ${diceValue ?? "尚未擲出"}`}>
              {isRolling ? "🎲" : diceValue ?? "🎲"}
            </div>
          </div>
          <p className="xmas-center-footer"><span>✦</span> 一起分享聖誕的喜樂 <span>✦</span></p>
        </section>
      </div>
    </div>
  );
};
