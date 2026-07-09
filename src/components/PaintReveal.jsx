// import { useId } from "react";

// export default function PaintReveal({

//   revealPoints,

//   children,

//   width = 1200,

//   height = 700

// }) {

//   const id = useId();

//   return (

//     <svg
//       viewBox={`0 0 ${width} ${height}`}
//       width="100%"
//       height="100%"
//       className="paintRevealSVG"
//     >

//       <defs>

//         <mask id={id}>

//           <rect
//             width="100%"
//             height="100%"
//             fill="black"
//           />

//           {revealPoints.map((point) => (

//             <circle

//               key={point.id}

//               cx={point.x}

//               cy={point.y}

//               r="40"

//               fill="white"

//             />

//           ))}

//         </mask>

//       </defs>

//       <foreignObject

//         width="100%"

//         height="100%"

//         mask={`url(#${id})`}

//       >

//         <div
//           xmlns="http://www.w3.org/1999/xhtml"
//           className="paintContent"
//         >

//           {children}

//         </div>

//       </foreignObject>

//     </svg>

//   );

// }

import { motion } from "framer-motion";

export default function PaintReveal({

    revealed,
    children

}) {

    return (

        <motion.div

            initial={{

                opacity:0,

                scale:.98,

                filter:"blur(12px)"

            }}

            animate={{

                opacity:revealed?1:0,

                scale:revealed?1:.98,

                filter:revealed?"blur(0px)":"blur(12px)"

            }}

            transition={{

                duration:.8

            }}

            className="paintReveal"

        >

            {children}

        </motion.div>

    )

}