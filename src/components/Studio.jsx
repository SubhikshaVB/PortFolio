import { motion } from "framer-motion";

const skills = [
  {
    title: "React",
    info: [
      "Hooks",
      "Responsive UI",
      "Component Architecture"
    ]
  },
  {
    title: "Python",
    info: [
      "Automation",
      "AI",
      "Flask"
    ]
  },
  {
    title: "Java",
    info: [
      "OOP",
      "DSA",
      "Problem Solving"
    ]
  },
  {
    title: "AI",
    info: [
      "LLMs",
      "Prompt Engineering",
      "Computer Vision"
    ]
  },
  {
    title: "SQL",
    info: [
      "Queries",
      "Joins",
      "Database Design"
    ]
  }
];

export default function Studio() {
  return (
    <section className="studio">

      <h2>The Studio</h2>

      <p className="studioSub">
        Tools I love creating with.
      </p>

      <div className="skillBoard">

        {skills.map((skill, index) => (

<motion.div

key={skill.title}

className="skillPaper"

initial={{
opacity:0,
scale:.8
}}

whileInView={{
opacity:1,
scale:1
}}

whileHover={{
rotateY:180
}}

transition={{
duration:.6,
delay:index*.08
}}

viewport={{
once:true
}}

>

<div className="front">

{skill.title}

</div>

<div className="back">

{skill.info.map(item=>(

<p key={item}>✓ {item}</p>

))}

</div>

</motion.div>

))}

      </div>

    </section>
  );
}