import React, { useEffect, useState } from "react";
import { addedComment } from "../../graphql/subscription";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { user } from "../../redux/action/reduxaction";
function SetupSubscription() {
  const dispatchs = useDispatch();
  const useData = useSelector((state) => state.addUser);
  let createSubscription;
  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(addedComment)).subscribe({
      next: ({ provider, value }) => {
        const data = value.data.addedComment;
        useData.posts.filter((post, index) => {
          if (post.id === data.postId) {
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
  return <div></div>;
}
export default SetupSubscription;
