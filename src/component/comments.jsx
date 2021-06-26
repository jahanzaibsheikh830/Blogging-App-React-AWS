import React from "react";
import { Button, Comment, Form, Header } from "semantic-ui-react";
import { useSelector } from "react-redux";
function CommentExampleReplyFormOuter() {
  const useData = useSelector((state) => state.addUser);
  const comment = useData.userComments;
  console.log(useData.userComments);
  console.log(!comment);
  return (
    <Comment.Group>
      <Header as='h3' dividing>
        Comments
      </Header>
      {comment &&
        comment.map((value, index) => {
          return (
            <div key={index}>
              <Comment>
                {/* <Comment.Avatar
                as='a'
                src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
              /> */}
                <Comment.Content>
                  {/* <Comment.Author>Joe Henderson</Comment.Author>
                <Comment.Metadata>
                  <div>1 day ago</div>
                </Comment.Metadata> */}
                  <Comment.Text>
                    <p>{value.content}</p>
                  </Comment.Text>
                  {/* <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions> */}
                </Comment.Content>
              </Comment>
            </div>
          );
        })}

      <Form reply>
        <Form.TextArea />
        <Button
          content='Add Comment'
          labelPosition='left'
          icon='edit'
          primary
        />
      </Form>
    </Comment.Group>
  );
}

export default CommentExampleReplyFormOuter;
