// Walking.tsx
'use client'

import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { motion } from 'framer-motion'
import WalkingBlog from '@/public/walkingBlog.webp'

type Props = {}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

const Walking = (props: Props) => {
  const [loaded, setLoaded] = React.useState(false)
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
    >
      <Card className="bg-background text-foreground shadow-xl transition-shadow duration-300 hover:shadow-2xl">
        <CardContent className="space-y-6">
          <p className="text-lg font-medium italic">
            “Three hours. Nine miles. Just me, my shoes, and the sound of my own breath.”
          </p>

          <p>
            There&apos;s something quietly radical about taking a long walk. Not a rushed errand-running
            walk. Not the treadmill kind either. I mean a real walk—no destination, no podcast, no
            pressure. Just movement.
          </p>

          <p>
            I didn&apos;t plan to walk nine miles. I just kept going. Sidewalks turned into trails, trails
            turned into open streets, and suddenly I realized I had spent three hours in motion. No
            urgency, no noise—just time stretching in the best way.
          </p>

          <hr className="border border-muted" />
          <div className="relative w-full aspect-[5/1]">
          <Image
            src={WalkingBlog}
            alt="Walking"
  onLoad={() => setLoaded(true)}
  data-loaded={loaded}
            blurDataURL={WalkingBlog.blurDataURL}

    placeholder="blur"
    width={1000}
    height={200}
            className="rounded-xl object-cover transition-opacity duration-700 opacity-0 data-[loaded=true]:opacity-100"
          />
          </div>

          <motion.h2 whileHover={{ scale: 1.02 }} className="text-xl font-semibold pt-4 transition-colors hover:text-primary">
            🚶 Walking Unwinds the Mind
          </motion.h2>

          <blockquote className="border-l-4 border-muted pl-4 italic text-foreground hover:italic hover:scale-[1.01] transition-all">
            "It was like walking shook up the mental snow globe, and by mile four, everything was starting to clear."
          </blockquote>

          <p>
            About halfway in, something shifted. The swirl of thoughts that usually spin in my
            head—assignments, to-do lists, what-ifs—began to settle. My thoughts didn&apos;t disappear;
            they just fell into place.
          </p>

          <ul className="list-disc list-inside space-y-1 text-foreground">
            {[
              `Walking has a rhythm that matches the mind's pace.`,
              'It invites daydreaming, observation, and calm awareness.',
              `Stillness, even while you're moving.`,
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02, x: 4 }}
                className="transition-transform duration-200"
              >
                {item}
              </motion.li>
            ))}
          </ul>

          <hr className="border border-muted" />

          <motion.h2 whileHover={{ scale: 1.02 }} className="text-xl font-semibold pt-4 transition-colors hover:text-primary">
            🌍 The World Shows Up Differently on Foot
          </motion.h2>

          <p>
            I noticed the small things: the way sunlight landed unevenly on brick walls, the cracks
            in the sidewalk that looked like maps, the soft sway of trees reacting to the wind. It
            reminded me that most of life is made of moments we usually miss.
          </p>

          <blockquote className="italic border-l-4 border-muted pl-4 text-foreground transition-colors hover:text-primary">
            “Screens teach us speed. Walking teaches us presence.”
          </blockquote>

          <hr className="border border-muted" />

          <motion.h2 whileHover={{ scale: 1.02 }} className="text-xl font-semibold pt-4 transition-colors hover:text-primary">
            🕊️ We All Need Slowness Sometimes
          </motion.h2>

          <p>
            In a world that&apos;s obsessed with productivity, walking might feel inefficient. But what
            if slowness is its own kind of progress?
          </p>

          <p>
            After those 9 miles, I didn&apos;t just feel exercised—I felt <em>reset</em>. Like my mind had
            been put through a gentle rinse cycle. No pressure. Just enough movement to shake the
            dust off my thoughts.
          </p>

          <ul className="list-disc list-inside space-y-1 text-foreground">
            {[
              'No speed. No metrics.',
              'Just the rhythm of your own steps.',
              'And the return to stillness within.',
            ].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ scale: 1.02, x: 4 }}
                className="transition-transform duration-200"
              >
                {item}
              </motion.li>
            ))}
          </ul>

          <hr className="border border-muted" />

          <motion.h2 whileHover={{ scale: 1.02 }} className="text-xl font-semibold pt-4 transition-colors hover:text-primary">
            ✨ Try It Sometime
          </motion.h2>

          <p className="italic">
            No goal. No playlist. Just lace up, step out, and go wherever your feet want to take you.
          </p>

          <blockquote className="border-l-4 border-green-500 dark:border-green-700 pl-4 text-green-600 dark:text-green-400 italic transition-all hover:scale-[1.01]">
            “You might come back with nothing. Or you might return with the thing you didn&apos;t know you were looking for: clarity.”
          </blockquote>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default Walking
