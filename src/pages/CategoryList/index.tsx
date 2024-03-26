import { deleteOneCategoryById, getAllCategories } from '@/services/category/api';
import type { ProColumns } from '@ant-design/pro-components';
import { ActionType, PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { useRef, useState } from 'react';
import EditForm from './EditForm';

export const columns: ProColumns<API.Category>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    ellipsis: true,
    editable: false,
    hideInForm: true,
  },
  {
    title: '类别',
    dataIndex: 'name',
    ellipsis: true,
  },
  {
    title: '排序(小到大)',
    dataIndex: 'orderIndex',
    ellipsis: true,
    valueType: 'digit',
  },
];

export default () => {
  const ref = useRef<ActionType>();
  const [formOpen, setFormOpen] = useState(false);
  const [formUpdateId, setFormUpdateId] = useState<number | null>(null);
  let categoryList: API.Category[] = [];

  return (
    <PageContainer>
      <ProTable<API.Category>
        actionRef={ref}
        columns={[
          ...columns,
          {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (text, record) => [
              <a
                key="edit"
                onClick={() => {
                  setFormOpen(true);
                  setFormUpdateId(record.id);
                }}
              >
                编辑
              </a>,
              <a
                key="delete"
                onClick={async () => {
                  Modal.confirm({
                    title: '确认删除吗？',
                    async onOk() {
                      await deleteOneCategoryById(record.id);
                      ref.current?.reload();
                    },
                  });
                }}
              >
                删除
              </a>,
            ],
          },
        ]}
        request={async () => {
          const msg = await getAllCategories();
          categoryList = msg;
          return {
            data: msg,
            success: true,
          };
        }}
        rowKey="id"
        pagination={{
          showQuickJumper: true,
        }}
        search={false}
        dateFormatter="string"
        toolbar={{
          title: '高级表格',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setFormOpen(true);
              setFormUpdateId(null);
            }}
          >
            创建
          </Button>,
        ]}
      />

      <Modal
        title={formUpdateId ? '修改' : '新增'}
        open={formOpen}
        footer={null}
        onOk={() => setFormOpen(false)}
        onCancel={() => setFormOpen(false)}
        destroyOnClose
      >
        <EditForm
          categoryList={categoryList}
          id={formUpdateId}
          onSuccess={() => {
            setFormOpen(false);
            ref.current?.reload();
          }}
        />
      </Modal>
    </PageContainer>
  );
};
