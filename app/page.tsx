// Page.tsx
'use client'

import { useState } from "react"
import ArticleSection from "@/components/ArticleSection";
import CategoriesSelect from "@/components/CategoriesSelect";
import { blogs, topics } from "@/lib/data";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>(topics);

  // Filtering blogs based on selected categories
  const filteredBlogs = blogs.filter((post) =>
        post.categories.some((cat) => selectedCategories.includes(cat))
      );

  return (
    <div className="w-full space-y-7">
      {/* Topics Section */}
      <section>
        <CategoriesSelect
          selected={selectedCategories}
          setSelected={setSelectedCategories}
        />
      </section>

      {/* All Posts Section */}
      <section>
        <h2 className="text-3xl font-serif mb-2">All posts</h2>
        <div className="space-y-8">
        {filteredBlogs.length === 0 ? (
  <p className="text-muted-foreground italic">No posts match the selected categories.</p>
) : (
  filteredBlogs.map((post, id) => (
    <ArticleSection post={post} key={id} />
  ))
)}

        </div>
      </section>
    </div>
  );
}
