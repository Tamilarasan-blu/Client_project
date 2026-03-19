import { useState, useMemo } from 'react';

export function useFilter(data) {
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => {
    return data.filter(item =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return String(item[key]).toLowerCase().includes(String(value).toLowerCase());
      })
    );
  }, [data, filters]);

  const setFilter = (key, value) => {
    if (key === 'clear') {
      setFilters({});
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return { filters, setFilter, filtered };
}
