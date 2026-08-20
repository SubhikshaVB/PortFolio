import { motion } from "framer-motion";
import projects from "../data/projects";
import InkSplash from "./InkSplash";

export default function Projects() {
  return (
    <section className="projects" style={{ position: 'relative', paddingTop: '150px' }}>
      
      <div className="projectsTop" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, pointerEvents: 'none' }}>
           <InkSplash />
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Selected Projects
        </motion.h2>
        <p style={{ color: 'var(--muted)', marginTop: '-10px', marginBottom: '40px' }}>
          Swipe to explore more &rarr;
        </p>
      </div>

      {/* THE SLIDER CONTAINER */}
      <div className="projectSlider">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="projectCard sliderCard"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{ background: '#ffffff' }}
          >
            <div className="projectPreview" style={{ background: project.color }}>
              {/* FIX 1: Use 'preview' for short text */}
              <div className="previewText" style={{ color: 'white', padding: '20px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                {project.preview}
              </div>
            </div>

                        <div className="projectContent" style={{ padding: '20px' }}>
              
              {/* Year and Title are completely removed here */}
              
              <p>{project.description}</p>
              
              <span style={{ display: 'block', marginTop: '15px', fontSize: '0.8rem', color: '#888', letterSpacing: '1px' }}>
                {project.stack}
              </span>

              <div className="projectLinks" style={{ marginTop: '20px', display: 'flex', gap: '15px' }}>
                <a href={project.github} target="_blank" rel="noreferrer" className="github-link">
                  GitHub
                </a>

                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="demo-link">
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}