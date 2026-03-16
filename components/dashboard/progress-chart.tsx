export function ProgressChart({ data }: { data: Array<{ week: string; score: number }> }) {
  return (
    <div className="space-y-2">
      {data.map((point) => (
        <div key={point.week} className="space-y-1">
          <div className="flex justify-between text-xs text-slate-500">
            <span>{point.week}</span>
            <span>{point.score}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${point.score}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
