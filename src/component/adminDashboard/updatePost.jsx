import React, { useState } from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import { updatePost } from "../../graphql/mutations";
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

const UpdatePost = (props) => {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
  });
  const { open, size } = state;
  const [formState, setFormState] = useState({
    title: "",
    description: "",
  });
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  async function updatepost() {
    console.log(props);
    const updateData = await API.graphql(
      graphqlOperation(updatePost, {
        id: props.value.id,
        title: formState.title,
        description: formState.description,
      })
    );
    console.log(updateData);
    dispatch({ type: "close" });
  }
  return (
    <>
      <Icon
        name='edit'
        onClick={() => dispatch({ type: "open", size: "mini" })}
        style={{ cursor: "pointer" }}
      />

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "close" })}
      >
        <Modal.Header>Update Your Post</Modal.Header>
        <Modal.Header>
          <Form>
            <Form.Field>
              <label>Title</label>
              <input
                placeholder='Title'
                onChange={(e) => setInput("title", e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                placeholder='Description'
                onChange={(e) => setInput("description", e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Header>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            Cancel
          </Button>
          <Button positive onClick={() => updatepost()}>
            Update
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default UpdatePost;
