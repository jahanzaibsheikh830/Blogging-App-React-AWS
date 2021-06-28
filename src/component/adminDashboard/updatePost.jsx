import React, { useState, useEffect } from "react";
import { Button, Icon, Modal, Form } from "semantic-ui-react";
import { updatePost } from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { updatedPost } from "../../graphql/subscription";
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
  const dispatchs = useDispatch();
  const useData = useSelector((state) => state.addUser);
  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }
  useEffect(() => {
    setFormState({
      title: props.value.title,
      description: props.value.description,
    });
  }, []);
  async function updatepost() {
    if (!formState.title || !formState.description) return;
    try {
      const updateData = await API.graphql(
        graphqlOperation(updatePost, {
          id: props.value.id,
          title: formState.title,
          description: formState.description,
        })
      );
      dispatch({ type: "close" });
    } catch (e) {
      console.log("updating err", e);
    }
  }
  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(updatedPost)).subscribe({
      next: (postData) => {
        const data = postData.value.data.updatedPost;
        console.log("post Subscription data", postData.value.data.updatedPost);
        useData.posts.filter((value, index) => {
          if (value.id === data.id) {
            useData.posts.splice(index, 1, data);
            let newPost = [...useData.posts];
            return dispatchs(
              user({
                posts: newPost,
              })
            );
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
        name='edit'
        onClick={() => dispatch({ type: "open", size: "tiny" })}
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
                value={formState.title}
                placeholder='Title'
                onChange={(e) => setInput("title", e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Description</label>
              <textarea
                value={formState.description}
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
