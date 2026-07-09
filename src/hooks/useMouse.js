import { useEffect, useState } from "react";

export default function useMouse() {

    const [mouse, setMouse] = useState({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    });

    useEffect(() => {

        const move = (e) => {

            setMouse({
                x: e.clientX,
                y: e.clientY
            });

        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);

    }, []);

    return mouse;

}