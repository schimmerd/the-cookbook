/*eslint-disable*/
import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import styles from "assets/jss/material-dashboard-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.footer}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="https://www.linkedin.com/in/dominik-schimmer-23668a1a3/" className={classes.block}>
                About
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="https://github.com/schimmerd" className={classes.block}>
                GitHub
              </a>
            </ListItem>
          </List>
        </div>
        <p className={classes.right}>
          <span>
            &copy; {1900 + new Date().getYear()}{" "}
            <a
              href="#"
              target="_blank"
              className={classes.a}
            >
              Dominik Schimmer
            </a>
          </span>
        </p>
      </div>
    </footer>
  );
}
