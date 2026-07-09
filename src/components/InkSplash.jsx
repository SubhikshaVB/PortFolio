import { motion } from "framer-motion";

export default function InkSplash() {
  return (
    <motion.div
      className="inkSplash"
      initial={{
        scale: 0,
        opacity: 0,
        rotate: -25,
      }}
      whileInView={{
        scale: 1,
        opacity: 1,
        rotate: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.8,
      }}
    >
      <div className="paint yellow"></div>
      <div className="paint orange"></div>
      <div className="paint pink"></div>
      <div className="paint purple"></div>
      <div className="paint blue"></div>

      <span className="drop d1"></span>
      <span className="drop d2"></span>
      <span className="drop d3"></span>
      <span className="drop d4"></span>
    </motion.div>
  );
}