import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, ActionType } from '@ant-design/pro-components';
import { Button, Modal } from 'antd';
import { PageContainer } from '@ant-design/pro-components';
import { useRef } from 'react'
import { history } from '@umijs/max';
import { deleteOneWorkById, getAllWork } from '@/services/work/api';
import UploadImg from '@/components/UploadImg';
import RichTextEditor from '@/components/RichTextEditor';

export const columns: ProColumns<API.WorkVO>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    ellipsis: true,
    hideInSearch: true,
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
    title: '内容',
    dataIndex: 'content',
    ellipsis: true,
    hideInTable: true,
    hideInSearch: true,
    formItemProps: {
        rules: [
            {
                required: true,
                message: '此项为必填项',
            },
        ],
    },
    renderFormItem: () => {
      return (
        <RichTextEditor/>
      )
    }
  },
  {
    title: '缩略图',
    dataIndex: 'imgSrc',
    ellipsis: true,
    valueType: 'image',
    hideInSearch: true,
    formItemProps: {
        rules: [
            {
                required: true,
                message: '此项为必填项',
            },
        ],
    },
    renderFormItem: () => {
       return (
        <UploadImg />
       )
    },
  },
  {
    title: '创建人',
    dataIndex: 'userName',
    ellipsis: true,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '创建时间',
    dataIndex: 'time',
    ellipsis: true,
    hideInSearch: true,
    hideInForm: true,
  },
  {
    title: '搜索标题或内容',
    dataIndex: 'searchText',
    ellipsis: true,
    hideInForm: true,
    hideInTable: true
  },
]

export default () => {
  const ref = useRef<ActionType>();

  return (
    <PageContainer>
    <ProTable<API.WorkVO>
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
                    history.push(`/work/update/${record.id}`);
                }}>编辑</a>,
                <a key="delete" onClick={async ()=> {
                  Modal.confirm({
                    title: '确认删除吗？',
                    async onOk() {
                      await deleteOneWorkById(record.id)
                      ref.current?.reload();
                    }
                  });
                }}>删除</a>
            ],
        },
      ]}
      request={async (params) => {
        const msg = await getAllWork ({
            page: params.current as number,
            pageSize: params.pageSize as number,
            searchText: params.searchText
        })
        return {
            data: msg.data,
            total: msg.count,
            success: true,
        } 
      }}
      rowKey="id"
      pagination={{
        showQuickJumper: true,
      }}
      search={{
        labelWidth: 'auto'
      }}
      dateFormatter="string"
      toolbar={{
        title: '高级表格',
        tooltip: '这是一个标题提示',
      }}
      toolBarRender={() => [
        <Button type="primary" key="primary" onClick={() => {
            history.push(`/work/create`);
        }}>
          创建
        </Button>
      ]}
    />
    </PageContainer>
  );
};