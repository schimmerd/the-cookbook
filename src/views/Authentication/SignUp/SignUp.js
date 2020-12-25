import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, LinearProgress, Box } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import CustomizedSnackbar from "components/Snackbar/Snackbar"
import { makeStyles } from "@material-ui/core/styles";
// API
import API from "api/backend"
import auth from "middleware/auth"

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const [state, setState] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false)

  const onFormChange = e => {
    const {
      target: { name, value }
    } = e;
    setState({
      ...state,
      [name]: value
    });
  };

  const validate = (...rest) => {
    if (Object.values(rest).indexOf("") !== -1) {
      return false
    } else if ((Object.values(rest).indexOf(undefined) !== -1)) {
      return false
    } else {
      return true
    }
  }

  const onFormSubmit = e => {
    e.preventDefault();
    setLoading(true)
    if (!validate(state.firstName, state.lastName, state.email, state.password)) {
      setMessage("Please fill out all required fields");
      setOpen(true);
      return null
    }
    if (!re.test(String(state.email).toLowerCase())) {
      setMessage("Please enter a valid email address")
      setOpen(true)
      return null
    }
    if (state.password.length < 6) {
      setMessage("Password must have 6 characters at least")
      setOpen(true)
      return null
    }
    const data = {
      email: state.email,
      password: state.password,
      firstName: state.firstName,
      lastName: state.lastName
    }
    API.signUp(data).then(async response => {
        setLoading(false)
        await auth.setAuthenticated(true, response.data)
        window.location.reload()
      }).catch(error => {
        setLoading(false)
        setMessage(error.response.data)
        setOpen(true)
      })
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <form className={classes.form}  onSubmit={onFormSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onFormChange}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                onChange={onFormChange}
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onFormChange}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onFormChange}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {loading && (
                <Box mt={1}>
                  <LinearProgress color="secondary" />
                </Box>
              )}
        </form>
      </div>
      <CustomizedSnackbar
        place="tr"
        open={open}
        severity="error"
        message={message}
        duration={5000}
        handleClose={_handleClose}
      />
    </div>
  );
}
