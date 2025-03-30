"use client"

import * as React from "react"
import Link from "next/link"
import {
  SearchIcon,
  XIcon
} from "lucide-react"

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

import { useIsMobile } from "@/hooks/use-mobile"
import { blogs } from "@/lib/data"
import CategoriesSelect from "@/components/CategoriesSelect"

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019\u201A\u201B\u2032\u2035]/g, "'") // normalize curly apostrophes
    .replace(/[\u201C\u201D\u201E\u201F\u2033\u2036]/g, '"') // normalize curly quotes
    .replace(/\s+/g, ' ') // remove extra spaces
    .trim()
}


export default function SearchBar() {
  const [open, setOpen] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
  const [results, setResults] = React.useState<typeof blogs>([])
  const isMobile = useIsMobile()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  React.useEffect(() => {
    const trimmedTerm = searchTerm.trim()
    searchBlogs(trimmedTerm, selectedCategories)
  }, [searchTerm, selectedCategories])
  
  

  function extractSentenceContaining(text: string, keyword: string) {
    const sentences = text.split(/(?<=[.!?])\s+/)
    return sentences.find(sentence => sentence.toLowerCase().includes(keyword.toLowerCase())) || ""
  }

  function searchBlogs(keyword: string, categories: string[]) {
    const normalizedKeyword = normalizeText(keyword)
  
    setTimeout(() => {
      const filtered = blogs.filter((blog) => {
        const inCategory =
          categories.length === 0 || categories.some((cat) => blog.categories.includes(cat))
  
        const searchableText = [
          blog.title,
          blog.description,
          typeof blog.storyText === 'string' ? blog.storyText : '',
          ...(blog.comments?.map((c) => c.text) || []),
        ].join(' ')
  
        const normalizedText = normalizeText(searchableText)
  
        return inCategory && normalizedText.includes(normalizedKeyword)
      })
  
      setResults(filtered) // only update once we know the right value
    }, 0)
  }
  

  function highlight(text: string, term: string) {
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


  const trimmedSearchTerm = searchTerm.trim()

  return (
    <>
      <button
        className="border-input bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 inline-flex h-9 w-fit rounded-md border px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
        onClick={() => setOpen(true)}
      >
        {isMobile ? (
          <SearchIcon className="text-foreground" size={16} aria-hidden="true" />
        ) : (
          <>
            <span className="flex grow items-center">
              <SearchIcon className="text-muted-foreground/80 -ms-1 me-3" size={16} aria-hidden="true" />
              <span className="text-muted-foreground/70 font-normal">Search</span>
            </span>
            <kbd className="bg-background text-muted-foreground/70 ms-12 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              ⌘K
            </kbd>
          </>
        )}
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="p-4 flex flex-col gap-4">
          <CategoriesSelect selected={selectedCategories} setSelected={setSelectedCategories} />

            <CommandInput
              value={searchTerm}
              onValueChange={setSearchTerm}
              placeholder="Search blog content or filter by category..."
            />
        </div>

        <CommandList>
          <CommandEmpty>
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm mb-1">No results found.</p>
              <p className="text-xs">Try another keyword or remove some filters.</p>
            </div>
          </CommandEmpty>

          {results.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blog Results">
                {results.map((blog) => {
                  const snippet = blog.storyText && trimmedSearchTerm
                    ? extractSentenceContaining(blog.storyText, trimmedSearchTerm)
                    : ""
                  return (
                    <Link key={blog.id} href={`/${blog.id}`} passHref onClick={() => setOpen(false)}>
                      <CommandItem className="cursor-pointer flex flex-col items-start gap-1 py-3">
                        <div className="font-semibold">{highlight(blog.title, trimmedSearchTerm)}</div>
                        <div className="text-sm text-muted-foreground">
                          {highlight(blog.description, trimmedSearchTerm)}
                        </div>
                        {snippet && (
                          <div className="text-sm mt-1 text-muted-foreground italic">
                            {highlight(snippet, trimmedSearchTerm)}
                          </div>
                        )}
                      </CommandItem>
                    </Link>
                  )
                })}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
