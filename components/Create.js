import { useMutation } from '@apollo/client';
import { useEffect, useRef, useState } from 'react';
import { CREATE_A_POST } from '../graph-ql/mutations';

export default function Create() {
    const [addFormVisible, setAddFormVisible] = useState(false);
    const [createPost, { data, loading, error }] = useMutation(CREATE_A_POST);
    const formRef = useRef(null);

    useEffect(() => {
        if (data) {
            alert('Post created successfully');
        }
        if (error) {
            alert(`Submission error! ${error.message}`);
        }
    }, [data, error])

    if (loading) return 'Submitting...';

    const toggleForm = () => {
        setAddFormVisible(!addFormVisible);
        if (addFormVisible)
            formRef.current.reset();
    }

    return (
        <div>
            <button onClick={toggleForm}>Add post</button>
            {
                addFormVisible &&
                <form
                    ref={formRef}
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
                        });
                        toggleForm();
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
