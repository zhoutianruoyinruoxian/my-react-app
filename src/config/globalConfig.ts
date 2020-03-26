import { TableX, ModalX } from '@';

const paginationConfig = {
  current: 1,
  pageSize: 10,
  hideOnSinglePage: true,
  showQuickJumper: false,
  pageSizeOptions: ['10', '20', '30', '40'],
};

TableX.defaultProps.pagination = Object.assign({}, TableX.defaultProps.pagination, paginationConfig);
TableX.defaultProps.beforeRequest = (params) => {
  return {
    page: params.current,
    per_page: params.pageSize,
  };
};

ModalX.defaultProps.width = 1000;
