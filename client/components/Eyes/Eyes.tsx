// import { useState, useEffect } from 'react'
// import './Eyes.css'

// export default function Eyes() {
//   const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 })
//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       const boundingRect = e.target.getBoundingClientRect()
//       const eyeCenterX = boundingRect.left + boundingRect.width / 2
//       const eyeCenterY = boundingRect.top + boundingRect.height / 2
//       const deltaX = e.clientX - eyeCenterX
//       const deltaY = e.clientY - eyeCenterY

//       const maxRadius = Math.min(boundingRect.width, boundingRect.height) / 3
//       const distance = Math.min(
//         Math.sqrt(deltaX * deltaX + deltaY * deltaY),
//         maxRadius,
//       )
//       const angle = Math.atan2(deltaY, deltaX)

//       const newX = Math.cos(angle) * distance
//       const newY = Math.sin(angle) * distance
//       setPupilPosition({ x: newX, y: newY })
//     }
//     document.addEventListener('mousemove', handleMouseMove)
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove)
//     }
//   }, [])
//   return (
//     <div className="eyes-container">
//       <div className="eye">
//         <div
//           className="pupil"
//           style={{
//             transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
//           }}
//         />
//       </div>
//       <div className="eye">
//         <div
//           className="pupil"
//           style={{
//             transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
//           }}
//         />
//       </div>
//     </div>
//   )
// }

import useMightyMouse from 'react-hook-mighty-mouse'
import './Eyes.css'

const Eyes = () => {
  const {
    selectedElement: {
      position: { angle: angleLeftEye },
    },
  } = useMightyMouse(true, 'left-eye', { x: 20, y: 20 })
  const {
    selectedElement: {
      position: { angle: angleRightEye },
    },
  } = useMightyMouse(true, 'right-eye', { x: 20, y: 20 })

  const rotateLeftEye = `rotate(${-angleLeftEye}deg)`
  const rotateRightEye = `rotate(${-angleRightEye}deg)`

  return (
    <div className="eyes-follow">
      <div className="eyes">
        <div id="left-eye" className="eye" style={{ transform: rotateLeftEye }}>
          <div className="pupil" />
        </div>
        <div
          id="right-eye"
          className="eye"
          style={{ transform: rotateRightEye }}
        >
          <div className="pupil" />
        </div>
      </div>
    </div>
  )
}

export default Eyes
