import { ParamsType, ProTable } from "@ant-design/pro-components"
import '@umijs/max'
import React, { useState } from 'react'

import { columns } from "./index"
import { createOneUser, getOneUserById, updateOneUserById } from "@/services/user/api"

export type Props = {
    id: number | null;
    onSuccess: () => void;
}

const EditForm: React.FC<Props> = (props) => {
    const { id, onSuccess } = props;
    const [formLoading, setFormLoading] = useState(false);
    const isEdited = id !== null

    const handleInit = async () => {
        if(!isEdited) {
            return {}
        }
        setFormLoading(true)
        const msg = await getOneUserById(id)
        return msg
    }

    const formColumns = isEdited ? 
        columns.map(column => column.dataIndex === 'password' ? 
            { ...column, formItemProps: undefined }
            : column ) 
        : columns;
    
    const handleSubmit = async (value: ParamsType) => {
        setFormLoading(true)
        if (!isEdited) {
            await createOneUser(value as API.UserCreateInput)
        } else {
            await updateOneUserById(id, value as API.UserCreateInput)
        }
        setFormLoading(false)
        onSuccess()
    }

    return(
        <ProTable 
            type="form"
            form={{
                loading: formLoading,
                submitter: {
                    submitButtonProps: { loading: formLoading },
                },
                request: handleInit,
            }}
            columns={formColumns}
            onSubmit={handleSubmit}
        />
    )
}

export default EditForm;
