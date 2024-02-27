import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { deleteOneUserById, getAllUser } from '@/services/user/api';
import { useState, useRef } from 'react'
import EditForm from './EditForm';
import UploadImg from '@/components/UploadImg';

export const columns: ProColumns<API.User>[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    ellipsis: true,
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },
  {
    title: '头像',
    dataIndex: 'userPhoto',
    ellipsis: true,
    valueType: 'avatar',
    renderFormItem: () => {
       return (
        <UploadImg />
       )
    }
  },
  {
    title: '简介',
    dataIndex: 'userIntro',
    ellipsis: true,
  },
  {
    title: '密码',
    dataIndex: 'password',
    ellipsis: true,
    hideInTable: true,
    valueType: 'password',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
  },

]

export default () => {
  const ref = useRef<ActionType>();
  const [formOpen, setFormOpen] = useState(false);
  const [formUpdateId, setFormUpdateId] = useState<number | null>(null);

  return (
    <PageContainer>
    <ProTable<API.User>
      actionRef={ref}
      columns={[
        ...columns,
        {
            title: '操作',
            width: 180,
            key: 'option',
            valueType: 'option',
            render: (text, record) => [
                <a key="edit" onClick={() => {
                  setFormOpen(true)
                  setFormUpdateId(record.id)
                }}>编辑</a>,
                <a key="delete" onClick={async ()=> {
                  Modal.confirm({
                    title: '确认删除吗？',
                    async onOk() {
                      await deleteOneUserById(record.id)
                      ref.current?.reload();
                    }
                  });
                }}>删除</a>
            ],
        },
      ]}
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
        <Button type="primary" key="primary" onClick={() => {
            setFormOpen(true)
            setFormUpdateId(null)
        }}>
          创建
        </Button>,
      ]}
    />

    <Modal title={formUpdateId ? "修改" : "新增"} open={formOpen} footer={null} onOk={() => setFormOpen(false)} onCancel={() => setFormOpen(false)} destroyOnClose>
      <EditForm id={formUpdateId} onSuccess={() => {
        setFormOpen(false)
        ref.current?.reload()
      }}/>
    </Modal>
    </PageContainer>
  );
};