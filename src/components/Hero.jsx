import { motion } from "framer-motion";

export default function Hero({
  revealPoints,
  progress,
  goNext
}) {
  return (

    <section className="hero">

      <svg
        className="heroSVG"
        viewBox="0 0 1200 500"
      >

        <defs>

          <mask id="paintMask">

            <rect
              width="100%"
              height="100%"
              fill="black"
            />

            {revealPoints.map((point) => (

              <circle
                key={point.id}
                cx={point.x}
                cy={point.y}
                r="28"
                fill="white"
              />

            ))}

          </mask>

        </defs>

        <text
          x="600"
          y="230"
          textAnchor="middle"
          className="outlineText"
        >
          SUBHIKSHA
        </text>

        <text
          x="600"
          y="230"
          textAnchor="middle"
          className="fillText"
          mask="url(#paintMask)"
        >
          SUBHIKSHA
        </text>

      </svg>

      <motion.p
        animate={{
          opacity: progress > 25 ? 1 : 0,
          y: progress > 25 ? 0 : 20
        }}
        transition={{
          duration: 0.8
        }}
      >
        AI Engineer • Frontend Developer • Creative Thinker
      </motion.p>

      <motion.button
        className="inkButton"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: progress > 40 ? 1 : 0,
          y: progress > 40 ? 0 : 20
        }}
        transition={{
          duration: 0.6
        }}
        onClick={goNext}
      >
        <span className="inkDot"></span>

        <span>

          Reveal Projects

        </span>

      </motion.button>

    </section>

  );
}