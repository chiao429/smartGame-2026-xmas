"use client";

import React from "react";
import Image from "next/image";
import { GameBoard } from "@/components/GameBoard";
import { CELLS } from "@/data/cells";
import { getTeamIdleSpriteImage, getTeamTokenImage } from "@/data/teamTokens";
import { Team } from "@/types/game";

interface GameBoardDioramaProps {
  teams: Team[];
  currentTeamIndex: number;
}

const STATION_ANCHORS: Record<number, { name: [number, number]; number: [number, number]; token: [number, number] }> = {
  1: { name: [25, 24], number: [11.5, 10], token: [11.5, 21] },
  2: { name: [38, 24], number: [31, 10], token: [31, 23] },
  3: { name: [58, 24], number: [51.5, 10], token: [51.5, 23] },
  4: { name: [86, 22], number: [77, 10], token: [77, 23] },
  5: { name: [91.5, 50], number: [81.5, 31], token: [81.5, 44] },
  6: { name: [89.5, 72], number: [81, 52], token: [81, 65] },
  7: { name: [84, 91], number: [77, 73], token: [77, 86] },
  8: { name: [63.5, 90], number: [53.5, 73], token: [53.5, 86] },
  9: { name: [40.5, 90], number: [30.5, 73], token: [30.5, 86] },
  10: { name: [18, 89], number: [8, 72], token: [8, 85] },
  11: { name: [18, 68], number: [5, 48], token: [5, 61] },
  12: { name: [22, 45], number: [5, 30], token: [5, 43] },
};

function spritePosition(frame: number) {
  const column = frame % 4;
  const row = Math.floor(frame / 4);
  return `${(column / 3) * 100}% ${row * 100}%`;
}

function IdleAnimalSprite({ src }: { src: string }) {
  const [pose, setPose] = React.useState({ from: 0, to: 0, showTo: false });
  const activeFrame = React.useRef(0);

  React.useEffect(() => {
    let idleTimer: number | undefined;
    let poseTimer: number | undefined;
    let animationFrame: number | undefined;
    let stopped = false;

    const showPose = (nextFrame: number) => {
      const previousFrame = activeFrame.current;
      activeFrame.current = nextFrame;
      setPose({ from: previousFrame, to: nextFrame, showTo: false });
      animationFrame = window.requestAnimationFrame(() => {
        if (!stopped) setPose({ from: previousFrame, to: nextFrame, showTo: true });
      });
    };

    const scheduleAction = () => {
      idleTimer = window.setTimeout(() => {
        if (stopped) return;
        showPose(1 + Math.floor(Math.random() * 7));
        poseTimer = window.setTimeout(() => {
          if (stopped) return;
          showPose(0);
          scheduleAction();
        }, 480 + Math.random() * 360);
      }, 3600 + Math.random() * 4400);
    };

    idleTimer = window.setTimeout(scheduleAction, 900 + Math.random() * 1800);
    return () => {
      stopped = true;
      if (idleTimer !== undefined) window.clearTimeout(idleTimer);
      if (poseTimer !== undefined) window.clearTimeout(poseTimer);
      if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const frameStyle = (frame: number): React.CSSProperties => ({
    backgroundImage: `url(${src})`,
    backgroundPosition: spritePosition(frame),
  });

  return (
    <span className="xmas-board-animal" aria-hidden="true">
      <span className="xmas-board-animal-frame" style={{ ...frameStyle(pose.from), opacity: pose.showTo ? 0 : 1 }} />
      <span className="xmas-board-animal-frame" style={{ ...frameStyle(pose.to), opacity: pose.showTo ? 1 : 0 }} />
    </span>
  );
}

export default function GameBoardDiorama({ teams, currentTeamIndex }: GameBoardDioramaProps) {
  const currentTeam = teams[currentTeamIndex];

  return (
    <>
      <div className="xmas-diorama-projector">
        <div className="xmas-board-shell xmas-board-image-shell" role="group" aria-label="聖誕探索號 12 格遊戲棋盤">
          <Image
            className="xmas-board-image"
            src="/images/christmas-diorama-board.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            draggable={false}
          />
          <div className="xmas-image-overlay">
            {CELLS.map((cell) => {
              const anchor = STATION_ANCHORS[cell.id];
              return (
                <React.Fragment key={cell.id}>
                  <span className="xmas-image-stage-name" style={{ left: `${anchor.name[0]}%`, top: `${anchor.name[1]}%` }}>
                    {cell.name}
                  </span>
                  <span
                    className={`xmas-image-stage-number${cell.id === 12 ? " is-finish" : ""}`}
                    style={{ left: `${anchor.number[0]}%`, top: `${anchor.number[1]}%` }}
                  >
                    {cell.id}
                  </span>
                </React.Fragment>
              );
            })}

            {teams.map((team) => {
              const teamsHere = teams.filter((otherTeam) => otherTeam.position === team.position);
              const teamIndex = teamsHere.findIndex((otherTeam) => otherTeam.id === team.id);
              const anchor = STATION_ANCHORS[team.position] ?? STATION_ANCHORS[1];
              const offset = teamsHere.length > 1 ? (teamIndex === 0 ? -4 : 4) : 0;
              const tokenImage = getTeamTokenImage(team.image);
              const idleSpriteImage = getTeamIdleSpriteImage(team.image);

              return (
                <span
                  key={team.id}
                  className="xmas-board-token-anchor"
                  style={{ left: `${anchor.token[0] + offset}%`, top: `${anchor.token[1]}%` }}
                  title={team.name}
                  aria-label={`${team.name}，第 ${team.position} 格`}
                >
                  {idleSpriteImage ? (
                    <IdleAnimalSprite src={idleSpriteImage} />
                  ) : tokenImage ? (
                    <Image className="xmas-board-animal-static" src={tokenImage} alt="" aria-hidden="true" width={160} height={160} draggable={false} />
                  ) : (
                    <span className="xmas-board-animal-fallback" style={{ color: team.color }} aria-hidden="true">{team.emoji}</span>
                  )}
                </span>
              );
            })}

            {currentTeam && (
              <section className="xmas-image-center-panel" style={{ left: "50%", top: "42.5%", height: "18%" }} aria-label="目前隊伍資訊">
                <span className="xmas-image-turn-label">輪到隊伍</span>
                <div className="xmas-image-current-team">
                  <span className="xmas-image-current-avatar" style={{ backgroundColor: currentTeam.color }} aria-hidden="true">
                    {currentTeam.image ? (
                      <span className="xmas-piece-image" style={{ backgroundImage: `url(${currentTeam.image})` }} />
                    ) : currentTeam.emoji}
                  </span>
                  <strong>{currentTeam.name}</strong>
                </div>
                <span className="xmas-image-position">目前在第 {currentTeam.position} 格</span>
              </section>
            )}
          </div>
        </div>
      </div>
      <div className="xmas-diorama-mobile">
        <GameBoard teams={teams} currentTeamIndex={currentTeamIndex} />
      </div>
    </>
  );
}
