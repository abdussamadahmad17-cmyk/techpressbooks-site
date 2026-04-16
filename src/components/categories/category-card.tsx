import Link from "next/link"
import type { Category } from "@/types/category"

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-[2rem] border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {category.title}
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            {category.count} {category.count === 1 ? "book" : "books"}
          </p>
        </div>
        <div className="ml-4 text-2xl opacity-50 group-hover:opacity-100 transition-opacity">
          →
        </div>
      </div>
    </Link>
  )
}