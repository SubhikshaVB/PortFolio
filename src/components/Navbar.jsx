import { motion } from "framer-motion";

export default function Navbar({ scrollProgress }) {
  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="logo">S.
        <span>InkFolio</span>
      </div>

      <div className="inkBottle">
        <div
          className="inkFill"
          style={{
            height: "100%",
            background:
              scrollProgress < 12
                ? "#111"
                : "linear-gradient(180deg, #2f83c5, #6f4cc3 38%, #f05f86 62%, #e86f32 82%, #111 100%)",
          }}
        />
      </div>
    </motion.nav>
  );
}
