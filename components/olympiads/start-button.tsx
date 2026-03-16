'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function StartOlympiadButton({ olympiadId }: { olympiadId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function start() {
    setLoading(true);
    const response = await fetch('/api/attempt/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ olympiadId, studentId: 'student-demo' })
    });

    const payload = await response.json();
    router.push(`/attempt/${payload.attemptId}`);
  }

  return (
    <Button onClick={start} disabled={loading}>
      {loading ? 'Запуск...' : 'Старт олимпиады'}
    </Button>
  );
}
