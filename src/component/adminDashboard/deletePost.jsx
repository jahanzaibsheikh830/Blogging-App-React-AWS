import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { deletePost } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
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
  console.log("props", props);

  async function deletepost() {
    console.log("delete post", props);
    console.log("delete post id", props.value.id);
    const deleteData = await API.graphql(
      graphqlOperation(deletePost, {
        id: props.value.id,
      })
    );
    console.log(deleteData);
    dispatch({ type: "close" });
  }
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
