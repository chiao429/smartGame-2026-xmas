import React, { useLayoutEffect, useState } from "react";
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

const CELL_RIGHT_EDGES = [
  "",
  "calc((100% - 3 * var(--board-gap)) / 4)",
  "calc(50% - var(--board-gap) / 2)",
  "calc(75% - var(--board-gap) / 4)",
  "100%",
];

const CELL_ROW_CENTERS = [
  "",
  "12.5%",
  "calc(37.5% - var(--board-gap) / 8)",
  "calc(62.5% + var(--board-gap) / 8)",
  "calc(87.5% + 3 * var(--board-gap) / 8)",
];

export const GameBoard: React.FC<GameBoardProps> = ({ teams, currentTeamIndex }) => {
  const currentTeam = teams[currentTeamIndex];
  const [settledPositions, setSettledPositions] = useState(
    () => new Map(teams.map((team) => [team.id, team.position]))
  );

  useLayoutEffect(() => {
    const arrivedTeams = teams.filter((team) => team.justArrived);
    if (!arrivedTeams.length) return;

    setSettledPositions((previous) => {
      const next = new Map(previous);
      arrivedTeams.forEach((team) => next.set(team.id, team.position));
      return next;
    });
  }, [teams]);

  const renderCell = (cell: Cell) => {
    const [column, row] = CELL_PLACEMENTS[cell.id];
    const teamsHere = teams.filter((team) => team.position === cell.id);
    const settledTeamsHere = teams.filter((team) => settledPositions.get(team.id) === cell.id);
    const isCurrentTeamHere = teamsHere.some((team) => team.id === currentTeam?.id);

    return (
      <div
        key={cell.id}
        data-board-cell={cell.id}
        data-cell-type={cell.type}
        data-has-pieces={settledTeamsHere.length > 0}
        className={`xmas-cell ${cell.id === 1 ? "xmas-cell-start" : ""} ${cell.type === "end" ? "xmas-cell-end" : ""} ${isCurrentTeamHere ? "xmas-cell-current" : ""}`}
        style={{ gridColumn: column, gridRow: row }}
        aria-label={`第 ${cell.id} 格，${cell.name}${teamsHere.length ? `，${teamsHere.map((team) => team.name).join("、")}` : ""}`}
      >
        <div className="xmas-cell-meta">
          <span className="xmas-cell-number">{cell.id}</span>
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
        <div className="xmas-piece-layer" aria-label="隊伍棋子位置">
          {teams.map((team) => {
            const [column, row] = CELL_PLACEMENTS[team.position];
            const teamsHere = teams.filter((otherTeam) => otherTeam.position === team.position);
            const index = teamsHere.findIndex((otherTeam) => otherTeam.id === team.id);
            const stackOffset = teamsHere.length > 1
              ? index === 0
                ? "calc(-1 * (var(--piece-size) + var(--piece-stack-gap)) / 2)"
                : "calc((var(--piece-size) + var(--piece-stack-gap)) / 2)"
              : "0px";

            return (
              <span
                key={team.id}
                className={`xmas-piece xmas-piece-pin ${team.justArrived ? "piece-arrived" : ""}`}
                style={{
                  backgroundColor: team.color,
                  "--piece-edge": CELL_RIGHT_EDGES[column],
                  "--piece-center": CELL_ROW_CENTERS[row],
                  "--piece-stack-offset": stackOffset,
                } as React.CSSProperties}
                title={team.name}
                aria-label={`${team.name}，第 ${team.position} 格`}
              >
                {team.image ? (
                  <span className="xmas-piece-image" style={{ backgroundImage: `url(${team.image})` }} role="img" aria-label={team.name} />
                ) : (
                  <span aria-hidden="true">{team.emoji}</span>
                )}
              </span>
            );
          })}
        </div>
        <section className="xmas-center" aria-label="聖誕探索號目前遊戲狀態">
          <span className="xmas-turn-label">輪到隊伍</span>
          <strong className="xmas-turn-name">{currentTeam?.name ?? "等待隊伍"}</strong>
          <span className="xmas-turn-position">目前在第 {currentTeam?.position ?? 1} 格</span>
        </section>
      </div>
    </div>
  );
};
