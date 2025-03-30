'use client'

import { CornerDownRight } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  post: {
    id: string;
    title: string
    description: string
    date: string;
    story: Function;
    categories: string[]
  }
}

const iconVariants = {
  initial: { opacity: 0, x: -8 },
  hover: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 },
  },
}
const titleVariants = {
  initial: { x: 0 },
  hover: {
    x: 8,
    transition: { duration: 0.3, ease: 'linear' },
  },
}

function ArticleSection({ post }: Props) {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY })
    }

    if (isHovered) {
      window.addEventListener('mousemove', move)
    } else {
      window.removeEventListener('mousemove', move)
    }

    return () => window.removeEventListener('mousemove', move)
  }, [isHovered])

  return (
    <>
      <motion.article
        className="group relative flex flex-row gap-4 w-full border-b border-muted items-center cursor-none"
        initial="initial"
        animate={isHovered ? 'hover' : 'initial'}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          variants={iconVariants}
          className="text-foreground hidden group-hover:block"
        >
          <CornerDownRight />
        </motion.div>

        <Link
          href={`/${post.id}`}
          className="flex justify-between font-serif w-full items-start gap-4 py-4 cursor-none"
        >
          <motion.div 
          variants={titleVariants}
          className="space-y-2">
            <h3 className="text-xl font-medium group-hover:underline">
              {post.title}
            </h3>
            <p className="text-muted-foreground">{post.description}</p>
          </motion.div>
          <time className="text-sm text-muted-foreground whitespace-nowrap">
            {post.date}
          </time>
        </Link>
      </motion.article>

      {/* Floating 'Read now' cursor tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="readnow"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed pointer-events-none z-50 px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm font-medium shadow-lg"
            style={{
              top: cursorPos.y - 12,
              left: cursorPos.x - 40,
            }}
          >
            Read now
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ArticleSection
