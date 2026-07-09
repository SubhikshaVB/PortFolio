import { AnimatePresence, motion } from "framer-motion";

export default function InkTransition({ active }) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{
            clipPath: "circle(0% at 50% 50%)",
          }}
          animate={{
            clipPath: "circle(150% at 50% 50%)",
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.65,
            ease: "easeInOut",
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "#111",
            zIndex: 99999,
            pointerEvents: "none",
          }}
        />
      )}
    </AnimatePresence>
  );
}