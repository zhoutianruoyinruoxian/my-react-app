---
category: Components
subtitle: 步骤引导
type: 其他
title: StepGuide
order: 18
cols: 1
---

穿梭选择框抽象类

## API

### StepGuide

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| stepData |  步骤数据列表 `stepData` , 参考[配置项](#stepData) | Object | {} |
| setting | 设置参数 `setting` , 参考[配置项](#setting)  | Object | {} |

### stepData

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| element | dom节点的id | string | - |
| title | 标题 | ReactNode | - |
| content | 内容  | ReactNode | - |
| placement | 位置  | string | rightTop |

### setting

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| doneLabel |  done按钮文案 | ReactNode | 确定 |
| nextLabel | next按钮文案  | ReactNode | 下一步 |
| showNext | 是否显示next按钮  | boolean | true |
| prevLabel | prev按钮文案  | ReactNode | 上一步 |
| showPrev | 是否显示prev按钮  | boolean | false |
| skipLabel | skip按钮文案  | ReactNode | 跳过 |
| showSkip | 是否显示skip按钮  | boolean | true |
| mask | 是否显示遮罩 | boolean | true |
| onPrev | onPrev回调函数  | function | - |
| onNext | onNext回调函数  | function | - |
| created | 生命周期，在选中需要引导的element的时候触发  | function | - |
