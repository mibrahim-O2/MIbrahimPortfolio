import { useEffect, useState } from 'react';

// True only on devices with a real hover-capable mouse (used to enable spotlight / tilt effects).
// First render is `false` so server and client markup match.
export default function useFinePointer() {
  const [fine, setFine] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  return fine;
}
