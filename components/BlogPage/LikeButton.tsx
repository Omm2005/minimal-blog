'use client'

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { NumberTicker } from "./number-ticker";

export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(199);
  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    toggleLike();
    if (!liked) {
      try {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
      await confetti({
        origin: {
          x: x / window.innerWidth,
          y: y / window.innerHeight,
        },
      });
    } catch (error) {
      console.error("Confetti button error:", error);
    }
}
  };
  const toggleLike = () => {
    setLiked(!liked);
    setCount((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`flex items-center px-3 py-1 rounded-full transition-colors cursor-pointer gap-2 ${
        liked ? "bg-red-100 dark:bg-red-950 text-red-400" : "text-foreground"
      }`}
      whileTap={{ scale: 0.9 }}
    >
      <Heart
        size={18}
        fill={liked ? "currentColor" : "transparent"}
        className="transition-colors"
      />
      <NumberTicker
      className="text-sm text-foreground"
      value={count}
      />
    </motion.button>
  );
}
