import { useState, useEffect, useRef } from "react";

// ---- Blueprint502 brand tokens ----
const NAVY = "#1E2A4A";
const NAVY_LT = "#2E3E68";
const RED = "#D63A2F";
const MAROON = "#7A1E2B";
const SALMON = "#F5A896";
const SALMON_BG = "#FBEAE4";
const GRAY_LN = "#B9BFCC";
const INK = "#232733";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const LOGO_SRC = "data:image/png;base64,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";

// ---- Assessment content (matches the printed packet, order L,H,B,C,T,O) ----
const CAREER_BOXES = [
  { l: "L", name: "The Leader", items: [
    "I like being in charge of a project or a team.",
    "I can talk people into trying my ideas.",
    "I like selling things, speaking up, or running my own business someday.",
    "I like competition and setting big goals.",
    "I'm comfortable making decisions.",
    "I want to be the boss, not just have one.",
  ]},
  { l: "H", name: "The Helper", items: [
    "I like helping people solve their problems.",
    "Friends come to me when they need advice or support.",
    "I like teaching, coaching, or showing people how to do things.",
    "I care about making my community better.",
    "I work better with people than alone.",
    "It feels good when I make someone's day easier.",
  ]},
  { l: "B", name: "The Builder", items: [
    "I like working with my hands.",
    "I would rather build or fix something than sit at a desk.",
    "I like tools, machines, cars, or working outside.",
    "I learn best by doing, not just listening.",
    "I feel proud when I can point at something and say, \u201cI made that.\u201d",
    "I like physical work that keeps me moving.",
  ]},
  { l: "C", name: "The Creator", items: [
    "I like drawing, music, writing, fashion, or making videos.",
    "I like coming up with my own ideas instead of following someone else's.",
    "I notice colors, styles, and details that other people miss.",
    "I like to express myself and stand out.",
    "I get bored doing the same thing the same way every time.",
    "People say I'm creative or original.",
  ]},
  { l: "T", name: "The Thinker", items: [
    "I like figuring out how and why things work.",
    "I ask a lot of questions.",
    "I like solving puzzles, mysteries, or hard problems.",
    "I like science, math, computers, or research.",
    "I like taking my time to think before I act.",
    "I enjoy learning new facts and sharing them.",
  ]},
  { l: "O", name: "The Organizer", items: [
    "I like making lists, plans, and schedules.",
    "I like when things are neat, clear, and in order.",
    "I'm good at keeping track of money, time, or details.",
    "I like clear directions so I know exactly what to do.",
    "I finish what I start.",
    "People trust me to handle important details.",
  ]},
];

const MB_PARTS = [
  { label: "Energy", a: "E", b: "I", title: "Where do you get your energy?", pairs: [
    ["Being around a lot of people pumps me up.", "Being around a lot of people wears me out."],
    ["I think out loud — talking helps me figure things out.", "I think it through in my head first, then talk."],
    ["At a party, I move around and talk to lots of people.", "At a party, I stick with one or two people I know."],
    ["I'd rather work in a group.", "I'd rather work alone or with one partner."],
    ["People say I'm easy to get talking.", "People say I'm quiet until you really know me."],
    ["After a long day, I want to go out with friends.", "After a long day, I want quiet time to recharge."],
  ]},
  { label: "Information", a: "S", b: "N", title: "How do you take in information?", pairs: [
    ["I focus on facts and what's real right now.", "I focus on ideas and what could happen next."],
    ["I like clear, step-by-step directions.", "I like to figure out my own way to do it."],
    ["I trust what I can see and prove.", "I trust my gut and my imagination."],
    ["I notice small details other people miss.", "I see the big picture but miss small details."],
    ["\u201cBeen there, done that\u201d — experience matters most to me.", "\u201cWhat if?\u201d — possibilities matter most to me."],
    ["I'd rather do something useful.", "I'd rather dream up something new."],
  ]},
  { label: "Decisions", a: "T", b: "F", title: "How do you make decisions?", pairs: [
    ["I decide with my head — what makes logical sense.", "I decide with my heart — how it affects people."],
    ["Being fair means treating everyone the same.", "Being fair means understanding each person's situation."],
    ["I can give honest feedback even if it stings.", "I soften feedback so I don't hurt feelings."],
    ["In an argument, I want to win with facts.", "In an argument, I want everyone to feel heard."],
    ["People say I'm straightforward.", "People say I'm caring."],
    ["Rules matter more than feelings.", "Feelings matter more than rules."],
  ]},
  { label: "Lifestyle", a: "J", b: "P", title: "How do you like to live?", pairs: [
    ["I like a plan and a schedule.", "I like keeping my options open."],
    ["I finish work first, then relax.", "I relax first — the deadline will motivate me."],
    ["Surprises stress me out.", "Surprises keep life interesting."],
    ["My space is usually organized.", "My space is usually... creative chaos."],
    ["I like checking things off a list.", "Lists feel like a cage."],
    ["I decide fast and stick with it.", "I wait — a better option might show up."],
  ]},
];

const DISC_BOXES = [
  { l: "D", name: "Driver", items: [
    "I like to take charge and get results fast.",
    "I'm direct — I say what I mean.",
    "I get impatient when things move slowly.",
    "I like challenges and competition.",
    "I'd rather make a quick decision than wait around.",
    "When a group is stuck, I push us forward.",
  ]},
  { l: "I", name: "Energizer", items: [
    "I bring energy and keep the mood up.",
    "I love talking, joking, and meeting new people.",
    "I can talk people into things.",
    "I'd rather work with people than paperwork.",
    "I think best when I'm bouncing ideas off others.",
    "People say I'm fun to work with.",
  ]},
  { l: "S", name: "Anchor", items: [
    "I stay calm when other people are stressed.",
    "I'm loyal — my team can count on me.",
    "I'd rather keep the peace than start a fight.",
    "I like a steady routine I can depend on.",
    "I'm a good listener.",
    "I don't need credit — I just want the team to win.",
  ]},
  { l: "C", name: "Detail Pro", items: [
    "I like to do things right the first time.",
    "I double-check my work.",
    "I want the facts before I decide anything.",
    "I follow rules and expect others to also.",
    "Sloppy work bothers me.",
    "I'd rather be accurate than fast.",
  ]},
];

const CAREER_MEANINGS = {
  L: "You like leading, persuading, and going after big goals.",
  H: "You like working with people and lifting them up.",
  B: "You like hands-on work you can see and touch.",
  C: "You like making new things and expressing ideas.",
  T: "You like solving problems and figuring things out.",
  O: "You like order, details, and a clear plan.",
};
const MB_LETTER_MEANINGS = {
  E: "You get your energy from people and action.",
  I: "You get your energy from quiet time and focus.",
  S: "You trust facts, details, and real experience.",
  N: "You trust ideas, possibilities, and your gut.",
  T: "You make decisions with your head — logic first.",
  F: "You make decisions with your heart — people first.",
  J: "You like plans, schedules, and finishing things.",
  P: "You like options, flexibility, and going with the flow.",
};
const MB_TYPE_NAMES = {
  ISTJ: "The Rock", ISFJ: "The Protector", INFJ: "The Guide", INTJ: "The Strategist",
  ISTP: "The Fixer", ISFP: "The Artist", INFP: "The Dreamer", INTP: "The Analyzer",
  ESTP: "The Action-Taker", ESFP: "The Entertainer", ENFP: "The Spark", ENTP: "The Debater",
  ESTJ: "The Captain", ESFJ: "The Host", ENFJ: "The Coach", ENTJ: "The Commander",
};
const DISC_MEANINGS = {
  D: "The Driver — fast, direct, and focused on results. You push teams forward.",
  I: "The Energizer — upbeat, social, and full of ideas. You keep spirits high.",
  S: "The Anchor — steady, loyal, and calm under stress. Teams count on you.",
  C: "The Detail Pro — careful, accurate, and organized. You catch what others miss.",
};

const SCALE = [
  { v: 1, label: "Not me" },
  { v: 2, label: "A little" },
  { v: 3, label: "Mostly" },
  { v: 4, label: "Totally" },
];

// ---- Shared UI ----
const eyebrow = {
  fontFamily: SANS, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em",
  textTransform: "uppercase", color: MAROON, marginBottom: 8,
};
const cardStyle = {
  background: "#fff", border: `1px solid ${GRAY_LN}`, borderRadius: 12,
  padding: "18px 16px", marginBottom: 16,
};
const bigBtn = (enabled, bg = RED) => ({
  width: "100%", background: enabled ? bg : GRAY_LN, color: "#fff", border: "none",
  borderRadius: 12, padding: "16px", fontFamily: SANS, fontSize: 16, fontWeight: 900,
  letterSpacing: "0.04em", cursor: enabled ? "pointer" : "not-allowed",
});
const inputStyle = {
  width: "100%", boxSizing: "border-box", border: `1.5px solid ${GRAY_LN}`,
  borderRadius: 8, padding: "10px 12px", fontFamily: SANS, fontSize: 14.5,
  color: INK, outline: "none", marginBottom: 8, background: "#fff",
};

function LetterTile({ label, sub, active, badge, onClick, size = 56 }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", width: size, height: size, borderRadius: 10,
      border: `2px solid ${active ? RED : GRAY_LN}`,
      background: active ? NAVY : "#fff", color: active ? "#fff" : NAVY,
      fontFamily: SANS, fontWeight: 800, fontSize: 22, cursor: "pointer",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      transition: "all 0.15s ease", flexShrink: 0,
    }}>
      {label}
      {sub && <span style={{ fontSize: 8.5, fontWeight: 600, marginTop: 2, color: active ? SALMON : NAVY_LT }}>{sub}</span>}
      {badge && <span style={{
        position: "absolute", top: -8, right: -8, background: RED, color: "#fff",
        fontSize: 9, fontWeight: 800, borderRadius: 999, padding: "2px 6px",
      }}>{badge}</span>}
    </button>
  );
}

function Section({ title, children }) {
  return <div style={cardStyle}><div style={eyebrow}>{title}</div>{children}</div>;
}

function ProfileBlock({ label, color = NAVY, children }) {
  return (
    <div className="keep-together" style={{ marginBottom: 14 }}>
      <div style={{
        background: color, color: "#fff", fontFamily: SANS, fontWeight: 800,
        fontSize: 12.5, letterSpacing: "0.08em", textTransform: "uppercase",
        padding: "8px 14px", borderRadius: "8px 8px 0 0",
      }}>{label}</div>
      <div style={{
        border: `1px solid ${GRAY_LN}`, borderTop: "none", borderRadius: "0 0 8px 8px",
        padding: "14px", background: "#fff", fontFamily: SANS, fontSize: 14.5,
        lineHeight: 1.55, color: INK,
      }}>{children}</div>
    </div>
  );
}

function ProgressBar({ done, total }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ height: 8, background: "#fff", border: `1px solid ${GRAY_LN}`, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${(done / total) * 100}%`, background: RED, transition: "width 0.3s ease" }} />
      </div>
      <div style={{ fontSize: 11.5, color: NAVY_LT, fontWeight: 700, marginTop: 4, textAlign: "right" }}>
        Section {done} of {total}
      </div>
    </div>
  );
}

function IntroCard({ step, title, lines, buttonLabel, onStart }) {
  return (
    <div style={{ ...cardStyle, borderTop: `5px solid ${RED}` }}>
      <div style={eyebrow}>Assessment {step} of 3</div>
      <h2 style={{ color: NAVY, fontSize: 22, fontWeight: 900, margin: "0 0 10px" }}>{title}</h2>
      {lines.map((t, i) => (
        <p key={i} style={{ fontSize: 14.5, lineHeight: 1.6, color: INK, margin: "0 0 10px" }}>{t}</p>
      ))}
      <button onClick={onStart} style={{ ...bigBtn(true), marginTop: 6 }}>{buttonLabel}</button>
    </div>
  );
}

export default function CareerProfileSimulator() {
  // nav: {view, idx}
  const [nav, setNav] = useState({ view: "welcome", idx: 0 });
  const topRef = useRef(null);
  const resultsRef = useRef(null);

  // shared profile inputs
  const [name, setName] = useState("");
  const [careers, setCareers] = useState(["", "", ""]);

  // full-assessment answers
  const [careerAns, setCareerAns] = useState({}); // "bi-qi" -> 1..4
  const [mbAns, setMbAns] = useState({});         // "pi-qi" -> letter
  const [discAns, setDiscAns] = useState({});     // "bi-qi" -> 1..4

  // quick-entry state
  const [codeOrder, setCodeOrder] = useState([]);
  const [letters, setLetters] = useState({});
  const [discMain, setDiscMain] = useState(null);
  const [discBackup, setDiscBackup] = useState(null);

  // per-assessment results (revealed as they go)
  const [careerRes, setCareerRes] = useState(null); // {code:[l1,l2]}
  const [mbRes, setMbRes] = useState(null);         // "ESFJ"
  const [discRes, setDiscRes] = useState(null);     // {main, backup}

  // results
  const [computed, setComputed] = useState(null); // {code:[..2], fourLetters, main, backup, totals}
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Scroll to top on every screen change — including when results load
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if (topRef.current) topRef.current.scrollIntoView({ block: "start" });
  }, [nav, profile, loading]);

  const go = (view, idx = 0) => setNav({ view, idx });

  // ---- Scoring (per assessment, so results reveal as they go) ----
  const computeCareer = () => {
    const totals = CAREER_BOXES.map((box, bi) =>
      box.items.reduce((sum, _, qi) => sum + (careerAns[`${bi}-${qi}`] || 0), 0));
    const ranked = CAREER_BOXES.map((b, i) => ({ l: b.l, t: totals[i], i }))
      .sort((a, b) => b.t - a.t || a.i - b.i);
    return { code: [ranked[0].l, ranked[1].l] };
  };
  const computeMB = () => MB_PARTS.map((p, pi) => {
    let aCount = 0, bCount = 0;
    p.pairs.forEach((_, qi) => {
      const v = mbAns[`${pi}-${qi}`];
      if (v === p.a) aCount++; else if (v === p.b) bCount++;
    });
    if (aCount === bCount) return mbAns[`${pi}-0`] || p.a; // tie: gut answer to Q1
    return aCount > bCount ? p.a : p.b;
  }).join("");
  const computeDISC = () => {
    const dTotals = DISC_BOXES.map((box, bi) =>
      box.items.reduce((sum, _, qi) => sum + (discAns[`${bi}-${qi}`] || 0), 0));
    const dRanked = DISC_BOXES.map((b, i) => ({ l: b.l, t: dTotals[i], i }))
      .sort((a, b) => b.t - a.t || a.i - b.i);
    return { main: dRanked[0].l, backup: dRanked[1].l };
  };

  // ---- Profile generation ----
  const generate = async (r) => {
    setLoading(true); setError(null); setProfile(null);
    const codeNames = r.code
      .map((l) => `${l} (${CAREER_BOXES.find((t) => t.l === l).name})`).join(" + ");
    const discName = (l) => (l ? `${l} (${DISC_BOXES.find((d) => d.l === l).name})` : "none given");
    const named = careers.filter((c) => c.trim());
    const careerList = named.length
      ? named.join(", ")
      : "none named — recommend careers purely from their assessment results";

    const prompt = `You are writing a career profile for a young adult (ages 16-24) in Blueprint502, a workforce development program in Louisville, KY. They just completed three career assessments.

Their results:
- Career Code (interest types): ${codeNames}
- Personality type (Myers-Briggs style): ${r.fourLetters}
- Work style (DISC): main = ${discName(r.main)}, backup = ${discName(r.backup)}
- Top 3 careers they are interested in: ${careerList}
${name.trim() ? `- First name: ${name.trim()}` : ""}

Write at a 5th-8th grade reading level. Plain, warm, real language — no corporate buzzwords, no talking down. Be strengths-based, but honest about growth areas (frame support areas without shame, as "everyone needs support somewhere"). ${name.trim() ? "Use their first name naturally once or twice." : "Write in second person (you/your)."} Make it feel specific to THEIR combination, not generic — reference their actual letters, styles, and named careers.

Respond with ONLY a valid JSON object, no markdown, no backticks, in exactly this shape:
{
  "summary": "One paragraph (4-6 sentences) that ties together their career code, personality, and work style into a picture of who they are at work.",
  "strengths": ["exactly 5 short strength phrases (3-7 words each) drawn from their specific combination of results"],
  "bestCareers": [{ "career": "career name", "why": "one short sentence on the fit" }, "...5 items total. Include any of their named career interests that genuinely fit, plus strong matches they may not have considered. Favor real, reachable careers."],
  "bestMajors": [{ "major": "college major or training program name", "why": "one short sentence on where it leads" }, "...4 items total. Mix college majors with certificate/trade program options so college and non-college routes both show up."],
  "coworkerType": { "title": "A short memorable title like 'The Steady Motivator'", "description": "2-3 sentences on what they are like to work with." },
  "pairsWith": { "title": "A short title for the kind of coworker who balances them", "description": "2-3 sentences on why that pairing works, naming the DISC style or letters that complement theirs." },
  "thrivesIn": ["4 short phrases describing environments where they do their best work"],
  "supportAreas": [{ "area": "short name of growth area", "support": "one sentence on what support helps" }, "...exactly 3 items total"],
  "characters": [{ "name": "character name", "from": "show or movie title", "why": "one sentence on how this character's personality and work style resembles theirs" }, "...exactly 3 items total. Pick well-known, likable TV/movie characters a young adult (16-24) today would recognize, from a mix of shows/movies. Match them to the profile's actual traits, and keep every pick positive — heroes and fan favorites, not villains."]
}`;

    try {
      const response = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Function returned " + response.status);
      const { text } = await response.json();
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setProfile(parsed);
      go("results");
    } catch (e) {
      console.error(e);
      setError("Something went wrong building the profile. Tap the button to try again.");
      go(nav.view === "quick" ? "quick" : "retry");
    } finally {
      setLoading(false);
    }
  };

  const finishAssessments = () => {
    const r = {
      code: careerRes.code, fourLetters: mbRes,
      main: discRes.main, backup: discRes.backup,
    };
    setComputed(r);
    generate(r);
  };

  // Download the results card as a PDF. Works on a deployed site (Netlify, GitHub
  // Pages, etc.). Inside the Claude artifact preview, sandbox rules block file
  // downloads, so we fall back to the print dialog (Save as PDF) automatically.
  const downloadPDF = async () => {
    try {
      if (!window.html2pdf) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
          s.onload = resolve; s.onerror = reject;
          document.body.appendChild(s);
        });
      }
      // html2canvas captures relative to the current scroll position, so a
      // scrolled-down page clips the top of the profile. Capture from the top.
      const el = resultsRef.current;
      const prevScroll = window.scrollY;
      window.scrollTo(0, 0);
      await window.html2pdf().set({
        margin: 0.4,
        filename: `${(name.trim() || "My").replace(/[^a-z0-9]/gi, "_")}_Blueprint_Profile.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2, useCORS: true, backgroundColor: SALMON_BG,
          scrollX: 0, scrollY: 0, windowWidth: el.scrollWidth,
        },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
        pagebreak: { mode: ["css", "legacy"], avoid: ".keep-together" },
      }).from(el).save();
      window.scrollTo(0, prevScroll);
    } catch (e) {
      console.error("PDF download unavailable here — opening print dialog instead.", e);
      window.print();
    }
  };

  const resetAll = () => {
    setName(""); setCareers(["", "", ""]);
    setCareerAns({}); setMbAns({}); setDiscAns({});
    setCodeOrder([]); setLetters({}); setDiscMain(null); setDiscBackup(null);
    setCareerRes(null); setMbRes(null); setDiscRes(null);
    setComputed(null); setProfile(null); setError(null);
    go("welcome");
  };

  const toggleCode = (l) => {
    setCodeOrder((prev) => {
      if (prev.includes(l)) return prev.filter((x) => x !== l);
      if (prev.length >= 2) return prev;
      return [...prev, l];
    });
  };

  const setupReady = true; // careers are optional
  const quickFourLetters = MB_PARTS.map((p) => letters[p.label] || "_").join("");
  const quickReady = codeOrder.length === 2 && MB_PARTS.every((p) => letters[p.label]) && discMain;

  // ---- Reusable screens ----
  // Plain render function (NOT a nested component) so text inputs keep focus while typing
  const renderCareersFields = () => (
    <>
      <Section title="Careers I'm curious about (optional)">
        {careers.map((c, i) => (
          <input key={i} style={inputStyle} value={c} maxLength={60}
            placeholder={`Career ${i + 1} (optional)`}
            onChange={(e) => { const n = [...careers]; n[i] = e.target.value; setCareers(n); }} />
        ))}
      </Section>
      <Section title="My first name (optional)">
        <input style={inputStyle} value={name} maxLength={30}
          placeholder="So your profile talks to YOU" onChange={(e) => setName(e.target.value)} />
      </Section>
    </>
  );

  const RatingRow = ({ text, value, onPick }) => (
    <div style={{ ...cardStyle, padding: "14px", marginBottom: 10 }}>
      <div style={{ fontSize: 14.5, lineHeight: 1.5, color: INK, marginBottom: 10 }}>{text}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {SCALE.map((s) => (
          <button key={s.v} onClick={() => onPick(s.v)} style={{
            flex: 1, padding: "9px 0 7px", borderRadius: 8,
            border: `2px solid ${value === s.v ? RED : GRAY_LN}`,
            background: value === s.v ? NAVY : "#fff",
            color: value === s.v ? "#fff" : NAVY, cursor: "pointer", fontFamily: SANS,
          }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>{s.v}</div>
            <div style={{ fontSize: 9, fontWeight: 700, color: value === s.v ? SALMON : NAVY_LT }}>{s.label}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderRatedBox = (boxes, ans, setAns, bi, sectionsDone, sectionsTotal, boxLabelPrefix, onNext, nextLabel) => {
    const box = boxes[bi];
    const allAnswered = box.items.every((_, qi) => ans[`${bi}-${qi}`]);
    return (
      <>
        <ProgressBar done={sectionsDone} total={sectionsTotal} />
        <div style={{
          background: NAVY, color: "#fff", fontWeight: 900, fontSize: 15,
          letterSpacing: "0.08em", padding: "10px 14px", borderRadius: "10px 10px 0 0",
        }}>{boxLabelPrefix} {box.l}</div>
        <div style={{
          background: SALMON_BG, border: `1px solid ${GRAY_LN}`, borderTop: "none",
          padding: "8px 14px", fontSize: 12.5, color: NAVY_LT, fontWeight: 600,
          borderRadius: "0 0 10px 10px", marginBottom: 14,
        }}>
          1 = Not me &nbsp;•&nbsp; 2 = A little like me &nbsp;•&nbsp; 3 = Mostly me &nbsp;•&nbsp; 4 = Totally me
        </div>
        {box.items.map((text, qi) => (
          <RatingRow key={qi} text={text} value={ans[`${bi}-${qi}`]}
            onPick={(v) => setAns({ ...ans, [`${bi}-${qi}`]: v })} />
        ))}
        <button onClick={onNext} disabled={!allAnswered} style={{ ...bigBtn(allAnswered), marginTop: 6 }}>
          {nextLabel}
        </button>
        {!allAnswered && (
          <p style={{ fontSize: 12.5, color: NAVY_LT, textAlign: "center", marginTop: 8 }}>
            Answer every statement to keep going.
          </p>
        )}
      </>
    );
  };

  // ---- Views ----
  let body = null;

  if (nav.view === "welcome") {
    body = (
      <>
        <h1 style={{ color: NAVY, fontSize: 25, fontWeight: 900, margin: "4px 0 6px" }}>
          Build Your Career Profile
        </h1>
        <p style={{ color: INK, fontSize: 14.5, lineHeight: 1.6, marginBottom: 18 }}>
          Three quick assessments. One profile built just for you — your best-fit pathway,
          the kind of coworker you are, where you thrive, and where you'll want support.
        </p>
        <div style={{ ...cardStyle, borderTop: `5px solid ${RED}` }}>
          <div style={eyebrow}>Option 1</div>
          <h2 style={{ color: NAVY, fontSize: 18, fontWeight: 900, margin: "0 0 6px" }}>Take the assessments here</h2>
          <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.55, margin: "0 0 12px" }}>
            All three assessments, right on this screen. About 15 minutes. Your results go straight into your profile.
          </p>
          <button onClick={() => go("setup")} style={bigBtn(true)}>START THE ASSESSMENTS</button>
        </div>
        <div style={{ ...cardStyle, borderTop: `5px solid ${NAVY}` }}>
          <div style={eyebrow}>Option 2</div>
          <h2 style={{ color: NAVY, fontSize: 18, fontWeight: 900, margin: "0 0 6px" }}>I already have my results</h2>
          <p style={{ fontSize: 13.5, color: INK, lineHeight: 1.55, margin: "0 0 12px" }}>
            Did the paper packet in the workshop? Enter your Career Code, 4 letters, and work style, and skip straight to your profile.
          </p>
          <button onClick={() => go("quick")} style={bigBtn(true, NAVY)}>ENTER MY RESULTS</button>
        </div>
      </>
    );
  }

  if (nav.view === "setup") {
    body = (
      <>
        <button onClick={() => go("welcome")} style={{
          background: "none", border: "none", color: NAVY_LT, fontFamily: SANS,
          fontWeight: 800, fontSize: 13, cursor: "pointer", padding: "0 0 10px", display: "block",
        }}>← Back</button>
        <h2 style={{ color: NAVY, fontSize: 21, fontWeight: 900, margin: "4px 0 6px" }}>Before we start</h2>
        <p style={{ color: INK, fontSize: 14, lineHeight: 1.55, marginBottom: 14 }}>
          If there are careers you're curious about, add them — your profile will connect your results to them.
          Not sure yet? Leave them blank and let your results do the talking.
        </p>
        {renderCareersFields()}
        <button onClick={() => setupReady && go("careerIntro")} disabled={!setupReady} style={{ ...bigBtn(setupReady), marginTop: 6 }}>
          LET'S GO
        </button>
      </>
    );
  }

  if (nav.view === "careerIntro") {
    body = (
      <IntroCard step={1} title="What Kind of Work Fits You?"
        lines={[
          "36 quick statements sorted into six mystery boxes. Each box is secretly measuring a career type — you'll find out what they mean at the end.",
          "For each statement, tap the number that sounds like you: 1 = Not me, up to 4 = Totally me. Go with your first gut feeling. There are no wrong answers.",
        ]}
        buttonLabel="START ASSESSMENT 1" onStart={() => go("career", 0)} />
    );
  }

  if (nav.view === "career") {
    body = renderRatedBox(
      CAREER_BOXES, careerAns, setCareerAns, nav.idx, nav.idx + 1, CAREER_BOXES.length, "BOX",
      () => {
        if (nav.idx < CAREER_BOXES.length - 1) { go("career", nav.idx + 1); }
        else { setCareerRes(computeCareer()); go("careerResult"); }
      },
      nav.idx < CAREER_BOXES.length - 1 ? "NEXT BOX" : "SEE WHAT MY BOXES MEAN"
    );
  }

  if (nav.view === "mbIntro") {
    body = (
      <IntroCard step={2} title="What Are Your 4 Letters?"
        lines={[
          "One down! This one works differently. It looks at four parts of your personality, and each part gives you one letter.",
          "Each question shows two choices, each marked with a letter. Tap the one that is MORE like you, most of the time. Neither answer is better — if both feel true, pick the one that's true more often.",
        ]}
        buttonLabel="START ASSESSMENT 2" onStart={() => go("mb", 0)} />
    );
  }

  if (nav.view === "mb") {
    const part = MB_PARTS[nav.idx];
    const allAnswered = part.pairs.every((_, qi) => mbAns[`${nav.idx}-${qi}`]);
    body = (
      <>
        <ProgressBar done={nav.idx + 1} total={MB_PARTS.length} />
        <div style={{
          background: NAVY, color: "#fff", fontWeight: 900, fontSize: 15,
          padding: "10px 14px", borderRadius: "10px 10px 0 0",
        }}>PART {nav.idx + 1}: {part.title.toUpperCase()}</div>
        <div style={{
          background: SALMON_BG, border: `1px solid ${GRAY_LN}`, borderTop: "none",
          padding: "8px 14px", fontSize: 12.5, color: NAVY_LT, fontWeight: 600,
          borderRadius: "0 0 10px 10px", marginBottom: 14,
        }}>Tap the choice that's more like you.</div>
        {part.pairs.map(([aText, bText], qi) => {
          const key = `${nav.idx}-${qi}`;
          return (
            <div key={qi} style={{ ...cardStyle, padding: "12px", marginBottom: 10 }}>
              {[[part.a, aText], [part.b, bText]].map(([l, text]) => (
                <button key={l} onClick={() => setMbAns({ ...mbAns, [key]: l })} style={{
                  display: "flex", alignItems: "center", gap: 10, width: "100%",
                  textAlign: "left", padding: "10px 12px", marginBottom: 6, borderRadius: 8,
                  border: `2px solid ${mbAns[key] === l ? RED : GRAY_LN}`,
                  background: mbAns[key] === l ? NAVY : "#fff",
                  color: mbAns[key] === l ? "#fff" : INK,
                  fontFamily: SANS, fontSize: 13.5, lineHeight: 1.45, cursor: "pointer",
                }}>
                  <span style={{
                    fontWeight: 900, fontSize: 16, flexShrink: 0,
                    color: mbAns[key] === l ? SALMON : NAVY,
                  }}>{l}</span>
                  {text}
                </button>
              ))}
            </div>
          );
        })}
        <button
          onClick={() => {
            if (nav.idx < MB_PARTS.length - 1) { go("mb", nav.idx + 1); }
            else { setMbRes(computeMB()); go("mbResult"); }
          }}
          disabled={!allAnswered} style={{ ...bigBtn(allAnswered), marginTop: 6 }}>
          {nav.idx < MB_PARTS.length - 1 ? "NEXT PART" : "FINISH ASSESSMENT 2"}
        </button>
        {!allAnswered && (
          <p style={{ fontSize: 12.5, color: NAVY_LT, textAlign: "center", marginTop: 8 }}>
            Answer every question to keep going.
          </p>
        )}
      </>
    );
  }

  if (nav.view === "discIntro") {
    body = (
      <IntroCard step={3} title="How Do You Work With Others?"
        lines={[
          "Last one — and it's the one real employers use the most. This measures how you show up on a team: under pressure, in a group, when things go sideways.",
          "Back to numbers: think about how you act in a group — at work, in class, or on a team — and tap 1 (Not me) through 4 (Totally me). When you finish, you'll see your work style — then your full profile builds from all three results.",
        ]}
        buttonLabel="START ASSESSMENT 3" onStart={() => go("disc", 0)} />
    );
  }

  if (nav.view === "disc") {
    body = renderRatedBox(
      DISC_BOXES, discAns, setDiscAns, nav.idx, nav.idx + 1, DISC_BOXES.length, "BOX",
      () => {
        if (nav.idx < DISC_BOXES.length - 1) { go("disc", nav.idx + 1); }
        else { setDiscRes(computeDISC()); go("discResult"); }
      },
      nav.idx < DISC_BOXES.length - 1 ? "NEXT BOX" : "SEE MY WORK STYLE"
    );
  }

  const RevealShell = ({ step, kicker, children, jobUse, buttonLabel, onNext }) => (
    <>
      <div style={{ ...cardStyle, borderTop: `5px solid ${RED}`, textAlign: "center" }}>
        <div style={{ ...eyebrow, textAlign: "center" }}>ASSESSMENT {step} COMPLETE — THE REVEAL</div>
        <h2 style={{ color: NAVY, fontSize: 22, fontWeight: 900, margin: "0 0 14px" }}>{kicker}</h2>
        {children}
      </div>
      <div style={{
        background: SALMON_BG, border: `1px solid ${SALMON}`, borderRadius: 12,
        padding: "14px 16px", marginBottom: 16,
      }}>
        <div style={eyebrow}>How this is used on a job</div>
        <p style={{ fontSize: 14, lineHeight: 1.6, color: INK, margin: 0 }}>{jobUse}</p>
      </div>
      <button onClick={onNext} style={bigBtn(true)}>{buttonLabel}</button>
    </>
  );

  const ResultLetterCard = ({ letter, title, desc }) => (
    <div style={{
      display: "flex", alignItems: "center", gap: 14, textAlign: "left",
      background: NAVY, borderRadius: 10, padding: "12px 14px", marginBottom: 10,
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 8, border: `2px solid ${RED}`, background: "#fff",
        color: NAVY, fontWeight: 900, fontSize: 24, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>{letter}</div>
      <div>
        {title && <div style={{ color: SALMON, fontWeight: 800, fontSize: 13.5 }}>{title}</div>}
        <div style={{ color: "#fff", fontSize: 13, lineHeight: 1.45 }}>{desc}</div>
      </div>
    </div>
  );

  if (nav.view === "careerResult" && careerRes) {
    body = (
      <RevealShell step={1} kicker={`Your Career Code: ${careerRes.code.join(" + ")}`}
        jobUse={"Career coaches and employers use interest assessments to match people with work they'll actually enjoy — because people who like their work show up, stay longer, and move up faster. Your Career Code helps you pick the right training and explain in an interview WHY a job fits you."}
        buttonLabel="CONTINUE TO ASSESSMENT 2" onNext={() => go("mbIntro")}>
        <p style={{ fontSize: 14, color: INK, lineHeight: 1.55, margin: "0 0 12px", textAlign: "left" }}>
          The mystery boxes were measuring six career types. Your two highest boxes are your code — the kinds of work that fit you best:
        </p>
        {careerRes.code.map((l) => (
          <ResultLetterCard key={l} letter={l}
            title={CAREER_BOXES.find((b) => b.l === l).name}
            desc={CAREER_MEANINGS[l]} />
        ))}
      </RevealShell>
    );
  }

  if (nav.view === "mbResult" && mbRes) {
    body = (
      <RevealShell step={2} kicker={`You are ${mbRes} — ${MB_TYPE_NAMES[mbRes] || "Your Type"}`}
        jobUse={"Companies use personality types to build balanced teams and help coworkers communicate. Knowing your letters gives you a real answer to the interview question 'Tell me about yourself' — and helps you work with people who are wired differently instead of butting heads with them."}
        buttonLabel="CONTINUE TO ASSESSMENT 3" onNext={() => go("discIntro")}>
        <p style={{ fontSize: 14, color: INK, lineHeight: 1.55, margin: "0 0 12px", textAlign: "left" }}>
          One of 16 personality types. Here's what each of your letters means:
        </p>
        {mbRes.split("").map((l, i) => (
          <ResultLetterCard key={i} letter={l} title={null} desc={MB_LETTER_MEANINGS[l]} />
        ))}
      </RevealShell>
    );
  }

  if (nav.view === "discResult" && discRes) {
    body = (
      <RevealShell step={3} kicker={`Your Work Style: ${discRes.main} / ${discRes.backup}`}
        jobUse={"DISC is one of the most common assessments in real hiring and team training. Managers use it to hand out roles and settle conflicts. Naming your style in an interview — 'I'm an Anchor: I keep the team calm under pressure' — makes you sound like a pro."}
        buttonLabel="BUILD MY FULL PROFILE" onNext={finishAssessments}>
        <p style={{ fontSize: 14, color: INK, lineHeight: 1.55, margin: "0 0 12px", textAlign: "left" }}>
          Your main style leads the way; your backup style is your second gear:
        </p>
        <ResultLetterCard letter={discRes.main} title="Main style" desc={DISC_MEANINGS[discRes.main]} />
        <ResultLetterCard letter={discRes.backup} title="Backup style" desc={DISC_MEANINGS[discRes.backup]} />
      </RevealShell>
    );
  }

  if (nav.view === "quick") {
    body = (
      <>
        <button onClick={() => go("welcome")} style={{
          background: "none", border: "none", color: NAVY_LT, fontFamily: SANS,
          fontWeight: 800, fontSize: 13, cursor: "pointer", padding: "0 0 10px", display: "block",
        }}>← Back</button>
        <h2 style={{ color: NAVY, fontSize: 21, fontWeight: 900, margin: "4px 0 6px" }}>Enter Your Results</h2>
        <p style={{ color: INK, fontSize: 14, lineHeight: 1.55, marginBottom: 14 }}>
          Grab your workshop packet and copy your results in.
        </p>
        <Section title="Step 1 — My Career Code">
          <p style={{ fontSize: 13, color: NAVY_LT, margin: "0 0 10px" }}>
            Tap your <b>1st letter</b> first, then your <b>2nd letter</b>.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {CAREER_BOXES.map((t) => (
              <LetterTile key={t.l} label={t.l} sub={t.name.replace("The ", "")}
                active={codeOrder.includes(t.l)}
                badge={codeOrder[0] === t.l ? "1st" : codeOrder[1] === t.l ? "2nd" : null}
                onClick={() => toggleCode(t.l)} size={72} />
            ))}
          </div>
        </Section>
        <Section title="Step 2 — My 4 Letters">
          {MB_PARTS.map((p) => (
            <div key={p.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 92, fontSize: 12.5, fontWeight: 700, color: NAVY }}>{p.label}</div>
              {[p.a, p.b].map((l) => (
                <LetterTile key={l} label={l} active={letters[p.label] === l}
                  onClick={() => setLetters({ ...letters, [p.label]: l })} size={48} />
              ))}
            </div>
          ))}
        </Section>
        <Section title="Step 3 — My Work Style (DISC)">
          <p style={{ fontSize: 13, color: NAVY_LT, margin: "0 0 8px" }}>Main style:</p>
          <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
            {DISC_BOXES.map((d) => (
              <LetterTile key={d.l} label={d.l} sub={d.name} active={discMain === d.l}
                onClick={() => setDiscMain(discMain === d.l ? null : d.l)} size={68} />
            ))}
          </div>
          <p style={{ fontSize: 13, color: NAVY_LT, margin: "0 0 8px" }}>Backup style (optional):</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {DISC_BOXES.map((d) => (
              <LetterTile key={d.l} label={d.l} sub={d.name} active={discBackup === d.l}
                onClick={() => setDiscBackup(discBackup === d.l ? null : d.l)} size={68} />
            ))}
          </div>
        </Section>
        {renderCareersFields()}
        {error && (
          <div style={{
            background: "#fff", border: `2px solid ${RED}`, borderRadius: 10,
            padding: "12px 14px", color: MAROON, fontSize: 14, marginBottom: 14,
          }}>{error}</div>
        )}
        <button
          onClick={() => {
            const r = { code: codeOrder, fourLetters: quickFourLetters, main: discMain, backup: discBackup };
            setComputed(r); generate(r);
          }}
          disabled={!quickReady || loading} style={bigBtn(quickReady && !loading)}>
          {loading ? "BUILDING YOUR BLUEPRINT…" : "BUILD MY PROFILE"}
        </button>
        {!quickReady && !loading && (
          <p style={{ fontSize: 12.5, color: NAVY_LT, textAlign: "center", marginTop: 8 }}>
            Fill in your Career Code, all 4 letters, and your main work style.
          </p>
        )}
      </>
    );
  }

  if (nav.view === "retry") {
    body = (
      <div style={{ textAlign: "center", padding: "30px 0" }}>
        <div style={{
          background: "#fff", border: `2px solid ${RED}`, borderRadius: 10,
          padding: "14px", color: MAROON, fontSize: 14.5, marginBottom: 16, textAlign: "left",
        }}>{error || "Something went wrong building the profile."}</div>
        <button onClick={() => computed && generate(computed)} style={bigBtn(true)}>TRY AGAIN</button>
        <button onClick={resetAll} style={{
          marginTop: 10, width: "100%", background: "#fff", color: NAVY,
          border: `2px solid ${NAVY}`, borderRadius: 12, padding: "14px",
          fontFamily: SANS, fontWeight: 800, fontSize: 14, cursor: "pointer",
        }}>Start over</button>
      </div>
    );
  }

  if (loading) {
    body = (
      <div style={{ textAlign: "center", padding: "50px 0" }}>
        <div style={{
          width: 54, height: 54, margin: "0 auto 14px", borderRadius: 8,
          border: `3px solid ${NAVY}`, borderTopColor: RED,
          animation: "spin 0.9s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ color: NAVY, fontWeight: 800, fontSize: 15 }}>
          Scoring your answers and drawing up the blueprint…
        </div>
      </div>
    );
  }

  if (nav.view === "results" && profile && !loading) {
    body = (
      <div ref={resultsRef}>
        <div className="keep-together">
        <div style={{
          background: NAVY, borderRadius: "12px 12px 0 0", padding: "20px 18px",
          borderBottom: `4px solid ${RED}`,
        }}>
          <div style={{ color: SALMON, fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", marginBottom: 6 }}>
            OFFICIAL CAREER PROFILE
          </div>
          <div style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>
            {name.trim() ? `${name.trim()}'s Blueprint` : "My Blueprint"}
          </div>
          <div style={{ color: SALMON, fontSize: 13.5, fontWeight: 700, marginTop: 8 }}>
            {computed?.code?.join(" + ")} &nbsp;•&nbsp; {computed?.fourLetters} &nbsp;•&nbsp; {computed?.main}
            {computed?.backup ? `/${computed.backup}` : ""}
          </div>
        </div>
        <div style={{
          background: "#fff", border: `1px solid ${GRAY_LN}`, borderTop: "none",
          borderRadius: "0 0 12px 12px", padding: "16px", marginBottom: 18,
          fontSize: 15, lineHeight: 1.6, color: INK,
        }}>{profile.summary}</div>
        </div>

        <ProfileBlock label="Your 5 Strengths" color={RED}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {(profile.strengths || []).map((s, i) => <li key={i} style={{ marginBottom: 6 }}>{s}</li>)}
          </ul>
        </ProfileBlock>
        <ProfileBlock label="Best Careers for You" color={RED}>
          {(profile.bestCareers || []).map((c, i) => (
            <div key={i} style={{ marginBottom: 8 }}><b style={{ color: MAROON }}>{c.career}:</b> {c.why}</div>
          ))}
        </ProfileBlock>
        <ProfileBlock label="College Majors & Programs to Explore" color={RED}>
          {(profile.bestMajors || []).map((m, i) => (
            <div key={i} style={{ marginBottom: 8 }}><b style={{ color: MAROON }}>{m.major}:</b> {m.why}</div>
          ))}
        </ProfileBlock>
        <ProfileBlock label="The Coworker You Are" color={NAVY}>
          <b style={{ color: MAROON }}>{profile.coworkerType?.title}.</b> {profile.coworkerType?.description}
        </ProfileBlock>
        <ProfileBlock label="The Coworker You Pair Well With" color={NAVY}>
          <b style={{ color: MAROON }}>{profile.pairsWith?.title}.</b> {profile.pairsWith?.description}
        </ProfileBlock>
        <ProfileBlock label="Where You Thrive" color={MAROON}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {(profile.thrivesIn || []).map((t, i) => <li key={i} style={{ marginBottom: 6 }}>{t}</li>)}
          </ul>
        </ProfileBlock>
        <ProfileBlock label="Where You'll Want Support" color={MAROON}>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: NAVY_LT }}>
            Everybody needs support somewhere. Knowing yours puts you ahead.
          </p>
          {(profile.supportAreas || []).map((s, i) => (
            <div key={i} style={{ marginBottom: 8 }}><b>{s.area}:</b> {s.support}</div>
          ))}
        </ProfileBlock>
        <ProfileBlock label="Your TV & Movie Twins" color={RED}>
          <p style={{ margin: "0 0 10px", fontSize: 13, color: NAVY_LT }}>
            Three characters who work the way you work.
          </p>
          {(profile.characters || []).map((ch, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <b style={{ color: MAROON }}>{ch.name}</b> <span style={{ color: NAVY_LT }}>({ch.from})</span> — {ch.why}
            </div>
          ))}
        </ProfileBlock>

        <div data-html2canvas-ignore="true" className="no-print">
          <button onClick={downloadPDF} style={{ ...bigBtn(true, NAVY), marginTop: 18 }}>
            DOWNLOAD MY PROFILE (PDF)
          </button>
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <button onClick={() => window.print()} style={{
              flex: 1, background: "#fff", color: NAVY, border: `2px solid ${NAVY}`,
              borderRadius: 10, padding: "13px", fontFamily: SANS, fontWeight: 800,
              fontSize: 14, cursor: "pointer",
            }}>Print</button>
            <button onClick={resetAll} style={{
              flex: 1, background: "#fff", color: NAVY, border: `2px solid ${NAVY}`,
              borderRadius: 10, padding: "13px", fontFamily: SANS, fontWeight: 800,
              fontSize: 14, cursor: "pointer",
            }}>Start over</button>
          </div>
        </div>
        <p style={{ fontSize: 12, color: NAVY_LT, textAlign: "center", marginTop: 14 }}>
          Design Your Future. — Blueprint502, Louisville, KY
        </p>
      </div>
    );
  }

  return (
    <div style={{ background: SALMON_BG, minHeight: "100vh", fontFamily: SANS }}>
      <div ref={topRef} />
      <div style={{ background: NAVY, borderBottom: `4px solid ${RED}`, padding: "18px 16px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "flex", alignItems: "center", gap: 14 }}>
          <img src={LOGO_SRC} alt="Blueprint502" style={{ height: 52, width: "auto", display: "block", flexShrink: 0 }} />
          <div style={{ color: SALMON, fontSize: 11, letterSpacing: "0.14em", fontWeight: 700 }}>
            CAREER PROFILE<br />SIMULATOR
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "20px 14px 60px" }}>
        {body}
      </div>
    </div>
  );
}
