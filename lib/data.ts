import Walking from "@/components/Blogs/Walking"

import Barney from '@/public/Barney.jpg'


export const topics = [
    "Artificial Intelligence",
    "Engineering",
    "Thoughts",
    "Life",
    "Design",
]
export type CommentType = {
    id: number
    user: string
    image: string
    text: string
    timestamp: string
    parentId?: number | null
    replies?: CommentType[]
    isEditing?: boolean
}

export const initialComments: CommentType[] = [
    {
      id: 1,
      user: "Barney Stinson",
      image: Barney.src,
      text: "This blog is legen...wait for it...DARY! LEGENDARY!",
      timestamp: "15 minutes ago",
      parentId: null,
    },
    {
      id: 2,
      user: "Rick Sanchez",
      image: "https://github.com/shadcn.png",
      text: "That's the way the news goes! Wubba lubba dub dub!",
      timestamp: "45 minutes ago",
      parentId: null,
    },
]

export const blogs = [
    {
        id: "1",
        title: "The Slow Magic of Walking",
        date: "2/3/24",
        categories: ['Life', 'Thoughts'],
        comments: initialComments,
        description: "Three hours. Nine miles. Just me, my shoes, and the sound of my own breath.",
        story: Walking,
        storyText:  
        `
        Three hours. Nine miles. Just me, my shoes, and the sound of my own breath.

There's something quietly radical about taking a long walk. Not a rushed errand-running walk. Not the treadmill kind either. I mean a real walk—no destination, no podcast, no pressure. Just movement.

I didn't plan to walk nine miles. I just kept going. Sidewalks turned into trails, trails turned into open streets, and suddenly I realized I had spent three hours in motion. No urgency, no noise—just time stretching in the best way.

Walking
Walking Unwinds the Mind
About halfway in, something shifted. The swirl of thoughts that usually spin in my head—assignments, to-do lists, what-ifs—began to settle. My thoughts didn't disappear; they just fell into place. It was like walking shook up the mental snow globe, and by mile four, everything was starting to clear.

There's a rhythm to walking that matches the mind's pace. Unlike running, it doesn't demand breath or burn. It invites daydreaming. Observation. Stillness, even while you're moving.

The World Shows Up Differently on Foot
I noticed the small things: the way sunlight landed unevenly on brick walls, the cracks in the sidewalk that looked like maps, the soft sway of trees reacting to the wind. It reminded me that most of life is made of moments we usually miss.

Screens teach us speed. Walking teaches us presence.

We All Need Slowness Sometimes
In a world that's obsessed with productivity, walking might feel inefficient. But what if slowness is its own kind of progress?

After those 9 miles, I didn't just feel exercised—I felt reset. Like my mind had been put through a gentle rinse cycle. No pressure. Just enough movement to shake the dust off my thoughts.

Try It Sometime
No goal. No playlist. Just lace up, step out, and go wherever your feet want to take you.

You might come back with nothing. Or you might return with the thing you didn't know you were looking for: clarity.

 `
    }]