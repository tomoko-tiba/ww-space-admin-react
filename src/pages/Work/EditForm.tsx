import { ParamsType, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import React, { useState } from 'react';

import { createOneWork, getOneWorkById, updateOneWorkById } from '@/services/work/api';
import { columns } from './index';

export type Props = {
  id: number | null;
  onSuccess: () => void;
};

const EditForm: React.FC<Props> = (props) => {
  const { id, onSuccess } = props;
  const [formLoading, setFormLoading] = useState(false);
  const isEdited = id !== null;

  const handleInit = async () => {
    if (!isEdited) {
      return {};
    }
    setFormLoading(true);
    console.log('start loading id ' + id);
    const msg = await getOneWorkById(id).finally(() => setFormLoading(false));
    console.log(msg);
    return msg;
  };

  const handleSubmit = async (value: ParamsType) => {
    setFormLoading(true);
    if (!isEdited) {
      await createOneWork(value as API.WorkInput);
    } else {
      await updateOneWorkById(id, value as API.WorkInput);
    }
    setFormLoading(false);
    onSuccess();
  };

  return (
    <ProTable
      type="form"
      form={{
        loading: formLoading,
        submitter: {
          submitButtonProps: { loading: formLoading },
        },
        request: handleInit,
        style: {
          padding: '20px 0',
        },
      }}
      columns={columns}
      onSubmit={handleSubmit}
    />
  );
};

export default EditForm;
