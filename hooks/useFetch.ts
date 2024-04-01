import { useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
