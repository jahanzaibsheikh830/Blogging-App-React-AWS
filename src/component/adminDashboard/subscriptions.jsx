import React, { useEffect } from "react";
import { addedComment } from "../../graphql/subscription";
import { useDispatch, useSelector } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { user } from "../../redux/action/reduxaction";
function SetupSubscription() {
  const dispatchs = useDispatch();
  const useData = useSelector((state) => state.addUser);
  console.log("useData", useData.posts);
  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(graphqlOperation(addedComment)).subscribe({
      next: ({ provider, value }) => {
        const data = value.data.addedComment;
        console.log("subscription dat5a", data);
        const filredata = useData.posts.filter(
          (post) => post.id === data.postId
        );
        console.log("filtered", filredata);
        // dispatchs(
        //   user({
        //     posts: [data],
        //   })
        // );
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
