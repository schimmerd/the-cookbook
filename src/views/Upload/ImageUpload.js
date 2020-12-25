import React from "react";
// core components
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom"
import { TextField, Switch, Grid, Box, Button, Container, LinearProgress } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import CustomizedSnackbar from "components/Snackbar/Snackbar"
// API
import API from "api/backend.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
// middleware
import auth from "middleware/auth"

const useStyles = makeStyles(styles);

export default function ImageUpload() {
  const classes = useStyles();
  const [keyword, setKeyword] = React.useState("")
  const [switcher, setSwitcher] = React.useState("false")
  const [files, setFiles] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("Successfully uploaded")
  const [severity, setSeverity] = React.useState("success")
  const [uploading, setUploading] = React.useState(false)

  const validate = (...rest) => {
    if (Object.values(rest).indexOf("") !== -1) {
      return false
    } else if ((Object.values(rest).indexOf(undefined) !== -1)) {
      return false
    } else {
      return true
    }
  }
  // create and upload form data object
  const _handleSubmit = () => {
    setUploading(true)
    if (!validate(keyword)) {
      setMessage("Keyword should not be empty");
      setSeverity("error")
      setOpen(true);
      setUploading(false)
      return null
    }
    const formData = new FormData();
    Array.from(files).forEach(file => {
        formData.append('files[]', file);
    });
    formData.append("keywords", keyword);
    formData.append("isTM", switcher);
    API.addRecipe(formData).then(() => {
        setOpen(true)
        setUploading(false)
    }).catch(error => {
        setUploading(false)
        setMessage(error.response.data)
        setSeverity("error")
        setOpen(true)
    })
  }
  const _handleKeyWordChange = (e) => {
    setKeyword(e.target.value)
  }
  const _handleSwitchChange = (e) => {
    setSwitcher(e.target.checked ? "true" : "false")
  }
  const _handleFileChange = (e) => {
    setFiles(e.target.files)
  }
  const _handleClose = () => {
    setOpen(false)
  };

  return (
    <Container>
      { auth.isAuthenticated() === true ? (
      <Box mb={4}>
        <Grid container spacing={3}>
            <Grid item xs={12} md={2}>
                <p>Keyword(s):</p>
            </Grid>
            <Grid item xs={12} md={10}>
                <TextField helperText={severity === "error" ? "Required! z.B. Käsekuchen, Backen, Einfach" : null} required id="standard-required" fullWidth onChange={_handleKeyWordChange}/>
            </Grid>
            <Grid item xs={12} md={2}>
                <p>Thermomix recipe?</p>
            </Grid>
            <Grid item xs={12} md={10}>
                <Switch color="primary" onChange={_handleSwitchChange} />
            </Grid>
            <Grid item xs={12} md={2}>
                <p>Image/PDF upload:</p>
            </Grid>
            <Grid item xs={12} md={10}>
                <label htmlFor="contained-button-file">
                    <input
                        onChange={_handleFileChange}
                        id="contained-button-file"
                        accept="image/*"
                        //multiple
                        type="file"
                    >
                    </input>
                </label>
            </Grid>
            <Grid item xs={12} md={2}>
            </Grid>
            <Grid item xs={12} md={10}>
                <Button
                    fullWidth
                    onClick={_handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={files.length === 0 || uploading}
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                >
                    Upload
                </Button>
                {uploading && (
                    <Box mt={1}>
                      <LinearProgress color="secondary" />
                    </Box>
                  )}
            </Grid>
        </Grid>
      </Box>
      ) : <Redirect to="/recipes/authentication" />}
      <CustomizedSnackbar
          place="tc"
          open={open}S
          severity={severity}
          message={message}
          duration={5000}
          handleClose={_handleClose}
      />
    </Container>
  );
}
