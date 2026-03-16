export function fakeEmbedding(text: string, dim = 8): number[] {
  const arr = new Array(dim).fill(0);
  for (let i = 0; i < text.length; i += 1) {
    arr[i % dim] += text.charCodeAt(i) / 255;
  }
  return arr.map((v) => Number(v.toFixed(6)));
}
