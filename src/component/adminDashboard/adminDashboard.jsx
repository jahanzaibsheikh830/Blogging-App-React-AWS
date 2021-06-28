import React, { useState } from "react";
import "../style.css";
import AdminNavbar from "./adminNavbar";
import AddPost from "./addpost";
import Post from "./post";
import Users from "./users";
function FormExampleForm() {
  const [customRoute, setCustomRoute] = useState({
    addposts: "addposts",
    users: "",
    adminposts: "",
  });
  return (
    <div>
      <div className='dashboard'>
        <div className='menu'>
          <h2
            style={{
              color: "#fff",
              textAlign: "center",
              marginTop: 24,
              marginBottom: 24,
            }}
          >
            Dashboard
          </h2>
          <hr />
          <ul>
            <li onClick={() => setCustomRoute({ addposts: "addposts" })}>
              Add Post
            </li>
            <li onClick={() => setCustomRoute({ users: "users" })}>Users</li>
            <li onClick={() => setCustomRoute({ adminposts: "adminposts" })}>
              Posts
            </li>
          </ul>
        </div>
        <div className='content'>
          <AdminNavbar />
          {customRoute.addposts === "addposts" ? (
            <AddPost />
          ) : customRoute.users === "users" ? (
            <Users />
          ) : customRoute.adminposts === "adminposts" ? (
            <Post />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default FormExampleForm;
