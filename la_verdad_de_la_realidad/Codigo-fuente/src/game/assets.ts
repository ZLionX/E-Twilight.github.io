import bgRoom from "@/assets/bg_room.jpg";
import bgSchool from "@/assets/bg_school.jpg";
import bgMorning from "@/assets/bg_morning.jpg";
import bgHall from "@/assets/bg_hall.jpg";
import theme from "@/assets/chars/theme.mp3.asset.json";

const mods = import.meta.glob("../assets/chars/*.webp.asset.json", { eager: true, import: "default" }) as Record<string, { url: string }>;
export const sprites: Record<string, string> = {};
for (const [p, v] of Object.entries(mods)) sprites[p.split("/").pop()!.replace(".webp.asset.json", "")] = v.url;

export const backgrounds = { room: bgRoom, school: bgSchool, morning: bgMorning, hall: bgHall, black: "" } as const;
export type BgKey = keyof typeof backgrounds;
export const musicUrl = theme.url;
