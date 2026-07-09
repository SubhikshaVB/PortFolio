import { motion } from "framer-motion";

export default function Contact() {

    return (

        <section className="contact">

            <motion.div

                initial={{
                    opacity:0,
                    y:60
                }}

                whileInView={{
                    opacity:1,
                    y:0
                }}

                transition={{
                    duration:.8
                }}

                viewport={{
                    once:true
                }}

            >

                <h2>

                    One Final Brushstroke.

                </h2>

                <p>

                    Every great product starts with a conversation.
                    Let's create something meaningful together.

                </p>

                <div className="contactLinks">

                    <a href="mailto:subhiksha@email.com">

                        Email

                    </a>

                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noreferrer"
                    >

                        GitHub

                    </a>

                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noreferrer"
                    >

                        LinkedIn

                    </a>

                </div>

            </motion.div>

        </section>

    );

}