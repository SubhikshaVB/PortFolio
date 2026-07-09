import { motion } from "framer-motion";

export default function PaintSplash({ visible }) {

  if (!visible) return null;

  return (

    <motion.div

      className="paintSplash"

      initial={{
        scale: 0,
        rotate: -40,
        opacity: 0
      }}

      animate={{
        scale: 1,
        rotate: 8,
        opacity: 1
      }}

      transition={{
        duration: .75
      }}

    >

      <span className="blob yellow"></span>
      <span className="blob orange"></span>
      <span className="blob pink"></span>
      <span className="blob purple"></span>
      <span className="blob blue"></span>

      <span className="drop d1"></span>
      <span className="drop d2"></span>
      <span className="drop d3"></span>
      <span className="drop d4"></span>

    </motion.div>

  );

}