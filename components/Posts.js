import { useQuery, useMutation } from '@apollo/client';
import { DELETE_A_POST } from '../graph-ql/mutations';
import { GET_ALL_POSTS } from '../graph-ql/queries';

export default function Posts({ onUpdate }) {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [deletePost, { loading: delLoading }] = useMutation(DELETE_A_POST);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (delLoading) return <p>Deleting...</p>;


    const onDelete = (id) => {
        if (!confirm("Are you sure want to delete?"))
            return;
        deletePost({
            variables: {
                id: id
            }
        }).then(res => {
            console.log(res)
            if (res.data?.deletePost) {
                alert('Post deleted successfully');
            }
        }).catch(err => {
            alert(`Updation error! ${err.message}`);
        })
    }

    return data.posts.data.map(({ id, title, body }) => (
        <div key={id} id="row" >
            <h3>Id: {id}</h3>
            <h3>Title: {title}</h3>
            <h3>Title: {body}</h3>
            <p />
            <button
                id='edit-btn'
                onClick={() => onUpdate({ id, title, body })} >
                Update
            </button>
            <button onClick={() => onDelete(id)}>
                Delete
            </button>
            <hr />
        </div>
    ));
}
