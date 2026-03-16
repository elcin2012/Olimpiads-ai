import { ResultSummary } from '@/components/results/result-summary';

export default function ResultsPage({ params }: { params: { attemptId: string } }) {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Результаты олимпиады</h1>
      <ResultSummary attemptId={params.attemptId} />
    </div>
  );
}
