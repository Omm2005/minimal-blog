"use client"

import { useState, useId } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function InputComment({
  onSubmit,
}: {
  onSubmit: (text: string) => void
}) {
  const id = useId()
  const [text, setText] = useState("")

  const handleSend = () => {
    const trimmed = text.trim()
    if (trimmed.length === 0) return
    onSubmit(trimmed)
    setText("")
  }

  return (
    <div className="*:not-first:mt-2">
      <Textarea
        id={id}
        placeholder="Leave a comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button variant="outline" className="w-full" onClick={handleSend}>
        Send
      </Button>
    </div>
  )
}
