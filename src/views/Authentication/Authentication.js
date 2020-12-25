import React from 'react';
import PropTypes from "prop-types";
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import SignUp from 'views/Authentication/SignUp/SignUp'
import SignIn from 'views/Authentication/SignIn/SignIn'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Mum's recipe world
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

export default function Authentication() {
  const classes = useStyles();
  const [signUp, setSignUp] = React.useState(false)

  const _handleSignUpForm = () => {
    if (signUp) {
        setSignUp(false)
    } else {
        setSignUp(true)
    }
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {signUp ? "Sign Up": "Sign In"}
        </Typography>
        {
            signUp ? <SignUp /> : <SignIn />
        }
      </div>
        <Grid container justify="flex-end">
            <Grid item>
            {
                signUp ? (
                    <Button onClick={_handleSignUpForm}>
                        Already have an account? Sign in
                    </Button>
                ) : (
                    <Button onClick={_handleSignUpForm}>
                        {"Don't have an account? Sign Up"}
                    </Button>
                )
            }
            </Grid>
          </Grid>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

Authentication.propTypes = {
    open: PropTypes.bool
  };
  