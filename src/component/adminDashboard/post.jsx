import React, { useState, useMemo } from "react";
import { useSelector } from "react-redux";
import DeletePost from "./deletePost";
import UpdatePost from "./updatePost";
import Comment from "./admincomments";
function Posts() {
  const useData = useSelector((state) => state.addUser);
  return (
    <div>
      <div className='container'>
        <h2 style={{ textAlign: "center" }}>Posts</h2>
        {useData.posts.map((value, index) => {
          return (
            <div
              className='blog-content'
              key={index}
              style={{
                backgroundColor: "#f9f9f9",
                padding: "20px",
                borderRadius: "5px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <h2>{value.title}</h2>
                  <p>{value.description}</p>
                </div>
                <div>
                  <div>
                    <DeletePost value={value} />
                  </div>
                  <div>
                    <UpdatePost value={value} />
                  </div>
                </div>
              </div>
              <Comment value={value.comments} postId={value.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Posts;
