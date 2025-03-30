'use client'

import React from 'react'
import { Button } from '../ui/button'
import { Hash } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  categories: string[]
}

const fadeStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

const itemFadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}

const CategoriesDisplay = ({ categories }: Props) => {
  return (
    <motion.div
      className="flex flex-row gap-2"
      variants={fadeStagger}
      initial="hidden"
      animate="visible"
    >
      {categories.map((category, id) => (
        <motion.div key={id} variants={itemFadeUp}>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center transition text-muted-foreground hover:text-muted-foreground py-1 px-1 rounded-lg pr-2"
          >
            <Hash className="w-4 h-4" />
            <span className="text-base">{category}</span>
          </Button>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default CategoriesDisplay
