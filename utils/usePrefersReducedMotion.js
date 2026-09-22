import { useEffect, useState } from 'react';

// Live `prefers-reduced-motion: reduce` flag. The first render is always `false`, so server and
// client markup match; the real value is applied right after mount and follows later changes.
export default function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return reduce;
}
