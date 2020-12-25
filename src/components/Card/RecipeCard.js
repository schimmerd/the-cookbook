import React from 'react' 
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import CardIcon from "components/Card/CardIcon.js";
import IconButton from '@material-ui/core/IconButton';
// icons
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

import auth from "middleware/auth"
import API from "api/backend"
const useStyles = makeStyles(styles);


export default function RecipeCard (props) {
    const classes = useStyles();
    const { recipes } = props
    const [change, setChange] = React.useState(false)
    //const [favourite, setFavourite] = React.useState(auth.getSession().profile.data.favourites)

   /*  React.useEffect(() => {
      return () => { saveFavourites() }
    }, [] ); */

    const saveFavourites = () => {
      console.log("!update")
      /* email = auth.getSession().profile.data.email
      const data = {"favourites": favourite}
      API.updateUser(email, data) */
    }

    /* const handleFavourite = (Id) => {
      if (favourite.indexOf(Id) > -1) {
        
      } else {
        !change ? setChange(true) : 
        setFavourite([...favourite, Id])
      }
    } */
  
    return (
        <GridContainer>
        {recipes.map((recipe, key) => {
          return (
            <GridItem xs={12} sm={12} md={4} key={key}>
              <Card>
                <CardHeader>
                  <CardIcon>
                    <a href={recipe.link} target="_blank" rel="noopener noreferrer">
                      <img
                        alt=""
                        style={{ width: "175px", height: "233px" }}
                        src={recipe.link}
                      />
                    </a>
                  </CardIcon>
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>{recipe.keywords}</h4>
                  <p className={classes.cardCategory}>
                    <span className={classes.successText}>
                      {recipe.isTM ? (
                        <AddCircleIcon
                          className={classes.upArrowCardCategory}
                        />
                      ) : (
                        <RemoveCircleIcon
                          className={classes.upArrowCardCategory}
                        />
                      )}
                    </span>{" "}
                    {recipe.isTM
                      ? "Thermomix friendly"
                      : "Not available for Thermomix"}
                  </p>
                </CardBody>
                <CardFooter chart>
                 {/* <IconButton component="span" onClick={handleFavourite}>
                  {
                    favourite.indexOf(recipe.id) > -1 
                      ? 
                        <FavoriteIcon color="secondary" /> 
                      : <FavoriteBorderIcon />
                  }
                  </IconButton> */}
                </CardFooter>
              </Card>
            </GridItem>
          );
        })}
      </GridContainer>
    )
}