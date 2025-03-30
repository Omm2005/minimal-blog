'use client'

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import InputComment from "./InputComment"
import { Badge } from "../ui/badge"
import { CommentType } from "@/lib/data"
import { motion, AnimatePresence } from "framer-motion"

export default function CommentButton({
  initialComments
}: {
  initialComments: CommentType[]
}) {
  const [comments, setComments] = useState<CommentType[]>(initialComments)
  const [replyingTo, setReplyingTo] = useState<number | null>(null)

  const buildThread = (
    flatComments: CommentType[],
    parentId: number | null = null
  ): CommentType[] => {
    return flatComments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => ({
        ...comment,
        replies: buildThread(flatComments, comment.id),
      }))
  }

  const handleAddComment = (text: string, parentId: number | null = null) => {
    const newComment: CommentType = {
      id: Date.now(),
      user: "Cook Pu",
      image: "https://github.com/Omm2005.png",
      text,
      timestamp: "Just now",
      parentId,
    }

    setComments((prev) => [...prev, newComment])
    setReplyingTo(null)
  }

  const handleEditToggle = (id: number) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, isEditing: !comment.isEditing }
          : comment
      )
    )
  }

  const handleSaveEdit = (id: number, newText: string) => {
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id
          ? { ...comment, text: newText, isEditing: false }
          : comment
      )
    )
  }

  const handleDeleteComment = (id: number) => {
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  const commentVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0 },
  }

  const renderComments = (commentsToRender: CommentType[]) => {
    return commentsToRender.map((comment) => (
      <motion.div
        key={comment.id}
        className="pl-2 py-2"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={commentVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex gap-3">
          <img
            className="size-9 rounded-md"
            src={comment.image}
            width={32}
            height={32}
            alt={comment.user}
          />
          <div className="flex-1 space-y-1">
            {/* User and timestamp */}
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{comment.user}</span>
              <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
            </div>

            {/* Editable or static comment */}
            {comment.isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={comment.text}
                  onChange={(e) =>
                    setComments((prev) =>
                      prev.map((c) =>
                        c.id === comment.id ? { ...c, text: e.target.value } : c
                      )
                    )
                  }
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSaveEdit(comment.id, comment.text)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditToggle(comment.id)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-foreground/80 text-sm">{comment.text}</div>
            )}

            {/* Actions */}
            <div className="flex gap-2 mt-1">
              <button
                className="text-xs text-blue-500 hover:underline"
                onClick={() => setReplyingTo(comment.id)}
              >
                Reply
              </button>
              {comment.user === "Cook Pu" && (
                <>
                  <button
                    className="text-xs text-orange-500 hover:underline"
                    onClick={() => handleEditToggle(comment.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-xs text-red-500 hover:underline"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </div>

            {/* Reply box */}
            <AnimatePresence>
              {replyingTo === comment.id && (
                <motion.div
                  className="mt-2 ml-4"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <InputComment
                    onSubmit={(text) => handleAddComment(text, comment.id)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Recursive replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 border-l border-muted pl-4 mt-2">
            {renderComments(comment.replies)}
          </div>
        )}
      </motion.div>
    ))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <motion.button
          className="flex items-center px-4 py-1 text-foreground rounded-full cursor-pointer gap-2 border border-muted-foreground/80"
          aria-label="Open comments"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MessageSquare size={18} aria-hidden="true" className="text-foreground" />
          {comments.length}
        </motion.button>
      </PopoverTrigger>

      <PopoverContent
        className="md:w-[500px] ml-4 w-[90vw] h-[600px] p-2 flex flex-col"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
          className="w-full h-full flex flex-col"
        >
          <div className="px-2 w-full flex flex-row justify-between items-center">
            <p className="text-sm font-semibold">Comments</p>
            <Badge variant="outline" className="text-xs">
              {comments.length}
            </Badge>
          </div>

          <div className="bg-border h-px my-2" />

          {/* Scrollable comment area */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            <AnimatePresence mode="wait">
              {renderComments(buildThread(comments))}
            </AnimatePresence>
          </div>

          <div className="bg-border h-px my-2" />

          {/* Fixed input at bottom */}
          <div className="px-2 pt-2">
            <InputComment onSubmit={(text) => handleAddComment(text)} />
          </div>
        </motion.div>
      </PopoverContent>
    </Popover>
  )
}
