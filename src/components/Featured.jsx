import { motion } from "framer-motion";
import { useState } from "react";

export default function Featured() {

  const [open, setOpen] = useState(false);

  return (

    <section className="featured">

      <motion.div
        layout
        transition={{ duration: 0.7 }}
        className={`featuredPaper ${open ? "open" : ""}`}
      >

        <span className="featuredLabel">

          FEATURED PROJECT

        </span>

        <h2>

          AI Interview Assistant

        </h2>

        <p>

          An AI platform for personalized interview preparation.

        </p>

        <button
          onClick={() => setOpen(!open)}
        >

          {open ? "Close" : "Open Blueprint"}

        </button>

        {open && (

          <motion.div

            className="blueprint"

            initial={{
              opacity: 0,
              y: 40
            }}

            animate={{
              opacity: 1,
              y: 0
            }}

            transition={{
              duration: 0.6
            }}

          >

            <div>

              <h3>Problem</h3>

              <p>
                Students need better interview preparation with AI feedback.
              </p>

            </div>

            <div>

              <h3>Architecture</h3>

              <p>
                React → Flask → Gemini API → Firebase
              </p>

            </div>

            <div>

              <h3>Features</h3>

              <ul>

                <li>Resume Analysis</li>

                <li>Question Generator</li>

                <li>Mock Interviews</li>

                <li>Feedback Engine</li>

              </ul>

            </div>

            <div className="blueprintButtons">

              <a href="#">GitHub</a>

              <a href="#">Live Demo</a>

            </div>

          </motion.div>

        )}

      </motion.div>

    </section>

  );

}