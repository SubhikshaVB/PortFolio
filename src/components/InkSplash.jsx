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
      {/* Forced clean, vibrant colors */}
      <div className="paint yellow" style={{ backgroundColor: '#FDE047' }}></div>
      <div className="paint orange" style={{ backgroundColor: '#FB923C' }}></div>
      <div className="paint pink" style={{ backgroundColor: '#F472B6' }}></div>
      <div className="paint purple" style={{ backgroundColor: '#C084FC' }}></div>
      <div className="paint blue" style={{ backgroundColor: '#60A5FA' }}></div>

      <span className="drop d1"></span>
      <span className="drop d2"></span>
      <span className="drop d3"></span>
      <span className="drop d4"></span>
    </motion.div>
  );
}