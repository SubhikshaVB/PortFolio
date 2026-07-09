import { useEffect, useState } from "react";

export default function useDiscovery() {

    const [progress, setProgress] = useState(0);

    useEffect(() => {

        let lastX = 0;
        let lastY = 0;

        const handleMove = (e) => {

            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;

            const distance = Math.sqrt(dx * dx + dy * dy);

            setProgress((prev) => {

                const next = prev + distance * 0.06;

                if (next > 100) return 100;

                return next;

            });

            lastX = e.clientX;
            lastY = e.clientY;

        };

        window.addEventListener("mousemove", handleMove);

        return () => window.removeEventListener("mousemove", handleMove);

    }, []);

    return progress;

}