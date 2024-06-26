import { useEffect, useState } from 'react'
import { random } from './helperFunctions'

function ColorCaptchaImage(props) {
  const { info } = props
  const [selected, setSelected] = useState(false)
  const newGrid = props.toChild

  // handles reset behaviour after submission
  const { startAgain, stop } = props
  useEffect(() => {
    if (startAgain) {
      setSelected(false)
      stop(false)
    }
  }, [startAgain, stop])

  function handleClick() {
    setSelected(!selected)
    newGrid.splice(info.index, 1, !selected)
    props.toParent(newGrid)
  }

  return (
    <div className="color-cap-item">
      <button
        key={info.index}
        onClick={handleClick}
        className={selected ? 'color-cap-blue' : 'color-cap-blank'}
        data-testid="captchaBtn"
      >
        <img
          src={info.image}
          alt={info.image}
        />
      </button>
    </div>
  )
}

export default ColorCaptchaImage
