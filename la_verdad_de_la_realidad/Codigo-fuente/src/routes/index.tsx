import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { backgrounds, musicUrl, sprites } from "@/game/assets";
import { CHARACTERS, SCENES, type Step } from "@/game/script";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La verdad de la realidad — Capítulo 00" },
      { name: "description", content: "Prototipo de novela visual en pixel art: Lion, Clay y Yarein en el Capítulo 00, Un día normal." },
      { property: "og:title", content: "La verdad de la realidad" },
      { property: "og:description", content: "Novela visual en pixel art. Capítulo 00: Un día normal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Game,
});

type Screen = "splash" | "menu" | "play" | "chapters" | "characters" | "options" | "credits";
type Save = { scene: number; step: number };
const SAVE_KEY = "lvdlr-save";

function Game() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [volume, setVolume] = useState(0.5);
  const [speed, setSpeed] = useState(30);
  const [save, setSave] = useState<Save | null>(null);
  const [start, setStart] = useState<Save>({ scene: 0, step: 0 });
  const audio = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(SAVE_KEY);
    if (raw) setSave(JSON.parse(raw));
    const a = new Audio(musicUrl);
    a.loop = true;
    audio.current = a;
    return () => a.pause();
  }, []);
  useEffect(() => { if (audio.current) audio.current.volume = volume; }, [volume]);
  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    if (screen === "splash") return;
    if (screen === "play") a.volume = volume * 0.4; else a.volume = volume;
    a.play().catch(() => {});
  }, [screen, volume]);

  const play = (s: Save) => { setStart(s); setScreen("play"); };
  const persist = useCallback((s: Save) => { localStorage.setItem(SAVE_KEY, JSON.stringify(s)); setSave(s); }, []);

  return (
    <main className="relative mx-auto flex min-h-[100dvh] items-center justify-center bg-background md:p-2">
      <div className="relative h-[100dvh] w-full max-w-6xl overflow-hidden bg-background md:h-auto md:aspect-video md:pixel-box">
        {screen === "splash" && <Splash onStart={() => setScreen("menu")} />}
        {screen === "menu" && (
          <Menu save={save} go={setScreen} onNew={() => play({ scene: 0, step: 0 })} onContinue={() => save && play(save)} />
        )}
        {screen === "play" && <Player start={start} speed={speed} onSave={persist} onExit={() => setScreen("menu")} />}
        {screen === "chapters" && <Chapters onPick={(i) => play({ scene: i, step: 0 })} back={() => setScreen("menu")} />}
        {screen === "characters" && <Characters back={() => setScreen("menu")} />}
        {screen === "options" && (
          <Options volume={volume} setVolume={setVolume} speed={speed} setSpeed={setSpeed} back={() => setScreen("menu")}
            onReset={() => { localStorage.removeItem(SAVE_KEY); setSave(null); }} />
        )}
        {screen === "credits" && <Credits back={() => setScreen("menu")} />}
        <div className="pointer-events-none absolute inset-0 scanlines opacity-40" />
      </div>
    </main>
  );
}

function Title({ small }: { small?: boolean }) {
  return (
    <div className="text-center">
      <p className="font-pixel text-[10px] tracking-[0.3em] text-muted-foreground sm:text-xs">CAPÍTULO 00 · UN DÍA NORMAL</p>
      <h1 className={`mt-3 font-pixel leading-tight text-primary drop-shadow-[4px_4px_0_var(--blood)] ${small ? "text-xl" : "text-2xl sm:text-4xl md:text-5xl"}`}>
        La verdad<br />de la realidad
      </h1>
    </div>
  );
}

function Splash({ onStart }: { onStart: () => void }) {
  useEffect(() => {
    const k = () => onStart();
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [onStart]);
  return (
    <button onClick={onStart} className="absolute inset-0 flex flex-col items-center justify-center gap-10 bg-background">
      <img src={backgrounds.room} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="relative"><Title /></div>
      <p className="relative font-pixel text-xs text-accent blink sm:text-sm">▶ PRESIONA CUALQUIER TECLA</p>
      <p className="relative font-body text-lg text-muted-foreground">♪ La Noche Solitaria — The Gold Wolves</p>
    </button>
  );
}

function MenuButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button disabled={disabled} onClick={onClick}
      className="group flex w-full items-center gap-3 px-4 py-2 text-left font-pixel text-xs text-foreground transition-none hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground focus:outline-none disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-foreground sm:text-sm">
      <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100">▶</span>{children}
    </button>
  );
}

function Menu({ save, go, onNew, onContinue }: { save: Save | null; go: (s: Screen) => void; onNew: () => void; onContinue: () => void }) {
  const [i, setI] = useState(0);
  return (
    <div className="absolute inset-0 fx-fade">
      <img src={backgrounds.room} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 right-0 flex h-[60%] w-full items-end justify-center opacity-60 md:h-full md:w-[60%] md:justify-end md:opacity-100">
        {["lion_dark", "yarein_cold", "clay_happy"].map((k, n) => (
          <img key={k} src={sprites[k]} alt="" onMouseEnter={() => setI(n)}
            className={`sprite-mask pointer-events-auto h-[85%] w-auto -ml-[14%] transition-all duration-300 ${i === n ? "z-10 scale-105 brightness-110" : "brightness-50"}`} />
        ))}
      </div>
      <div className="relative z-20 flex h-full w-full max-w-md flex-col justify-center gap-6 p-6 sm:p-10">
        <div className="text-left"><Title small /></div>
        <nav className="flex flex-col gap-1 bg-card p-2 pixel-box">
          <MenuButton onClick={onNew}>Nueva partida</MenuButton>
          <MenuButton onClick={onContinue} disabled={!save}>Continuar</MenuButton>
          <MenuButton onClick={() => go("chapters")}>Escenas</MenuButton>
          <MenuButton onClick={() => go("characters")}>Personajes</MenuButton>
          <MenuButton onClick={() => go("options")}>Opciones</MenuButton>
          <MenuButton onClick={() => go("credits")}>Créditos</MenuButton>
        </nav>
        <p className="font-body text-base text-muted-foreground">v0.1 prototipo · Espacio / clic para avanzar</p>
      </div>
    </div>
  );
}

function Panel({ title, back, children }: { title: string; back: () => void; children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col gap-4 overflow-y-auto bg-background p-4 fx-fade sm:p-8">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-sm text-primary sm:text-lg">{title}</h2>
        <button onClick={back} className="bg-card px-3 py-2 font-pixel text-[10px] text-foreground pixel-box hover:bg-primary hover:text-primary-foreground sm:text-xs">◀ VOLVER</button>
      </div>
      {children}
    </div>
  );
}

function Chapters({ onPick, back }: { onPick: (i: number) => void; back: () => void }) {
  const bgs = [backgrounds.room, backgrounds.morning, backgrounds.hall];
  return (
    <Panel title="CAPÍTULO 00 · ESCENAS" back={back}>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
        {SCENES.map((s, i) => (
          <button key={s.id} onClick={() => onPick(i)} className="group relative overflow-hidden bg-card text-left pixel-box">
            <img src={bgs[i]} alt="" className="h-full w-full object-cover opacity-60 group-hover:opacity-100" />
            <div className="absolute inset-x-0 bottom-0 bg-background/85 p-3">
              <p className="font-pixel text-[10px] text-accent">{s.title}</p>
              <p className="font-body text-xl text-foreground">{s.subtitle}</p>
            </div>
          </button>
        ))}
      </div>
    </Panel>
  );
}

function Characters({ back }: { back: () => void }) {
  const [sel, setSel] = useState(0);
  const c = CHARACTERS[sel]!;
  const prefix = c.name.toLowerCase();
  const all = Object.keys(sprites).filter((k) => k.startsWith(prefix)).sort();
  const [pose, setPose] = useState(c.sprite);
  useEffect(() => setPose(c.sprite), [c.sprite]);
  return (
    <Panel title="PERSONAJES" back={back}>
      <div className="flex gap-2">
        {CHARACTERS.map((ch, i) => (
          <button key={ch.name} onClick={() => setSel(i)}
            className={`px-3 py-2 font-pixel text-[10px] pixel-box sm:text-xs ${i === sel ? "bg-primary text-primary-foreground" : "bg-card text-foreground"}`}>{ch.name}</button>
        ))}
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-4 md:flex-row">
        <img src={sprites[pose]} alt={c.name} className="sprite-mask mx-auto h-56 w-auto md:h-full md:max-h-[60vh]" />
        <div className="flex flex-1 flex-col gap-3">
          <div className="bg-card p-4 pixel-box">
            <p className="font-pixel text-sm text-accent">{c.name}</p>
            <p className="font-body text-lg text-muted-foreground">{c.role}</p>
            <p className="mt-2 font-body text-xl text-foreground">{c.desc}</p>
          </div>
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
            {all.map((k) => (
              <button key={k} onClick={() => setPose(k)} className={`aspect-square overflow-hidden bg-card ${k === pose ? "ring-4 ring-accent" : ""}`}>
                <img src={sprites[k]} alt={k} className="h-full w-full object-cover object-top" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function Options({ volume, setVolume, speed, setSpeed, back, onReset }: { volume: number; setVolume: (v: number) => void; speed: number; setSpeed: (v: number) => void; back: () => void; onReset: () => void }) {
  return (
    <Panel title="OPCIONES" back={back}>
      <div className="flex max-w-xl flex-col gap-6 bg-card p-6 pixel-box">
        <label className="flex flex-col gap-2 font-pixel text-xs text-foreground">Música: {Math.round(volume * 100)}%
          <input type="range" min={0} max={1} step={0.05} value={volume} onChange={(e) => setVolume(+e.target.value)} className="accent-[var(--primary)]" />
        </label>
        <label className="flex flex-col gap-2 font-pixel text-xs text-foreground">Velocidad del texto
          <input type="range" min={5} max={80} step={5} value={85 - speed} onChange={(e) => setSpeed(85 - +e.target.value)} className="accent-[var(--primary)]" />
        </label>
        <button onClick={onReset} className="self-start bg-destructive px-3 py-2 font-pixel text-[10px] text-destructive-foreground">Borrar partida guardada</button>
      </div>
    </Panel>
  );
}

function Credits({ back }: { back: () => void }) {
  return (
    <Panel title="CRÉDITOS" back={back}>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center font-body text-2xl text-foreground">
        <Title small />
        <p>Ximena Gutsfan — Diseño y Pixel Art</p>
        <p>The Gold Wolves — Música</p>
        <p>Tacemothomo — Historia y personajes</p>
        <p className="text-muted-foreground">Prototipo v0.1</p>
      </div>
    </Panel>
  );
}

function resolve(sceneIdx: number, stepIdx: number) {
  // Walk back to find the active bg and sprite state at this step.
  const steps = SCENES[sceneIdx]!.steps;
  let bg: Step["bg"] = "black";
  let sprite: string | null = null;
  let side: Step["side"] = "center";
  for (let i = 0; i <= stepIdx; i++) {
    const s = steps[i]!;
    if (s.bg) bg = s.bg;
    if (s.sprite !== undefined) { sprite = s.sprite; side = s.side ?? "center"; }
  }
  return { bg, sprite, side };
}

function Player({ start, speed, onSave, onExit }: { start: Save; speed: number; onSave: (s: Save) => void; onExit: () => void }) {
  const [pos, setPos] = useState(start);
  const [typed, setTyped] = useState(0);
  const [toast, setToast] = useState("");
  const scene = SCENES[pos.scene]!;
  const step = scene.steps[pos.step]!;
  const { bg, sprite, side } = resolve(pos.scene, pos.step);
  const done = typed >= step.text.length;
  const [intro, setIntro] = useState(true);

  useEffect(() => { setIntro(true); const t = setTimeout(() => setIntro(false), 1600); return () => clearTimeout(t); }, [pos.scene]);
  useEffect(() => { setTyped(0); }, [pos]);
  useEffect(() => {
    if (done) return;
    const t = setTimeout(() => setTyped((n) => n + 1), speed);
    return () => clearTimeout(t);
  }, [typed, done, speed]);

  const next = useCallback(() => {
    if (intro) return setIntro(false);
    if (!done) return setTyped(step.text.length);
    if (pos.step + 1 < scene.steps.length) setPos({ ...pos, step: pos.step + 1 });
    else if (pos.scene + 1 < SCENES.length) setPos({ scene: pos.scene + 1, step: 0 });
    else onExit();
  }, [intro, done, pos, scene, step, onExit]);

  const doSave = () => { onSave(pos); setToast("Partida guardada"); setTimeout(() => setToast(""), 1500); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); next(); }
      if (e.key === "Escape") onExit();
    };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [next, onExit]);

  const sideCls = side === "left" ? "left-[4%]" : side === "right" ? "right-[4%]" : "left-1/2 -translate-x-1/2";
  const fxKey = `${pos.scene}-${pos.step}`;

  return (
    <div className="absolute inset-0 cursor-pointer select-none" onClick={next}>
      <div key={step.fx === "shake" ? fxKey : "s"} className={`absolute inset-0 ${step.fx === "shake" ? "fx-shake" : ""}`}>
        {bg !== "black" && <img key={bg} src={backgrounds[bg!]} alt="" className="absolute inset-0 h-full w-full object-cover fx-fade" />}
        {bg === "black" && <div className="absolute inset-0 bg-background" />}
        {sprite && (
          <img key={sprite} src={sprites[sprite]} alt="" className={`sprite-mask absolute bottom-0 h-[70%] w-auto max-w-none fx-fade md:h-[92%] ${sideCls}`} />
        )}
      </div>
      {step.fx === "flash" && <div key={fxKey} className="pointer-events-none absolute inset-0 bg-foreground fx-flash" />}

      {step.caption && (
        <div key={"c" + fxKey} className="absolute left-1/2 top-[8%] -translate-x-1/2 bg-card px-4 py-2 font-pixel text-[10px] text-accent pixel-box fx-fade sm:text-xs">{step.caption}</div>
      )}

      {step.chat && (
        <div className="absolute inset-x-[4%] top-[14%] md:inset-x-auto md:right-[6%] md:top-[18%] md:w-[38%] bg-background/95 p-3 font-body text-lg pixel-box fx-fade">
          <p className="mb-2 border-b-2 border-border pb-1 font-pixel text-[10px] text-primary">CHAT · Lion</p>
          {step.chat.map((c, i) => (
            <p key={i} className={c.who === "Lion" ? "text-accent" : "italic text-destructive"}><b>{c.who}:</b> {c.msg}</p>
          ))}
        </div>
      )}

      <div className="absolute right-3 top-3 flex gap-2" onClick={(e) => e.stopPropagation()}>
        <button onClick={doSave} className="bg-card px-2 py-1 font-pixel text-[9px] text-foreground pixel-box hover:bg-primary hover:text-primary-foreground">GUARDAR</button>
        <button onClick={onExit} className="bg-card px-2 py-1 font-pixel text-[9px] text-foreground pixel-box hover:bg-primary hover:text-primary-foreground">MENÚ</button>
      </div>
      {toast && <div className="absolute left-3 top-3 bg-accent px-3 py-1 font-pixel text-[10px] text-accent-foreground">{toast}</div>}

      <div className="absolute inset-x-[3%] bottom-[4%] min-h-[26%] bg-card p-4 pixel-box sm:p-5">
        {step.speaker && !step.narration && (
          <div className="absolute -top-5 left-4 bg-primary px-3 py-1 font-pixel text-[10px] text-primary-foreground sm:text-xs">{step.speaker}</div>
        )}
        <p className={`font-body text-xl leading-snug sm:text-3xl ${step.narration ? "italic text-muted-foreground" : "text-foreground"}`}>
          {step.text.slice(0, typed)}
        </p>
        {done && <span className="absolute bottom-2 right-4 font-pixel text-xs text-accent blink">▼</span>}
        <span className="absolute bottom-2 left-4 font-pixel text-[8px] text-muted-foreground">{scene.title} · {pos.step + 1}/{scene.steps.length}</span>
      </div>

      {intro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background fx-fade">
          <p className="font-pixel text-xs text-accent">{scene.title}</p>
          <p className="font-pixel text-lg text-primary sm:text-2xl">{scene.subtitle}</p>
        </div>
      )}
    </div>
  );
}
