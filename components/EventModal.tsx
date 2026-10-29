import React from "react";
import { CellType } from "@/types/game";

interface EventModalProps {
  show: boolean;
  message: string;
  eventType: CellType | null;
  onClose: () => void;
  hostNote?: string;
  eventTitle?: string;
}

const EVENT_DETAILS: Partial<Record<CellType, { icon: string; title: string }>> = {
  boost: { icon: "🦌", title: "馴鹿加速" },
  station: { icon: "🎁", title: "團隊任務" },
  obstacle: { icon: "❄️", title: "清除積雪" },
  trap: { icon: "🌨️", title: "路況提醒" },
  quiz: { icon: "⭐", title: "聖誕知識站" },
  rest: { icon: "☕", title: "休息一下" },
  end: { icon: "🏁", title: "旅程抵達" },
};

export const EventModal: React.FC<EventModalProps> = ({ show, message, eventType, onClose, hostNote, eventTitle }) => {
  if (!show) return null;

  const event = eventType ? EVENT_DETAILS[eventType] : undefined;

  return (
    <div className="xmas-modal-backdrop" role="presentation">
      <section className="xmas-event-modal" role="dialog" aria-modal="true" aria-labelledby="xmas-event-title">
        <span className="xmas-modal-sparkle" aria-hidden="true">✦</span>
        <div className="xmas-event-icon" aria-hidden="true">{event?.icon ?? "🎄"}</div>
        <p className="xmas-eyebrow">聖誕探索號</p>
        <h2 id="xmas-event-title">{eventTitle ?? event?.title ?? "旅程提醒"}</h2>
        <p className="xmas-event-message">{message}</p>
        {hostNote && <p className="xmas-host-note"><strong>主持人提示</strong>{hostNote}</p>}
        <button type="button" className="xmas-button xmas-button-primary xmas-modal-button" onClick={onClose} autoFocus>確認</button>
      </section>
    </div>
  );
};
