"use client"

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

  const renderComments = (commentsToRender: CommentType[]) => {
    return commentsToRender.map((comment) => (
      <div key={comment.id} className="pl-2 py-2">
        <div className="flex gap-3">
          <img
            className="size-9 rounded-md"
            src={comment.image}
            width={32}
            height={32}
            alt={comment.user}
          />
          <div className="flex-1 space-y-1">
            {/* User and timestamp in one line */}
            <div className="flex justify-between text-sm">
              <span className="font-medium text-foreground">{comment.user}</span>
              <span className="text-muted-foreground text-xs">{comment.timestamp}</span>
            </div>

            {/* Editable or static comment text */}
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

            {/* Reply / Edit / Delete Actions */}
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
            {replyingTo === comment.id && (
              <div className="mt-2 ml-4">
                <InputComment
                  onSubmit={(text) => handleAddComment(text, comment.id)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Recursive replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="ml-6 border-l border-muted pl-4 mt-2">
            {renderComments(comment.replies)}
          </div>
        )}
      </div>
    ))
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center px-4 py-1 rounded-full cursor-pointer gap-2 border border-muted-foreground/30"
          aria-label="Open comments"
        >
          <MessageSquare size={18} aria-hidden="true" />
          {comments.length}
        </button>
      </PopoverTrigger>
      <PopoverContent className="md:w-[500px] ml-4 w-[90vw] h-[600px] p-2 flex flex-col">
        <div className="px-2 w-full flex flex-row justify-between items-center">
          <p className="text-sm font-semibold" >
            Comments
          </p>
          <Badge variant={'outline'} className="text-xs" >
          {comments.length}
          </Badge>
        </div>
        <div className="bg-border h-px my-2" />

        {/* Scrollable comment area */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {renderComments(buildThread(comments))}
        </div>

        <div className="bg-border h-px my-2" />

        {/* Fixed input at the bottom */}
        <div className="px-2 pt-2">
          <InputComment onSubmit={(text) => handleAddComment(text)} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
