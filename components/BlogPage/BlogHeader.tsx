'use client'

import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Undo2 } from 'lucide-react'
import { motion } from 'framer-motion'

type Props = {
  blog: {
    title: string;
    description: string;
    date: string;
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: 'easeOut'
    }
  }),
};

const BlogHeader = ({ blog }: Props) => {
  return (
    <>
      {/* Back Button */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <Link href='/' className='flex'>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center transition border-0 text-muted-foreground hover:text-foreground cursor-pointer py-1 px-2 rounded-lg"
          >
            <Undo2 className="w-4 h-4" />
            <span className="text-base">All posts</span>
          </Button>
        </Link>
      </motion.div>

      {/* Title & Subtitle */}
      <motion.div
        className="flex justify-between font-serif w-full items-start"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.1}
      >
        <div className="space-y-2 group-hover:translate-x-2 transition-all ease-linear">
          <motion.h3
            className="text-xl font-medium group-hover:underline"
            variants={fadeUp}
            custom={0.2}
          >
            {blog.title}
          </motion.h3>
          <motion.p
            className="text-muted-foreground"
            variants={fadeUp}
            custom={0.3}
          >
            {blog.description}
          </motion.p>
        </div>

        <motion.time
          className="text-sm text-muted-foreground whitespace-nowrap"
          variants={fadeUp}
          custom={0.4}
        >
          {blog.date}
        </motion.time>
      </motion.div>
    </>
  )
}

export default BlogHeader
