import { useEffect } from "react"

export const useComponentMount = (run: () => void) => {
    useEffect(() => {
        run()
    }, [])
}