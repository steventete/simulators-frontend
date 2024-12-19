export const fetchData = async <T>(endpoint: string): Promise<T> => {
  const res = await fetch(`http://localhost:3000/api/${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}`);
  }
  return res.json();
};
