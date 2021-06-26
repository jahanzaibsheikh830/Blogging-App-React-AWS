import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { API, graphqlOperation } from "aws-amplify";
import { addPost } from "../../graphql/mutations";
function FormExampleForm() {
  const initialState = { id: "11vcvbfdc3", title: "", description: "" };
  const [formData, setFormData] = useState(initialState);
  const [successMsg, setsuccessMsg] = useState(false);
  function setInput(key, value) {
    setFormData({ ...formData, [key]: value });
  }
  console.log(formData);
  async function addpost(e) {
    e.preventDefault();
    try {
      if (!formData.title || !formData.description) return;
      const { title, description } = formData;
      console.log(title, description);
      const data = await API.graphql(
        graphqlOperation(addPost, {
          description: formData.description,
          title: formData.title,
        })
      );
      console.log(data);
      setFormData(initialState);
      setsuccessMsg(true);
    } catch (err) {
      console.log("error creating post:", err);
    }
  }
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
