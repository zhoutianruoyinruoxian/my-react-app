export default function parseUrl(url: string): object {
  const search = url.split('?')[1];
  if (!search) return {};
  const paramsList = search.split('&');
  const obj: { [props: string]: string } = {};
  paramsList.forEach(o => {
    const [paramName, paramsValue] = o.split('=');
    obj[paramName] = paramsValue;
  });
  return obj;
}
