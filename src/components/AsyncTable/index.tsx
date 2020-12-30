import React, { useMemo, useReducer, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Table } from 'antd';

const reducer = (store, action) => ({ ...store, ...action });

function AsyncTableInner({
  columns,
  pagination: propsPagination,
  api,
  params,
  onChange,
  shouldSendRequest, // table请求数据之前的拦截通过返回boolean决定是否请求接口（用于外部控制是否请求参数）
  beforeRequest, // 将table的内部数据（例如分页数据）等转换成后端需要的参数格式,如果返回false也会阻止数据请求
  didRequest, // table请求数据成功之后的回调，用户可以通过该方法获取到接口信息
  afterRequest, //  table请求数据成功之后将后端数据转换为table需要的参数格式，比如分页，总页数，datasource等
  fixed, // 表格固定列的配置
  ...args
}, ref) {

  const [state, setState] = useReducer(reducer, {
    count: 0,
    dataList: [],
    pagination: propsPagination,
    loading: {
      delay: 0,
      spinning: false,
    },
    onTableChangeState: [// beforeRequest的入参
      propsPagination,
      {},
      {},
      {},
    ],
  });

  useEffect(() => {
    if (api) {
      getDataFromServer();
    }
  }, [state.count, state.onTableChangeState]);

  useEffect(() => {
    resetTable();
  }, [params, api, propsPagination]);

  const resetTable = () => {
    const newOnTableChangeState = [...state.onTableChangeState];
    newOnTableChangeState[0] = propsPagination;
    setState({
      pagination: propsPagination,
      onTableChangeState: newOnTableChangeState,
    });
  };

  const refreshTable = () => {
    setState({
      count: state.count + 1,
    });
  };

  useImperativeHandle(ref, () => ({
    refresh: refreshTable,
    reset: resetTable,
  }));

  const getDataFromServer = () => {
    const { loading, onTableChangeState } = state;
    const ifContinue = shouldSendRequest();
    if (!ifContinue) return;
    const tableParams = beforeRequest(...onTableChangeState);
    if (!tableParams) return;
    const sendData = Object.assign({}, params, tableParams);
    setState({
      loading: { ...loading, spinning: true },
    });
    api(sendData).then((res) => {
      didRequest(res);
      const { list, total } = afterRequest(res);
      const pagination = Object.assign({}, state.pagination, { total });
      setState({
        dataList: list,
        pagination,
      });
    }).finally(() => {
      setState({
        loading: { ...loading, spinning: false },
      });
    });
  };

  const onTableChange = (pagination, filters, sorter, extra) => {
    onChange(pagination, filters, sorter, extra);
    setState({ pagination, onTableChangeState: [pagination, filters, sorter, extra] });
  };

  const newColumns = useMemo(() => {
    if (!fixed) return;
    const myColumns = [...columns];
    fixed.forEach(item => {
      const index = myColumns.findIndex(o => o.dataIndex === item.dataIndex);
      if (!~index) return;
      myColumns[index] = { ...myColumns[index], fixed: item.position };
    });
    return myColumns;
  }, [fixed, columns]);

  return (
    <Table
      {...args}
      columns={newColumns}
      loading={state.loading}
      onChange={onTableChange}
      dataSource={state.dataList}
      pagination={state.pagination}
    />
  );
}

const AsyncTable = forwardRef(AsyncTableInner);

const initPagination = {
  current: 1,
  pageSize: 10,
};

AsyncTable.defaultProps = {
  columns: [],
  onChange() { },
  beforeRequest: (pagination, filters, sorter) => ({
    currPage: pagination.current,
    pageSize: pagination.pageSize,
    filters,
    sorter,
  }),
  afterRequest: (res) => ({
    list: res.list,
    total: res.totalCount,
  }),
  shouldSendRequest: () => true,
  didRequest: () => { },
  pagination: initPagination,
  fixed: [
    {
      dataIndex: 'opt',
      position: 'right',
    },
  ],
};

export default AsyncTable;
