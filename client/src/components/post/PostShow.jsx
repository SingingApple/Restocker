import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Card,
  CardHeader,
  Paper,
  CardMedia,
  Grow,
  Typography,
  CardContent,
  IconButton,
  Box,
  Button,
  Avatar,
  CardActions,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { addComment } from "../../actions/post";
import usePostStyles from "../posts/PostItemStyles";
import { addLike, removeLike, deletePost } from "../../actions/post";
import CommentForm from "./CommentForm";
import Dialogue from "./Dialog";
const PostShow = ({
  post: {
    _id,
    title,
    description,
    imageUrl,
    date,
    trade: { trade },
    likes,
    user,

    category: { category },
  },
  history,
}) => {
  const [text, setText] = useState("");
  const handleComment = (e) => {
    e.preventDefault();
    console.log(text);
    dispatch(addComment({ text }, _id));
    setText("");
  };
  const [open, setOpen] = useState(false);
  const classes = usePostStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <Container maxWidth="sm">
      <Paper>
        <Card>
          <CardHeader
            title={title}
            subheader={category}
            avatar={
              <Avatar aria-label={user.name.split(" ").slice(0, 1)}>
                {user.name.split(" ")[0].slice(0, 1)}
              </Avatar>
            }
            action={
              auth.user._id === user._id && (
                <IconButton
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <MoreVertIcon />
                </IconButton>
              )
            }
          />
          <CardMedia
            className={classes.media}
            image={
              imageUrl ||
              "https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236_960_720.jpg"
            }
          />
          <CardContent>
            <Typography paragraph>{description}</Typography>
          </CardContent>
          <CardActions>
            <CommentForm
              handleComment={handleComment}
              text={text}
              setText={setText}
            />
          </CardActions>
        </Card>
      </Paper>
      <Dialogue open={open} setOpen={setOpen} id={_id} />
    </Container>
    // <Paper>
    //   <Container>
    //     <Card>
    //       <CardHeader
    //         style={{ display: "flex", justifyContent: "space-between" }}
    //       >
    //         <Typography>{title}</Typography>
    //         <Typography>{category}</Typography>
    //       </CardHeader>
    //       <CardMedia
    //         image={
    //           imageUrl ||
    //           "https://cdn.pixabay.com/photo/2020/06/15/15/16/the-caucasus-5302236_960_720.jpg"
    //         }
    //         alt="Card image cap"
    //         className={classes.media}
    //       />
    //       <hr></hr>
    //       <CardContent>
    //         <CardContent>
    //           <i>
    //             <strong>Owner:</strong> {user.name} <br />
    //             <strong>Contact:</strong> {user.email} <br></br>
    //           </i>
    //           <hr />
    //           {description} <br></br>
    //           {!auth.loading && (
    //             <Fragment>
    //               {user?._id === auth?.user._id ? (
    //                 <Button
    //                   color="danger"
    //                   onClick={() => dispatch(deletePost(_id, history))}
    //                 >
    //                   Delete
    //                 </Button>
    //               ) : null}
    //             </Fragment>
    //           )}
    //         </CardContent>
    //       </CardContent>
    //       <CardContent
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <h6>{trade}</h6>
    //         <div>
    //           <span>People interested:</span>
    //           <span>{likes.length > 0 && likes.length}</span>
    //           {"  "}
    //           <button
    //             type="button"
    //             onClick={() => dispatch(addLike(_id))}
    //             className="btn btn-light"
    //           >
    //             <i className="fas fa-thumbs-up"></i>
    //           </button>
    //           <button
    //             type="button"
    //             onClick={() => dispatch(removeLike(_id))}
    //             className="btn btn-light"
    //           >
    //             <i className="fas fa-thumbs-down"></i>
    //           </button>
    //         </div>
    //       </CardContent>
    //     </Card>
    //   </Container>
    // </Paper>
  );
};

export default withRouter(PostShow);
