import { useState, useMemo } from 'react';

export function useSearch(data, searchFields) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter(item =>
      searchFields.some(field => {
        const val = item[field];
        return val && String(val).toLowerCase().includes(q);
      })
    );
  }, [data, query, searchFields]);

  return { query, setQuery, filtered };
}
