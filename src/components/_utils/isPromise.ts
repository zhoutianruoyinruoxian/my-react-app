export default function isPromise(obj: any) {
  return !!obj  // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
    && (typeof obj === 'object' || typeof obj === 'function') // 初始promise 或 promise.then返回的
    && typeof obj.then === 'function';
}
