import React from 'react'
import { Hash, Undo2 } from 'lucide-react'
import { blogs } from '@/lib/data'
import { Button } from '@/components/ui/button'
import LikeButton from '@/components/BlogPage/LikeButton'
import Link from 'next/link'
import CommentButton from '@/components/BlogPage/CommentButton'

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
        {/* Back Button */}
        <Link href={'/'} className='flex'> 
        <Button 
        variant={'outline'} 
        size={'sm'}
        className="flex items-center transition border-0 text-muted-foreground hover:text-foreground cursor-pointer py-1 px-2 rounded-lg"
        >
          <Undo2 className="w-4 h-4" />
          <span className="text-base">All posts</span>
        </Button>
          </Link>

        {/* Title & Subtitle */}
        <div className='flex justify-between font-serif w-full items-start'>
        <div 
          className="space-y-2 group-hover:translate-x-2 transition-all ease-linear">
            <h3 className="text-xl font-medium group-hover:underline">
              {blog.title}
            </h3>
            <p className="text-muted-foreground">{blog.description}</p>
          </div>
          <time className="text-sm text-muted-foreground whitespace-nowrap">
            {blog.date}
          </time>
        </div>
        <div className='flex flex-row gap-2' >
        {
            blog.categories.map((category, id) => (
                <Button
                variant={'outline'} 
                key={id}
                size={'sm'}
                className="flex items-center transition text-muted-foreground hover:text-muted-foreground py-1 px-1 rounded-lg"
                >
          <Hash className="w-4 h-4" />
          <span className="text-base">
            {category}
          </span>
        </Button>
        ))
    }
    </div>

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
