import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "semantic-ui-react";
import { updateComment } from "../../graphql/mutations";
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

const UpdateComment = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const [formState, setFormState] = useState("");

  useEffect(() => {
    setFormState(props.value.content);
  }, []);

  async function updatecomment() {
    if (!formState) return;
    try {
      await API.graphql(
        graphqlOperation(updateComment, {
          id: props.value.id,
          content: formState,
        })
      );
      dispatch({ type: "close" });
    } catch (e) {
      console.log("updating err", e);
    }
  }
  return (
    <>
      <span
        name='Edit'
        onClick={() => dispatch({ type: "open", size: "tiny" })}
        style={{ cursor: "pointer", marginRight: 5 }}
      >
        Edit
      </span>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Update Your Comment</Modal.Header>
        <Modal.Header>
          <Form>
            <Form.Field>
              <label>Comment</label>
              <textarea
                value={formState}
                placeholder='comment'
                onChange={(e) => setFormState(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Header>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            Cancel
          </Button>
          <Button positive onClick={() => updatecomment()}>
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UpdateComment;
