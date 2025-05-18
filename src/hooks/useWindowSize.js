import {useState, useEffect} from 'react'

const useWindowSize = () => {
   
    const [screenSize, setScreenSize] = useState({width : undefined, height: undefined})

    useEffect(() => {
        const readScreenSize = () => {
            setScreenSize({width: window.innerWidth, height: window.innerHeight})
        }

        readScreenSize()
        window.addEventListener('resize', readScreenSize)

        return () => {
            window.removeEventListener('resize', readScreenSize)
        }

    }, [])


  return (
    screenSize
  )
}

export default useWindowSize