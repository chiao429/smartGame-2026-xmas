import React from "react";
import { Team } from "@/types/game";

interface TeamStatusPanelProps {
  teams: Team[];
  currentTeamIndex: number;
}

export const TeamStatusPanel: React.FC<TeamStatusPanelProps> = ({ teams, currentTeamIndex }) => (
  <section className="xmas-status-card">
    <div className="xmas-section-heading xmas-status-heading">
      <span className="xmas-heading-icon" aria-hidden="true">🎁</span>
      <div><p className="xmas-eyebrow">TEAM CHECK-IN</p><h2>隊伍狀態</h2></div>
    </div>
    <div className="xmas-team-status-list">
      {teams.map((team, index) => (
        <div key={team.id} className={`xmas-team-status ${index === currentTeamIndex ? "is-current" : ""}`}>
          <span className="xmas-status-avatar" style={{ backgroundColor: team.color }}>
            {team.image ? <span className="xmas-piece-image" style={{ backgroundImage: `url(${team.image})` }} /> : team.emoji}
          </span>
          <div className="xmas-status-team-copy"><strong>{team.name}</strong><span>第 {team.position} 格{team.isResting ? "・暫停中" : ""}</span></div>
          {index === currentTeamIndex && <span className="xmas-turn-pill">目前回合</span>}
        </div>
      ))}
    </div>
  </section>
);
