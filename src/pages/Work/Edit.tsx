import { PageContainer } from '@ant-design/pro-components';
import { history, useParams } from '@umijs/max';
import EditForm from './EditForm';

const WorkEdit: React.FC = () => {
  const params = useParams();

  return (
    <PageContainer>
      <EditForm
        id={params.id ? Number(params.id) : null}
        onSuccess={() => {
          history.push('/work/list');
        }}
      />
    </PageContainer>
  );
};

export default WorkEdit;
