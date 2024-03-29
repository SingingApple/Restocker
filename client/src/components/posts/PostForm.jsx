import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Grid,
  Grow,
  Paper,
  TextField,
  Typography,
  Select,
  Divider,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";

// import { Form, FormGroup, Label, Input, Button, Row, Col } from "reactstrap";
import { addPost } from "../../actions/post";
import useStyles from "./PostFormStyle";
const PostForm = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    trade: "",
  });
  const [file, setFile] = useState();
  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.toString(),
    });
  const classes = useStyles();
  const { title, description, category, trade } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("trade", trade);
    data.append("image", file);
    console.log(data);
    console.log(formData);
    dispatch(addPost(data, history));
  };
  return (
    <Grow in>
      <Container maxWidth="sm" className={classes.cardContainer}>
        <Paper>
          <Container>
            <Typography variant="h3" align="center" gutterBottom>
              List your item
            </Typography>
            <form onSubmit={(e) => onSubmit(e)}>
              <TextField
                label="Title"
                onChange={handleChange}
                name="title"
                value={title}
                fullWidth
              />
              <TextField
                label="Description"
                name="description"
                rows={4}
                variant="outlined"
                value={description}
                className={classes.description}
                onChange={handleChange}
                multiline
                fullWidth
              />
              <Grid container justify="stretch" spacing={2}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <Select
                      name="category"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                    >
                      <MenuItem value="Books">Books</MenuItem>
                      <MenuItem value="Clothes">Clothes</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <FormControl style={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-label">Trade</InputLabel>
                    <Select
                      name="trade"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={trade}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                    >
                      <MenuItem value="Buy and Sell">Buy and Sell</MenuItem>
                      <MenuItem value="Donation">Donation</MenuItem>
                      <MenuItem value="Exchange">Exchange</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider />
              <Button
                variant="contained"
                component="label"
                className={classes.uploadButton}
              >
                Upload File
                <input
                  type="file"
                  name="image"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    console.log(e.target.files);
                    setFile(file);
                  }}
                  hidden
                />
              </Button>
              <Button
                style={{ marginTop: "10px", marginBottom: "10px" }}
                type="submit"
                color="primary"
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Container>
        </Paper>
      </Container>
    </Grow>
    // <Fragment>
    //   <Form onSubmit={(e) => onSubmit(e)}>
    //     <FormGroup>
    //       <Label for="title">Title</Label>
    //       <Input
    //         type="text"
    //         name="title"
    //         value={title}
    //         id="title"
    //         onChange={(e) => handleChange(e)}
    //         placeholder="Enter a title"
    //       />
    //     </FormGroup>
    //     <FormGroup>
    //       <Label for="description">Describe</Label>
    //       <Input
    //         type="text"
    //         value={description}
    //         name="description"
    //         id="description"
    //         onChange={(e) => handleChange(e)}
    //         placeholder="Describe your product"
    //       />
    //     </FormGroup>
    //     <Row form>
    //       <Col md={6}>
    //         <FormGroup>
    //           <Label for="category">Type</Label>
    //           <Input
    //             type="select"
    //             name="category"
    //             id="category"
    //             value={category || "choose"}
    //             onChange={(e) => handleChange(e)}
    //           >
    //             <option defaultValue="Choose">Choose</option>
    //             <option value="Books">Books</option>
    //             <option value="Clothes">Clothes</option>
    //             <option value="Others">Others</option>
    //           </Input>
    //         </FormGroup>
    //       </Col>
    //       <Col md={6}>
    //         <FormGroup>
    //           <Label for="trade">Trade</Label>
    //           <Input
    //             type="select"
    //             name="trade"
    //             id="trade"
    //             value={trade}
    //             onChange={(e) => handleChange(e)}
    //           >
    //             <option defaultValue="Choose">Choose</option>
    //             <option value="Buy and Sell">Buy and Sell</option>
    //             <option value="Donation">Donation</option>
    //             <option value="Exchange">Exchange</option>
    //           </Input>
    //         </FormGroup>
    //       </Col>
    //     </Row>
    //     <FormGroup>
    //       <Label for="file">Image</Label>
    //       <Input
    //         type="file"
    //         name="image"
    //         id="image"
    //         onChange={(e) => {
    //           const file = e.target.files[0];
    //           console.log(e.target.files);
    //           setFile(file);
    //         }}
    //       />
    //     </FormGroup>
    //     <Button type="submit">Submit</Button>
    //   </Form>
    // </Fragment>
  );
};

export default PostForm;
