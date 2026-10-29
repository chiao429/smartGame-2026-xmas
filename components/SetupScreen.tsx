import React, { useState } from "react";
import { Team } from "@/types/game";

interface SetupScreenProps {
  onStart: (teams: Team[], startingTeamIndex: number) => void;
}

const TEAM_COLORS = ["#3869A8", "#C77835"];
const TEAM_EMOJIS = ["🐺", "🐆"];
const TEAM_IMAGES = ["/teams/snow-wolf.jpg", "/teams/cheetah.jpg"];
const DEFAULT_NAMES = ["雪狼隊", "獵豹隊"];

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStart }) => {
  const [teamNames, setTeamNames] = useState(DEFAULT_NAMES);
  const [startingTeamIndex, setStartingTeamIndex] = useState(0);

  const handleNameChange = (index: number, name: string) => {
    setTeamNames((previous) => previous.map((value, item) => item === index ? name : value));
  };

  const handleStart = () => {
    const teams: Team[] = teamNames.map((name, index) => ({
      id: index + 1,
      name: name.trim() || `隊伍 ${index + 1}`,
      color: TEAM_COLORS[index],
      position: 1,
      isResting: false,
      emoji: TEAM_EMOJIS[index],
      image: TEAM_IMAGES[index],
    }));
    onStart(teams, startingTeamIndex);
  };

  return (
    <main className="xmas-setup-page">
      <div className="xmas-setup-card">
        <div className="xmas-setup-brand">
          <span className="xmas-setup-train" aria-hidden="true">🚂</span>
          <span className="xmas-setup-star" aria-hidden="true">✦</span>
          <p className="xmas-eyebrow">MERRY CHRISTMAS</p>
          <h1>聖誕探索號</h1>
          <p className="xmas-setup-intro">一起出發，分享聖誕的喜樂！</p>
        </div>

        <section className="xmas-setup-section" aria-labelledby="team-name-title">
          <h2 id="team-name-title">隊伍名稱</h2>
          <div className="xmas-team-fields">
            {teamNames.map((name, index) => (
              <label className="xmas-team-field" key={index}>
                <span className="xmas-team-avatar" style={{ backgroundColor: TEAM_COLORS[index] }}>
                  {TEAM_IMAGES[index] ? (
                    <span className="xmas-piece-image" style={{ backgroundImage: `url(${TEAM_IMAGES[index]})` }} />
                  ) : TEAM_EMOJIS[index]}
                </span>
                <span className="xmas-team-field-control">
                  <span className="xmas-team-field-caption">第 {index + 1} 隊</span>
                  <input type="text" value={name} maxLength={12} onChange={(event) => handleNameChange(index, event.target.value)} placeholder={`隊伍 ${index + 1}`} aria-label={`第 ${index + 1} 隊名稱`} />
                </span>
              </label>
            ))}
          </div>
        </section>

        <section className="xmas-setup-section" aria-labelledby="starting-team-title">
          <h2 id="starting-team-title">先手隊伍</h2>
          <div className="xmas-first-team-options" role="radiogroup" aria-labelledby="starting-team-title">
            {teamNames.map((name, index) => (
              <label className={`xmas-first-team-option${startingTeamIndex === index ? " is-selected" : ""}`} key={index}>
                <span className="xmas-team-avatar" style={{ backgroundColor: TEAM_COLORS[index] }} aria-hidden="true">
                  {TEAM_IMAGES[index] ? (
                    <span className="xmas-piece-image" style={{ backgroundImage: `url(${TEAM_IMAGES[index]})` }} />
                  ) : TEAM_EMOJIS[index]}
                </span>
                <span className="xmas-first-team-copy">
                  <span className="xmas-team-field-caption">第 {index + 1} 隊</span>
                  <strong>{name.trim() || `隊伍 ${index + 1}`}</strong>
                </span>
                <input
                  type="radio"
                  name="starting-team"
                  value={index}
                  checked={startingTeamIndex === index}
                  onChange={() => setStartingTeamIndex(index)}
                  aria-label={`選擇${name.trim() || `第 ${index + 1} 隊`}先開始`}
                />
              </label>
            ))}
          </div>
        </section>

        <button type="button" className="xmas-start-button" onClick={handleStart}>
          🚂　開始聖誕旅程
        </button>
        <p className="xmas-setup-footnote">12 格・兩隊同遊・一起歡慶聖誕</p>
      </div>
    </main>
  );
};
