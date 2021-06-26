/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPosts = /* GraphQL */ `
  query GetPosts {
    getPosts {
      id
      title
      description
      comments {
        id
        content
        postId
      }
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      description
      comments {
        id
        content
        postId
      }
    }
  }
`;
