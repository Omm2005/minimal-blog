import React from 'react'
import { Hash, Undo2 } from 'lucide-react'
import { blogs } from '@/lib/data'
import { Button } from '@/components/ui/button'
import LikeButton from '@/components/BlogPage/LikeButton'
import Link from 'next/link'
import CommentButton from '@/components/BlogPage/CommentButton'
import BlogHeader from '@/components/BlogPage/BlogHeader'
import CategoriesDisplay from '@/components/BlogPage/CategoriesDisplay'

type Props = {
  params: Promise<{
    id: string;
  }>;
}
const Page = async({params}: Props) => {
  const id = (await params).id
  const blog = blogs.find((a) => a.id === id)

  if(!blog) return

  return (
    <div className="w-full h-full text-foreground bg-background space-y-4">
      <div className="max-w-3xl mx-auto space-y-4">

        <BlogHeader blog={blog} />

<CategoriesDisplay categories={blog.categories} />

        <hr className="border-muted" />

        {/* Meta Info */}
        <div className="flex items-center space-x-3 text-sm text-gray-400">
            <LikeButton />
            <CommentButton initialComments={blog.comments} />
        </div>
      </div>
      <blog.story />
    </div>
  )
}

export default Page
