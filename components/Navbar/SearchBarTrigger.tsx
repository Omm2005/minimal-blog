"use client"

import { useEffect, useState } from "react"
import { SearchIcon } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import SearchBarDialog from "./SearchBarDialog"

export default function SearchBarTrigger() {
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-fit rounded-md border px-3 py-2 text-sm shadow-xs transition outline-none focus-visible:ring-[3px]"
      >
        {isMobile ? (
          <SearchIcon className="text-foreground" size={16} />
        ) : (
          <>
            <span className="flex grow items-center">
              <SearchIcon className="text-muted-foreground/80 -ms-1 me-3" size={16} />
              <span className="text-muted-foreground/70 font-normal">Search</span>
            </span>
            <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 text-[0.625rem] font-medium">
              ⌘K
            </kbd>
          </>
        )}
      </button>

      <SearchBarDialog open={open} setOpen={setOpen} />
    </>
  )
}
