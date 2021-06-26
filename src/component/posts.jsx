import { useEffect } from "react";
import "./style.css";
import Comments from "./comments";
import { useDispatch } from "react-redux";
import { user } from "../redux/action/reduxaction";
function Posts(props) {
  const data = props.location.state;
  const dispatch = useDispatch();
  const newComments = () => {
    dispatch(
      user({
        userComments: data.comments,
      })
    );
  };

  useEffect(() => {
    newComments();
  }, []);

  return (
    <div>
      <div className='container'>
        <div className='blog-content'>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
          <Comments />
        </div>
      </div>
    </div>
  );
}
export default Posts;
