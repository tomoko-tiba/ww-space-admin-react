interface EditWorkProps{
    id: number;
}

const WorkEdit: React.FC<EditWorkProps> = (props) => {
    const { id } = props;

    return(
        <div>
            Edit {id}
        </div>
    )
}

export default WorkEdit;