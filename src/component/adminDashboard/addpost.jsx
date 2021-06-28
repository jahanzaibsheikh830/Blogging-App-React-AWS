import React, { useState, useEffect } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { addPost } from "../../graphql/mutations";
import { addedPost } from "../../graphql/subscription";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/action/reduxaction";
function FormExampleForm() {
  const initialState = { id: "11vcvbfdc3", title: "", description: "" };
  const [formData, setFormData] = useState(initialState);
  const [successMsg, setsuccessMsg] = useState(false);
  const dispatch = useDispatch();
  const useData = useSelector((state) => state.addUser);
  function setInput(key, value) {
    setFormData({ ...formData, [key]: value });
  }
  async function addpost(e) {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description) return;
      await API.graphql(
        graphqlOperation(addPost, {
          description: formData.description,
          title: formData.title,
        })
      );
      setFormData(initialState);
      setsuccessMsg(true);
    } catch (err) {
      console.log("error creating post:", err);
    }
  }
  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(addedPost)).subscribe({
      next: ({ provider, value }) => {
        console.log("post Subscription data", value.data.addedPost);
        const data = value.data.addedPost;
        const newPost = [...useData.posts, data];
        dispatch(
          user({
            posts: newPost,
          })
        );
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
    <div className='container'>
      <h3 style={{ textAlign: "center", marginTop: "40px" }}>Add new post</h3>
      <Form onSubmit={addpost}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder='Title'
            value={formData.title}
            onChange={(event) => setInput("title", event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            placeholder='Description'
            value={formData.description}
            onChange={(e) => setInput("description", e.target.value)}
          />
        </Form.Field>
        <Button type='submit'>Add</Button>
      </Form>
      {successMsg ? (
        <Message positive>
          <Message.Header>Post successfully added</Message.Header>
        </Message>
      ) : null}
    </div>
  );
}

export default FormExampleForm;
