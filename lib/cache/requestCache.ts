const cache = new Map<string, { expiresAt: number; data: unknown }>();

export function getCache<T>(key: string): T | null {
  const hit = cache.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expiresAt) {
    cache.delete(key);
    return null;
  }
  return hit.data as T;
}

export function setCache(key: string, data: unknown, ttlMs = 30_000): void {
  cache.set(key, { data, expiresAt: Date.now() + ttlMs });
}
