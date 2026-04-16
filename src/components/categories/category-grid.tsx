import type { Category } from "@/types/category"
import CategoryCard from "@/components/categories/category-card"

interface CategoryGridProps {
  categories: Category[]
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  if (categories.length === 0) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/5 p-10 text-center">
        <p className="text-lg font-medium text-slate-900 dark:text-white">No categories found.</p>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Add book categories in Sanity and they will appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.slug} category={category} />
      ))}
    </div>
  )
}