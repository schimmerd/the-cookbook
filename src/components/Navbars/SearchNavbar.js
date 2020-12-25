import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import auth from 'middleware/auth'

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function SecondNavbar() {
  const classes = useStyles();
  const logout = () => {
    auth.logout()
  }
  return (
    <div style={{marginLeft: 10, marginTop: 5}}>
     <Button
        onClick={logout}
        variant="contained"
        color="secondary"
        className={classes.button}
        startIcon={<ExitToAppIcon />}
      >
        <span style={{paddingLeft: 10}}>LOGOUT</span>
      </Button>
    </div>
  );
}
