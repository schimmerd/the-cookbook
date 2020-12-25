import React from "react";
import Button from "@material-ui/core/Button";
import { TextField, LinearProgress, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedSnackbar from "components/Snackbar/Snackbar";
import API from "api/backend"
import auth from "middleware/auth"

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const [state, setState] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false)

  const onFormChange = e => {
    const { target: { name, value } } = e;
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
    if (!validate(state.email, state.password)) {
      setMessage("Incorrect E-Mail or Password");
      setOpen(true);
      setLoading(false)
      return null
    }
    API.login(state.email, state.password).then(async response => {
      await auth.setAuthenticated(true, response)
      setLoading(false)
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
        <form className={classes.form} onSubmit={onFormSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onFormChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onFormChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
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
