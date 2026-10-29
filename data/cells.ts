import { Cell } from "@/types/game";

export const CELLS: Cell[] = [
  { id: 1, name: "夢夢車站", type: "start", description: "聖誕探索號從夢夢車站出發！", effect: { type: "start" }, icon: "🚉", color: "bg-green-400" },
  { id: 2, name: "馴鹿加速", type: "boost", description: "馴鹿帶來好運！", effect: { type: "extra_roll" }, icon: "🦌", color: "bg-yellow-400" },
  { id: 3, name: "冰雪路障", type: "trap", description: "冰雪路障擋住去路。", effect: { type: "skip_turn" }, icon: "🧊", color: "bg-red-400" },
  { id: 4, name: "禮物工坊", type: "station", description: "全隊合作將禮物道具傳送到最前面。", effect: { type: "mission", mission: "全隊合作將禮物道具傳送到最前面" }, icon: "🎁", color: "bg-blue-400" },
  {
    id: 5, name: "聖誕知識站", type: "quiz", description: "全隊一起回答聖誕問題！",
    effect: { type: "quiz", question: "耶穌誕生在哪裡？", options: ["伯利恆", "拿撒勒", "耶路撒冷"], answer: 0 },
    hostNote: "正確答案：伯利恆。公布答案後按「確認」繼續。", icon: "⭐", color: "bg-purple-400",
  },
  { id: 6, name: "雪人暖身站", type: "station", description: "全隊一起原地跑步 10 秒。", effect: { type: "mission", mission: "全隊一起原地跑步 10 秒" }, icon: "⛄", color: "bg-blue-400" },
  { id: 7, name: "清除積雪", type: "obstacle", description: "全隊合作將代表積雪的道具往後傳。", effect: { type: "mission", mission: "全隊合作將代表積雪的道具往後傳" }, icon: "❄️", color: "bg-orange-400" },
  { id: 8, name: "聖誕合照站", type: "station", description: "全隊做出指定動作，例如頭上大愛心，讓主持人拍照。", effect: { type: "mission", mission: "全隊做出指定動作，例如頭上大愛心，讓主持人拍照" }, hostNote: "請提示大家做出頭上大愛心動作，並為全隊拍照。", icon: "📸", color: "bg-blue-400" },
  { id: 9, name: "暴風雪", type: "trap", description: "遇上暴風雪，退後 2 格。", effect: { type: "move", value: -2 }, icon: "🌨️", color: "bg-red-400" },
  { id: 10, name: "雪橇維修站", type: "station", description: "全隊將工具道具往前傳，進行模擬維修。", effect: { type: "mission", mission: "全隊將工具道具往前傳，進行模擬維修" }, icon: "🛷", color: "bg-blue-400" },
  { id: 11, name: "聖誕派對", type: "station", description: "全隊跟著台上的主持人一起做動作。", effect: { type: "mission", mission: "全隊跟著台上的主持人一起做動作" }, icon: "🎉", color: "bg-blue-400" },
  { id: 12, name: "思麥特車站", type: "end", description: "抵達思麥特車站！最先到達的隊伍獲勝！", effect: { type: "end" }, icon: "🏁", color: "bg-green-400" },
];
