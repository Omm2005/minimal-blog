'use client'

import { useState } from "react"
import ArticleSection from "@/components/ArticleSection";
import CategoriesSelect from "@/components/CategoriesSelect";
import { blogs, topics } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";
import lightEmptyState from '@/public/lightEmptyState.png'
import darkEmptyState from '@/public/darkEmptyState.png'
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(topics);
  const { theme, systemTheme } = useTheme();
  const actualTheme = theme === "system" ? systemTheme : theme;
  const image = actualTheme === 'dark' ? darkEmptyState : lightEmptyState;

  const filteredBlogs = blogs.filter((post) =>
    post.categories.some((cat) => selectedCategories.includes(cat))
  );

  return (
    <div className="w-full space-y-7">
      {/* Topics Section */}
      <section className="w-full flex justify-center items-start flex-col">
        <motion.h2
          className="text-2xl font-serif mb-3"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          Categories{' '}
          <motion.span
            className="text-muted-foreground text-xs"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
          >
            (select to filter)
          </motion.span>
        </motion.h2>

        <motion.p
          className={cn('text-sm text-muted-foreground mb-2')}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.2}
        >
          {selectedCategories.length === topics.length && 'Bruh'}
          {selectedCategories.length === 0 && 'All categories selected'}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0.3}
        >
          <CategoriesSelect
            selected={selectedCategories}
            setSelected={setSelectedCategories}
          />
        </motion.div>
      </section>

      {/* All Posts Section */}
      <section>
        <motion.h2
          className="text-3xl font-serif mb-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.4}
        >
          All posts
        </motion.h2>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {filteredBlogs.length === 0 ? (
              <motion.div
                key="empty"
                className="w-full h-full justify-center items-center flex flex-col"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={image}
                  width={image.width}
                  height={image.height}
                  alt="Empty State"
                />
                <p className="text-muted-foreground italic">Working on it.</p>
              </motion.div>
            ) : (
              <motion.div
                key="posts"
                className="space-y-8 w-full"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.15
                    }
                  }
                }}
              >
                {filteredBlogs.map((post, id) => (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                  >
                    <ArticleSection post={post} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
