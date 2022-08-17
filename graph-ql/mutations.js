import { gql, useMutation } from '@apollo/client';

export const CREATE_A_POST = gql`
    mutation (
        $input: CreatePostInput!
    ) {
        createPost(input: $input) {
        id
        title
        body
        }
    }
`;

export const UPDATE_A_POST = gql`
    mutation (
        $id: ID!,
        $input: UpdatePostInput!
    ) {
        updatePost(id: $id, input: $input) {
        id
        title
        body
        }
    }
`;

export const DELETE_A_POST = gql`
    mutation (
        $id: ID!
    ) {
        deletePost(id: $id)
    }
`;