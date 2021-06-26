/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addPost = /* GraphQL */ `
  mutation AddPost($id: ID, $title: String, $description: String) {
    addPost(id: $id, title: $title, description: $description) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost($id: ID, $title: String, $description: String) {
    updatePost(id: $id, title: $title, description: $description) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
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
export const addComment = /* GraphQL */ `
  mutation AddComment($id: ID, $content: String, $postId: ID!) {
    addComment(id: $id, content: $content, postId: $postId) {
      id
      content
      postId
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment($id: ID, $content: String, $postId: ID!) {
    updateComment(id: $id, content: $content, postId: $postId) {
      id
      content
      postId
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment($id: ID!) {
    deleteComment(id: $id) {
      id
      content
    }
  }
`;
