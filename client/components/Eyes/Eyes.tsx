// import { useState } from 'react'

// import useMightyMouse from 'react-hook-mighty-mouse'

// import './Eyes.css'

import { useState, useEffect } from 'react'
import './Eyes.css'

export default function Eyes() {
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      const boundingRect = e.target.getBoundingClientRect()
      const eyeCenterX = boundingRect.left + boundingRect.width / 2
      const eyeCenterY = boundingRect.top + boundingRect.height / 2
      const deltaX = e.clientX - eyeCenterX
      const deltaY = e.clientY - eyeCenterY
      const angle = Math.atan2(deltaY, deltaX)

      // Limit the movement of the pupil to the bounds of the eye
      const maxRadius = Math.min(boundingRect.width, boundingRect.height) / 3
      const distance = Math.min(
        Math.sqrt(deltaX * deltaX + deltaY * deltaY),
        maxRadius,
      )
      const newX = Math.cos(angle) * distance
      const newY = Math.sin(angle) * distance

      setPupilPosition({ x: newX, y: newY })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="eyes-container">
      <div className="eyelid">
        <div className="eye">
          <div
            className="pupil"
            style={{
              transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            }}
          />
        </div>
      </div>
      <div className="eye">
        <div
          className="pupil"
          style={{
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
          }}
        />
      </div>
    </div>
  )
}
