
import React, { useEffect, useState } from 'react';
import type { FC, ReactNode} from 'react';
import { getAutoPosition, getPosition, getDomPosition } from './position';
import type { Position } from './position';

export interface Options {
  prefixCls?: string;
  doneLabel?: ReactNode;
  nextLabel?: ReactNode;
  showNext?: boolean;
  skipLabel?: ReactNode;
  showSkip?: boolean;
  mask?: boolean;
}

export interface Step {
  element: string;
  title: string;
  content: ReactNode;
  placement: string;
}
interface StepGuideReactComponentProps {
  forceUpdate: any;
  options: Options;
  currentData: Step;
  currentStep: number;
  stepLength: number;
  onNext: any;
  onSkip: any;
  tarPosition: Position;
}

const StepGuideReactComponent: FC<StepGuideReactComponentProps> = ({
  forceUpdate,
  options,
  currentData,
  currentStep,
  stepLength,
  onNext,
  onSkip,
  tarPosition, // 目标位置
}) => {
  const { width, height, left, top } = tarPosition;
  const { prefixCls, mask, doneLabel, nextLabel, showNext, skipLabel, showSkip } = options;
  const { placement: oldPlacement = 'rightTop' } = currentData;
  const [placement, setPlacement] = useState('');
  const [style, setStyle] = useState({ arrow: {}, content: {} });

  useEffect(() => {
    getContentPosition();
  }, [currentData, forceUpdate]);

  const getContentPosition = () => {
    const stepContent = document.querySelector(`.${options.prefixCls}-content`);
    const contentPosition = getDomPosition(stepContent);
    const autoPlacement = getAutoPosition(oldPlacement, tarPosition, contentPosition);
    setPlacement(autoPlacement);
    const res = getPosition(autoPlacement, tarPosition, contentPosition, 8.5);
    setStyle(res);
  };

  return (
    <>
      {mask && <div className={`${prefixCls}-mask`} />}
      <div
        className={prefixCls}
      >
        <div className={`${prefixCls}-target`} style={{ width, height, left, top }} />
        <div className={`${prefixCls}-content ${prefixCls}-placement-${placement}`}
          style={{
            opacity: JSON.stringify(style.content) !== '{}' ? 1 : 0,
            ...style.content,
          }}
        >
          <div className={`${prefixCls}-arrow`} style={style.arrow} />
          <div className={`${prefixCls}-inner`}>
            <div className={`${prefixCls}-header`}>
              {currentData.title}
            </div>
            <div className={`${prefixCls}-body`}>
              {currentData.content}
            </div>
            <div className={`${prefixCls}-footer`}>
              {showSkip &&
                <span
                  className={`${prefixCls}-footer-skip`}
                  onClick={onSkip}
                >{skipLabel}</span>
              }
              {stepLength > 1 &&
                <span className={`${prefixCls}-footer-total`}>({currentStep + 1}/{stepLength})</span>
              }
              {showNext &&
                <span
                  className={`${prefixCls}-footer-next`}
                  onClick={onNext}
                >{currentStep === stepLength - 1 ? doneLabel : nextLabel}</span>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepGuideReactComponent;
