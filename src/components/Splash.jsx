import { motion } from "framer-motion";

export default function Splash({ show }) {

  if (!show) return null;

  return (

    <motion.div
      initial={{
        scale: 0,
        rotate: -40,
        opacity: 0
      }}
      animate={{
        scale: 1,
        rotate: 0,
        opacity: 1
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut"
      }}
      className="paintSplash"
    >

      <span className="blob b1"></span>
      <span className="blob b2"></span>
      <span className="blob b3"></span>
      <span className="blob b4"></span>
      <span className="blob b5"></span>

    </motion.div>

  );

}