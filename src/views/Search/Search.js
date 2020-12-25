import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Search from "@material-ui/icons/Search";
// core components
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import RecipeCard from "components/Card/RecipeCard";
import CustomizedSnackbar from "components/Snackbar/Snackbar"
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// API
import API from "api/backend.js";
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);


export default function SearchRecipes() {
  const classes = useStyles();
  const [recipes, setRecipes] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [open, setOpen] = React.useState(false)
  const [message, setMessage] = React.useState("")
  const [backdrop, setBackdrop] = React.useState(false)
  // Get all recipes 
  React.useEffect(() => {
    setBackdrop(true)
    API.getAll()
      .then(response => {
        setRecipes(response.data)
        setBackdrop(false)
      })
      .catch(error => {
        setMessage(error.response.data);
        setOpen(true)
        setBackdrop(false)
      });
  }, []);
  // helper method
  const unifyString = (str) => str.toLowerCase().trim()
  const onChange = e => {
    setFilter(e.target.value)
  };
  // either return all recipes or filtered recipes
  const getRecipes = () => {
      if (!filter) {
        return recipes 
      } else {
        return recipes.filter(recipe => unifyString(recipe.textfield).indexOf(unifyString(filter)) > -1)
      }
  }
  const _handleClose = () => {
    setOpen(false)
  };


  return (
    <div>
      <div className={classes.searchWrapper}>
        <div className={classes.margin}>
          <Input
            fullWidth={true}
            id="input-with-icon-adornment"
            onChange={onChange}
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
          />
        </div>
      </div>
        {recipes.length > 0 ? (
          <RecipeCard recipes={getRecipes()} />
        ) : (
          null
        )}
      <CustomizedSnackbar 
          place="tc"
          open={open}
          severity="error"
          message={message}
          duration={5000}
          handleClose={_handleClose}
      />
       <Backdrop style={{color: '#fff', zIndex: 300}} open={backdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
