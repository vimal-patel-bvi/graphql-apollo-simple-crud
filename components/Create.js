import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_A_POST } from '../graph-ql/mutations';

export default function Create() {
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [createPost, { loading }] = useMutation(CREATE_A_POST);

    if (loading) return 'Submitting...';

    const toggleForm = () => {
        setAddFormVisible(!addFormVisible);
    }
    return (
        <div>
            <button onClick={toggleForm}>Add post</button>
            {
                addFormVisible &&
                <form
                    id='create-form'
                    onSubmit={e => {
                        e.preventDefault();
                        createPost({
                            variables: {
                                input: {
                                    title: e.target.title.value,
                                    body: e.target.body.value
                                }
                            }
                        }).then(() => {
                            e.target.reset();
                            alert('Post created successfully');
                            toggleForm();
                        }).catch((error) => {
                            alert(`Submission error! ${error.message}`);
                        });

                    }}
                >
                    <input
                        name="title"
                        placeholder='Title goes here'
                        required
                    />
                    <br />
                    <br />
                    <textarea
                        name="body"
                        placeholder='Body goes here'
                        required
                    />
                    <br />
                    <button type="submit">Sumbit</button>
                </form>
            }
        </div>
    )
}
