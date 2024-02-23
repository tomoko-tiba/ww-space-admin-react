import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { getAllUser } from '@/services/user/api';

const valueEnum = {
  0: 'close',
  1: 'running',
  2: 'online',
  3: 'error',
};

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  progress: number;
  money: number;
  memo: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];

for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    name: 'AppName',
    containers: Math.floor(Math.random() * 20),
    creator: creators[Math.floor(Math.random() * creators.length)],
    status: valueEnum[((Math.floor(Math.random() * 10) % 4) + '') as '0'],
    createdAt: Date.now() - Math.floor(Math.random() * 2000),
    money: Math.floor(Math.random() * 2000) * i,
    progress: Math.ceil(Math.random() * 100) + 1,
    memo:
      i % 2 === 1
        ? '很长很长很长很长很长很长很长的文字要展示但是要留下尾巴'
        : '简短备注文案',
  });
}

const columns: ProColumns<API.User>[] = [
    {
        title: '用户名',
        dataIndex: 'userName',
        ellipsis: true,
    },
    {
        title: '头像',
        dataIndex: 'userPhoto',
        ellipsis: true,
    },
    {
        title: '简介',
        dataIndex: 'userIntro',
        ellipsis: true,
    },
    {
        title: '操作',
        width: 180,
        key: 'option',
        valueType: 'option',
        render: () => [
            <a key="edit">编辑</a>,
            <a key="delete">删除</a>
        ],
    },
];

export default () => {
  return (
    <PageContainer>
    <ProTable<API.User>
      columns={columns}
      request={async () => {
        const msg = await getAllUser()
        return {
            data: msg,
            success: true,
        } 
      }}
      rowKey="key"
      pagination={{
        showQuickJumper: true,
      }}
      search={false}
      dateFormatter="string"
      toolbar={{
        title: '高级表格',
        tooltip: '这是一个标题提示',
      }}
      toolBarRender={() => [
        <Button type="primary" key="primary">
          创建
        </Button>,
      ]}
    />
    </PageContainer>
  );
};