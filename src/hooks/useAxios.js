import axios from 'axios'
import { useState, useEffect, useRef } from 'react'

const useAxios = (url) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const runOnce = useRef(false)

    useEffect(() => {
        if (runOnce.current === false) {
            const fetchData = async () => {
                setLoading(true)
                try {
                    const res = await axios.get(url)
                    setData(res.data)
                } catch (err) {
                    setError(err)
                } finally {
                    setLoading(false)
                }
            }
    
            fetchData()

        }

        return () => {
            runOnce.current = true
          }
        
    }, [url])

    const refetch = async () => {
        setLoading(true)
        try {
            const res = await axios.get(url)
            setData(res.data)
        } catch (err) {
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    return { data, loading, error, refetch }

}

export default useAxios