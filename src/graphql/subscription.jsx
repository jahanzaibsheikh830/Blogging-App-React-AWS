/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const addedPost = /* GraphQL */ `
  subscription AddedPost {
    addedPost {
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
export const updatedPost = /* GraphQL */ `
  subscription UpdatedPost {
    updatedPost {
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
export const deletedPost = /* GraphQL */ `
  subscription DeletedPost {
    deletedPost {
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
export const addedComment = /* GraphQL */ `
  subscription AddedComment {
    addedComment {
      id
      content
      postId
    }
  }
`;
export const updatedComment = /* GraphQL */ `
  subscription UpdatedComment {
    updatedComment {
      id
      content
      postId
    }
  }
`;
export const deletedComment = /* GraphQL */ `
  subscription DeletedComment {
    deletedComment {
      id
      content
      postId
    }
  }
`;
