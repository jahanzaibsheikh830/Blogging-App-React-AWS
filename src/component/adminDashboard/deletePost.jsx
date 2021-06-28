import React, { useEffect } from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { deletePost } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { deletedPost } from "../../graphql/subscription";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/action/reduxaction";
function exampleReducer(state, action) {
  switch (action.type) {
    case "close":
      return { open: false };
    case "open":
      return { open: true, size: action.size };
    default:
      throw new Error("Unsupported action...");
  }
}

const DeletePost = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const dispatchs = useDispatch();
  const useData = useSelector((state) => state.addUser);

  async function deletepost() {
    const deleteData = await API.graphql(
      graphqlOperation(deletePost, {
        id: props.value.id,
      })
    );
    dispatch({ type: "close" });
  }
  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(deletedPost)).subscribe({
      next: (postData) => {
        console.log("post Subscription data", postData.value.data.deletedPost);
        useData.posts.find((post, index) => {
          if (post.id === postData.value.data.deletedPost.id) {
            console.log("posts====", post);
            console.log("index", index);
            useData.posts.splice(index, 1);
            let newPosts = [...useData.posts];
            return dispatchs(
              user({
                posts: newPosts,
              })
            );
            // console.log("updatedx Data", useData.posts);
          }
        });
      },
      error: (err) => {
        console.log("subscription Error", err);
      },
    });
  }
  useEffect(() => {
    setupSubscription();
    return () => {
      createSubscription.unsubscribe();
    };
  }, []);
  return (
    <>
      <Icon
        name='delete'
        onClick={() => dispatch({ type: "open", size: "mini" })}
        style={{ cursor: "pointer" }}
      />

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Delete Your Post</Modal.Header>
        <p style={{ padding: "10px 0 0 10px" }}>
          Are you sure you want to delete your account
        </p>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => deletepost()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeletePost;
