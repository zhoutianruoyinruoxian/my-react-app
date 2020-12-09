import ReactDOM from 'react-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import { getPosition } from './utils';

interface Options {
  prefixCls?: string;
  doneLabel?: string;
  nextLabel?: string;
  showNext?: boolean;
  skipLabel?: string;
  showSkip?: boolean;
}

interface Step {
  element: string;
  title: string;
  content: ReactNode;
  placement: string;
}

type Steps = Step[];

interface Position {
  bottom: number;
  height: number;
  left: number;
  right: number;
  top: number;
  width: number;
  x: number;
  y: number;
}


export default function StepGuide(stepData: Steps, opt?: Options) {
  const options: Options = {
    prefixCls: 'step-guide',
    doneLabel: '确定',
    nextLabel: '下一步',
    showNext: true,
    skipLabel: '跳过',
    showSkip: true,
    ...opt,
  };
  const steps = [...stepData]; // 步骤数据
  const stepLength = stepData.length; // 步骤总条数
  let currentStep = 0; // 当前步骤
  let targetDom = null; // 目标 DOM节点
  let stepGuideDom = null; // stepguide DOM节点

  start();

  function start() {
    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add(`${options.prefixCls}-wrapper`);
    body.appendChild(div);
    stepGuideDom = div;
    window.addEventListener('resize', resize);
    getPosition();
  }

  function exit() {
    const unmountResult = ReactDOM.unmountComponentAtNode(stepGuideDom);
    if (unmountResult && stepGuideDom.parentNode) {
      stepGuideDom.parentNode.removeChild(stepGuideDom);
    }
    if (targetDom) {
      targetDom.classList.remove(`${options.prefixCls}-focused`);
    }
    window.removeEventListener('resize', resize);
  }

  function refresh() {
    getPosition();
  }

  function resize() {
    getPosition();
  }

  function goStep() {
    if (currentStep + 1 < stepLength) {
      currentStep++;
      getPosition();
    } else {
      exit();
    }
  }

  function getPosition() {
    if (targetDom) {
      targetDom.classList.remove(`${options.prefixCls}-focused`);
    }
    const currentData = steps[currentStep];
    targetDom = document.querySelector(currentData.element);
    targetDom.scrollIntoView();
    targetDom.classList.add(`${options.prefixCls}-focused`);
    const position = getDomPosition(targetDom);
    renderStep(currentData, position);

  }

  function renderStep(currentData: Step, position: Position) {
    setTimeout(() => {
      ReactDOM.render(
        <StepGuideReactComponent
          options={options}
          currentData={currentData}
          currentStep={currentStep}
          stepLength={stepLength}
          position={position}
          onNext={goStep}
          onSkip={exit}
        />,
        stepGuideDom);
    });
  }

  return {
    refresh,
    goStep,
    exit,
  };
}

function StepGuideReactComponent({
  options,
  currentData,
  currentStep,
  stepLength,
  onNext,
  onSkip,
  position: tarPosition,
}) {
  const { width, height, left, top } = tarPosition;
  const { prefixCls, doneLabel, nextLabel, showNext, skipLabel, showSkip } = options;
  const placement = currentData.placement || 'rightTop';
  const [style, setStyle] = useState({ arrow: {}, content: {} });

  useEffect(() => {
    getContentPosition();
  }, [currentData]);

  const getContentPosition = () => {
    const stepContent = document.querySelector(`.${options.prefixCls}-content`);
    const contentPosition = getDomPosition(stepContent);
    const res = getPosition(placement, tarPosition, contentPosition, 8.5);
    setStyle(res);
  };

  return (
    <>
      <div className={`${prefixCls}-mask`} />
      <div
        className={prefixCls}
        style={{
          width, height, left, top,
        }}
      >
        <div className={`${prefixCls}-content ${prefixCls}-placement-${placement}`}
          style={style.content}
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
}

function getDomPosition(dom: Element): Position {
  return dom.getBoundingClientRect();
}
