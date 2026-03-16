'use client';

type ToastProps = {
  text: string;
};

export function Toast({ text }: ToastProps) {
  if (!text) return null;

  return (
    <div className="fixed bottom-4 right-4 rounded-lg bg-slate-900 px-4 py-2 text-sm text-white shadow-lg">
      {text}
    </div>
  );
}
