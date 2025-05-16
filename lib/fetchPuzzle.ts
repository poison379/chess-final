export async function fetchDailyPuzzle() {
  const res = await fetch('https://lichess.org/api/puzzle/daily');

  if (!res.ok) {
    throw new Error('Failed to fetch puzzle');
  }

  const data = await res.json();
  return data;
}
