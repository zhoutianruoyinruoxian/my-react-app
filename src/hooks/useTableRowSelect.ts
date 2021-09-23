import { useState, useMemo } from 'react';
import type { TableProps } from 'antd/lib/table';

type RowSelection<T> = TableProps<T>['rowSelection'];
type OnSelect<T> = RowSelection<T>['onSelect'];
type OnSelectAll<T> = RowSelection<T>['onSelectAll'];

interface UseTableSelectRes<T> {
  selectedList: T[];
  rowSelection: RowSelection<T>;
}


export function useTableSelect<T = Record<string, unknown>>(rowKey: string = 'id'): UseTableSelectRes<T> {

  const [selectedList, setSelectedList] = useState<T[]>([]);

  const onSelect: OnSelect<T> = (record, selected) => {
    multipleSelect([record], selected);
  };

  const onSelectAll: OnSelectAll<T> = (selected, _selectedRows, changeRows) => {
    multipleSelect(changeRows, selected);
  };

  const multipleSelect = (selectedItems: T[], selected: boolean) => {
    let newData = [...selectedList];
    if (selected) {
      newData = newData.concat(selectedItems);
    } else {
      newData = newData.filter(item => !~selectedItems.findIndex(o => o[rowKey] === item[rowKey]));
    }
    setSelectedList([...newData]);
  };

  const selectedRowKeys = useMemo(() => selectedList.map(o => o[rowKey]), [selectedList]);

  return {
    selectedList,
    rowSelection: {
      selectedRowKeys,
      onSelect,
      onSelectAll,
    },
  };
}
