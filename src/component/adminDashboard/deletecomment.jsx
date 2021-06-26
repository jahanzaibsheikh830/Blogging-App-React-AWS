import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";
import { deleteComment } from "../../graphql/mutations";
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

const DeleteComment = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  console.log("props", props);

  console.log("delete Cpmment", props);
  console.log("delete comment id", props.value.id);
  async function deletecomment() {
    const deleteData = await API.graphql(
      graphqlOperation(deleteComment, {
        id: props.value.id,
      })
    );
    console.log(deleteData);
    dispatch({ type: "close" });
  }
  return (
    <>
      <span
        name='delete'
        onClick={() => dispatch({ type: "open", size: "mini" })}
        style={{ cursor: "pointer", marginRight: 5 }}
      >
        Delete
      </span>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Delete Your Comment</Modal.Header>
        <p style={{ padding: "10px 0 0 10px" }}>
          Are you sure you want to delete your Comment?
        </p>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button positive onClick={() => deletecomment()}>
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteComment;
