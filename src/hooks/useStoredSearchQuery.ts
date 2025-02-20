import { useState, useCallback } from 'react';

export const useStoredSearchQuery = (): [string, (query: string) => void] => {
  const getStoredQuery = () =>
    typeof window !== 'undefined'
      ? localStorage.getItem('searchTerm') || ''
      : '';

  const [searchQuery, setSearchQuery] = useState<string>(getStoredQuery);

  const updateSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
    localStorage.setItem('searchTerm', query);
  }, []);

  return [searchQuery, updateSearchQuery];
};
