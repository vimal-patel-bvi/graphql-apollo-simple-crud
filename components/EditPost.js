import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { UPDATE_A_POST } from '../graph-ql/mutations';

export default function EditPost({ row, updated }) {
    const [updateForm, setUpdateForm] = useState({
        title: row.title,
        body: row.body
    })
    const [editPost, { loading }] = useMutation(UPDATE_A_POST);
    if (loading) return 'Updating...';

    const updateCompleted = () => {
        alert('Post updated successfully');
        setUpdateForm({
            title: "",
            body: ""
        });
        updated();
    }

    return (
        <div>
            <form
                id='create-form'
                onSubmit={e => {
                    e.preventDefault();
                    editPost({
                        variables: {
                            "id": row.id,
                            input: updateForm
                        }
                    }).then(() => {
                        updateCompleted();
                    }).catch((error) => {
                        alert(`Updation error! ${error.message}`);
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
