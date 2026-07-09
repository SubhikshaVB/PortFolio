import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function InkCursor() {

    const [mouse, setMouse] = useState({

        x: 0,
        y: 0

    });

    const [dots, setDots] = useState([]);

    useEffect(() => {

        const move = (e) => {

            setMouse({

                x: e.clientX,
                y: e.clientY

            });

            const dot = {

                id: Date.now() + Math.random(),

                x: e.clientX,

                y: e.clientY

            };

            setDots((prev) => [...prev.slice(-18), dot]);

        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);

    }, []);

    return (

        <>

            {dots.map((dot, index) => (

                <motion.div

                    key={dot.id}

                    initial={{

                        opacity: .45,

                        scale: 1

                    }}

                    animate={{

                        opacity: 0,

                        scale: 2

                    }}

                    transition={{

                        duration: .8

                    }}

                    className="trail"

                    style={{

                        left: dot.x,

                        top: dot.y,

                        animationDelay: `${index * .02}s`

                    }}

                />

            ))}

            <motion.div

                className="inkCursor"

                animate={{

                    x: mouse.x - 8,

                    y: mouse.y - 8

                }}

                transition={{

                    type: "spring",

                    stiffness: 220,

                    damping: 18

                }}

            />

        </>

    );

}