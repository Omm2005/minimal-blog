"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check } from 'lucide-react'

const topics = [
  "Artificial Intelligence",
  "Engineering",
  "Thoughts",
  "Life",
  "Design",
]

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

type CategoriesSelectProps = {
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CategoriesSelect({ selected, setSelected }: CategoriesSelectProps) {
  const toggleTopic = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }


  return (
    <div className="w-full flex justify-center items-start flex-col">
      <h2 className="text-2xl font-serif mb-3">Categories {' '} <span className="text-muted-foreground text-xs">(select to filter)</span></h2>
        <motion.div 
          className="flex flex-wrap gap-3 overflow-visible"
          layout
          transition={transitionProps}
        >
          {topics.map((topic) => {
            const isSelected = selected.includes(topic)
            return (
              <motion.button
                key={topic}
                onClick={() => toggleTopic(topic)}
                layout
                initial={false}
                animate={{
                  backgroundColor: isSelected 
                    ? "hsl(var(--primary) / 0.15)" 
                    : "hsl(var(--muted) / 0.1)",
                }}
                whileHover={{
                  backgroundColor: isSelected 
                    ? "hsl(var(--primary) / 0.2)" 
                    : "hsl(var(--muted) / 0.2)",
                }}
                whileTap={{
                  backgroundColor: isSelected 
                    ? "hsl(var(--primary) / 0.25)" 
                    : "hsl(var(--muted) / 0.25)",
                }}
                transition={{
                  ...transitionProps,
                  backgroundColor: { duration: 0.1 },
                }}
                className={`
                  inline-flex items-center px-4 py-2 rounded-full text-base font-medium cursor-pointer
                  whitespace-nowrap overflow-hidden ring-1 ring-inset
                  ${isSelected 
                    ? "text-primary ring-primary/30" 
                    : "text-muted-foreground hover:text-foreground ring-border"}
                  transition-colors
                `}
              >
                <motion.div 
                  className="relative flex items-center"
                  animate={{ 
                    width: isSelected ? "auto" : "100%",
                    paddingRight: isSelected ? "1.5rem" : "0",
                  }}
                  transition={{
                    ease: [0.175, 0.885, 0.32, 1.275],
                    duration: 0.3,
                  }}
                >
                  <span className="text-sm">{topic}</span>
                  <AnimatePresence>
                    {isSelected && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={transitionProps}
                        className="absolute right-0"
                      >
                        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <Check className="w-3 h-3 text-primary-foreground" strokeWidth={1.5} />
                        </div>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>
            )
          })}
        </motion.div>
    </div>
  )
}

