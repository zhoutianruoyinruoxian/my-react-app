/**
 * @desc 自定义hook，仅限于同步场景
 */

import { useEffect, useRef } from 'react';
import stepGuide from './stepGuide';
import type { Steps, Setting } from './stepGuide';

const defaultOptions = {};
export default function useStepGuide(stepData: Steps, options?: Setting) {
  const StepGuide = useRef(null);

  useEffect(() => {
    StepGuide.current = stepGuide(stepData, Object.assign({}, defaultOptions, options));
    return StepGuide.current.exit;
  }, [stepData, options]);

  return StepGuide.current;
}
