"use client"

import * as React from "react"
import Link from "next/link"
import {
  GhostIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import {
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { blogs } from "@/lib/data"
import CategoriesSelect from "@/components/CategoriesSelect"

type Props = {
  open: boolean
  setOpen: (value: boolean) => void
}

export default function SearchBarDialog({ open, setOpen }: Props) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])

  const trimmedSearchTerm = searchTerm.trim().toLowerCase()

  const filteredBlogs = React.useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.some((cat) => blog.categories.includes(cat))
      const matchesSearch =
        !trimmedSearchTerm ||
        blog.title.toLowerCase().includes(trimmedSearchTerm) ||
        blog.description.toLowerCase().includes(trimmedSearchTerm) ||
        blog.storyText?.toLowerCase().includes(trimmedSearchTerm) ||
        blog.comments?.some((c) => c.text.toLowerCase().includes(trimmedSearchTerm))
      return matchesCategory && matchesSearch
    })
  }, [searchTerm, selectedCategories])

  const highlight = (text: string, term: string) => {
    if (!term) return text
    const parts = text.split(new RegExp(`(${term})`, "gi"))
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <mark key={index} className="bg-yellow-300 px-1 rounded">{part}</mark>
      ) : (
        part
      )
    )
  }

  const extractSentenceContaining = (text: string, keyword: string) => {
    const sentences = text.split(/(?<=[.!?])\s+/)
    return sentences.find((s) => s.toLowerCase().includes(keyword)) || ""
  }

  const handleClose = () => {
    setOpen(false)
    setSearchTerm("")
    setSelectedCategories([])
  }

  return (
    <CommandDialog open={open} onOpenChange={handleClose}>
      <div className="px-4 pt-4 pb-2 space-y-4">
        <CategoriesSelect
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
        <CommandInput
          value={searchTerm}
          onValueChange={setSearchTerm}
          placeholder="Search blogs..."
        />
      </div>

      <CommandList className="px-2 pb-4">
        <AnimatePresence mode="wait">
          {filteredBlogs.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center justify-center text-center text-muted-foreground py-12 space-y-4"
            >
              <GhostIcon className="h-10 w-10 animate-bounce" />
              <p className="text-base font-medium">No blogs found</p>
              <p className="text-sm text-muted-foreground">Try different keywords or categories</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {filteredBlogs.map((blog) => {
                const snippet =
                  trimmedSearchTerm && blog.storyText
                    ? extractSentenceContaining(blog.storyText, trimmedSearchTerm)
                    : ""
                return (
                  <Link key={blog.id} href={`/${blog.id}`} onClick={handleClose}>
                    <CommandItem className="flex flex-col items-start py-3 px-4 gap-1 rounded-md hover:bg-accent/50 transition-colors">
                      <div className="font-semibold text-base">
                        {highlight(blog.title, trimmedSearchTerm)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {highlight(blog.description, trimmedSearchTerm)}
                      </div>
                      {snippet && (
                        <div className="text-sm mt-1 italic text-muted-foreground">
                          {highlight(snippet, trimmedSearchTerm)}
                        </div>
                      )}
                    </CommandItem>
                  </Link>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </CommandList>
    </CommandDialog>
  )
}
