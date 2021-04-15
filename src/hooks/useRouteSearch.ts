import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { urlParse } from 'src/utils';

export default function useRouteSearch() {
  const { search } = useLocation<any>();
  const res = useMemo(() => urlParse(search), [search]);
  return res;
}
