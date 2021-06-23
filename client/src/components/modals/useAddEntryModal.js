import { useState } from 'react'

const useAddEntryModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  function toggle() {
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    toggle,
  }
}

export default useAddEntryModal