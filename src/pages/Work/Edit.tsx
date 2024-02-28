import { PageContainer } from "@ant-design/pro-components";
import EditForm from "./EditForm";
import { useParams, history } from "@umijs/max";

const WorkEdit: React.FC = () => {
    const params = useParams()

    return(
        <PageContainer>
            <EditForm id={params.id ? Number(params.id) : null} onSuccess={() => {
                history.push('/work/list')
            }} />
        </PageContainer>
    )
}

export default WorkEdit;