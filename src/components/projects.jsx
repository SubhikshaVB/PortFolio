// import { motion } from "framer-motion";
// import projects from "../data/projects";
// import InkSplash from "./InkSplash";
// export default function Projects() {
//   return (
//   <section className="projects">

//     <div className="projectsWrapper">

//       <InkSplash show={true} />

//       <div className="projectsContent">

//         <h2>Selected Projects</h2>

//         <div className="projectGrid">

//           {projects.map((project, index) => (

//             <motion.div
//               key={project.id}
//               className="projectCard"
//               initial={{
//                 opacity: 0,
//                 y: 80,
//                 rotateX: 20
//               }}
//               whileInView={{
//                 opacity: 1,
//                 y: 0,
//                 rotateX: 0
//               }}
//               transition={{
//                 delay: index * 0.2,
//                 duration: 0.8
//               }}
//               viewport={{
//                 once: true
//               }}
//             >

//               <div
//                 className="projectPreview"
//                 style={{
//                   background: project.color
//                 }}
//               >

//                 <div className="previewText">

//                   {project.title}

//                 </div>

//               </div>

//               <div className="projectContent">

//                 <div className="projectYear">

//                   {project.year}

//                 </div>

//                 <h3>

//                   {project.title}

//                 </h3>

//                 <p>

//                   {project.description}

//                 </p>

//                 <span>

//                   {project.stack}

//                 </span>

//                 <div className="projectLinks">

//                   <a
//                     href={project.github}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     GitHub
//                   </a>

//                   <a
//                     href={project.demo}
//                     target="_blank"
//                     rel="noreferrer"
//                   >
//                     Live Demo
//                   </a>

//                 </div>

//               </div>

//             </motion.div>

//           ))}

//         </div>

//       </div>

//     </div>

//   </section>
// );
// }


import { motion } from "framer-motion";
import projects from "../data/projects";
import InkSplash from "./InkSplash";

export default function Projects() {
  return (
    <section className="projects">

      <div className="projectsTop">

        <InkSplash />

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
        >
          Selected Projects
        </motion.h2>

      </div>

      <div className="projectGrid">

        {projects.map((project, index) => (

          <motion.div
            key={project.id}
            className="projectCard"
            initial={{
              opacity: 0,
              y: 70,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              delay: index * 0.15,
              duration: 0.6,
            }}
          >

            <div
              className="projectPreview"
              style={{
                background: project.color,
              }}
            >

              <div className="previewText">

                {project.title}

              </div>

            </div>

            <div className="projectContent">

              <div className="projectYear">

                {project.year}

              </div>

              <h3>

                {project.title}

              </h3>

              <p>

                {project.description}

              </p>

              <span>

                {project.stack}

              </span>

              <div className="projectLinks">

                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Live Demo
                </a>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    </section>
  );
}