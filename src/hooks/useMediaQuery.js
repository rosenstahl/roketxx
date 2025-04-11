import { useState, useEffect } from 'react';

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    window.matchMedia(query).addEventListener('change', listener);

    return () => window.matchMedia(query).removeEventListener('change', listener);
  }, [query, matches]);

  return matches;
};