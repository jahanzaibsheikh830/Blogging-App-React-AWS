import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getPosts } from "../graphql/queries";
import { useDispatch, useSelector } from "react-redux";
import { user } from "../redux/action/reduxaction";
function Home() {
  const dispatch = useDispatch();
  const useData = useSelector((state) => state.addUser);
  useEffect(() => {
    fetchTodos();
  }, []);
  async function fetchTodos() {
    try {
      const postData = await API.graphql(graphqlOperation(getPosts));
      dispatch(
        user({
          posts: postData.data.getPosts,
        })
      );
    } catch (err) {
      console.log("error fetching blogs", err);
    }
  }
  return (
    <div>
      <div className='container'>
        <div className='info-content'>
          <div>
            <img
              src='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'
              className='profilePic'
              alt=''
            />
          </div>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt
              ipsa porro, quia dicta enim amet iure voluptate officiis.
            </p>
          </div>
        </div>
        <div>
          {useData.posts.map((value, index) => {
            return (
              <div className='blog-content' key={index}>
                <div>
                  <h2>
                    <Link
                      to={{
                        pathname: "/posts",
                        state: value,
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      {value.title}
                    </Link>
                  </h2>
                  <p>{value.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Home;
