import { useQuery, useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { DELETE_A_POST } from '../graph-ql/mutations';
import { GET_ALL_POSTS } from '../graph-ql/queries';

export default function Posts({ onUpdate }) {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [deletePost, { loading: delLoading, error: delError, data: delData }] = useMutation(DELETE_A_POST);

    useEffect(() => {
        if (delData?.deletePost) {
            alert('Post deleted successfully');
        }
        if (delError) {
            alert(`Deletion error! ${error.message}`);
        }
    }, [delData, delError]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if (delLoading) return <p>Deleting...</p>;

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
            <button onClick={() => {
                deletePost({
                    variables: {
                        id: id
                    }
                });
            }}>
                Delete
            </button>
            <hr />
        </div>
    ));
}
