import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import Favourites from "views/Profile/Favourites"

import auth from "middleware/auth"

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  // eslint-disable-next-line
  const [user, setUser] = React.useState(auth.getSession())
  return (
    <div>
      <GridContainer style={{display: 'block'}}>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Update your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    inputProps={{defaultValue: user.profile.data.email}}
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    inputProps={{defaultValue: user.profile.data.first_name}}
                    labelText="First Name"
                    id="first-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    inputProps={{defaultValue: user.profile.data.last_name}}
                    labelText="Last Name"
                    id="last-name"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button disabled color="success">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    <Favourites />
    </div>
  );
}
