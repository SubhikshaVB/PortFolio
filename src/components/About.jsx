import { motion } from "framer-motion";

const timeline = [
  {
    year: "2021",
    title: "Started Programming",
    text: "Began exploring software development and problem solving."
  },
  {
    year: "2022",
    title: "Bharatanatyam",
    text: "Continued classical dance while developing discipline and creativity."
  },
  {
    year: "2024",
    title: "Artificial Intelligence",
    text: "Started building AI-powered applications and learning modern web technologies."
  },
  {
    year: "2025",
    title: "Ready to Build",
    text: "Looking for opportunities where I can create impactful software."
  }
];

export default function About() {
  return (
    <section className="about">

      <h2>My Journey</h2>

      <div className="timeline">

        {timeline.map((item, index) => (

          <motion.div
            key={index}
            className="timelineItem"
            initial={{
              opacity:0,
              x:-60
            }}
            whileInView={{
              opacity:1,
              x:0
            }}
            transition={{
              duration:.7,
              delay:index*.15
            }}
            viewport={{
              once:true
            }}
          >

            <div className="dot"></div>

            <div>

              <span>{item.year}</span>

              <h3>{item.title}</h3>

              <p>{item.text}</p>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}