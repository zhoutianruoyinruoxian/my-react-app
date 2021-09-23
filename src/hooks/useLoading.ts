import { useState, useRef } from 'react';

export default function useLoading({ initialLoading = false, delay = 300 } = {}) {
  const loadId = useRef(null);
  const [loading, setLoading] = useState(initialLoading);

  const spining = (state: boolean) => {
    clearTimeout(loadId.current);
    if (state) {
      loadId.current = setTimeout(() => {
        setLoading(true);
      }, delay);
    } else {
      setLoading(false);
    }
  };

  return [loading, spining];
}


