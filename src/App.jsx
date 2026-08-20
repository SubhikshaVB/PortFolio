import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import InkCursor from "./components/InkCursor";
import Navbar from "./components/Navbar";
import projects from "./data/projects";

const splashPalettes = {
  projects: ["#ff6b6b", "#ffd166", "#4cc9f0", "#cdb4db", "#ffafcc"],
  journey: ["#ff9f1c", "#f4d35e", "#90be6d", "#f28482", "#84a59d"],
  studio: ["#4361ee", "#4cc9f0", "#7209b7", "#80ffdb", "#f72585"],
  featured: ["#06d6a0", "#48cae4", "#90e0ef", "#b8f2e6", "#70e000"],
  contact: ["#ffd166", "#ffafcc", "#fb6f92", "#cdb4db", "#fff3b0"]
};

const blobPaths = [
  "M0,-230 C28,-160 58,-124 112,-174 C102,-102 118,-70 206,-102 C152,-44 162,-4 250,30 C164,48 132,80 184,150 C100,120 60,138 42,232 C4,152 -34,134 -112,184 C-92,102 -118,72 -220,96 C-146,36 -154,-10 -240,-58 C-144,-60 -110,-92 -132,-178 C-72,-130 -30,-150 0,-230 Z",
  "M-28,-206 C34,-142 78,-150 122,-214 C124,-122 152,-92 240,-92 C164,-46 162,4 236,60 C144,64 112,96 132,184 C70,122 24,134 -22,214 C-34,126 -72,104 -154,154 C-112,72 -136,34 -226,12 C-136,-14 -116,-56 -178,-126 C-88,-104 -58,-128 -28,-206 Z",
  "M10,-186 C42,-112 90,-94 164,-142 C132,-68 154,-30 242,-2 C154,24 132,64 182,140 C98,102 58,120 24,204 C-8,126 -50,112 -122,176 C-98,90 -128,58 -220,62 C-142,18 -142,-28 -218,-78 C-130,-72 -96,-106 -98,-194 C-48,-126 -12,-122 10,-186 Z",
  "M-12,-250 C18,-150 70,-132 150,-196 C130,-102 164,-64 268,-58 C168,-14 162,40 246,98 C142,88 106,128 122,228 C58,136 4,132 -68,216 C-58,116 -94,84 -196,122 C-126,50 -148,4 -256,-30 C-152,-42 -130,-88 -170,-180 C-86,-124 -40,-146 -12,-250 Z",
  "M20,-210 C62,-142 114,-124 184,-170 C154,-94 180,-54 260,-24 C166,2 154,50 220,116 C126,102 88,138 86,224 C34,140 -12,136 -82,202 C-68,114 -106,86 -198,102 C-126,42 -140,-6 -230,-48 C-136,-54 -112,-94 -148,-178 C-74,-128 -22,-136 20,-210 Z",
  "M-52,-198 C8,-140 62,-142 106,-210 C112,-118 152,-94 232,-110 C168,-48 176,-6 258,34 C164,48 130,84 170,168 C90,122 44,136 -6,218 C-26,126 -76,112 -156,168 C-118,78 -144,36 -232,22 C-138,-10 -118,-54 -178,-124 C-92,-104 -66,-128 -52,-198 Z",
  "M0,-220 C38,-150 84,-132 146,-184 C134,-98 168,-68 254,-76 C166,-32 174,18 244,72 C148,64 116,100 152,190 C78,132 28,138 -26,220 C-38,132 -86,112 -164,164 C-116,86 -142,46 -232,40 C-146,-4 -140,-50 -218,-100 C-126,-86 -88,-112 0,-220 Z",
  "M-18,-186 C42,-132 78,-154 112,-222 C128,-128 154,-100 244,-104 C172,-44 180,4 258,42 C162,54 126,86 176,166 C86,128 42,146 -8,232 C-28,134 -70,120 -150,172 C-120,88 -142,52 -238,42 C-150,0 -142,-44 -214,-94 C-126,-88 -82,-112 -18,-186 Z"
];

const dropletPaths = [
  "M0,-22 C18,-4 17,20 0,26 C-17,20 -18,-4 0,-22 Z",
  "M-5,-18 C17,-9 20,12 2,24 C-15,17 -19,-6 -5,-18 Z",
  "M3,-20 C20,-2 12,20 -6,23 C-20,9 -13,-11 3,-20 Z",
  "M0,-14 C12,-4 13,12 0,17 C-12,12 -12,-4 0,-14 Z"
];

const journey = [
  ["Class X", "The Spark. Curiosity took root through science, sketchbooks, and early experiments."],
  ["Class XII", "The Focus. Mathematics and logic turned abstract thoughts into structured problem-solving."],
  ["B.Tech CSE", "The Foundation. Engineering discipline met a 9.81 GPA, turning code into functional systems."],
  ["M.Tech AI & DS", "The Frontier. Architecting LLMs, RAG pipelines, and multi-agent systems to build thoughtful software."]
];

const studioNotes = [
  ["AI", "LLMs, prompts, agents, evaluation"],
  ["Frontend", "React, motion, responsive systems"],
  ["Python", "Automation, APIs, prototypes"],
  ["Design", "Editorial layouts, interaction ideas"],
  ["Dance", "Bharatanatyam rhythm, gesture, discipline"],
  ["Code", "Readable components, useful products"]
];

const buildSplashParts = (palette) => {
  const blobs = blobPaths.map((path, index) => {
    const angle = (index / blobPaths.length) * Math.PI * 2;
    const radius = 138 + (index % 3) * 26;

    return {
      id: `blob-${index}`,
      path,
      color: palette[index % palette.length],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.82,
      scale: 0.72 + (index % 4) * 0.1,
      rotate: index * 37 - 80,
      delay: index * 0.035
    };
  });

  const droplets = Array.from({ length: 44 }, (_, index) => {
    const angle = (index / 44) * Math.PI * 2 + (index % 5) * 0.13;
    const radius = 238 + (index % 9) * 24;

    return {
      id: `drop-${index}`,
      path: dropletPaths[index % dropletPaths.length],
      color: palette[(index + 2) % palette.length],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.72,
      scale: 0.55 + (index % 6) * 0.14,
      rotate: (angle * 180) / Math.PI + 90,
      delay: 0.07 + (index % 8) * 0.018
    };
  });

  const specks = Array.from({ length: 72 }, (_, index) => {
    const angle = (index / 72) * Math.PI * 2 + (index % 7) * 0.09;
    const radius = 306 + (index % 12) * 20;

    return {
      id: `speck-${index}`,
      color: palette[(index + 1) % palette.length],
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius * 0.78,
      size: 3 + (index % 5),
      delay: 0.08 + (index % 10) * 0.012
    };
  });

  return { blobs, droplets, specks };
};

function PaintSplashLayer({ splash, erasePoints, canErase }) {
  const parts = useMemo(() => buildSplashParts(splash.palette), [splash]);
  const maskId = `paint-erase-${splash.id}`;
  const gradientId = `paint-gradient-${splash.id}`;

  return (
    <motion.svg
      className={`paintOverlay ${canErase ? "erasable" : ""}`}
      viewBox="0 0 1000 1000"
      preserveAspectRatio="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <defs>
        <mask id={maskId}>
          <rect width="1000" height="1000" fill="white" />
          {erasePoints.map((point) => (
            <circle key={point.id} cx={point.x} cy={point.y} r={point.r} fill="black" />
          ))}
        </mask>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="58%">
          <stop offset="0%" stopColor={splash.palette[1]} stopOpacity="0.72" />
          <stop offset="34%" stopColor={splash.palette[0]} stopOpacity="0.48" />
          <stop offset="66%" stopColor={splash.palette[2]} stopOpacity="0.32" />
          <stop offset="100%" stopColor={splash.palette[3] || splash.palette[0]} stopOpacity="0.16" />
        </radialGradient>
        <filter id="paintRoughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="7" />
        </filter>
      </defs>

      <g mask={`url(#${maskId})`}>
        <motion.rect
          width="1000"
          height="1000"
          fill="rgba(248,246,242,0.08)"
          initial={{ opacity: 0 }}
          animate={{ opacity: canErase ? 0.28 : 0.08 }}
          transition={{ duration: 0.45 }}
        />
        <g filter="url(#paintRoughen)" opacity="0.96">
          <motion.path
            d="M500,42 C543,228 610,304 815,164 C681,330 734,420 958,502 C733,548 674,644 810,838 C612,724 520,778 496,976 C448,778 354,726 176,856 C284,658 246,564 38,508 C254,430 310,336 192,150 C372,304 454,230 500,42 Z"
            fill={`url(#${gradientId})`}
            fillOpacity="0.34"
            initial={{ scale: 0, rotate: -24, opacity: 0 }}
            animate={{ scale: [0, 1.12, 0.98, 1], rotate: 4, opacity: [0, 0.92, 0.88] }}
            transition={{ duration: 0.72, ease: "easeOut", times: [0, 0.44, 0.74, 1] }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          {parts.blobs.map((blob) => (
            <motion.path
              key={blob.id}
              d={blob.path}
              fill={blob.color}
              fillOpacity="0.34"
              initial={{
                x: splash.x,
                y: splash.y,
                scale: 0,
                rotate: blob.rotate - 50,
                opacity: 0
              }}
              animate={{
                x: splash.x + blob.x,
                y: splash.y + blob.y,
                scale: [0, blob.scale * 1.5, blob.scale * 0.96, blob.scale],
                rotate: blob.rotate,
                opacity: [0, 0.9, 0.88, 0.82]
              }}
              transition={{
                delay: blob.delay,
                duration: 0.68,
                ease: "easeOut",
                times: [0, 0.42, 0.72, 1]
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}

          {parts.droplets.map((drop) => (
            <motion.path
              key={drop.id}
              d={drop.path}
              fill={drop.color}
              initial={{ x: splash.x, y: splash.y, scale: 0, rotate: drop.rotate - 60, opacity: 0 }}
              animate={{
                x: splash.x + drop.x,
                y: splash.y + drop.y,
                scale: [0, drop.scale * 1.35, drop.scale],
                rotate: drop.rotate,
                opacity: [0, 0.9, 0.76]
              }}
              transition={{
                delay: drop.delay,
                duration: 0.62,
                ease: "easeOut",
                times: [0, 0.55, 1]
              }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        </g>

        {parts.specks.map((speck) => (
          <motion.ellipse
            key={speck.id}
            rx={speck.size}
            ry={speck.size * 1.7}
            fill={speck.color}
            initial={{ x: splash.x, y: splash.y, scale: 0, opacity: 0, rotate: 0 }}
            animate={{
              x: splash.x + speck.x,
              y: splash.y + speck.y,
              scale: [0, 1.45, 1],
              opacity: [0, 0.82, 0.64],
              rotate: speck.x
            }}
            transition={{ delay: speck.delay, duration: 0.55, ease: "easeOut" }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        ))}
      </g>
    </motion.svg>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [heroPoints, setHeroPoints] = useState([]);
  const [erasePoints, setErasePoints] = useState([]);
  const [paintMarks, setPaintMarks] = useState([]);
  const [livingPalette, setLivingPalette] = useState(splashPalettes.projects);
  const [activeSplash, setActiveSplash] = useState(null);
  const [canErase, setCanErase] = useState(false);
  const [unlockedIndex, setUnlockedIndex] = useState(0);
  const [openNode, setOpenNode] = useState(0);
  const [blueprintOpen, setBlueprintOpen] = useState(0); 

  const heroRef = useRef(null);
  const projectsRef = useRef(null);
  const journeyRef = useRef(null);
  const studioRef = useRef(null);
  const featuredRef = useRef(null);
  const contactRef = useRef(null);

  const sectionOrder = useMemo(
    () => [
      { key: "hero", ref: heroRef },
      { key: "projects", ref: projectsRef },
      { key: "journey", ref: journeyRef },
      { key: "studio", ref: studioRef },
      { key: "featured", ref: featuredRef },
      { key: "contact", ref: contactRef }
    ],
    []
  );

  const sectionRefs = useMemo(
    () => ({
      projects: projectsRef,
      journey: journeyRef,
      studio: studioRef,
      featured: featuredRef,
      contact: contactRef
    }),
    []
  );

  const heroProgress = Math.min(heroPoints.length / 34, 1);

  const paintAndGo = (target, paletteName) => {
    const palette = splashPalettes[paletteName] || splashPalettes.contact;
    const targetIndex = sectionOrder.findIndex((section) => section.key === target);
    const viewportSplash = {
      id: Date.now(),
      x: 500,
      y: 500,
      palette
    };

    setErasePoints([]);
    setPaintMarks([]);
    setLivingPalette(palette);
    setCanErase(false);
    setActiveSplash(viewportSplash);
    setUnlockedIndex((current) => Math.max(current, targetIndex));

    window.setTimeout(() => {
      sectionRefs[target]?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 240);

    window.setTimeout(() => setCanErase(true), 720);
  };

  useEffect(() => {
    const handleMove = (event) => {
      const svg = document.querySelector(".heroSVG");

      if (svg) {
        const rect = svg.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 1200;
        const y = ((event.clientY - rect.top) / rect.height) * 500;

        if (x >= 0 && x <= 1200 && y >= 0 && y <= 500) {
          setHeroPoints((prev) => {
            const last = prev[prev.length - 1];

            if (last) {
              const dx = x - last.x;
              const dy = y - last.y;

              if (Math.sqrt(dx * dx + dy * dy) < 14) return prev;
            }

            return [...prev, { id: Date.now() + Math.random(), x, y }].slice(-250);
          });
        }
      }

      if (!activeSplash && heroProgress > 0.72) {
        setPaintMarks((prev) => {
          const last = prev[prev.length - 1];

          if (last) {
            const dx = event.clientX - last.x;
            const dy = event.clientY - last.y;

            if (Math.sqrt(dx * dx + dy * dy) < 34) return prev;
          }

          const index = prev.length;

          return [
            ...prev,
            {
              id: Date.now() + Math.random(),
              x: event.clientX,
              y: event.clientY,
              size: 42 + (index % 6) * 15,
              color: livingPalette[index % livingPalette.length],
              rotate: (index * 41) % 180
            }
          ].slice(-90);
        });
      }

      if (!canErase || !activeSplash) return;

      const x = (event.clientX / window.innerWidth) * 1000;
      const y = (event.clientY / window.innerHeight) * 1000;

      setErasePoints((prev) => {
        const last = prev[prev.length - 1];

        if (last) {
          const dx = x - last.x;
          const dy = y - last.y;

          if (Math.sqrt(dx * dx + dy * dy) < 22) return prev;
        }

        return [...prev, { id: Date.now() + Math.random(), x, y, r: 72 }].slice(-520);
      });

      setPaintMarks((prev) => {
        const index = prev.length;

        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            x: event.clientX,
            y: event.clientY,
            size: 58 + (index % 5) * 18,
            color: livingPalette[index % livingPalette.length],
            rotate: (index * 47) % 180
          }
        ].slice(-110);
      });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [activeSplash, canErase, heroProgress, livingPalette]);

  useEffect(() => {
    let touchStartY = 0;

    const getDownBoundary = () => {
      const nextSection = sectionOrder[unlockedIndex + 1]?.ref.current;

      if (!nextSection) {
        return document.documentElement.scrollHeight - window.innerHeight;
      }

      return Math.max(0, nextSection.offsetTop - window.innerHeight + 2);
    };

    const holdAtBoundary = (event, desiredY) => {
      const boundary = getDownBoundary();

      if (desiredY <= boundary) return false;

      event.preventDefault();
      window.scrollTo({
        top: boundary,
        behavior: "auto"
      });

      return true;
    };

    const handleWheel = (event) => {
      if (event.deltaY <= 0) return;
      holdAtBoundary(event, window.scrollY + event.deltaY);
    };

    const handleTouchStart = (event) => {
      touchStartY = event.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (event) => {
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const movingDownPage = touchStartY - currentY > 0;

      if (!movingDownPage) return;
      holdAtBoundary(event, window.scrollY + (touchStartY - currentY));
    };

    const handleKeyDown = (event) => {
      const downIntent = {
        ArrowDown: 64,
        PageDown: window.innerHeight * 0.82,
        End: document.documentElement.scrollHeight,
        " ": window.innerHeight * 0.82
      }[event.key];

      if (!downIntent) return;
      holdAtBoundary(event, window.scrollY + downIntent);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sectionOrder, unlockedIndex]);

  useEffect(() => {
    if (erasePoints.length > 95) {
      const timeout = window.setTimeout(() => {
        setActiveSplash(null);
        setCanErase(false);
        setErasePoints([]);
      }, 500);

      return () => window.clearTimeout(timeout);
    }
  }, [erasePoints.length]);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight <= 0 ? 0 : (window.scrollY / docHeight) * 100;

      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar scrollProgress={scrollProgress} />
      <InkCursor />

      <div className="livingPaintLayer">
        {paintMarks.map((mark) => (
          <span
            className="livingPaintMark"
            key={mark.id}
            style={{
              left: mark.x,
              top: mark.y,
              width: mark.size,
              height: mark.size * 0.72,
              background: mark.color,
              transform: `translate(-50%, -50%) rotate(${mark.rotate}deg)`
            }}
          />
        ))}
      </div>

      {activeSplash && <PaintSplashLayer splash={activeSplash} erasePoints={erasePoints} canErase={canErase} />}

      <div style={{ "--progress": scrollProgress / 100 }}>
        <section className="hero" ref={heroRef}>
          <svg className="heroSVG" viewBox="0 0 1200 500">
            <defs>
              <mask id="paintMask">
                <rect width="100%" height="100%" fill="black" />
                {heroPoints.map((point) => (
                  <circle key={point.id} cx={point.x} cy={point.y} r="30" fill="white" />
                ))}
              </mask>
            </defs>
            <text x="600" y="230" textAnchor="middle" className="outlineText">
              SUBHIKSHA
            </text>
            <text x="600" y="230" textAnchor="middle" className="fillText" mask="url(#paintMask)">
              SUBHIKSHA
            </text>
          </svg>

          <motion.p
            className="heroSubtitle"
            animate={{ opacity: heroProgress > 0.45 ? 1 : 0, y: heroProgress > 0.45 ? 0 : 18 }}
            transition={{ duration: 0.7 }}
          >
            AI Engineer / Frontend Developer / Creative Thinker
          </motion.p>

          <motion.button
            className="inkButton"
            animate={{ opacity: heroProgress > 0.7 ? 1 : 0, y: heroProgress > 0.7 ? 0 : 18 }}
            transition={{ duration: 0.7 }}
            onClick={() => paintAndGo("projects", "projects")}
          >
            <span className="inkDot" />
            <span>Reveal Projects</span>
          </motion.button>
        </section>

        <section className="projects chapter" ref={projectsRef}>
  <div className="sectionSplash projectsWash" />
  <motion.h2 initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    Selected Projects
  </motion.h2>
  
  <p style={{ color: 'var(--muted)', marginTop: '-10px', marginBottom: '40px' }}>
    Swipe to explore more &rarr;
  </p>
  
  {/* SLIDER CONTAINER */}
  <div className="projectSlider" style={{ display: 'flex', overflowX: 'auto', gap: '24px', padding: '20px 0 40px 0' }}>
    {projects.map((project, index) => (
      <motion.article
  className={`projectCard card${index + 1}`}
  key={project.id}
  style={{ 
    "--preview": project.color,
    flex: '0 0 340px',  /* Increased from 320px */
    background: '#ffffff',
    minHeight: '520px'   /* Increased from 450px */
  }}
        initial={{ opacity: 0, y: 50, filter: "blur(12px)", scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
        transition={{ duration: 0.65, delay: index * 0.12 }}
        viewport={{ once: true }}
      >
        {/* Colored Preview Box */}
         <div className="projectPreview" style={{ background: project.color, height: '160px' }}>
    <span style={{ color: 'white', fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      {project.preview || project.title}
    </span>
  </div>
  
  {/* Content Area */}
  <div style={{ padding: '20px' }}>
    {/* Description - No truncation */}
    <p style={{ 
      minHeight: '80px',  /* Ensures consistent height */
      lineHeight: '1.6',
      marginBottom: '15px'
    }}>
      {project.description}
    </p>
    
    <small style={{ display: 'block', fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>
      {project.stack}
    </small>
    
    <div className="projectLinks" style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
      <a href={project.github} style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 18px', textDecoration: 'none' }}>
        GitHub
      </a>
      
      {project.demo && project.demo !== "#" && (
        <a href={project.demo} style={{ border: '1px solid var(--line)', borderRadius: '999px', padding: '10px 18px', textDecoration: 'none' }}>
          Live Demo
        </a>
      )}
    </div>
  </div>
</motion.article>
    ))}
  </div>
  
  <button className="inkButton sectionButton" onClick={() => paintAndGo("journey", "journey")}>
    <span className="inkDot" />
    <span>Continue Journey</span>
  </button>
</section>

        <section className="journey chapter" ref={journeyRef}>
  <div className="sectionSplash journeyWash" />
  <h2>Journey</h2>
  <div className="timeline">
    {journey.map(([title, text], index) => (
      <div
        className="timelineItem"
        key={title}
        onMouseEnter={() => setOpenNode(index)}
        style={{ cursor: 'default', paddingBottom: '10px' }}
      >
        <span className="dot" />
        <strong style={{ 
          color: openNode === index ? 'var(--ink)' : 'var(--muted)',
          transition: 'color 0.3s ease'
        }}>
          {title}
        </strong>
        <motion.p 
          animate={{ 
            height: openNode === index ? "auto" : 0, 
            opacity: openNode === index ? 1 : 0 
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ overflow: 'hidden', color: 'var(--muted)', marginTop: '5px' }}
        >
          {text}
        </motion.p>
      </div>
    ))}
  </div>
  <button className="inkButton sectionButton" onClick={() => paintAndGo("studio", "studio")}>
    <span className="inkDot" />
    <span>Reveal Studio</span>
  </button>
</section>

        <section className="studio chapter" ref={studioRef}>
          <div className="sectionSplash studioWash" />
          <h2>The Studio</h2>
          <p className="studioSub">Pinned fragments from the desk where ideas become products.</p>
          <div className="skillBoard">
            {studioNotes.map(([title, text], index) => (
              <motion.article
                className={`skillPaper note${index + 1}`}
                key={title}
                whileHover={{ y: -10, rotate: index % 2 ? 2 : -2 }}
                initial={{ opacity: 0, y: 30, rotate: index % 2 ? 3 : -3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3>{title}</h3>
                <p>{text}</p>
                {title === "Dance" && <div className="mudraMark" />}
              </motion.article>
            ))}
          </div>
          <button className="inkButton sectionButton" onClick={() => paintAndGo("featured", "featured")}>
            <span className="inkDot" />
            <span>Reveal Featured</span>
          </button>
        </section>

                <section className="featured chapter" ref={featuredRef}>
          <div className="sectionSplash featuredWash" />
          <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Featured Deep Dives</h2>

          {/* PROJECT 1: RAG-EVAL */}
          <motion.div className="featuredPaper" layout style={{ marginBottom: '20px' }}>
            <span className="featuredLabel">FEATURED PROJECT 01</span>
            <h2>RAG-Eval Studio</h2>
            <p>An advanced document Q&A engine featuring custom hybrid retrieval and an automated LLM evaluation framework.</p>
            <button onClick={() => setBlueprintOpen(blueprintOpen === 1 ? 0 : 1)}>
              {blueprintOpen === 1 ? "Close Blueprint" : "Open Blueprint"}
            </button>
            {blueprintOpen === 1 && (
              <motion.div className="blueprint" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div><h3>Problem</h3><p>Standard RAG pipelines hallucinate and fail on messy PDF extractions.</p></div>
                <div><h3>Architecture</h3><p>Hybrid Retriever (BM25 + Vectors), LCEL Chain, Streamlit UI, Regex cleaning.</p></div>
                <div><h3>Tech Stack</h3><p>Python, LangChain, ChromaDB, HuggingFace, Streamlit.</p></div>
                <div><h3>Key Lesson</h3><p>LLM-as-a-Judge is flaky; deterministic ground-truth matching is essential for reliable evaluation.</p></div>
                <div className="blueprintButtons">
                  <a href="https://github.com/SubhikshaVB/rag-eval-studio">GitHub</a>
                  <a href="https://rag-eval-studio.streamlit.app/">Live Demo</a>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* PROJECT 2: PULSE */}
          <motion.div className="featuredPaper" layout style={{ marginBottom: '20px' }}>
            <span className="featuredLabel">FEATURED PROJECT 02</span>
            <h2>Pulse: GitHub Intelligence</h2>
            <p>A developer profiling engine that computes algorithmic metrics from GitHub API data.</p>
            <button onClick={() => setBlueprintOpen(blueprintOpen === 2 ? 0 : 2)}>
              {blueprintOpen === 2 ? "Close Blueprint" : "Open Blueprint"}
            </button>
            {blueprintOpen === 2 && (
              <motion.div className="blueprint" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div><h3>Problem</h3><p>GitHub profiles are hard to quantify algorithmically for recruiters.</p></div>
                <div><h3>Architecture</h3><p>FastAPI backend, GitHub API ingestion, 30-min TTL caching, React frontend.</p></div>
                <div><h3>Tech Stack</h3><p>Python, FastAPI, React.js, GitHub API.</p></div>
                <div><h3>Key Lesson</h3><p>API rate limits require robust fault-tolerance and synthetic offline fallback modes.</p></div>
                <div className="blueprintButtons">
                  <a href="https://github.com/SubhikshaVB/Pulse">GitHub</a>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* PROJECT 3: AGENTSPHERE */}
          <motion.div className="featuredPaper" layout style={{ marginBottom: '20px' }}>
            <span className="featuredLabel">FEATURED PROJECT 03</span>
            <h2>AgentSphere</h2>
            <p>A multi-agent AI orchestration system where specialized agents collaborate to automate analytical workflows.</p>
            <button onClick={() => setBlueprintOpen(blueprintOpen === 3 ? 0 : 3)}>
              {blueprintOpen === 3 ? "Close Blueprint" : "Open Blueprint"}
            </button>
            {blueprintOpen === 3 && (
              <motion.div className="blueprint" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
                <div><h3>Problem</h3><p>Single LLMs struggle with complex, multi-step analytical tasks.</p></div>
                <div><h3>Architecture</h3><p>Multi-agent orchestration (Researcher, Planner, Critic), FastAPI, React.</p></div>
                <div><h3>Tech Stack</h3><p>Python, FastAPI, React.js, OpenRouter API, LLMs.</p></div>
                <div><h3>Key Lesson</h3><p>Agent orchestration requires strict context window management to prevent token overflow.</p></div>
                <div className="blueprintButtons">
                  <a href="https://github.com/SubhikshaVB/AgentSphere">GitHub</a>
                </div>
              </motion.div>
            )}
          </motion.div>

          <button className="inkButton sectionButton" onClick={() => paintAndGo("contact", "contact")}>
            <span className="inkDot" />
            <span>Final Splash</span>
          </button>
        </section>

        <section className="contact chapter" ref={contactRef}>
          <motion.div initial={{ opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2>Let's Build Something Beautiful.</h2>
            <svg className="signature" viewBox="0 0 520 120">
              <path d="M18 72 C70 20, 112 112, 160 58 S240 38, 276 70 S342 94, 382 50 S452 22, 500 66" />
            </svg>
            <p>Subhiksha</p>
            <div className="contactLinks">
              <a href="mailto:vbsubhiksha@gmail.com">Email</a>
              <a href="https://github.com/SubhikshaVB">GitHub</a>
              <a href="https://www.linkedin.com/in/subhiksha-baranidharan/">LinkedIn</a>
              {/* <a href="#">Resume</a> */}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

export default App;