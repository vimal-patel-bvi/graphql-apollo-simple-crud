import { useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { CREATE_A_POST, UPDATE_A_POST } from '../graph-ql/mutations';

export default function EditPost({ row, updated }) {
    const [updateForm, setUpdateForm] = useState({
        title: row.title,
        body: row.body
    })
    const [editPost, { data, loading, error }] = useMutation(UPDATE_A_POST);
    const formRef = useRef(null);

    useEffect(() => {
        if (data) {
            alert('Post updated successfully');
            updateCompleted();
        }
        if (error) {
            alert(`Updation error! ${error.message}`);
        }
    }, [data, error])

    if (loading) return 'Updating...';

    const updateCompleted = () => {
        setUpdateForm({
            title: "",
            body: ""
        });
        updated();
    }

    return (
        <div>
            <form
                ref={formRef}
                id='create-form'
                onSubmit={e => {
                    e.preventDefault();
                    editPost({
                        variables: {
                            "id": row.id,
                            input: updateForm
                        }
                    });
                }}
            >
                <input
                    name="title"
                    value={updateForm.title}
                    onChange={e => setUpdateForm({ ...updateForm, title: e.target.value })}
                    placeholder='Title goes here'
                    required
                />
                <br />
                <br />
                <textarea
                    name="body"
                    value={updateForm.body}
                    onChange={e => setUpdateForm({ ...updateForm, body: e.target.value })}
                    placeholder='Body goes here'
                    required
                />
                <br />
                <button type="submit">Update</button>
            </form>
        </div>
    )
}
