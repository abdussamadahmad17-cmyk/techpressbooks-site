export default function BookCardSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5">
      <div className="aspect-[3/4] bg-slate-800" />
      <div className="space-y-4 p-6">
        <div className="h-3 w-24 rounded bg-slate-700" />
        <div className="h-6 w-3/4 rounded bg-slate-700" />
        <div className="h-4 w-1/2 rounded bg-slate-800" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-slate-800" />
          <div className="h-4 w-5/6 rounded bg-slate-800" />
          <div className="h-4 w-2/3 rounded bg-slate-800" />
        </div>
        <div className="flex gap-2">
          <div className="h-7 w-16 rounded-full bg-slate-800" />
          <div className="h-7 w-20 rounded-full bg-slate-800" />
          <div className="h-7 w-14 rounded-full bg-slate-800" />
        </div>
      </div>
    </div>
  )
}