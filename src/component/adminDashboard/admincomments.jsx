import React, { useState, useEffect, memo } from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import DeleteComment from "./deletecomment";
import UpdateComment from "./updatecomment";
import { API, graphqlOperation } from "aws-amplify";
import { addComment } from "../../graphql/mutations";
import { addedComment } from "../../graphql/subscription";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../../redux/action/reduxaction";
const CommentExampleReplyFormOuter = (props) => {
  const [getId, setId] = useState("");
  const [commentValue, setCommmentValue] = useState("");
  const dispatchs = useDispatch();
  const useData = useSelector((state) => state.addUser);
  function setInput(e) {
    setCommmentValue(e.target.value);
    setId(props.postId);
  }

  async function addcomment(e) {
    e.preventDefault();
    if (!commentValue) return;
    try {
      await API.graphql(
        graphqlOperation(addComment, { content: commentValue, postId: getId })
      );
      setCommmentValue("");
    } catch (err) {
      console.log("creating comment err", err);
    }
  }
  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(addedComment)).subscribe({
      next: ({ provider, value }) => {
        const data = value.data.addedComment;
        useData.posts.filter((post, index) => {
          if (post.id === data.postId) {
            console.log("post", post);
            const newData = post.comments.push(data);
            return dispatchs(
              user({
                posts: [...useData.posts, newData],
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
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {props.value &&
        props.value.map((value, index) => {
          return (
            <div key={index}>
              <Comment>
                <Comment.Avatar
                  style={{ marginRight: 10 }}
                  as='a'
                  src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
                />
                <Comment.Author as='a'>Matt</Comment.Author>
                <Comment.Metadata>
                  <span>Today at 5:42PM</span>
                  <Comment.Actions>
                    <DeleteComment value={value} />
                    <UpdateComment value={value} />
                  </Comment.Actions>
                </Comment.Metadata>
                <Comment.Text>{value.content}</Comment.Text>
              </Comment>
            </div>
          );
        })}
      <Form reply onSubmit={addcomment}>
        <Form.TextArea onChange={(e) => setInput(e)} value={commentValue} />
        <Button
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
        />
      </Form>
    </Comment.Group>
  );
};

export default memo(CommentExampleReplyFormOuter);
