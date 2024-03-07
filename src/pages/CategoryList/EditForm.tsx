import { ParamsType, ProTable } from "@ant-design/pro-components"
import '@umijs/max'
import React, { useState } from 'react'

import { columns } from "./index"
import { createOneCategory, getOneCategoryById, updateOneCategoryById } from "@/services/category/api"
import { message } from "antd"

export type Props = {
    id: number | null;
    categoryList: API.Category[];
    onSuccess: () => void;
}

const EditForm: React.FC<Props> = (props) => {
    const { id, categoryList, onSuccess } = props;
    const [formLoading, setFormLoading] = useState(false);
    const isEdited = id !== null
    const [messageApi, contextHolder] = message.useMessage()

    const handleInit = async () => {
        if(!isEdited) {
            return {}
        }
        setFormLoading(true)
        const msg = await getOneCategoryById(id).finally(() => setFormLoading(false))
        return msg
    }
    
    const handleSubmit = async (value: ParamsType) => {
        const searchList = categoryList.filter(c => c.name === value.name)
        
        if(searchList.length){
            messageApi.open({
                type: 'error',
                content: '名字已存在',
              });
            return
        }
        setFormLoading(true)
        if (!isEdited) {
            await createOneCategory(value as API.CategoryInput)
        } else {
            await updateOneCategoryById(id, value as API.CategoryInput)
        }
        setFormLoading(false)
        onSuccess()
    }

    return(
        <>
            {contextHolder}
            <ProTable 
                type="form"
                form={{
                    loading: formLoading,
                    submitter: {
                        submitButtonProps: { loading: formLoading },
                    },
                    request: handleInit,
                }}
                columns={columns}
                onSubmit={handleSubmit}
            />
        </>
    )
}

export default EditForm;
