import { useEffect, useRef } from 'react';
import type { EffectCallback } from 'react';


const useUpdateEffect = (effect: EffectCallback, deps: any[]) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};

export default useUpdateEffect;
