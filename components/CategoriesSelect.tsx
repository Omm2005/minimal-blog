'use client'

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

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export default function CategoriesSelect({ selected, setSelected }: CategoriesSelectProps) {
  const toggleTopic = (topic: string) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  return (
    <motion.div
      className="flex flex-wrap gap-3 overflow-visible"
      layout
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {topics.map((topic) => {
        const isSelected = selected.includes(topic)
        return (
          <motion.button
            key={topic}
            variants={itemVariants}
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
  )
}
