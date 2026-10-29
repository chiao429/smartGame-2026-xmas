import React from "react";
import { Cell, Team } from "@/types/game";
import { CELLS } from "@/data/cells";

interface GameBoardProps {
  teams: Team[];
  currentTeamIndex: number;
}

const CELL_PLACEMENTS: Record<number, [number, number]> = {
  1: [1, 1], 2: [2, 1], 3: [3, 1], 4: [4, 1],
  5: [4, 2], 6: [4, 3], 7: [4, 4], 8: [3, 4],
  9: [2, 4], 10: [1, 4], 11: [1, 3], 12: [1, 2],
};

export const GameBoard: React.FC<GameBoardProps> = ({ teams, currentTeamIndex }) => {
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
        <div className="xmas-cell-content">
          <span className="xmas-cell-icon" aria-hidden="true">{cell.icon}</span>
          <span className="xmas-cell-name" title={cell.name}>{cell.name}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="xmas-board-shell">
      <div className="xmas-board-grid">
        {CELLS.map(renderCell)}
        <section className="xmas-center" aria-label="聖誕探索號目前遊戲狀態">
          <span className="xmas-turn-label">輪到隊伍</span>
          <strong className="xmas-turn-name">{currentTeam?.name ?? "等待隊伍"}</strong>
          <span className="xmas-turn-position">目前在第 {currentTeam?.position ?? 1} 格</span>
        </section>
      </div>
    </div>
  );
};
