// "use client";

// import { motion } from "framer-motion";

// const StarComponent1 = ({ size, color, index }) => {
//   return (
//     <motion.div
//       key={index}
//       className="absolute"
//       style={{
//         top: "0%",
//         left: "20%",
//       }}
//       animate={{
//         scale: [0, 1, 0],
//         opacity: [0, 1, 0],
//         x: [
//           0,
//           (size / 2) * Math.cos((((1 + 1) / 3) * Math.PI) / 3),
//           (1 * Math.PI) / 3,
//         ],
//         y: [0, (size / 2) * Math.sin((1 * Math.PI) / 3), (1 * Math.PI) / 3],
//       }}
//       transition={{
//         duration: 2,
//         repeat: Infinity,
//         delay: 1 * 0.2,
//       }}
//     >
//       <svg
//         style={{
//           width: size / 1.5,
//           height: size / 1.5,
//           x: -size / (6 / 1),
//           // y: -size / 6,
//         }}
//         fill={color}
//         viewBox="0 0 512 512"
//         id="icons"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//         <g
//           id="SVGRepo_tracerCarrier"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         ></g>
//         <g id="SVGRepo_iconCarrier">
//           <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"></path>
//         </g>
//       </svg>
//     </motion.div>
//   );
// };

// const StarComponent2 = ({ size, color, index }) => {
//   return (
//     <motion.div
//       key={index}
//       className="absolute"
//       style={{
//         top: "20%",
//         left: "20%",
//       }}
//       animate={{
//         scale: [0, 1, 0],
//         opacity: [0, 1, 0],
//         x: [
//           0,
//           (size / 2) * Math.cos((((2 + 1) / 3) * Math.PI) / 3),
//           (2 * Math.PI) / 3,
//         ],
//         y: [0, (size / 2) * Math.sin((2 * Math.PI) / 3), (2 * Math.PI) / 3],
//       }}
//       transition={{
//         duration: 2,
//         repeat: Infinity,
//         delay: 2 * 0.2,
//       }}
//     >
//       <svg
//         style={{
//           width: size / 1.5,
//           height: size / 1.5,
//           x: -size / (6 / 2),
//           // y: -size / 6,
//         }}
//         fill={color}
//         viewBox="0 0 512 512"
//         id="icons"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//         <g
//           id="SVGRepo_tracerCarrier"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         ></g>
//         <g id="SVGRepo_iconCarrier">
//           <path
//             d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,
// 7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"
//           ></path>
//         </g>
//       </svg>
//     </motion.div>
//   );
// };

// const StarComponent3 = ({ size, color, index }) => {
//   return (
//     <motion.div
//       key={index}
//       className="absolute"
//       style={{
//         top: "40%",
//         left: "20%",
//       }}
//       animate={{
//         scale: [0, 1, 0],
//         opacity: [0, 1, 0],
//         x: [
//           0,
//           (size / 2) * Math.cos((((3 + 1) / 3) * Math.PI) / 3),
//           (3 * Math.PI) / 3,
//         ],
//         y: [0, (size / 2) * Math.sin((3 * Math.PI) / 3), -(size * 0.3)],
//       }}
//       transition={{
//         duration: 2,
//         repeat: Infinity,
//         delay: 3 * 0.2,
//       }}
//     >
//       <svg
//         style={{
//           width: size / 1.5,
//           height: size / 1.5,
//           x: -size / (6 / 3),
//           // y: -size / 6,
//         }}
//         fill={color}
//         viewBox="0 0 512 512"
//         id="icons"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//         <g
//           id="SVGRepo_tracerCarrier"
//           stroke-linecap="round"
//           stroke-linejoin="round"
//         ></g>
//         <g id="SVGRepo_iconCarrier">
//           <path
//             d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,
// 7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"
//           ></path>
//         </g>
//       </svg>
//     </motion.div>
//   );
// };

// export function AiLoader({ size, color }) {
//   return (
//     <div className="relative" style={{ width: size, height: size }}>
//       {/* {[...Array(3)].map((_, index) => (
//         <motion.div
//           key={index}
//           className="absolute"
//           style={{
//             top: "20%",
//             left: "20%",
//           }}
//           // style={{
//           // width: size / 6,
//           // height: size / 6,
//           // backgroundColor: color,
//           // x: -size / 12,
//           // y: -size / 12,
//           // }}
//           animate={{
//             scale: [0, 1, 0],
//             opacity: [0, 1, 0],
//             x: [
//               0,
//               (size / 2) * Math.cos((((index + 1) / 3) * Math.PI) / 3),
//               (index * Math.PI) / 3,
//             ],
//             y: [
//               0,
//               (size / 2) * Math.sin((index * Math.PI) / 3),
//               (index * Math.PI) / 3,
//             ],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: index * 0.2,
//           }}
//         >
//           <svg
//             style={{
//               width: size / 1.5,
//               height: size / 1.5,
//               x: -size / (6 / index),
//               // y: -size / 6,
//             }}
//             fill={color}
//             viewBox="0 0 512 512"
//             id="icons"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//             <g
//               id="SVGRepo_tracerCarrier"
//               stroke-linecap="round"
//               stroke-linejoin="round"
//             ></g>
//             <g id="SVGRepo_iconCarrier">
//               <path d="M88,176a14.67,14.67,0,0,1-13.69-9.4L57.45,122.76a7.28,7.28,0,0,0-4.21-4.21L9.4,101.69a14.67,14.67,0,0,1,0-27.38L53.24,57.45a7.31,7.31,0,0,0,4.21-4.21L74.16,9.79A15,15,0,0,1,86.23.11,14.67,14.67,0,0,1,101.69,9.4l16.86,43.84a7.31,7.31,0,0,0,4.21,4.21L166.6,74.31a14.67,14.67,0,0,1,0,27.38l-43.84,16.86a7.28,7.28,0,0,0-4.21,4.21L101.69,166.6A14.67,14.67,0,0,1,88,176Z"></path>
//             </g>
//           </svg>
//         </motion.div>
//       ))} */}
//       <StarComponent1 size={size} color={color} index={1} />
//       <StarComponent2 size={size} color={color} index={2} />
//       <StarComponent3 size={size} color={color} index={3} />
//     </div>
//   );
// }
