const useMouseMove = (cb) => {
  const mouseMove = (e) => {
    if (cb.mouseMove) cb.mouseMove(e)
  }

  const mouseUp = (e) => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseup', mouseUp)
    if (cb.mouseUp) cb.mouseUp(e)

  }

  const mouseDown = (e) => {
    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
    if (cb.mouseDown) cb.mouseDown(e)
  }

  return {
    mouseDown,
    mouseUp,
    mouseMove
  }
}


export default useMouseMove