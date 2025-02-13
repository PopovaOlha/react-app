import { useState, useEffect } from 'react';

export const useStoredSearchQuery = (): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    localStorage.setItem('searchTerm', searchQuery);
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};
