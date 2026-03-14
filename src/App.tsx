import { useEffect, useRef, useState } from "react";

// ── DATA ──────────────────────────────────────────────
const WA = "https://wa.me/919773757759";
const WA_HELLO = `${WA}?text=Hi%2C%20I%27m%20looking%20for%20a%20property%20in%20Mumbai%21`;
const WA_MORE = `${WA}?text=Show%20me%20more%20properties`;

const MARQUEE_ITEMS = [
  "Bandra West",
  "Bandra Kurla Complex",
  "Khar West",
  "Santacruz",
  "Juhu",
  "Andheri West",
  "Vile Parle",
  "Powai",
  "Lower Parel",
  "Worli",
  "Prabhadevi",
  "Residential",
  "Commercial",
  "Rent & Sale",
];

const AREAS = [
  {
    badge: "West Suburbs",
    name: "Bandra",
    desc: "Pali Hill, Carter Road, Hill Road, Bandstand, SV Road",
    num: "01",
  },
  {
    badge: "Business District",
    name: "BKC",
    desc: "Bandra Kurla Complex, G-Block, C-Block, MMRDA Zone",
    num: "02",
  },
  {
    badge: "Premium Suburb",
    name: "Juhu",
    desc: "Juhu Tara Road, JVPD Scheme, Gulmohar Road",
    num: "03",
  },
  {
    badge: "South Mumbai",
    name: "Lower Parel",
    desc: "Worli, Prabhadevi, Tulsi Pipe Road, Mill District",
    num: "04",
  },
  {
    badge: "West Suburbs",
    name: "Khar",
    desc: "Khar West, 14th Road, 16th Road, Carter Road end",
    num: "05",
  },
  {
    badge: "North West",
    name: "Andheri",
    desc: "Andheri West, Versova, Lokhandwala, MIDC",
    num: "06",
  },
  {
    badge: "Tech Hub",
    name: "Powai",
    desc: "Hiranandani Estate, IIT Gate, Chandivali, Saki Naka",
    num: "07",
  },
  {
    badge: "Mid-Suburb",
    name: "Santacruz",
    desc: "Santacruz West, Ville Parle, Airport Zone",
    num: "08",
  },
];

const PROPERTIES = [
  {
    id: "CHT-BND-0231",
    cat: ["residential", "sale"],
    label: "Sale",
    tagClass: "tag-sale",
    bg: "linear-gradient(135deg,#1a160d,#2a2316)",
    imgText: "2BHK",
    price: "Rs 3.2 Cr",
    title: "Sea View 2 BHK - Prestige Building",
    loc: "Carter Road, Bandra West",
    area: "1,240 sq.ft",
    furnish: "Semi-Furnished",
    furnishIcon: "",
  },
  {
    id: "CHT-BKC-0188",
    cat: ["commercial", "rent"],
    label: "Commercial",
    tagClass: "tag-commercial",
    bg: "linear-gradient(135deg,#0d1318,#141f2a)",
    imgText: "OFFICE",
    price: "Rs 4.5L/mo",
    title: "Grade A Office - BKC G-Block",
    loc: "Bandra Kurla Complex",
    area: "2,800 sq.ft",
    furnish: "Warm Shell",
    furnishIcon: "",
  },
  {
    id: "CHT-JHU-0094",
    cat: ["residential", "rent"],
    label: "Rent",
    tagClass: "tag-rent",
    bg: "linear-gradient(135deg,#0f1a0e,#1a2b18)",
    imgText: "3BHK",
    price: "Rs 1.8L/mo",
    title: "Luxury 3 BHK - Juhu Tara Road",
    loc: "Juhu, Mumbai",
    area: "2,100 sq.ft",
    furnish: "Fully Furnished",
    furnishIcon: "",
  },
  {
    id: "CHT-BND-0234",
    cat: ["commercial", "rent"],
    label: "Commercial",
    tagClass: "tag-commercial",
    bg: "linear-gradient(135deg,#130d1a,#1e1428)",
    imgText: "SHOP",
    price: "Rs 2L/mo",
    title: "Retail Space - Kanhaiya Centre",
    loc: "Bandra West",
    area: "600 sq.ft",
    furnish: "Bare Shell",
    furnishIcon: "",
  },
  {
    id: "CHT-WOR-0067",
    cat: ["residential", "sale"],
    label: "Sale",
    tagClass: "tag-sale",
    bg: "linear-gradient(135deg,#1a0f0d,#2a1814)",
    imgText: "4BHK",
    price: "Rs 8.5 Cr",
    title: "Penthouse 4 BHK - Worli Seaface",
    loc: "Worli, South Mumbai",
    area: "3,400 sq.ft",
    furnish: "Fully Furnished",
    furnishIcon: "",
  },
  {
    id: "CHT-KHR-0112",
    cat: ["residential", "rent"],
    label: "Rent",
    tagClass: "tag-rent",
    bg: "linear-gradient(135deg,#0d1318,#11201a)",
    imgText: "1BHK",
    price: "Rs 55K/mo",
    title: "Compact 1 BHK - 14th Road",
    loc: "Khar West",
    area: "520 sq.ft",
    furnish: "Semi-Furnished",
    furnishIcon: "",
  },
];

const FILTERS = ["all", "residential", "commercial", "rent", "sale"];

const FLOW_STEPS = [
  {
    n: "01",
    title: "You message us on WhatsApp",
    desc: "Share your requirement in plain English - area, budget, type. No forms, no signup.",
  },
  {
    n: "02",
    title: "AI parses & profiles your need",
    desc: "The system extracts location, BHK, budget, furnishing preference and saves your requirement.",
  },
  {
    n: "03",
    title: "Live property matching",
    desc: "Cross-references 1,200+ live listings, ranked by match score and building intelligence data.",
  },
  {
    n: "04",
    title: "3-5 curated results with links",
    desc: "You get concise, formatted results with direct property page links. No spam. No noise.",
  },
  {
    n: "05",
    title: "Human team closes the deal",
    desc: "Kapil steps in for site visits, negotiations, and everything that needs a real person.",
  },
];

const HOW_STEPS = [
  {
    icon: "",
    title: "Tell us what you need",
    desc: 'Message us on WhatsApp in plain language. "2BHK Bandra rent under 1L" is all it takes. No jargon required.',
  },
  {
    icon: "",
    title: "AI finds your matches",
    desc: "Our system scans 1,200+ live listings, applies building intelligence scoring, and returns 3-5 precision matches in seconds.",
  },
  {
    icon: "",
    title: "We close the deal",
    desc: "Our senior team handles site visits, negotiations, and paperwork. You just show up and sign on the dotted line.",
  },
];

// ── HOOK: Intersection Observer reveal ───────────────
function useReveal(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── REVEAL WRAPPER ────────────────────────────────────
type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
};

function Reveal({ children, delay = 0, style = {} }: RevealProps) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(32px)",
        transition: `opacity 0.7s ${delay}s, transform 0.7s ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── NAV ───────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.4rem 4rem",
        background: scrolled ? "rgba(10,9,6,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.18)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s, border-bottom 0.4s",
      }}
    >
      <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none" }}>
        <div
          style={{
            width: 36,
            height: 36,
            border: "1.5px solid #C9A84C",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "1.1rem",
            color: "#C9A84C",
            fontWeight: 500,
          }}
        >
          C
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            fontWeight: 600,
            color: "#F9F4EA",
            letterSpacing: "0.04em",
          }}
        >
          Chariot <span style={{ color: "#C9A84C" }}>Realty</span>
        </span>
      </a>
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {["Properties", "Areas", "How it Works", "Team"].map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              style={{
                color: "#8c8072",
                textDecoration: "none",
                fontSize: "0.82rem",
                fontWeight: 500,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {l}
            </a>
          </li>
        ))}
      </ul>
      <a
        href={WA_HELLO}
        target="_blank"
        rel="noopener"
        style={{
          background: "#C9A84C",
          color: "#0A0906",
          fontFamily: "var(--font-body)",
          fontSize: "0.82rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          padding: "0.65rem 1.5rem",
          borderRadius: 2,
          textDecoration: "none",
        }}
      >
        Chat Now
      </a>
    </nav>
  );
}

// ── HERO ──────────────────────────────────────────────
function Hero() {
  return (
    <header
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        padding: "8rem 4rem 4rem",
        overflow: "hidden",
      }}
    >
      {/* backgrounds */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(201,168,76,0.07) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.04) 0%, transparent 60%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          backgroundImage:
            "linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)",
        }}
      />

      {/* left */}
      <div style={{ position: "relative", zIndex: 1, paddingRight: "3rem" }}>
        <div className="hero-eyebrow">Mumbai Real Estate - AI-Powered</div>
        <h1 className="hero-headline">
          Find your<br />perfect space<br />in <em>Mumbai</em>
        </h1>
        <p className="hero-sub">
          Chariot Realty combines local street-smarts with intelligent AI to help you buy, rent, or invest -- without the usual noise.
        </p>
        <div className="hero-actions">
          <a href={WA_HELLO} target="_blank" rel="noopener" className="btn-wa">
            <span></span> Chat on WhatsApp
          </a>
          <a href="#properties" className="btn-ghost">
            Browse Properties
          </a>
        </div>
        <div className="hero-stats">
          {[
            ["1,200+", "Active Listings"],
            ["18+", "Prime Locations"],
            ["97%", "Match Accuracy"],
          ].map(([n, l]) => (
            <div key={l}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.8rem",
                  fontWeight: 600,
                  color: "#F9F4EA",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                }}
              >
                <span style={{ color: "#C9A84C" }}>{n}</span>
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#6b6457",
                  marginTop: "0.3rem",
                }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* right: phone mockup */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <PhoneMockup />
      </div>
    </header>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-mockup">
      <div style={{ width: 100, height: 6, background: "#222", borderRadius: 3, margin: "0 auto 1.2rem" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.8rem",
          padding: "0.6rem 1.2rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          marginBottom: "1rem",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#C9A84C,#8b6914)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            color: "#0A0906",
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          C
        </div>
        <div>
          <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>Chariot Realty AI</div>
          <div style={{ fontSize: "0.7rem", color: "#25D366" }}>Online</div>
        </div>
      </div>
      <div style={{ padding: "0 0.8rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        <Bubble side="in">
          Welcome! I&#39;m your Mumbai real estate AI. Part tech, part street smarts, 100% helpful.
          <Time t="10:42" />
        </Bubble>
        <Bubble side="out">
          Looking for 2 BHK in Bandra, budget Rs 3.5Cr
          <Time t="10:43" />
        </Bubble>
        <Bubble side="in">
          PERFECT brief! Found 3 solid options. Searching...
          <Time t="10:43" />
        </Bubble>
        <Bubble side="gold">
          2BHK - Carter Road, Bandra West<br />
          Rs 3.2 Cr - 1240 sq.ft - Sea View<br />
          chariotrealty.com/CHT-BND-0231
        </Bubble>
        <Bubble side="gold">
          2BHK - 14th Road, Bandra West<br />
          Rs 3.4 Cr - 1380 sq.ft - Fully Furnished<br />
          chariotrealty.com/CHT-BND-0232
        </Bubble>
        <Bubble side="in">
          Want to discuss? Connect: Kapil +91 97737 57759
          <Time t="10:44" />
        </Bubble>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          margin: "1rem 0.8rem 0",
          background: "#1a1a1a",
          borderRadius: 24,
          padding: "0.5rem 0.8rem",
        }}
      >
        <span style={{ flex: 1, fontSize: "0.78rem", color: "#555" }}>Type a message...</span>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: "#25D366",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.8rem",
          }}
        >
          &gt;
        </div>
      </div>
    </div>
  );
}

type BubbleProps = {
  side: "in" | "out" | "gold";
  children: React.ReactNode;
};

function Bubble({ side, children }: BubbleProps) {
  const base: React.CSSProperties = {
    maxWidth: "82%",
    padding: "0.55rem 0.85rem",
    borderRadius: 10,
    fontSize: "0.8rem",
    lineHeight: 1.45,
  };
  const styles: Record<BubbleProps["side"], React.CSSProperties> = {
    in: { ...base, background: "#1f1f1f", color: "#e0e0e0", alignSelf: "flex-start", borderRadius: "2px 10px 10px 10px" },
    out: { ...base, background: "#005c4b", color: "#e8f5e9", alignSelf: "flex-end", borderRadius: "10px 2px 10px 10px" },
    gold: {
      background: "rgba(201,168,76,0.12)",
      borderLeft: "2px solid #C9A84C",
      color: "#f5e9c8",
      fontFamily: "var(--font-mono)",
      fontSize: "0.72rem",
      borderRadius: 2,
      padding: "0.5rem 0.7rem",
      alignSelf: "flex-start",
      maxWidth: "95%",
    },
  };
  return <div style={styles[side]}>{children}</div>;
}

type TimeProps = { t: string };

function Time({ t }: TimeProps) {
  return <div style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", textAlign: "right", marginTop: "0.2rem" }}>{t}</div>;
}

// ── MARQUEE ───────────────────────────────────────────
function Marquee() {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{ borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)", padding: "1rem 0", overflow: "hidden", position: "relative", zIndex: 1 }}>
      <div className="marquee-track">
        {items.map((item, i) => (
          <span
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b6457",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ color: "#C9A84C", fontSize: "0.5rem" }}>*</span> {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── AI SECTION ────────────────────────────────────────
function AISection() {
  return (
    <section style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "6rem 4rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "center" }}>
        <Reveal>
          <SectionEyebrow>The Chariot AI</SectionEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,3.5vw,3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#F9F4EA", letterSpacing: "-0.01em" }}>
            Your <em style={{ fontStyle: "italic", color: "#C9A84C" }}>smart</em>
            <br />
            property concierge
          </h2>
          <p style={{ fontSize: "1rem", color: "#8c8072", lineHeight: 1.7, marginTop: "1.2rem", maxWidth: 420 }}>
            Tell us what you&#39;re looking for on WhatsApp. Our AI parses your requirement, cross-references broker data, and delivers curated matches -- without the spam.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.4rem", marginTop: "2.5rem" }}>
            {[
              {
                icon: "",
                title: "Intelligent Matching",
                desc: 'Understands natural language - just say "2BHK in Bandra under 3.5Cr with sea view" and we handle the rest.',
              },
              {
                icon: "",
                title: "Real-Time Broker Feed",
                desc: "Auto-parsed broker listings the moment they come in. SmartFeed updates instantly - you see fresh inventory first.",
              },
              {
                icon: "",
                title: "Deals Radar",
                desc: "Our AI flags underpriced properties before they&#39;re gone. Because the best deals don&#39;t wait.",
              },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <FeatureItem {...f} />
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{ background: "#1a1814", border: "1px solid rgba(201,168,76,0.18)", borderRadius: 8, padding: "2.5rem", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: "-1rem", top: "-1rem", fontFamily: "var(--font-display)", fontSize: "8rem", fontWeight: 700, color: "rgba(201,168,76,0.04)", lineHeight: 1, pointerEvents: "none" }}>AI</div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.5rem" }}>
              <span className="pulse-dot" /> Live AI Processing
            </div>
            <div>
              {FLOW_STEPS.map((s, i) => (
                <div key={s.n} style={{ display: "flex", gap: "1rem", padding: "1rem 0", borderBottom: i < FLOW_STEPS.length - 1 ? "1px dashed rgba(201,168,76,0.1)" : "none" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "#C9A84C", width: 24, flexShrink: 0, paddingTop: "0.1rem" }}>{s.n}</div>
                  <div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#F9F4EA", marginBottom: "0.15rem" }}>{s.title}</div>
                    <div style={{ fontSize: "0.8rem", color: "#8c8072", lineHeight: 1.45 }}>{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type FeatureItemProps = { icon: string; title: string; desc: string };

function FeatureItem({ icon, title, desc }: FeatureItemProps) {
  return (
    <div style={{ display: "flex", gap: "1.1rem", alignItems: "flex-start", padding: "1.2rem 1.4rem", background: "rgba(255,255,255,0.025)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 4 }}>
      <div style={{ width: 40, height: 40, border: "1px solid rgba(201,168,76,0.18)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0, background: "rgba(201,168,76,0.06)" }}>{icon}</div>
      <div>
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#F9F4EA", marginBottom: "0.2rem" }}>{title}</div>
        <div style={{ fontSize: "0.85rem", color: "#8c8072", lineHeight: 1.5 }}>{desc}</div>
      </div>
    </div>
  );
}

// ── AREAS ─────────────────────────────────────────────
function AreasSection() {
  return (
    <section id="areas" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "6rem 4rem" }}>
        <Reveal>
          <SectionHeader eyebrow="Coverage" title={<>We know <em>every pocket</em><br />of Mumbai</>} sub="From the bylanes of Bandra West to the towers of BKC - hyper-local knowledge is our unfair advantage." />
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 4, overflow: "hidden" }}>
            {AREAS.map((a) => (
              <AreaCard key={a.num} {...a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type AreaCardProps = { badge: string; name: string; desc: string; num: string };

function AreaCard({ badge, name, desc, num }: AreaCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(201,168,76,0.06)" : "#1a1814", padding: "1.8rem 1.6rem", cursor: "pointer", position: "relative", overflow: "hidden", transition: "background 0.25s" }}
    >
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.6rem" }}>{badge}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500, color: "#F9F4EA", marginBottom: "0.3rem" }}>{name}</div>
      <div style={{ fontSize: "0.78rem", color: "#6b6457", lineHeight: 1.4 }}>{desc}</div>
      <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 300, color: "rgba(201,168,76,0.15)", position: "absolute", right: "1.2rem", bottom: "0.8rem", lineHeight: 1, pointerEvents: "none" }}>{num}</div>
      <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", fontSize: "0.8rem", color: "#C9A84C", opacity: hov ? 1 : 0, transform: hov ? "translate(2px,-2px)" : "none", transition: "opacity 0.2s, transform 0.2s" }}>-&gt;</div>
    </div>
  );
}

// ── PROPERTIES ────────────────────────────────────────
function PropertiesSection() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? PROPERTIES : PROPERTIES.filter((p) => p.cat.includes(active));
  return (
    <section id="properties" style={{ padding: "6rem 4rem", background: "#1a1814", borderTop: "1px solid rgba(201,168,76,0.08)", borderBottom: "1px solid rgba(201,168,76,0.08)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <SectionHeader eyebrow="Live Listings" title={<>Featured <em>Properties</em></>} sub="A curated selection from our live SmartFeed. Updated as soon as brokers send listings." />
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{ display: "flex", gap: "0.6rem", marginBottom: "3rem", flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                style={{
                  padding: "0.5rem 1.2rem",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  border: active === f ? "1px solid #C9A84C" : "1px solid rgba(201,168,76,0.08)",
                  borderRadius: 2,
                  background: active === f ? "rgba(201,168,76,0.06)" : "transparent",
                  color: active === f ? "#C9A84C" : "#8c8072",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  transition: "all 0.2s",
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem" }}>
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <PropCard {...p} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div style={{ textAlign: "center", marginTop: "3rem" }}>
            <a href={WA_MORE} target="_blank" rel="noopener" className="btn-primary">
              See All Listings -&gt;
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

type PropCardProps = {
  id: string;
  label: string;
  tagClass: string;
  bg: string;
  imgText: string;
  price: string;
  title: string;
  loc: string;
  area: string;
  furnish: string;
  furnishIcon: string;
};

function PropCard({ id, label, tagClass, bg, imgText, price, title, loc, area, furnish, furnishIcon }: PropCardProps) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#0A0906",
        border: "1px solid rgba(201,168,76,0.08)",
        borderRadius: 4,
        overflow: "hidden",
        cursor: "pointer",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 16px 48px rgba(0,0,0,0.4)" : "none",
        borderColor: hov ? "rgba(201,168,76,0.18)" : "rgba(201,168,76,0.08)",
        transition: "border-color 0.3s, transform 0.3s, box-shadow 0.3s",
      }}
    >
      <div style={{ height: 180, background: bg, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, color: "rgba(201,168,76,0.2)" }}>{imgText}</div>
        <div className={`prop-tag ${tagClass}`}>{label}</div>
        <div style={{ position: "absolute", bottom: "0.8rem", right: "0.8rem", fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(255,255,255,0.25)" }}>{id}</div>
      </div>
      <div style={{ padding: "1.3rem 1.4rem" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 500, color: "#C9A84C", lineHeight: 1, marginBottom: "0.35rem" }}>{price}</div>
        <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#F9F4EA", marginBottom: "0.2rem" }}>{title}</div>
        <div style={{ fontSize: "0.78rem", color: "#8c8072", display: "flex", alignItems: "center", gap: "0.3rem", marginBottom: "0.8rem" }}>{loc}</div>
        <div style={{ display: "flex", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.72rem", color: "#6b6457" }}>
          <span>{area}</span>
          <span>{furnishIcon} {furnish}</span>
        </div>
      </div>
    </div>
  );
}

// ── HOW IT WORKS ──────────────────────────────────────
function HowSection() {
  return (
    <section id="how-it-works" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "7rem 4rem" }}>
        <Reveal>
          <SectionHeader eyebrow="Process" title={<>Simple as a<br /><em>WhatsApp message</em></>} sub="No lengthy forms, no broker calls, no spam. Three steps to your perfect property." />
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.08)", borderRadius: 4, overflow: "hidden", marginTop: "4rem" }}>
          {HOW_STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div style={{ background: "#1a1814", padding: "2.5rem 2rem", position: "relative", overflow: "hidden", height: "100%" }}>
                <div style={{ position: "absolute", right: "-0.5rem", top: "-1rem", fontFamily: "var(--font-display)", fontSize: "6rem", fontWeight: 700, color: "rgba(201,168,76,0.06)", lineHeight: 1, pointerEvents: "none" }}>{i + 1}</div>
                <div style={{ width: 48, height: 48, border: "1px solid rgba(201,168,76,0.18)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", marginBottom: "1.4rem", background: "rgba(201,168,76,0.05)" }}>{s.icon}</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 500, color: "#F9F4EA", marginBottom: "0.6rem", lineHeight: 1.15 }}>{s.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "#8c8072", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── TEAM ─────────────────────────────────────────────
function TeamSection() {
  const [hov, setHov] = useState(false);
  return (
    <section id="team" style={{ padding: "7rem 4rem", background: "#1a1814", borderTop: "1px solid rgba(201,168,76,0.08)", position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <SectionHeader eyebrow="The Team" title={<>Real people.<br /><em>Real expertise.</em></>} sub="The AI handles the search. Kapil handles everything else." />
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ maxWidth: 640, margin: "4rem auto 0" }}>
            <div
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{ background: "#0A0906", border: `1px solid ${hov ? "rgba(201,168,76,0.18)" : "rgba(201,168,76,0.08)"}`, borderRadius: 4, padding: "2.5rem", display: "flex", gap: "2rem", alignItems: "flex-start", transition: "border-color 0.3s" }}
            >
              <div style={{ width: 72, height: 72, borderRadius: "50%", border: "2px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 600, color: "#C9A84C", background: "rgba(201,168,76,0.06)", flexShrink: 0 }}>K</div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "1.6rem", fontWeight: 500, color: "#F9F4EA", marginBottom: "0.2rem" }}>Kapil</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "0.8rem" }}>Senior Partner - Admin Access</div>
                <p style={{ fontSize: "0.88rem", color: "#8c8072", lineHeight: 1.65, marginBottom: "1.2rem" }}>Commercial and residential specialist who knows every building in Bandra by name. Handles broker relationships, deal analysis, and the art of the negotiation.</p>
                <a href={WA} target="_blank" rel="noopener" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "#F9F4EA", textDecoration: "none", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.2)", padding: "0.5rem 1rem", borderRadius: 2 }}>
                  +91 97737 57759
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── CTA ───────────────────────────────────────────────
function CTASection() {
  return (
    <section style={{ padding: "6rem 4rem", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 70%)" }} />
      <Reveal>
        <div style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SectionEyebrow center>Start Now</SectionEyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,4vw,3.6rem)", fontWeight: 300, color: "#F9F4EA", lineHeight: 1.1, marginBottom: "1.2rem" }}>
            Ready to find your<br />
            <em style={{ fontStyle: "italic", color: "#C9A84C" }}>perfect Mumbai space?</em>
          </h2>
          <p style={{ fontSize: "1rem", color: "#8c8072", marginBottom: "2.5rem", lineHeight: 1.7 }}>One WhatsApp message is all it takes. No registrations, no spam, no broker follow-up calls.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href={WA_HELLO} target="_blank" rel="noopener" className="btn-wa">
              <span></span> Chat on WhatsApp
            </a>
            <a href="#" className="btn-ghost">
              Browse All Properties
            </a>
          </div>
          <div style={{ display: "inline-flex", gap: "0.5rem", alignItems: "center", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "#6b6457", marginTop: "1.5rem" }}>
            Direct line: <a href="tel:+919773757759" style={{ color: "#F9F4EA", textDecoration: "none" }}>+91 97737 57759</a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ── FOOTER ────────────────────────────────────────────
function Footer() {
  const cols = [
    { title: "Properties", links: ["Residential", "Commercial", "For Rent", "For Sale", "New Listings"] },
    { title: "Locations", links: ["Bandra West", "BKC", "Juhu", "Worli", "Andheri"] },
    { title: "Company", links: ["About Us", "SmartFeed", "Broker Portal", "Privacy Policy", "Contact"] },
  ];
  return (
    <footer style={{ background: "#050402", borderTop: "1px solid rgba(201,168,76,0.08)", padding: "3rem 4rem 2rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "3rem", marginBottom: "2.5rem" }}>
        <div>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.7rem", textDecoration: "none", marginBottom: "1rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid #C9A84C", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontSize: "0.9rem", color: "#C9A84C" }}>C</div>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", fontWeight: 600, color: "#F9F4EA", letterSpacing: "0.04em" }}>Chariot <span style={{ color: "#C9A84C" }}>Realty</span></span>
          </a>
          <p style={{ fontSize: "0.85rem", color: "#6b6457", lineHeight: 1.6, maxWidth: 260 }}>Mumbai&#39;s smartest real estate platform. Part tech, part street smarts, 100% helpful.</p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1.2rem" }}>{c.title}</div>
            <ul style={{ listStyle: "none" }}>
              {c.links.map((l) => (
                <li key={l} style={{ marginBottom: "0.65rem" }}>
                  <a
                    href={l === "Contact" ? WA : "#"}
                    target={l === "Contact" ? "_blank" : undefined}
                    rel={l === "Contact" ? "noopener" : undefined}
                    style={{ fontSize: "0.85rem", color: "#8c8072", textDecoration: "none" }}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div style={{ maxWidth: 1300, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid rgba(201,168,76,0.08)", fontSize: "0.75rem", color: "#6b6457" }}>
        <span>© 2025 Chariot Realty. All rights reserved.</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(107,100,87,0.5)" }}>RERA: Registered - Mumbai, Maharashtra</span>
        <span>Built with love in Mumbai</span>
      </div>
    </footer>
  );
}

// ── FLOATING WA BUTTON ────────────────────────────────
function WAFloat() {
  return (
    <a
      href={WA_HELLO}
      target="_blank"
      rel="noopener"
      style={{ position: "fixed", bottom: "2rem", right: "2rem", zIndex: 200, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none", fontSize: "1.5rem" }}
      className="wa-float"
    >
      <span className="wa-float-pulse" style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "2px solid rgba(37,211,102,0.3)" }} />
    </a>
  );
}

// ── SHARED UI ─────────────────────────────────────────
type SectionEyebrowProps = { children: React.ReactNode; center?: boolean };

type SectionHeaderProps = {
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
};

function SectionEyebrow({ children, center = false }: SectionEyebrowProps) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", marginBottom: "1rem", ...(center ? { justifyContent: "center", width: "100%" } : {}) }}>
      <span style={{ display: "block", width: 20, height: 1, background: "#C9A84C" }} />
      {children}
      <span style={{ display: "block", width: 20, height: 1, background: "#C9A84C" }} />
    </div>
  );
}

function SectionHeader({ eyebrow, title, sub }: SectionHeaderProps) {
  return (
    <div style={{ textAlign: "center", marginBottom: "4rem" }}>
      <SectionEyebrow center>{eyebrow}</SectionEyebrow>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem,3.5vw,3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#F9F4EA", letterSpacing: "-0.01em" }}>{title}</h2>
      {sub && <p style={{ fontSize: "1rem", color: "#8c8072", maxWidth: 520, margin: "1rem auto 0", lineHeight: 1.7 }}>{sub}</p>}
    </div>
  );
}

// ── GLOBAL STYLES ─────────────────────────────────────
const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@300;400&display=swap');
:root {
  --font-display:'Cormorant Garamond',Georgia,serif;
  --font-body:'DM Sans',sans-serif;
  --font-mono:'DM Mono',monospace;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#0A0906;color:#F9F4EA;font-family:var(--font-body);font-size:16px;line-height:1.6;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:#0A0906}
::-webkit-scrollbar-thumb{background:#C9A84C;border-radius:2px}
body::before{content:'';position:fixed;inset:0;z-index:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");opacity:0.025;pointer-events:none}

.hero-eyebrow{display:inline-flex;align-items:center;gap:0.6rem;font-family:var(--font-mono);font-size:0.72rem;color:#C9A84C;letter-spacing:0.18em;text-transform:uppercase;margin-bottom:1.8rem;opacity:0;animation:fadeUp 0.8s 0.2s forwards}
.hero-eyebrow::before{content:'';display:block;width:28px;height:1px;background:#C9A84C}
.hero-headline{font-family:var(--font-display);font-size:clamp(3.2rem,5.5vw,5.2rem);font-weight:300;line-height:1.05;color:#F9F4EA;letter-spacing:-0.01em;margin-bottom:1.5rem;opacity:0;animation:fadeUp 0.8s 0.35s forwards}
.hero-headline em{font-style:italic;color:#C9A84C}
.hero-sub{font-size:1.05rem;color:#8c8072;line-height:1.7;max-width:460px;margin-bottom:2.5rem;opacity:0;animation:fadeUp 0.8s 0.5s forwards}
.hero-actions{display:flex;gap:1rem;align-items:center;flex-wrap:wrap;opacity:0;animation:fadeUp 0.8s 0.65s forwards}
.hero-stats{display:flex;gap:2.5rem;margin-top:3.5rem;padding-top:3rem;border-top:1px solid rgba(201,168,76,0.08);opacity:0;animation:fadeUp 0.8s 0.8s forwards}

.btn-primary{display:inline-flex;align-items:center;gap:0.5rem;background:#C9A84C;color:#0A0906;font-size:0.88rem;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;padding:0.9rem 2rem;border-radius:2px;text-decoration:none;border:none;cursor:pointer;font-family:var(--font-body);transition:background 0.2s,transform 0.15s,box-shadow 0.2s}
.btn-primary:hover{background:#E8C97A;transform:translateY(-2px);box-shadow:0 8px 32px rgba(201,168,76,0.25)}
.btn-ghost{display:inline-flex;align-items:center;gap:0.5rem;background:transparent;color:#F9F4EA;font-size:0.88rem;font-weight:500;letter-spacing:0.06em;text-transform:uppercase;padding:0.9rem 2rem;border-radius:2px;border:1px solid rgba(201,168,76,0.18);text-decoration:none;cursor:pointer;font-family:var(--font-body);transition:border-color 0.2s,color 0.2s,transform 0.15s}
.btn-ghost:hover{border-color:#C9A84C;color:#C9A84C;transform:translateY(-2px)}
.btn-wa{display:inline-flex;align-items:center;gap:0.6rem;background:#25D366;color:#fff;font-size:0.88rem;font-weight:600;letter-spacing:0.04em;padding:0.9rem 1.8rem;border-radius:2px;text-decoration:none;font-family:var(--font-body);transition:background 0.2s,transform 0.15s,box-shadow 0.2s}
.btn-wa:hover{background:#1aad54;transform:translateY(-2px);box-shadow:0 8px 24px rgba(37,211,102,0.3)}

.phone-mockup{width:320px;background:#111008;border-radius:36px;border:1.5px solid rgba(201,168,76,0.2);padding:1.5rem 0 2rem;box-shadow:0 40px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.04),inset 0 1px 0 rgba(255,255,255,0.06);opacity:0;animation:fadeUp 0.9s 0.5s forwards}

.marquee-track{display:flex;gap:3rem;width:max-content;animation:marquee 22s linear infinite}
@keyframes marquee{to{transform:translateX(-50%)}}

.prop-tag{position:absolute;top:0.8rem;left:0.8rem;font-family:var(--font-mono);font-size:0.62rem;letter-spacing:0.1em;text-transform:uppercase;padding:0.25rem 0.6rem;border-radius:2px;z-index:2}
.tag-rent{background:rgba(37,211,102,0.15);color:#25D366}
.tag-sale{background:rgba(201,168,76,0.15);color:#C9A84C}
.tag-commercial{background:rgba(100,149,237,0.15);color:#6495ed}

.pulse-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#25D366;animation:pulse 2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.3)}}

.wa-float{animation:floatBounce 3s ease-in-out infinite}
.wa-float:hover{animation:none;transform:scale(1.1)}
.wa-float-pulse{animation:ripple 2s infinite}
@keyframes ripple{to{transform:scale(1.5);opacity:0}}
@keyframes floatBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}

@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
`;

// ── APP ───────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <WAFloat />
      <Nav />
      <Hero />
      <Marquee />
      <AISection />
      <AreasSection />
      <PropertiesSection />
      <HowSection />
      <TeamSection />
      <CTASection />
      <Footer />
    </>
  );
}
