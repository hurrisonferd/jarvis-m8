@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg0: #08090c;
  --bg1: #0f1117;
  --bg2: #161920;
  --bg3: #1c1f28;
  --bd:  #22252f;
  --amber: #f59e0b;
  --amber-d: #92600a;
  --cyan: #22d3ee;
  --green: #4ade80;
  --red: #f87171;
  --yellow: #fbbf24;
  --text: #dde1ea;
  --muted: #8b92a4;
  --dim: #454d5e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  height: 100%;
  overflow: hidden;
  background: var(--bg0);
  color: var(--text);
  font-family: 'Syne', system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar */
::-webkit-scrollbar { width: 3px; height: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--bg3); border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: var(--dim); }

/* Selection */
::selection { background: rgba(245,158,11,0.25); color: var(--text); }

/* Focus */
:focus-visible { outline: 1px solid var(--amber-d); outline-offset: 2px; }

/* Monospace utility */
.font-mono { font-family: 'JetBrains Mono', monospace; }

/* Badge variants */
.badge-amber  { background: rgba(245,158,11,0.12); color: var(--amber);  border: 1px solid rgba(245,158,11,0.25); }
.badge-cyan   { background: rgba(34,211,238,0.08);  color: var(--cyan);   border: 1px solid rgba(34,211,238,0.2); }
.badge-green  { background: rgba(74,222,128,0.08);  color: var(--green);  border: 1px solid rgba(74,222,128,0.2); }
.badge-red    { background: rgba(248,113,113,0.08); color: var(--red);    border: 1px solid rgba(248,113,113,0.2); }
.badge-yellow { background: rgba(251,191,36,0.08);  color: var(--yellow); border: 1px solid rgba(251,191,36,0.2); }
.badge-gray   { background: var(--bg3); color: var(--muted); border: 1px solid var(--bd); }

/* Lane status colors */
.lane-green  { background: var(--green); }
.lane-yellow { background: var(--yellow); }
.lane-red    { background: var(--red); }
.lane-steel  { background: var(--muted); }
.lane-purple { background: #a78bfa; }

/* Animated pulse for active items */
@keyframes pulse-amber {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
.pulse-amber { animation: pulse-amber 2s ease-in-out infinite; }

/* Screen fade-in */
@keyframes screenIn {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
.screen-enter { animation: screenIn 0.15s ease-out; }
