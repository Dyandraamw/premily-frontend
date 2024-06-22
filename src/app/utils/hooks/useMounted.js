import { useEffect, useRef, useState } from "react"

export default function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}